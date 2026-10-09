import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { TODD_DRAFTS } from '@/lib/toddDrafts'

// Same sender as the contact form. Swap once mikehuber.com is verified in Resend.
const FROM_EMAIL = 'Mike Huber Website <onboarding@resend.dev>'
const MAX_AUDIO_B64 = 4_500_000 // about 3.3 MB of audio, well under the host's request limit

// Best-effort send limit per server instance (a spam guard, not a security boundary).
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
    text: same
      ? `${title}: approved as written (no changes)\n`
      : `${title}: CHANGED\n  Ours:  ${original}\n  Todd's: ${edited || '(left blank)'}\n`,
    html: same
      ? `<h3>${esc(title)}</h3><p style="color:#2b7a3d"><b>Approved as written</b> (no changes)</p>`
      : `<h3>${esc(title)} <span style="color:#c2410c">· changed</span></h3>
         <p style="color:#6b7280;margin:0 0 4px">Our draft</p><div style="background:#f3f4f6;padding:10px;border-radius:8px;white-space:pre-wrap">${esc(original)}</div>
         <p style="color:#6b7280;margin:10px 0 4px">Todd&rsquo;s version</p><div style="background:#eef4ff;padding:10px;border-radius:8px;white-space:pre-wrap">${esc(edited || '(left blank)')}</div>`,
  }
}

