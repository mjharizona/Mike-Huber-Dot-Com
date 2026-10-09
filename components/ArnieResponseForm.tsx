'use client'

import { useEffect, useRef, useState } from 'react'
import { ARNIE_DRAFTS } from '@/lib/arnieDrafts'

type Pick = 'foreword' | 'fistBump' | 'both' | 'later' | ''

interface State {
  pick: Pick
  foreword: string
  fistBump: string
  nameLine: string
  okName: boolean
  okUse: boolean
  okNewsletter: boolean
  notes: string
  name: string
  email: string
}

const START: State = {
  pick: '',
  foreword: ARNIE_DRAFTS.foreword,
  fistBump: ARNIE_DRAFTS.fistBump,
  nameLine: ARNIE_DRAFTS.nameLine,
  okName: false,
  okUse: false,
  okNewsletter: false,
  notes: '',
  name: 'Arnie Kuenn',
  email: '',
}

const KEY = 'arnie-response-draft-v1'
const box =
  'w-full rounded-xl border border-gray-200 bg-[#F1F4F9] px-4 py-3 text-lg leading-relaxed text-gray-900 focus:border-navy-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-500/20'
const label = 'block font-semibold text-navy-900 mb-2'

function Reset({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-sm text-navy-600 underline mt-1">
      Reset to our draft
    </button>
  )
}

export default function ArnieResponseForm() {
  const [s, setS] = useState<State>(START)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [err, setErr] = useState('')
  const [hp, setHp] = useState('')
  const started = useRef(Date.now())

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
  const showForeword = s.pick === 'foreword' || s.pick === 'both'
  const showFist = s.pick === 'fistBump' || s.pick === 'both'

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    if (!s.pick) return setErr('Please pick one of the options in step 1.')
    if (!s.name.trim()) return setErr('Please add your name.')
    setStatus('sending')
    try {
      const res = await fetch('/api/arnie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...s, website: hp, elapsed: Date.now() - started.current }),
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
        <h2 className="font-heading text-3xl font-bold text-navy-900 mb-3">Thank you, Arnie.</h2>
        <p className="text-lg text-gray-700">Your answer is on its way to Mike. Nothing goes in the book until you approve the final wording.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="text-lg leading-relaxed text-gray-800" noValidate>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} name="website" />
        </label>
      </div>

      <div className="card mb-8">
        <span className="badge mb-3 inline-block">Step 1</span>
        <h3 className="font-heading text-2xl font-bold text-navy-900 mb-4">What would you like to give?</h3>
        {(
          [
            ['foreword', 'A short foreword', 'About a page, like the one you wrote for The Customer Journey.'],
            ['fistBump', 'A fist bump', 'Two or three sentences for the praise pages and the back cover.'],
            ['both', 'Both', 'The foreword, plus a short line we can use on the cover.'],
            ['later', 'Not right now', "No problem. Tell Mike in the notes if you'd like to talk first."],
          ] as [Pick, string, string][]
        ).map(([v, t, d]) => (
          <label key={v} className={`flex gap-3 rounded-xl border p-4 mb-3 cursor-pointer ${s.pick === v ? 'border-navy-600 bg-navy-50' : 'border-gray-200'}`}>
            <input type="radio" name="pick" className="h-5 w-5 mt-1 accent-navy-700 shrink-0" checked={s.pick === v} onChange={() => set('pick', v)} />
            <span>
              <strong className="text-navy-900">{t}</strong>
              <span className="block text-gray-600 text-base">{d}</span>
            </span>
          </label>
        ))}
      </div>

      {(showForeword || showFist) && (
        <div className="card mb-8">
          <span className="badge mb-3 inline-block">Step 2</span>
          <h3 className="font-heading text-2xl font-bold text-navy-900 mb-2">Make it yours</h3>
          <p className="mb-6 text-gray-600">We drafted a starting point from your own words and our time together. Change anything, or replace it all.</p>
          {showForeword && (
            <>
              <label className={label} htmlFor="foreword">Your foreword</label>
              <textarea id="foreword" className={box} rows={16} value={s.foreword} onChange={(e) => set('foreword', e.target.value)} />
              <Reset onClick={() => set('foreword', ARNIE_DRAFTS.foreword)} />
            </>
          )}
          {showFist && (
            <div className={showForeword ? 'mt-8' : ''}>
              <label className={label} htmlFor="fistBump">Your fist bump</label>
              <textarea id="fistBump" className={box} rows={5} value={s.fistBump} onChange={(e) => set('fistBump', e.target.value)} />
              <Reset onClick={() => set('fistBump', ARNIE_DRAFTS.fistBump)} />
            </div>
          )}
          <label className={label + ' mt-8'} htmlFor="nameLine">How your name should appear</label>
          <textarea id="nameLine" className={box} rows={2} value={s.nameLine} onChange={(e) => set('nameLine', e.target.value)} />
          <Reset onClick={() => set('nameLine', ARNIE_DRAFTS.nameLine)} />
          <p className="text-gray-500 text-base mt-3">Endorsements must be your honest opinion, so change any word that doesn&rsquo;t sound like you.</p>
        </div>
      )}

      {(showForeword || showFist) && (
        <div className="card mb-8">
          <span className="badge mb-3 inline-block">Step 3</span>
          <h3 className="font-heading text-2xl font-bold text-navy-900 mb-4">Your OK</h3>
          {(
            [
              ['okName', 'You can name me in the book.'],
              ['okUse', 'You can use my words, as I edited them above.'],
              ['okNewsletter', 'Please include a link to AI for Daily Living (dailyliving.ai) with my name.'],
            ] as ['okName' | 'okUse' | 'okNewsletter', string][]
          ).map(([k, t]) => (
            <label key={k} className="flex items-start gap-3 py-2 cursor-pointer">
              <input type="checkbox" className="h-5 w-5 mt-1 accent-navy-700" checked={s[k]} onChange={(e) => set(k, e.target.checked)} />
              {t}
            </label>
          ))}
        </div>
      )}

      <div className="card mb-8">
        <h3 className="font-heading text-2xl font-bold text-navy-900 mb-4">Anything else?</h3>
        <label className={label} htmlFor="notes">Notes for Mike</label>
        <textarea id="notes" className={box} rows={4} value={s.notes} onChange={(e) => set('notes', e.target.value)} />
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

      {err && <p className="text-red-700 mb-4">{err}</p>}
      <button type="submit" disabled={status === 'sending'} className="btn-gold text-lg px-8 py-4 disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send to Mike'}
      </button>
    </form>
  )
}
