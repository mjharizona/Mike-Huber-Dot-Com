import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ARNIE_DRAFTS } from '@/lib/arnieDrafts'

// Same sender as the contact form. Swap once mikehuber.com is verified in Resend.
const FROM_EMAIL = 'Mike Huber Website <onboarding@resend.dev>'

const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const clip = (v: unknown, n = 8000) => (typeof v === 'string' ? v.slice(0, n).trim() : '')
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function compare(title: string, original: string, edited: string) {
  const same = original.trim() === edited.trim()
  return {
    text: same ? `${title}: approved as written (no changes)\n` : `${title}: CHANGED\n  Ours:   ${original}\n  Arnie's: ${edited || '(left blank)'}\n`,
    html: same
      ? `<h3>${esc(title)}</h3><p style="color:#2b7a3d"><b>Approved as written</b> (no changes)</p>`
      : `<h3>${esc(title)} <span style="color:#c2410c">· changed</span></h3>
         <p style="color:#6b7280;margin:0 0 4px">Our draft</p><div style="background:#f3f4f6;padding:10px;border-radius:8px;white-space:pre-wrap">${esc(original)}</div>
         <p style="color:#6b7280;margin:10px 0 4px">Arnie&rsquo;s version</p><div style="background:#eef4ff;padding:10px;border-radius:8px;white-space:pre-wrap">${esc(edited || '(left blank)')}</div>`,
  }
}
const answer = (title: string, v: string) => ({
  text: `${title}\n  ${v || '(no answer)'}\n`,
  html: `<h3>${esc(title)}</h3><div style="white-space:pre-wrap">${v ? esc(v) : '<i style="color:#9ca3af">(no answer)</i>'}</div>`,
})

export async function POST(req: NextRequest) {
  try {
    const b = await req.json()
    if (clip(b.website) || Number(b.elapsed) < 4000) return NextResponse.json({ success: true }, { status: 200 })
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (limited(ip)) return NextResponse.json({ error: 'Too many sends. Please try again later, or email Mike.' }, { status: 429 })

    const name = clip(b.name, 200)
    if (!name) return NextResponse.json({ error: 'Please add your name.' }, { status: 400 })
    const email = clip(b.email, 200)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'That email address looks incomplete.' }, { status: 400 })
    }
    const pick = clip(b.pick, 20)
    const pickText = ({ foreword: 'A short foreword', fistBump: 'A fist bump', both: 'Both: foreword and fist bump', later: 'Not right now' } as Record<string, string>)[pick]
    if (!pickText) return NextResponse.json({ error: 'Please pick one of the options in step 1.' }, { status: 400 })
    const yn = (v: unknown) => (v === true ? 'YES' : 'not ticked')

    const parts = [answer('What he chose', pickText)]
    if (pick === 'foreword' || pick === 'both') parts.push(compare('Foreword', ARNIE_DRAFTS.foreword, clip(b.foreword)))
    if (pick === 'fistBump' || pick === 'both') parts.push(compare('Fist bump', ARNIE_DRAFTS.fistBump, clip(b.fistBump, 2000)))
    if (pick !== 'later') {
      parts.push(compare('How his name should appear', ARNIE_DRAFTS.nameLine, clip(b.nameLine, 500)))
      parts.push(answer('Permissions', `Name him in the book: ${yn(b.okName)}\nUse his words as edited: ${yn(b.okUse)}\nLink to AI for Daily Living with his name: ${yn(b.okNewsletter)}`))
    }
    parts.push(answer('Notes for Mike', clip(b.notes)))

    const to = process.env.CONTACT_EMAIL_TO
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey || !to) {
      console.warn('RESEND_API_KEY or CONTACT_EMAIL_TO not set; Arnie response not emailed.')
      return NextResponse.json({ error: 'Sending isn’t set up yet. Please email Mike directly.' }, { status: 503 })
    }
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM_EMAIL,
      to,
      ...(email ? { replyTo: email } : {}),
      subject: `Arnie's answer for the book — ${pickText}`,
      text: `From: ${name}${email ? ` <${email}>` : ''}\n\n` + parts.map((p) => p.text).join('\n'),
      html:
        `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.55;color:#16181d;max-width:680px"><h2 style="color:#0f1d44">Arnie's answer for the book</h2><p>From <b>${esc(name)}</b>${email ? ` &lt;${esc(email)}&gt;` : ''}</p>` +
        parts.map((p) => p.html).join('') +
        '</div>',
    })
    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'The send failed. Please try again, or email Mike.' }, { status: 502 })
    }
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Arnie form error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