function answer(title: string, v: string) {
  return {
    text: `${title}\n  ${v || '(no answer)'}\n`,
    html: `<h3>${esc(title)}</h3><div style="white-space:pre-wrap">${v ? esc(v) : '<i style="color:#9ca3af">(no answer)</i>'}</div>`,
  }
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json()

    // spam guards: hidden field filled, or submitted impossibly fast
    if (clip(b.website) || Number(b.elapsed) < 4000) {
      return NextResponse.json({ success: true }, { status: 200 })
    }
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (limited(ip)) {
      return NextResponse.json({ error: 'Too many sends. Please try again later, or email Mike.' }, { status: 429 })
    }

    const name = clip(b.name, 200)
    if (!name) return NextResponse.json({ error: 'Please add your name.' }, { status: 400 })
    const email = clip(b.email, 200)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'That email address looks incomplete.' }, { status: 400 })
    }

    const choice = clip(b.choice, 10)
    const startFrom =
      choice === 'A' ? TODD_DRAFTS.endorsementA : choice === 'B' ? TODD_DRAFTS.endorsementB : choice === 'C' ? TODD_DRAFTS.endorsementC : choice === 'D' ? TODD_DRAFTS.endorsement2023 : ''
    const robbins = ({ yes: 'Yes, name them', check: "He'll check with them first", no: 'No, describe them without the name' } as Record<string, string>)[clip(b.robbins, 10)] || '(not answered)'
    const yn = (v: unknown) => (v === true ? 'YES' : 'not ticked')

    const parts = [
      compare('New section: Video That Speeds Up the Sale', TODD_DRAFTS.section, clip(b.section)),
      compare('Example 1: Tony Robbins’ sales teams', TODD_DRAFTS.example1, clip(b.example1)),
      answer('What the teams started doing', clip(b.teamsDid)),
      answer('Result we can publish', clip(b.result)),
      answer('OK to name Tony Robbins’ team?', robbins),
      compare('Example 2: a smaller business', TODD_DRAFTS.example2, clip(b.example2)),
      answer('The $46 million client', clip(b.client46m)),
      choice === 'own'
        ? answer('Endorsement (his own)', clip(b.endorsement, 2000))
        : choice
          ? compare(choice === 'D' ? 'Endorsement (updated from his 2023 endorsement)' : `Endorsement (started from Option ${choice})`, startFrom, clip(b.endorsement, 2000))
          : answer('Endorsement', ''),
      compare('How his name should appear', TODD_DRAFTS.nameLine, clip(b.nameLine, 500)),
      answer(
        'Permissions',
        `Name him in the book: ${yn(b.okName)}\nUse his endorsement as edited: ${yn(b.okQuote)}\nList Clarity.video (he founded it): ${yn(b.clarity)}`
      ),
      answer('Notes for Mike', clip(b.notes)),
      answer('Best way to follow up', clip(b.followUp, 50)),
    ]

    const audio = b.audio && typeof b.audio.b64 === 'string' && b.audio.b64.length >= 100 && b.audio.b64.length < MAX_AUDIO_B64 ? b.audio : null

    // one voice note per box (only known fields), within the overall size limit
    const FIELD_TITLES: Record<string, string> = {
      section: 'New section', example1: 'Example 1', teamsDid: 'What the teams started doing', result: 'Result we can publish',
      example2: 'Example 2', client46m: 'The $46 million client', endorsement: 'Endorsement', nameLine: 'How his name should appear', notes: 'Notes for Mike',
    }
    const fieldAudio: { key: string; b64: string; type: string }[] = []
    let budget = MAX_AUDIO_B64 - (audio ? audio.b64.length : 0)
    if (b.fieldAudio && typeof b.fieldAudio === 'object') {
      for (const [k, v] of Object.entries(b.fieldAudio as Record<string, { b64?: unknown; type?: unknown }>)) {
        if (!FIELD_TITLES[k] || !v || typeof v.b64 !== 'string' || v.b64.length < 100 || v.b64.length > budget) continue
        budget -= v.b64.length
        fieldAudio.push({ key: k, b64: v.b64, type: String(v.type || '') })
      }
    }
    const extOf = (t: string) => (t.includes('mp4') ? 'm4a' : 'webm')
    const mimeOf = (t: string) => (t.includes('mp4') ? 'audio/mp4' : 'audio/webm')
    const kb = (b64: string) => `${Math.max(1, Math.round((b64.length * 3) / 4 / 1024))} KB`
    const ext = audio && String(audio.type).includes('mp4') ? 'm4a' : 'webm'
    if (fieldAudio.length) {
      parts.push(
        answer(
          'Voice notes in the boxes (attached)',
          fieldAudio.map((f) => `${FIELD_TITLES[f.key]}: todd-voice-${f.key}.${extOf(f.type)} (${kb(f.b64)})`).join('\n')
        )
      )
    }
    const attachments = [
      ...(audio ? [{ filename: `todd-voice-note.${ext}`, content: audio.b64, contentType: mimeOf(String(audio.type)) }] : []),
      ...fieldAudio.map((f) => ({ filename: `todd-voice-${f.key}.${extOf(f.type)}`, content: f.b64, contentType: mimeOf(f.type) })),
    ]

    const to = process.env.CONTACT_EMAIL_TO
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey || !to) {
      console.warn('RESEND_API_KEY or CONTACT_EMAIL_TO not set; Todd response not emailed.')
      return NextResponse.json({ error: 'Sending isn’t set up yet. Please email Mike directly.' }, { status: 503 })
    }

    const resend = new Resend(apiKey)
    const header = `From: ${name}${email ? ` <${email}>` : ''}\nVoice notes attached: ${attachments.length}\n\n`
    console.log('Todd form attachments:', attachments.map((a) => `${a.filename} ${a.content.length} b64 chars`).join(', ') || 'none')
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      ...(email ? { replyTo: email } : {}),
      subject: `Todd's book review answers — from ${name}`,
      text: header + parts.map((p) => p.text).join('\n'),
      html:
        `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.55;color:#16181d;max-width:680px">
          <h2 style="color:#0f1d44">Todd's answers for the book</h2>
          <p>From <b>${esc(name)}</b>${email ? ` &lt;${esc(email)}&gt;` : ''} · Voice notes attached: <b>${attachments.length}</b></p>` +
        parts.map((p) => p.html).join('') +
        '</div>',
      ...(attachments.length ? { attachments } : {}),
    })
    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'The send failed. Please try again, or email Mike.' }, { status: 502 })
    }
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Todd form error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
