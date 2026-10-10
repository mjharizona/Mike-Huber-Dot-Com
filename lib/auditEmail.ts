// Email builders and the AI plan for the audit. Relative imports only: the Netlify
// background function bundles this file directly, without the @/ alias.
import { DISCIPLINES, SCALE, AI_LEVELS, band, basicPlan, fixes, marketingScore, websiteScore, aiLevel } from './audit'
import type { AuditAnswers, ScanResult, SpeedResult, Fix } from './audit'

export type AuditSubmission = {
  name: string
  email: string
  business: string
  industry: string
  location: string
  url: string
  budget: string
  timeline: string
  answers: AuditAnswers
  scan: ScanResult | null
  speed: SpeedResult | null
}

const esc = (t: unknown) => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const NAVY = '#0f1d44'
const ORANGE = '#EE6A35'
const wrap = (inner: string) =>
  `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.55;color:#16181d;max-width:640px">${inner}</div>`

export function summary(s: AuditSubmission) {
  const m = marketingScore(s.answers)
  const w = websiteScore(s.scan, s.speed)
  const lv = aiLevel(s.answers)
  const list = fixes(s.answers, s.scan, s.speed)
  return { m, w, lv, list }
}

function scoreTable(s: AuditSubmission) {
  return DISCIPLINES.map((d) => {
    const v = s.answers[d.id]
    const label = typeof v === 'number' ? SCALE[v] : 'Not answered'
    return `<tr><td style="padding:6px 8px;border-bottom:1px solid #e5e7eb">${esc(d.name)}</td><td style="padding:6px 8px;border-bottom:1px solid #e5e7eb;color:${d.ai ? ORANGE : NAVY};font-weight:600">${esc(label)}</td><td style="padding:6px 8px;border-bottom:1px solid #e5e7eb;color:#6b7280">${d.chapter}</td></tr>`
  }).join('')
}
function scanTable(scan: ScanResult | null, speed: SpeedResult | null) {
  if (!scan) return '<p style="color:#6b7280">The website scan didn’t run.</p>'
  const rows = scan.checks
    .map((c) => {
      const mark = c.pass === null ? '<span style="color:#6b7280">n/a</span>' : c.pass ? '<span style="color:#2b7a3d">Pass</span>' : '<span style="color:#b42318">Fix</span>'
      return `<tr><td style="padding:6px 8px;border-bottom:1px solid #e5e7eb;font-weight:600">${mark}</td><td style="padding:6px 8px;border-bottom:1px solid #e5e7eb">${esc(c.label)}<div style="color:#6b7280;font-size:13px">${esc(c.detail)}</div></td></tr>`
    })
    .join('')
  const sp = speed && typeof speed.score === 'number' ? `<p><b>Mobile speed (Google PageSpeed):</b> ${speed.score}/100${speed.lcp ? `, largest content shown in ${esc(speed.lcp)}` : ''}</p>` : ''
  return `${sp}<table style="width:100%;border-collapse:collapse">${rows}</table>`
}
function fixList(list: Fix[], n = 6) {
  return list.length
    ? `<ol style="padding-left:20px">${list.slice(0, n).map((f) => `<li style="margin-bottom:6px">${esc(f.title)} <span style="color:#6b7280">(${esc(f.area)}, ${f.chapter})</span></li>`).join('')}</ol>`
    : '<p>No major gaps flagged.</p>'
}

