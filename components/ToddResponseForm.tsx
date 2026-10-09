'use client'

import { useEffect, useRef, useState } from 'react'
import { TODD_DRAFTS } from '@/lib/toddDrafts'
import VoiceField, { type VoiceClip } from '@/components/VoiceField'

type Choice = 'A' | 'B' | 'C' | 'D' | 'own' | ''
type Robbins = 'yes' | 'check' | 'no' | ''

interface State {
  name: string
  email: string
  section: string
  example1: string
  teamsDid: string
  result: string
  robbins: Robbins
  example2: string
  client46m: string
  choice: Choice
  endorsement: string
  nameLine: string
  okName: boolean
  okQuote: boolean
  clarity: boolean
  followUp: string
  notes: string
}

const START: State = {
  name: 'Todd Hartley',
  email: '',
  section: TODD_DRAFTS.section,
  example1: TODD_DRAFTS.example1,
  teamsDid: '',
  result: '',
  robbins: '',
  example2: TODD_DRAFTS.example2,
  client46m: '',
  choice: '',
  endorsement: '',
  nameLine: TODD_DRAFTS.nameLine,
  okName: false,
  okQuote: false,
  clarity: false,
  followUp: '',
  notes: '',
}

const KEY = 'todd-response-draft-v1'
const MAX_SECONDS = 180

const box =
  'w-full rounded-xl border border-gray-200 bg-[#F1F4F9] px-4 py-3 text-lg leading-relaxed text-gray-900 focus:border-navy-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-500/20'
const label = 'block font-semibold text-navy-900 mb-2'
const step = 'card mb-8'

function Reset({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-sm text-navy-600 underline mt-1">
      Reset to our original
    </button>
  )
}

