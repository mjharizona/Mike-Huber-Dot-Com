import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { Resend } from 'resend'
import { cleanSubmission, leadEmail, reportEmail } from '@/lib/auditEmail'
import { BOOKING_URL } from '@/lib/audit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LEAD_FROM = 'Mike Huber Website <onboarding@resend.dev>'

const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 4
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json()
    // Spam trap and too-fast submissions: pretend it worked.
    if ((typeof b.website === 'string' && b.website.trim()) || Number(b.elapsed) < 15000) return NextResponse.json({ success: true })
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (limited(ip)) return NextResponse.json({ error: 'Too many reports from here. Please try again later.' }, { status: 429 })
    if (b.consent !== true) return NextResponse.json({ error: 'Please tick the box so we can email your report.' }, { status: 400 })
    const s = cleanSubmission(b)
    if (typeof s === 'string') return NextResponse.json({ error: s }, { status: 400 })

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_EMAIL_TO
    if (!apiKey || !to) {
      console.warn('RESEND_API_KEY or CONTACT_EMAIL_TO not set; audit not emailed.')
      return NextResponse.json({ error: 'Email isn’t set up yet. Please try again later.' }, { status: 503 })
    }
    const resend = new Resend(apiKey)
    // Everyone on the team who gets each lead: Mike plus anyone in AUDIT_CC (comma-separated).
    const team = [to, ...(process.env.AUDIT_CC || '').split(',').map((x) => x.trim()).filter(Boolean)]
    // Resend's test sender can only reach the account owner, so use the verified sender once it's set.
    const sender = process.env.AUDIT_FROM_EMAIL

    // 1. Lead email to Mike, right away.
    const lead = leadEmail(s)
    const { error } = await resend.emails.send({ from: sender || LEAD_FROM, to: sender ? team : to, replyTo: s.email, subject: lead.subject, html: lead.html, text: lead.text })
    if (error) {
      console.error('Audit lead email failed', error)
      return NextResponse.json({ error: 'We couldn’t send your report. Please try again in a minute.' }, { status: 502 })
    }

    // 2. The prospect's report, with the AI plan, runs in a Netlify background function
    //    because writing the plan can take longer than a normal request allows.
    const origin = process.env.URL || req.nextUrl.origin
    const secret = createHash('sha256').update(`bt-audit:${apiKey}`).digest('hex')
    let queued = false
    try {
      const r = await fetch(new URL('/.netlify/functions/audit-report-background', origin), {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-audit-secret': secret },
        body: JSON.stringify(s),
      })
      queued = r.status === 202 || r.ok
    } catch (e) {
      console.warn('Background report function not reachable', e)
    }
    // Fallback (local dev, or the background function is missing): send the score-based report now.
    if (!queued) {
      if (sender) {
        const rep = reportEmail(s, null, BOOKING_URL, origin)
        await resend.emails.send({ from: sender, to: s.email, bcc: team, replyTo: to, subject: rep.subject, html: rep.html, text: rep.text })
      }
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Audit report error', e)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