export function leadEmail(s: AuditSubmission) {
  const { m, w, lv, list } = summary(s)
  const hot = /This month|next three/.test(s.timeline) && !/Under|Not sure/.test(s.budget)
  const opener = list[0]
    ? `I saw your audit. Your biggest gap looks like ${list[0].area.toLowerCase()}: ${list[0].title.charAt(0).toLowerCase() + list[0].title.slice(1)} Want to walk through it in 20 minutes?`
    : 'I saw your audit. You’re in good shape overall. Want to talk through what to push next?'
  const subject = `${hot ? 'Hot lead: ' : 'New audit: '}${s.business || s.name} · ${m ?? '–'}/100 · ${s.budget}`
  const html = wrap(`
    <h2 style="color:${NAVY};margin:0 0 4px">New audit${hot ? ' · ready to act' : ''}</h2>
    <p style="margin:0 0 14px"><b>${esc(s.name)}</b> &lt;${esc(s.email)}&gt;<br>${esc(s.business)}${s.industry ? ` · ${esc(s.industry)}` : ''}${s.location ? ` · ${esc(s.location)}` : ''}<br><a href="${esc(s.scan?.finalUrl || s.url)}">${esc(s.url)}</a></p>
    <table style="border-collapse:collapse;margin-bottom:12px"><tr><td style="padding:4px 12px 4px 0"><b>Budget</b></td><td>${esc(s.budget)}</td></tr><tr><td style="padding:4px 12px 4px 0"><b>Timeline</b></td><td>${esc(s.timeline)}</td></tr><tr><td style="padding:4px 12px 4px 0"><b>Marketing score</b></td><td>${m ?? '–'}/100 (${band(m)})</td></tr><tr><td style="padding:4px 12px 4px 0"><b>Website</b></td><td>${w ?? '–'}/100</td></tr><tr><td style="padding:4px 12px 4px 0"><b>AI fluency</b></td><td>${lv ? `Level ${lv}, ${AI_LEVELS[lv - 1]}` : '–'}</td></tr></table>
    <h3 style="color:${NAVY}">Suggested opener</h3><div style="background:#f3f4f6;padding:10px 12px;border-radius:8px">${esc(opener)}</div>
    <h3 style="color:${NAVY}">Their top gaps</h3>${fixList(list)}
    <h3 style="color:${NAVY}">Answers</h3><table style="width:100%;border-collapse:collapse">${scoreTable(s)}</table>
    <h3 style="color:${NAVY}">Website scan</h3>${scanTable(s.scan, s.speed)}
    <p style="color:#6b7280;font-size:13px;margin-top:18px">Reply to this email to answer them directly. Their full report and plan go to them separately, with you copied.</p>`)
  const text = `New audit from ${s.name} <${s.email}>\n${s.business} | ${s.industry} | ${s.location}\n${s.url}\nBudget: ${s.budget}\nTimeline: ${s.timeline}\nMarketing score: ${m ?? '-'}/100\nWebsite: ${w ?? '-'}/100\nAI fluency: ${lv ? 'Level ' + lv : '-'}\n\nSuggested opener: ${opener}\n\nTop gaps:\n${list.slice(0, 6).map((f, i) => `${i + 1}. ${f.title} (${f.area}, ${f.chapter})`).join('\n')}`
  return { subject, html, text }
}

