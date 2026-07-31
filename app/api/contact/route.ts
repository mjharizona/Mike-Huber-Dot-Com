import { NextRequest, NextResponse } from 'next/server'
import { saveLead } from '@/lib/leads'
import { Resend } from 'resend'

// Swap for a verified sending domain (e.g. "Mike Huber <hello@mikehuber.com>")
// once mikehuber.com is verified in the Resend dashboard.
const FROM_EMAIL = 'Mike Huber Website <onboarding@resend.dev>'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, interest, message } = body

    // Basic validation
    if (!name || !email || !interest || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Save to file-based store
    const lead = saveLead({ name, email, phone, company, interest, message })

    // ─── Email notification (Resend) ───────────────────────────────────
    const to = process.env.CONTACT_EMAIL_TO
    const apiKey = process.env.RESEND_API_KEY

    if (apiKey && to) {
      try {
        const resend = new Resend(apiKey)
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to,
          replyTo: email,
          subject: `New inquiry from ${name} — ${interest}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || '—'}`,
            `Company: ${company || '—'}`,
            `Interest: ${interest}`,
            '',
            message,
          ].join('\n'),
        })

        if (error) {
          console.error('Resend error:', error)
        }
      } catch (mailErr) {
        // Don't fail the whole request if email delivery fails — the lead is already saved
        // and viewable in the admin dashboard.
        console.error('Contact form email notification failed:', mailErr)
      }
    } else {
      console.warn(
        `RESEND_API_KEY or CONTACT_EMAIL_TO not set — skipping email notification for lead ${lead.id}.`
      )
    }
    // ─────────────────────────────────────────────────────────────────

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