export default function ToddResponseForm() {
  const [s, setS] = useState<State>(START)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [err, setErr] = useState('')
  const [hp, setHp] = useState('')
  const started = useRef(Date.now())

  // voice note
  const [rec, setRec] = useState<'idle' | 'recording' | 'done' | 'unsupported'>('idle')
  const [secs, setSecs] = useState(0)
  const [audioUrl, setAudioUrl] = useState('')
  const audioRef = useRef<{ b64: string; type: string } | null>(null)
  const mr = useRef<MediaRecorder | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  // keep a draft in this browser so nothing is lost if the tab closes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) setS({ ...START, ...JSON.parse(saved) })
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s))
    } catch {}
  }, [s])

  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }))

  // one voice note per box, keyed by field
  const clips = useRef<Record<string, VoiceClip>>({})
  const [clipCount, setClipCount] = useState(0)
  const onClip = (id: string, clip: VoiceClip | null) => {
    if (clip) clips.current[id] = clip
    else delete clips.current[id]
    setClipCount(Object.keys(clips.current).length)
  }

  const choose = (c: Choice) => {
    const text =
      c === 'A' ? TODD_DRAFTS.endorsementA : c === 'B' ? TODD_DRAFTS.endorsementB : c === 'C' ? TODD_DRAFTS.endorsementC : c === 'D' ? TODD_DRAFTS.endorsement2023 : ''
    setS((p) => ({ ...p, choice: c, endorsement: text }))
  }

  async function startRec() {
    if (typeof window === 'undefined' || !navigator.mediaDevices || typeof MediaRecorder === 'undefined') {
      setRec('unsupported')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      // prefer AAC in MP4 (plays everywhere, including QuickTime and iPhone), then fall back
      const type = ['audio/mp4;codecs=mp4a.40.2', 'audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find((t) => MediaRecorder.isTypeSupported(t)) || ''
      const m = new MediaRecorder(stream, type ? { mimeType: type, audioBitsPerSecond: 32000 } : undefined)
      const chunks: BlobPart[] = []
      m.ondataavailable = (e) => e.data.size && chunks.push(e.data)
      m.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        const blob = new Blob(chunks, { type: (m.mimeType || type || 'audio/webm').split(';')[0] })
        if (!blob.size) {
          setRec('idle')
          setErr('That voice note came through empty. Please record it again.')
          return
        }
        setAudioUrl(URL.createObjectURL(blob))
        const r = new FileReader()
        r.onloadend = () => {
          const b64 = String(r.result).split(',')[1] || ''
          audioRef.current = { b64, type: blob.type }
        }
        r.readAsDataURL(blob)
        setRec('done')
      }
      mr.current = m
      m.start(1000)
      setSecs(0)
      setRec('recording')
      timer.current = setInterval(() => {
        setSecs((x) => {
          if (x + 1 >= MAX_SECONDS) stopRec()
          return x + 1
        })
      }, 1000)
    } catch {
      setRec('unsupported')
    }
  }
  function stopRec() {
    if (timer.current) clearInterval(timer.current)
    if (mr.current && mr.current.state !== 'inactive') mr.current.stop()
  }
  function clearRec() {
    audioRef.current = null
    setAudioUrl('')
    setRec('idle')
    setSecs(0)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    if (!s.name.trim()) {
      setErr('Please add your name.')
      return
    }
    const totalB64 = Object.values(clips.current).reduce((a, c) => a + c.b64.length, 0) + (audioRef.current?.b64.length || 0)
    if (totalB64 > 4_200_000) {
      setErr('Your voice notes are too long to send together. Please delete or shorten one or two, then try again.')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/todd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...s,
          website: hp,
          elapsed: Date.now() - started.current,
          audio: audioRef.current,
          fieldAudio: Object.fromEntries(Object.entries(clips.current).map(([k, c]) => [k, { b64: c.b64, type: c.type }])),
        }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(j.error || 'Something went wrong.')
      setStatus('sent')
      try {
        localStorage.removeItem(KEY)
      } catch {}
    } catch (e: unknown) {
      setStatus('error')
      setErr(e instanceof Error ? e.message : 'Something went wrong.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card text-center py-12">
        <h2 className="font-heading text-3xl font-bold text-navy-900 mb-3">Got it. Thank you, Todd.</h2>
        <p className="text-lg text-gray-700">
          Your answers are on their way to Mike. Nothing goes in the book until you approve the final wording.
        </p>
      </div>
    )
  }

  const mmss = (n: number) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`

  return (
    <form onSubmit={submit} className="text-lg leading-relaxed text-gray-800" noValidate>
      {/* spam trap: hidden from people, tempting to bots */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} name="website" />
        </label>
      </div>

      <p className="mb-8 text-gray-600">
        Tick, type or talk. Click the microphone in any box to answer that part out loud, or change our words right in the box. Your answers save in this browser as you go,
        and nothing is sent until you press <strong>Send to Mike</strong>.
      </p>

      {/* Voice */}
      <div className="rounded-2xl bg-navy-900 text-white p-6 md:p-8 mb-8">
        <h3 className="font-heading text-2xl font-bold text-white mb-2">Rather talk it through?</h3>
        <p className="mb-5 text-navy-100">Skip the typing if you like. Record a voice note of up to 3 minutes, about anything. Or click the microphone in any box below to talk about just that part. Every voice note goes to Mike when you press <strong className="text-white">Send to Mike</strong> at the bottom.</p>
        {rec === 'unsupported' && (
          <p className="text-gold-400">Your browser didn&rsquo;t allow the microphone. You can still type, or email Mike a voice memo.</p>
        )}
        {rec === 'idle' && (
          <button type="button" onClick={startRec} className="btn-gold text-lg">
            ● Record a voice note
          </button>
        )}
        {rec === 'recording' && (
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 font-semibold text-white">
              <span className="h-3 w-3 rounded-full bg-red-600 animate-pulse" /> Recording {mmss(secs)} / 3:00
            </span>
            <button type="button" onClick={stopRec} className="btn-gold">
              Stop
            </button>
          </div>
        )}
        {rec === 'done' && (
          <div className="space-y-3">
            <audio controls src={audioUrl} className="w-full" />
            <button type="button" onClick={clearRec} className="text-navy-100 underline">
              Delete and record again
            </button>
          </div>
        )}
      </div>

      {/* 1. Examples */}
      <div className={step}>
        <span className="badge mb-3 inline-block">Ask 1</span>
        <h3 className="font-heading text-2xl font-bold text-navy-900 mb-4">A real example or two</h3>

        <label className={label} htmlFor="section">The new section, &ldquo;Video That Speeds Up the Sale.&rdquo; Edit freely.</label>
        <VoiceField id="section" what="the new section" onClip={onClip}>
          <textarea id="section" className={box + ' pr-14'} rows={7} value={s.section} onChange={(e) => set('section', e.target.value)} />
        </VoiceField>
        <Reset onClick={() => set('section', TODD_DRAFTS.section)} />

        <h4 className="font-semibold text-navy-900 text-xl mt-8 mb-2">Example 1: Tony Robbins&rsquo; sales teams</h4>
        <VoiceField id="example1" what="Example 1" onClip={onClip}>
          <textarea className={box + ' pr-14'} rows={5} value={s.example1} onChange={(e) => set('example1', e.target.value)} aria-label="Example 1 text" />
        </VoiceField>
        <Reset onClick={() => set('example1', TODD_DRAFTS.example1)} />

        <label className={label + ' mt-6'} htmlFor="teamsDid">What did the teams start doing? <span className="font-normal text-gray-500">(e.g. personal videos before and after calls)</span></label>
        <VoiceField id="teamsDid" what="what the teams did" onClip={onClip}>
          <textarea id="teamsDid" className={box + ' pr-14'} rows={3} value={s.teamsDid} onChange={(e) => set('teamsDid', e.target.value)} />
        </VoiceField>

        <label className={label + ' mt-6'} htmlFor="result">What result can we publish? <span className="font-normal text-gray-500">(close rate, revenue or sales cycle, and over what time)</span></label>
        <VoiceField id="result" what="the result" onClip={onClip}>
          <textarea id="result" className={box + ' pr-14'} rows={3} value={s.result} onChange={(e) => set('result', e.target.value)} />
        </VoiceField>

        <fieldset className="mt-6">
          <legend className={label}>OK to name Tony Robbins&rsquo; team?</legend>
          {(
            [
              ['yes', 'Yes, name them'],
              ['check', "I'll check with them first"],
              ['no', "No, describe them without the name"],
            ] as [Robbins, string][]
          ).map(([v, t]) => (
            <label key={v} className="flex items-center gap-3 py-1.5 cursor-pointer">
              <input type="radio" name="robbins" className="h-5 w-5 accent-navy-700" checked={s.robbins === v} onChange={() => set('robbins', v)} />
              {t}
            </label>
          ))}
        </fieldset>

        <h4 className="font-semibold text-navy-900 text-xl mt-8 mb-2">Example 2: a smaller business</h4>
        <VoiceField id="example2" what="Example 2" onClip={onClip}>
          <textarea className={box + ' pr-14'} rows={4} value={s.example2} onChange={(e) => set('example2', e.target.value)} aria-label="Example 2 text" />
        </VoiceField>
        <Reset onClick={() => set('example2', TODD_DRAFTS.example2)} />
        <label className={label + ' mt-6'} htmlFor="client46m">
          Your bio mentions a client that closed $46 million in deals over 24 months. Can we use it, and how should we describe the client?
        </label>
        <VoiceField id="client46m" what="the $46 million client" onClip={onClip}>
          <textarea id="client46m" className={box + ' pr-14'} rows={3} value={s.client46m} onChange={(e) => set('client46m', e.target.value)} />
        </VoiceField>
      </div>

      {/* 2. Endorsement */}
      <div className={step}>
        <span className="badge mb-3 inline-block">Ask 2</span>
        <h3 className="font-heading text-2xl font-bold text-navy-900 mb-4">Your &ldquo;fist bump&rdquo; for the book</h3>
        <figure className="rounded-2xl border-l-4 border-gold-500 bg-gold-400/10 p-5 mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-600 mb-2">Your fist bump for the first edition (2023)</p>
          <blockquote className="italic text-gray-800">&ldquo;{TODD_DRAFTS.endorsement2023}&rdquo;</blockquote>
          <figcaption className="mt-3 text-base text-gray-600">&mdash; {TODD_DRAFTS.nameLine2023}</figcaption>
        </figure>
        <p className="mb-4">For the new edition, start from your 2023 words, one of our shorter drafts, or write your own. Then change any word.</p>
        <div className="space-y-3 mb-4">
          {(
            [
              ['D', 'Update my 2023 endorsement'],
              ['A', TODD_DRAFTS.endorsementA],
              ['B', TODD_DRAFTS.endorsementB],
              ['C', TODD_DRAFTS.endorsementC],
              ['own', 'I’ll write my own'],
            ] as [Choice, string][]
          ).map(([v, t]) => (
            <label key={v} className={`flex gap-3 rounded-xl border p-4 cursor-pointer ${s.choice === v ? 'border-navy-600 bg-navy-50' : 'border-gray-200'}`}>
              <input type="radio" name="choice" className="h-5 w-5 mt-1 accent-navy-700 shrink-0" checked={s.choice === v} onChange={() => choose(v)} />
              <span>
                {v !== 'own' && v !== 'D' && <strong className="text-navy-900">Option {v}. </strong>}
                {v === 'own' || v === 'D' ? <strong className="text-navy-900">{t}</strong> : <>&ldquo;{t}&rdquo;</>}
              </span>
            </label>
          ))}
        </div>
        {s.choice && (
          <>
            <label className={label} htmlFor="endorsement">Your endorsement, in your words</label>
            <VoiceField id="endorsement" what="your endorsement" onClip={onClip}>
              <textarea id="endorsement" className={box + ' pr-14'} rows={s.choice === 'D' ? 8 : 4} value={s.endorsement} onChange={(e) => set('endorsement', e.target.value)} />
            </VoiceField>
          </>
        )}
        <label className={label + ' mt-6'} htmlFor="nameLine">How your name should appear</label>
        <VoiceField id="nameLine" what="how your name appears" onClip={onClip}>
          <textarea id="nameLine" className={box + ' pr-14'} rows={2} value={s.nameLine} onChange={(e) => set('nameLine', e.target.value)} />
        </VoiceField>
        <Reset onClick={() => set('nameLine', TODD_DRAFTS.nameLine)} />
        <p className="text-gray-500 text-base mt-3">Endorsements must be your honest opinion, so change any word that doesn&rsquo;t sound like you.</p>
      </div>

      {/* 3. OKs */}
      <div className={step}>
        <span className="badge mb-3 inline-block">Ask 3</span>
        <h3 className="font-heading text-2xl font-bold text-navy-900 mb-4">Your OK</h3>
        {(
          [
            ['okName', 'You can name me in the book.'],
            ['okQuote', 'You can use my endorsement, as I edited it above.'],
            ['clarity', 'Please list Clarity.video in the chapter’s tools, and note that I founded it.'],
          ] as ['okName' | 'okQuote' | 'clarity', string][]
        ).map(([k, t]) => (
          <label key={k} className="flex items-start gap-3 py-2 cursor-pointer">
            <input type="checkbox" className="h-5 w-5 mt-1 accent-navy-700" checked={s[k]} onChange={(e) => set(k, e.target.checked)} />
            {t}
          </label>
        ))}
        <p className="text-gray-500 text-base mt-2">Leave any box unticked if you&rsquo;re not sure yet. Mike will follow up.</p>
      </div>

      {/* Wrap up */}
      <div className={step}>
        <h3 className="font-heading text-2xl font-bold text-navy-900 mb-4">Anything else?</h3>
        <label className={label} htmlFor="notes">Notes for Mike</label>
        <VoiceField id="notes" what="anything else" onClip={onClip}>
          <textarea id="notes" className={box + ' pr-14'} rows={4} value={s.notes} onChange={(e) => set('notes', e.target.value)} />
        </VoiceField>
        <fieldset className="mt-6">
          <legend className={label}>Best way to follow up</legend>
          {['Email is fine', 'Call me', 'Text me'].map((t) => (
            <label key={t} className="flex items-center gap-3 py-1.5 cursor-pointer">
              <input type="radio" name="followUp" className="h-5 w-5 accent-navy-700" checked={s.followUp === t} onChange={() => set('followUp', t)} />
              {t}
            </label>
          ))}
        </fieldset>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className={label} htmlFor="name">Your name</label>
            <input id="name" className={box} value={s.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="email">Your email <span className="font-normal text-gray-500">(optional)</span></label>
            <input id="email" type="email" className={box} value={s.email} onChange={(e) => set('email', e.target.value)} />
          </div>
        </div>
      </div>

      {clipCount > 0 && <p className="mb-2 font-semibold text-navy-900">✓ {clipCount} voice note{clipCount > 1 ? 's' : ''} in the boxes above will be sent with your answers.</p>}
      {rec === 'done' && <p className="mb-4 font-semibold text-navy-900">✓ Your voice note is ready and will be sent with your answers.</p>}
      {rec === 'recording' && <p className="mb-4 font-semibold text-red-700">You&rsquo;re still recording. Press Stop at the top before you send.</p>}
      {err && <p className="text-red-700 mb-4">{err}</p>}
      <button type="submit" disabled={status === 'sending'} className="btn-gold text-lg px-8 py-4 disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send to Mike'}
      </button>
    </form>
  )
}