export async function aiPlan(s: AuditSubmission): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null
  const { m, w, lv, list } = summary(s)
  const answers = DISCIPLINES.map((d) => `${d.name} (${d.chapter}): ${typeof s.answers[d.id] === 'number' ? SCALE[s.answers[d.id] as number] : 'not answered'} — "${d.q}"`).join('\n')
  const scan = (s.scan?.checks || []).map((c) => `${c.pass === null ? 'n/a' : c.pass ? 'PASS' : 'FIX'}: ${c.label}. ${c.detail}`).join('\n')
  const prompt = `Context: A small business owner just took a free marketing and website audit. Business: ${s.business || 'not given'}. What they sell: ${s.industry || 'not given'}. Where they serve: ${s.location || 'not given'}. Website: ${s.url}. Monthly marketing budget: ${s.budget}. Timeline: ${s.timeline}.
Marketing score: ${m ?? 'n/a'}/100. Website score: ${w ?? 'n/a'}/100. AI fluency: ${lv ? `Level ${lv} of 4 (${AI_LEVELS[lv - 1]})` : 'n/a'}.
Their self-assessment, one statement per discipline:
${answers}
Automatic website scan of the home page:
${scan || 'Scan unavailable.'}
${s.speed && typeof s.speed.score === 'number' ? `Mobile PageSpeed score: ${s.speed.score}/100.` : ''}
Ranked gaps: ${list.slice(0, 6).map((f) => `${f.title} (${f.area}, ${f.chapter})`).join(' | ') || 'none flagged'}

Role: You are a seasoned marketing strategist who writes plain, practical advice for small business owners.
Ask: Write their 90-day marketing plan, focused on the gaps most likely to bring in more leads. Fit it to their budget and timeline.
Format: Three sections headed exactly "Month 1", "Month 2" and "Month 3". Under each, two to four lines that start with "- ". Each line is one specific action and ends with the matching chapter in parentheses, using the chapter numbers given above. Then a section headed "Not yet" with two lines starting "- " naming what to hold off on, and why.
Tighten: Under 380 words. Short sentences, no hype. Don't invent facts, results or statistics about their business. Label any cost or time as an estimate. Include paid media only if it fits their budget. Don't mention Mike, an agency or a sales call. No markdown other than the "- " lines.`
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 90_000)
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: process.env.AUDIT_AI_MODEL || 'claude-sonnet-5-5', max_tokens: 1100, messages: [{ role: 'user', content: prompt }] }),
    }).finally(() => clearTimeout(t))
    if (!res.ok) {
      console.error('Audit AI plan failed', res.status, (await res.text()).slice(0, 300))
      return null
    }
    const data = await res.json()
    const text = (data.content || []).filter((c: { type: string }) => c.type === 'text').map((c: { text: string }) => c.text).join('\n').trim()
    console.log('Audit AI plan usage', JSON.stringify(data.usage || {}))
    return text || null
  } catch (e) {
    console.error('Audit AI plan error', e)
    return null
  }
}

function planHtml(planText: string | null, list: Fix[]) {
  if (planText) {
    const out = planText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => (l.startsWith('- ') ? `<li style="margin-bottom:6px">${esc(l.slice(2))}</li>` : `</ul><h3 style="color:${NAVY};margin:18px 0 6px">${esc(l.replace(/[:#*]/g, '').trim())}</h3><ul style="padding-left:20px;margin:0">`))
      .join('')
    const body = out.startsWith('</ul>') ? out.slice(5) : `<ul style="padding-left:20px;margin:0">${out}`
    return body + '</ul>'
  }
  return basicPlan(list)
    .map((m) => `<h3 style="color:${NAVY};margin:18px 0 6px">${m.month}</h3><ul style="padding-left:20px;margin:0">${m.items.map((i) => `<li style="margin-bottom:6px">${esc(i)}</li>`).join('')}</ul>`)
    .join('')
}

