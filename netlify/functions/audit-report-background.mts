// Netlify background function: writes the AI plan and emails the prospect their report.
// Runs for up to 15 minutes; the caller gets a 202 right away.
import { createHash } from 'node:crypto'
import { Resend } from 'resend'
import { aiPlan, cleanSubmission, reportEmail } from '../../lib/auditEmail'

export default async (req: Request) => {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL_TO
  if (!apiKey || !to) return
  const secret = createHash('sha256').update(`bt-audit:${apiKey}`).digest('hex')
  if (req.headers.get('x-audit-secret') !== secret) {
    console.warn('Audit background: bad secret')
    return
  }
  const s = cleanSubmission(await req.json().catch(() => null))
  if (typeof s === 'string') return

  const plan = await aiPlan(s)
  const site = process.env.URL || 'https://mikehuber.com'
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL || '/contact'
  const rep = reportEmail(s, plan, booking, site)
  const resend = new Resend(apiKey)
  const from = process.env.AUDIT_FROM_EMAIL

  if (!from) {
    // No verified sender yet: Resend's test address can only email Mike, so send him the report to forward.
    await resend.emails.send({
      from: 'Mike Huber Website <onboarding@resend.dev>',
      to,
      subject: `[Forward to ${s.email}] ${rep.subject}`,
      html: `<p style="font-family:Arial;color:#b42318">Not sent to ${s.email}: set AUDIT_FROM_EMAIL in Netlify after verifying mikehuber.com in Resend. Forward this to them for now.</p>${rep.html}`,
      text: rep.text,
    })
    return
  }
  const { error } = await resend.emails.send({ from, to: s.email, bcc: to, replyTo: to, subject: rep.subject, html: rep.html, text: rep.text })
  if (error) {
    console.error('Audit report email failed', error)
    await resend.emails.send({ from: 'Mike Huber Website <onboarding@resend.dev>', to, subject: `[Not delivered to ${s.email}] ${rep.subject}`, html: rep.html, text: rep.text })
  }
}
