import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { Resend } from 'resend'
import { verifyAdminToken, COOKIE_NAME } from '@/lib/auth'
import { createAssessment, deleteAssessment, getAssessment, getResponses, saveAssessment } from '@/lib/readinessStore'
import { reportReadyEmail, sponsorEmail, summarizeThemes, team } from '@/lib/readinessEmail'
import { MIN_RESPONSES } from '@/lib/readiness'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status })

async function send(msg: { subject: string; html: string; text: string }, to: string) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.AUDIT_FROM_EMAIL
  if (!apiKey || !from) return 'Email isn’t set up (RESEND_API_KEY and AUDIT_FROM_EMAIL).'
  const cc = team().filter((x) => x.toLowerCase() !== to.toLowerCase())
  const { error } = await new Resend(apiKey).emails.send({ from, to, cc, replyTo: process.env.CONTACT_EMAIL_TO || undefined, subject: msg.subject, html: msg.html, text: msg.text })
  return error ? `Email failed: ${error.message || 'unknown error'}` : null
}

export async function POST(req: NextRequest) {
  const tok = req.cookies.get(COOKIE_NAME)?.value
  if (!tok || !(await verifyAdminToken(tok))) return bad('Please sign in again.', 401)
  try {
    const b = await req.json()
    if (b.action === 'create') {
      const org = String(b.org || '').trim().slice(0, 120)
      const sponsorName = String(b.sponsorName || '').trim().slice(0, 120)
      const sponsorEmail = String(b.sponsorEmail || '').trim().slice(0, 200)
      if (!org || !sponsorName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sponsorEmail)) return bad('Organization, sponsor name and a valid sponsor email are required.')
      const size = Number(b.teamSize)
      const compareTo = typeof b.compareTo === 'string' && b.compareTo ? b.compareTo : null
      if (compareTo && !(await getAssessment(compareTo))) return bad('The earlier assessment to compare with wasn’t found.')
      const a = await createAssessment({
        org, sponsorName, sponsorEmail,
        teamSize: Number.isFinite(size) && size > 0 ? Math.round(size) : null,
        workshopDate: String(b.workshopDate || '').trim().slice(0, 60),
        note: String(b.note || '').trim().slice(0, 500),
        compareTo,
      })
      return NextResponse.json({ success: true, id: a.id })
    }

    const a = await getAssessment(String(b.id || ''))
    if (!a) return bad('Assessment not found.', 404)

    switch (b.action) {
      case 'close':
      case 'reopen':
        a.status = b.action === 'close' ? 'closed' : 'open'
        await saveAssessment(a)
        return NextResponse.json({ success: true })
      case 'send-links': {
        const err = await send(sponsorEmail(a), a.sponsorEmail)
        if (err) return bad(err, 502)
        a.sentAt = new Date().toISOString()
        await saveAssessment(a)
        return NextResponse.json({ success: true })
      }
      case 'send-report': {
        const n = (await getResponses(a.id)).length
        if (n < MIN_RESPONSES) return bad(`At least ${MIN_RESPONSES} responses are needed first.`)
        const err = await send(reportReadyEmail(a, n), a.sponsorEmail)
        if (err) return bad(err, 502)
        return NextResponse.json({ success: true })
      }
      case 'themes': {
        const responses = await getResponses(a.id)
        if (responses.length < MIN_RESPONSES) return bad(`At least ${MIN_RESPONSES} responses are needed first.`)
        // Writing themes can take longer than a normal request allows, so on Netlify it runs as a background function.
        const apiKey = process.env.RESEND_API_KEY || process.env.ANTHROPIC_API_KEY || ''
        const origin = process.env.URL || req.nextUrl.origin
        if (process.env.NETLIFY || process.env.URL) {
          const secret = createHash('sha256').update(`bt-readiness:${apiKey}`).digest('hex')
          try {
            const r = await fetch(new URL('/.netlify/functions/readiness-themes-background', origin), {
              method: 'POST',
              headers: { 'content-type': 'application/json', 'x-readiness-secret': secret },
              body: JSON.stringify({ id: a.id }),
            })
            if (r.status === 202 || r.ok) return NextResponse.json({ success: true, queued: true })
          } catch (e) {
            console.warn('Themes background function not reachable', e)
          }
        }
        const themes = await summarizeThemes(responses)
        if (!themes) return bad('Couldn’t summarize the comments. Check ANTHROPIC_API_KEY and try again.', 502)
        a.themes = themes
        await saveAssessment(a)
        return NextResponse.json({ success: true })
      }
      case 'delete':
        if (b.confirm !== a.org) return bad('Type the organization name exactly to confirm.')
        await deleteAssessment(a)
        return NextResponse.json({ success: true })
      default:
        return bad('Unknown action.')
    }
  } catch (e) {
    console.error('Readiness admin error', e)
    return bad('Something went wrong.', 500)
  }
}