export function reportEmail(s: AuditSubmission, planText: string | null, bookingUrl: string, site: string) {
  const { m, w, lv, list } = summary(s)
  const first = s.name.split(' ')[0] || 'there'
  const book = /^https?:/.test(bookingUrl) ? bookingUrl : `${site}${bookingUrl}`
  const html = wrap(`
    <p style="color:#6b7280;font-size:13px;margin:0 0 6px">Marketing and Website Audit · mikehuber.com</p>
    <h2 style="color:${NAVY};margin:0 0 12px">Your audit report${s.business ? `: ${esc(s.business)}` : ''}</h2>
    <p>Hi ${esc(first)}, here are your results and a 90-day plan built from your answers.</p>
    <table style="border-collapse:collapse;margin:14px 0"><tr>
      <td style="padding:10px 18px 10px 0"><div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.1em">Marketing</div><div style="font-size:28px;font-weight:800;color:${NAVY}">${m ?? '–'}/100</div></td>
      <td style="padding:10px 18px 10px 0"><div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.1em">Website</div><div style="font-size:28px;font-weight:800;color:${NAVY}">${w ?? '–'}/100</div></td>
      <td style="padding:10px 0"><div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.1em">AI fluency</div><div style="font-size:28px;font-weight:800;color:${ORANGE}">${lv ? `Level ${lv}` : '–'}</div></td></tr></table>
    <h3 style="color:${NAVY}">Your biggest gaps</h3>${fixList(list)}
    <h3 style="color:${NAVY};margin-bottom:0">Your 90-day plan</h3>
    ${planText ? `<p style="color:${ORANGE};font-size:13px;margin:4px 0 0">Drafted with AI from your answers. Check it against what you know about your business.</p>` : ''}
    ${planHtml(planText, list)}
    <h3 style="color:${NAVY};margin-top:22px">Your website scan</h3>${scanTable(s.scan, s.speed)}
    <div style="background:#f0f4fa;border-radius:12px;padding:16px 18px;margin-top:22px">
      <p style="margin:0 0 10px"><b>Want a second set of eyes on this?</b> Book a free 20-minute review and we’ll go through your top three gaps together.</p>
      <a href="${esc(book)}" style="display:inline-block;background:#e6b422;color:#fff;font-weight:700;text-decoration:none;padding:10px 16px;border-radius:8px">Book a free review</a>
    </div>
    <p style="color:#6b7280;font-size:13px;margin-top:18px">Each chapter number refers to <i>Business Transformation Through AI-Powered Marketing</i>, 2nd edition. The full audit, with 46 questions and twelve website checks, is free at marketingfieldguide.ai.</p>
    <p style="color:#6b7280;font-size:12px">You’re getting this because you asked for your audit report at mikehuber.com/audit. Reply to this email with any questions.</p>`)
  const text = `Your audit report${s.business ? `: ${s.business}` : ''}\n\nMarketing: ${m ?? '-'}/100\nWebsite: ${w ?? '-'}/100\nAI fluency: ${lv ? 'Level ' + lv : '-'}\n\nBiggest gaps:\n${list.slice(0, 6).map((f, i) => `${i + 1}. ${f.title} (${f.area}, ${f.chapter})`).join('\n')}\n\n90-day plan:\n${planText || basicPlan(list).map((x) => `${x.month}\n${x.items.map((i) => '- ' + i).join('\n')}`).join('\n\n')}\n\nBook a free 20-minute review: ${book}`
  return { subject: `Your marketing audit${s.business ? ` for ${s.business}` : ''}: ${m ?? '–'}/100`, html, text }
}

const clip = (v: unknown, n = 300) => (typeof v === 'string' ? v.slice(0, n).trim() : '')

// Rebuilds a submission from untrusted JSON. Returns an error message string when invalid.
export function cleanSubmission(b: any): AuditSubmission | string {
  const name = clip(b?.name, 120)
  const email = clip(b?.email, 200)
  if (!name) return 'Please add your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'That email address looks incomplete.'
  const answers: AuditAnswers = {}
  DISCIPLINES.forEach((d) => {
    const v = b?.answers?.[d.id]
    answers[d.id] = typeof v === 'number' && v >= 0 && v <= 3 ? Math.round(v) : null
  })
  const cleanCheck = (c: any) => ({ id: clip(c?.id, 40), label: clip(c?.label, 120), pass: c?.pass === true ? true : c?.pass === false ? false : null, detail: clip(c?.detail, 300), chapter: clip(c?.chapter, 20), ai: c?.ai === true })
  const scan: ScanResult | null = b?.scan && Array.isArray(b.scan.checks)
    ? { url: clip(b.scan.url), finalUrl: clip(b.scan.finalUrl), fetchedAt: clip(b.scan.fetchedAt, 40), checks: b.scan.checks.slice(0, 20).map(cleanCheck) }
    : null
  const sp = b?.speed
  const speed: SpeedResult | null = sp && typeof sp.score === 'number' ? { score: Math.max(0, Math.min(100, Math.round(sp.score))), lcp: clip(sp.lcp, 20), cls: clip(sp.cls, 20) } : null
  return {
    name,
    email,
    business: clip(b?.business, 150),
    industry: clip(b?.industry, 150),
    location: clip(b?.location, 150),
    url: clip(b?.url, 300),
    budget: clip(b?.budget, 60) || 'Not given',
    timeline: clip(b?.timeline, 60) || 'Not given',
    answers,
    scan,
    speed,
  }
}
