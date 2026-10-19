// Emails and AI theme summaries for the Team Readiness Assessment.
// Relative imports only, so a Netlify function can bundle it.
import { OPEN, MIN_RESPONSES } from './readiness'
import type { Submission } from './readiness'
import type { Assessment, Themes } from './readinessStore'

const esc = (t: unknown) => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const NAVY = '#0f1d44'
const wrap = (inner: string) =>
  `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.55;color:#16181d;max-width:640px">${inner}</div>`

export const siteUrl = () => (process.env.URL || process.env.SITE_URL || 'https://mikehuber.com').replace(/\/$/, '')
export const links = (a: Assessment) => ({
  leader: `${siteUrl()}/readiness/${a.leaderToken}`,
  team: `${siteUrl()}/readiness/${a.teamToken}`,
  report: `${siteUrl()}/readiness/${a.reportToken}`,
})

export function inviteText(a: Assessment) {
  const l = links(a)
  return `Subject: 15 minutes before our marketing workshop

Hi team,

Before our workshop${a.workshopDate ? ` on ${a.workshopDate}` : ''} with Mike Huber and Loren Ankarlo, please take the Team Readiness Assessment. It takes about 15 minutes.

${l.team}

It's confidential. It doesn't ask for your name or email. You'll get your own scores and a PDF to keep. Mike and Loren see only the team's combined results, and I see only the combined results too.

Please finish it by [date].

Thanks,
${a.sponsorName}`
}

export function sponsorEmail(a: Assessment) {
  const l = links(a)
  const first = a.sponsorName.split(' ')[0] || 'there'
  const subject = `Your Team Readiness Assessment links${a.org ? ` · ${a.org}` : ''}`
  const html = wrap(`
    <p>Hi ${esc(first)},</p>
    <p>Here's the Team Readiness Assessment for ${esc(a.org)}. It's the pre-work for our workshop${a.workshopDate ? ` on ${esc(a.workshopDate)}` : ''}, and it takes about 15 minutes.</p>
    <h3 style="color:${NAVY};margin:20px 0 6px">1. For you and your leadership team</h3>
    <p style="margin:0 0 6px"><a href="${esc(l.leader)}">${esc(l.leader)}</a></p>
    <p style="margin:0;color:#4b5563">Leadership answers are reported as a group, so we can compare how leadership and the team see the business. If you're the only leader, your answers will show on their own.</p>
    <h3 style="color:${NAVY};margin:20px 0 6px">2. For everyone else</h3>
    <p style="margin:0 0 6px"><a href="${esc(l.team)}">${esc(l.team)}</a></p>
    <p style="margin:0;color:#4b5563">Please forward the note below. No names or emails are collected. Team results only appear once at least ${MIN_RESPONSES} people have answered.</p>
    <div style="background:#f3f4f6;border-radius:8px;padding:12px 14px;margin:10px 0;white-space:pre-wrap;font-size:14px">${esc(inviteText(a))}</div>
    <h3 style="color:${NAVY};margin:20px 0 6px">3. Your combined results</h3>
    <p style="margin:0 0 6px"><a href="${esc(l.report)}">${esc(l.report)}</a></p>
    <p style="margin:0;color:#4b5563">This page shows how many people have responded so far, and the composite report once there are enough answers. Please keep this link to yourself.</p>
    <p style="margin-top:20px">Questions? Just reply.</p>
    <p>Mike</p>`)
  const text = `Hi ${first},\n\nTeam Readiness Assessment for ${a.org}.\n\n1. You and your leadership team: ${l.leader}\n2. Everyone else: ${l.team}\n3. Your combined results (keep this to yourself): ${l.report}\n\nNote to forward:\n\n${inviteText(a)}\n\nMike`
  return { subject, html, text }
}

export function reportReadyEmail(a: Assessment, n: number) {
  const l = links(a)
  const first = a.sponsorName.split(' ')[0] || 'there'
  const subject = `Your team's readiness results are ready · ${a.org}`
  const html = wrap(`
    <p>Hi ${esc(first)},</p>
    <p>${n} people from ${esc(a.org)} completed the Team Readiness Assessment. Your combined report is ready:</p>
    <p><a href="${esc(l.report)}" style="display:inline-block;background:${NAVY};color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:600">View the composite report</a></p>
    <p style="color:#4b5563">It shows the team's combined scores, how leadership and the team compare, the ten disciplines ranked by gap, and the main themes from people's comments. No one's individual answers are shown. You can save it as a PDF from the page.</p>
    <p>We'll use it to tailor the workshop. Talk soon.</p>
    <p>Mike</p>`)
  const text = `Hi ${first},\n\n${n} people from ${a.org} completed the Team Readiness Assessment. Your combined report: ${l.report}\n\nMike`
  return { subject, html, text }
}

// Turn open-ended answers into themes. Paraphrased, never quoted, so no one can be identified.
export async function summarizeThemes(responses: Submission[]): Promise<Themes | null> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null
  const block = (id: string) =>
    responses
      .map((r) => r.open?.[id])
      .filter((t): t is string => !!t && t.trim().length > 2)
      .map((t, i) => `${i + 1}. ${t.replace(/\s+/g, ' ').slice(0, 1200)}`)
      .join('\n')
  const prompt = `Context: ${responses.length} employees answered three open questions in a confidential, anonymous readiness survey before a marketing and AI workshop.
Question A: "${OPEN[0].text}"
${block('q1') || '(no answers)'}

Question B: "${OPEN[1].text}"
${block('q2') || '(no answers)'}

Question C: "${OPEN[2].text}"
${block('q3') || '(no answers)'}

Role: You are a careful organizational consultant summarizing survey comments for the company's leader.
Ask: Group the answers to each question into up to five themes.
Format: Reply with JSON only, no other text: {"worries":[{"theme":"short label","detail":"one plain sentence","mentions":number}],"hopes":[...],"workshop":[...]}. "worries" is Question A, "hopes" is Question B, "workshop" is Question C. Sort each list by mentions, highest first.
Tighten: Paraphrase. Never quote anyone's words, and leave out names, job titles, departments, customers or any detail that could identify a person. Skip a theme that only one person raised if it could identify them. Don't add anything that isn't in the answers. Use an empty list when a question has no answers.`
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 120_000)
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: process.env.AUDIT_AI_MODEL || 'claude-sonnet-5-5', max_tokens: 1500, messages: [{ role: 'user', content: prompt }] }),
    }).finally(() => clearTimeout(t))
    if (!res.ok) {
      console.error('Readiness themes failed', res.status, (await res.text()).slice(0, 300))
      return null
    }
    const data = await res.json()
    const text = (data.content || []).filter((c: { type: string }) => c.type === 'text').map((c: { text: string }) => c.text).join('').trim()
    const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1))
    const fix = (x: unknown) =>
      Array.isArray(x)
        ? x.slice(0, 5).map((t) => ({ theme: String(t?.theme || '').slice(0, 80), detail: String(t?.detail || '').slice(0, 300), mentions: Math.max(1, Number(t?.mentions) || 1) })).filter((t) => t.theme)
        : []
    return { at: new Date().toISOString(), n: responses.length, worries: fix(json.worries), hopes: fix(json.hopes), workshop: fix(json.workshop) }
  } catch (e) {
    console.error('Readiness themes error', e)
    return null
  }
}

export const team = () => {
  const to = process.env.CONTACT_EMAIL_TO
  return [to, ...(process.env.AUDIT_CC || '').split(',').map((x) => x.trim())].filter((x): x is string => !!x)
}
