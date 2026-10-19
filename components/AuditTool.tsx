'use client'

import { useEffect, useRef, useState } from 'react'
import {
  DISCIPLINES, SCALE, BUDGETS, TIMELINES, AI_LEVELS, BOOKING_URL, FULL_AUDIT_URL,
  marketingScore, websiteScore, aiLevel, band, fixes,
} from '@/lib/audit'
import type { AuditAnswers, ScanResult, SpeedResult } from '@/lib/audit'

type Step = 'start' | 'questions' | 'results' | 'sent'
const PSI_KEY = process.env.NEXT_PUBLIC_PAGESPEED_KEY || ''

function Ring({ value, color, label }: { value: number | null; color: string; label: string }) {
  const C = 2 * Math.PI * 40
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24 flex-none">
        <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90" aria-hidden="true">
          <circle cx="48" cy="48" r="40" fill="none" stroke="#e6eaf1" strokeWidth="11" />
          <circle cx="48" cy="48" r="40" fill="none" stroke={color} strokeWidth="11" strokeDasharray={`${(C * (value ?? 0)) / 100} ${C}`} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-2xl font-extrabold text-navy-900 tabular-nums">{value ?? '–'}</span>
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">{label}</div>
        <div className="text-lg font-bold text-navy-900">{band(value)}</div>
      </div>
    </div>
  )
}

export default function AuditTool() {
  const [step, setStep] = useState<Step>('start')
  const [url, setUrl] = useState('')
  const [business, setBusiness] = useState('')
  const [industry, setIndustry] = useState('')
  const [location, setLocation] = useState('')
  const [answers, setAnswers] = useState<AuditAnswers>({})
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [scan, setScan] = useState<ScanResult | null>(null)
  const [scanState, setScanState] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [scanError, setScanError] = useState('')
  const [speed, setSpeed] = useState<SpeedResult | null>(null)
  const [speedState, setSpeedState] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [trap, setTrap] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const started = useRef(Date.now())
  const top = useRef<HTMLDivElement>(null)

  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  async function runScan(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!url.trim()) {
      setError('Enter your website address to start.')
      return
    }
    setStep('questions')
    setScanState('running')
    setScanError('')
    fetch('/api/audit/scan', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url }) })
      .then(async (r) => {
        const j = await r.json()
        if (!r.ok) throw new Error(j.error || 'The scan didn’t finish.')
        setScan(j)
        setScanState('done')
      })
      .catch((err) => {
        setScanError(err.message)
        setScanState('error')
      })
    setSpeedState('running')
    const target = /^https?:\/\//i.test(url.trim()) ? url.trim() : `https://${url.trim()}`
    const psi = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(target)}&strategy=mobile&category=performance${PSI_KEY ? `&key=${PSI_KEY}` : ''}`
    fetch(psi)
      .then(async (r) => {
        if (!r.ok) throw new Error('speed')
        const j = await r.json()
        const perf = j?.lighthouseResult?.categories?.performance?.score
        const audits = j?.lighthouseResult?.audits || {}
        setSpeed({
          score: typeof perf === 'number' ? Math.round(perf * 100) : null,
          lcp: audits['largest-contentful-paint']?.displayValue,
          cls: audits['cumulative-layout-shift']?.displayValue,
          source: 'lab',
        })
        setSpeedState('done')
      })
      .catch(() => setSpeedState('error'))
  }

  const answeredAll = DISCIPLINES.every((d) => typeof answers[d.id] === 'number') && budget && timeline
  const m = marketingScore(answers)
  const w = websiteScore(scan, speed)
  const lv = aiLevel(answers)
  const list = fixes(answers, scan, speed)

  async function sendReport(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!consent) {
      setError('Please tick the box so we can email your report.')
      return
    }
    setSending(true)
    try {
      const r = await fetch('/api/audit/report', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, business, industry, location, url, budget, timeline, answers, scan, speed, consent, website: trap, elapsed: Date.now() - started.current }),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(j.error || 'We couldn’t send your report. Please try again.')
      setStep('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We couldn’t send your report. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div ref={top} className="scroll-mt-24">
      {step === 'start' && (
        <form onSubmit={runScan} className="card grid gap-5" noValidate>
          <div>
            <label className="label" htmlFor="audit-url">Your website</label>
            <input id="audit-url" className="input-field" type="text" inputMode="url" autoComplete="url" placeholder="yourbusiness.com" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="label" htmlFor="audit-biz">Business name</label><input id="audit-biz" className="input-field" value={business} onChange={(e) => setBusiness(e.target.value)} /></div>
            <div><label className="label" htmlFor="audit-ind">What you sell</label><input id="audit-ind" className="input-field" placeholder="e.g. custom pools" value={industry} onChange={(e) => setIndustry(e.target.value)} /></div>
            <div><label className="label" htmlFor="audit-loc">Where you serve</label><input id="audit-loc" className="input-field" placeholder="e.g. Austin, Texas" value={location} onChange={(e) => setLocation(e.target.value)} /></div>
          </div>
          {error && <p className="text-red-700 text-sm" role="alert">{error}</p>}
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-gold text-lg">Start my free audit</button>
            <span className="text-sm text-gray-500">About five minutes. No email needed to see your scores.</span>
          </div>
        </form>
      )}

      {step === 'questions' && (
        <div className="grid gap-6">
          <ScanStatus scanState={scanState} scanError={scanError} scan={scan} speedState={speedState} />
          <div className="card">
            <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">How does your marketing stack up?</h2>
            <p className="text-gray-600 mb-4">One statement for each of the ten core disciplines, plus AI. Answer honestly: &ldquo;Done well&rdquo; means it&rsquo;s in place and working.</p>
            <div className="divide-y divide-gray-100">
              {DISCIPLINES.map((d) => (
                <fieldset key={d.id} className="py-4 grid md:grid-cols-[1fr_auto] gap-3 md:items-center">
                  <legend className="sr-only">{d.name}</legend>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-widest ${d.ai ? 'text-[#C2501F]' : 'text-navy-500'}`}>{d.name}</div>
                    <div className="text-gray-900">{d.q}</div>
                  </div>
                  <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden w-full md:w-auto">
                    {SCALE.map((s, v) => {
                      const on = answers[d.id] === v
                      return (
                        <label key={s} className={`flex-1 md:flex-none text-center text-sm font-semibold px-3 py-2 cursor-pointer border-l first:border-l-0 border-gray-300 ${on ? (d.ai ? 'bg-[#EE6A35] text-white' : 'bg-navy-800 text-white') : 'text-gray-600 hover:bg-gray-50'}`}>
                          <input type="radio" className="sr-only" name={`q-${d.id}`} value={v} checked={on} onChange={() => setAnswers((a) => ({ ...a, [d.id]: v }))} />
                          {s}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="label" htmlFor="audit-budget">Monthly marketing budget</label>
                <select id="audit-budget" className="input-field" value={budget} onChange={(e) => setBudget(e.target.value)}>
                  <option value="">Choose one</option>
                  {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="audit-time">When do you want to act on this?</label>
                <select id="audit-time" className="input-field" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                  <option value="">Choose one</option>
                  {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className="btn-gold text-lg disabled:opacity-50" disabled={!answeredAll} onClick={() => setStep('results')}>See my results</button>
            {!answeredAll && <span className="text-sm text-gray-500">Answer every statement and both questions to see your results.</span>}
          </div>
        </div>
      )}

      {(step === 'results' || step === 'sent') && (
        <div className="grid gap-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card"><Ring value={m} color="#16285a" label="Marketing score" /></div>
            <div className="card"><Ring value={w} color="#3a66a8" label="Website score" /></div>
            <div className="card">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#C2501F]">AI fluency</div>
              <div className="text-3xl font-extrabold text-[#C2501F] mt-1">{lv ? `Level ${lv}` : '–'}</div>
              <div className="text-gray-600 text-sm mt-1">{lv ? `${AI_LEVELS[lv - 1]}. The goal is Level 4: AI built into how you work.` : ''}</div>
            </div>
          </div>

          <div className="card">
            <h2 className="font-heading text-2xl font-bold text-navy-900 mb-3">Your top three fixes</h2>
            {list.length ? (
              <ol className="grid gap-3">
                {list.slice(0, 3).map((f, i) => (
                  <li key={f.key} className="grid grid-cols-[32px_1fr] gap-3">
                    <span className={`w-8 h-8 rounded-full grid place-items-center text-white font-bold ${f.ai ? 'bg-[#EE6A35]' : 'bg-navy-800'}`}>{i + 1}</span>
                    <div>
                      <div className="text-gray-900">{f.title}</div>
                      <div className="text-sm text-gray-500">{f.area} · {f.chapter} of <em>Business Transformation</em></div>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-600">No major gaps flagged. Nice work. Your full report shows where to push next.</p>
            )}
            {list.length > 3 && <p className="text-sm text-gray-500 mt-4">{list.length - 3} more {list.length - 3 === 1 ? 'fix is' : 'fixes are'} in your full report.</p>}
          </div>

          <ScanResults scan={scan} scanState={scanState} scanError={scanError} speed={speed} speedState={speedState} />

          {step === 'results' ? (
            <form onSubmit={sendReport} className="card bg-navy-50 border-navy-100 grid gap-4" noValidate>
              <div>
                <h2 className="font-heading text-2xl font-bold text-navy-900">Get your full report and 90-day plan</h2>
                <p className="text-gray-700 mt-1">Every fix ranked, your full website scan, and a 90-day plan written for your business with AI, sent to your inbox.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="label" htmlFor="audit-name">Your name</label><input id="audit-name" className="input-field" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div><label className="label" htmlFor="audit-email">Email</label><input id="audit-email" type="email" className="input-field" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              </div>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="audit-website">Leave this empty</label>
                <input id="audit-website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
              </div>
              <label className="flex gap-3 items-start text-sm text-gray-700">
                <input type="checkbox" className="mt-1" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>Email me my report. Mike Huber may follow up about it. No mailing list, and I can say no at any time. See the <a href="/privacy" className="underline" target="_blank">privacy policy</a>.</span>
              </label>
              {error && <p className="text-red-700 text-sm" role="alert">{error}</p>}
              <div><button type="submit" className="btn-gold text-lg disabled:opacity-50" disabled={sending}>{sending ? 'Sending…' : 'Email my report'}</button></div>
            </form>
          ) : (
            <div className="card bg-navy-900 text-white">
              <h2 className="font-heading text-2xl font-bold text-white">Your report is on its way</h2>
              <p className="text-navy-200 mt-2">Check your inbox in a few minutes for {email}. If it&rsquo;s not there, look in spam or promotions.</p>
              <p className="text-navy-100 mt-4">Want help with your top three gaps? Book a free 20-minute review and we&rsquo;ll go through them together.</p>
              <a href={BOOKING_URL} className="btn-gold mt-5" target={BOOKING_URL.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">Book a free review</a>
            </div>
          )}

          <p className="text-sm text-gray-500">
            Want to go deeper? The full audit has 46 questions and twelve website checks, free at{' '}
            <a href={FULL_AUDIT_URL} className="underline" target="_blank" rel="noopener noreferrer">marketingfieldguide.ai</a>.
          </p>
        </div>
      )}
    </div>
  )
}

function ScanStatus({ scanState, scanError, scan, speedState }: { scanState: string; scanError: string; scan: ScanResult | null; speedState: string }) {
  const fails = scan?.checks.filter((c) => c.pass === false).length ?? 0
  return (
    <div className="card py-4 flex flex-wrap items-center gap-3" aria-live="polite">
      <span className={`w-2.5 h-2.5 rounded-full ${scanState === 'running' ? 'bg-gold-500 animate-pulse' : scanState === 'error' ? 'bg-red-600' : 'bg-green-600'}`} />
      <span className="text-gray-800">
        {scanState === 'running' && 'Scanning your website while you answer…'}
        {scanState === 'done' && `Website scan done: ${fails} ${fails === 1 ? 'thing' : 'things'} to fix. ${speedState === 'running' ? 'Speed test still running.' : ''}`}
        {scanState === 'error' && `The scan didn’t finish: ${scanError} You can still finish the audit.`}
      </span>
    </div>
  )
}

function ScanResults({ scan, scanState, scanError, speed, speedState }: { scan: ScanResult | null; scanState: string; scanError: string; speed: SpeedResult | null; speedState: string }) {
  return (
    <div className="card">
      <div className="flex flex-wrap justify-between gap-2 mb-3">
        <h2 className="font-heading text-2xl font-bold text-navy-900">Your website scan</h2>
        {scan && <span className="text-sm text-gray-500 break-all">{scan.finalUrl}</span>}
      </div>
      {scanState === 'running' && <p className="text-gray-600">Still scanning…</p>}
      {scanState === 'error' && <p className="text-gray-600">The scan didn&rsquo;t finish: {scanError}</p>}
      {scan?.error && <p className="text-gray-600 mb-3">{scan.error}</p>}
      <div className="mb-4 text-gray-800">
        <b>Mobile speed: </b>
        {speedState === 'running' && 'testing with Google PageSpeed…'}
        {speedState === 'error' && 'Google’s speed test didn’t answer. Try pagespeed.web.dev yourself.'}
        {speedState === 'done' && speed && (typeof speed.score === 'number' ? `${speed.score}/100${speed.lcp ? `. Main content appears in ${speed.lcp}.` : ''}` : 'no score returned.')}
      </div>
      {scan && (
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {scan.checks.map((c) => (
            <li key={c.id} className="grid grid-cols-[52px_1fr] gap-2">
              <span className={`text-xs font-bold rounded-full px-2 py-1 h-fit text-center ${c.pass === null ? 'bg-gray-100 text-gray-500' : c.pass ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{c.pass === null ? 'n/a' : c.pass ? 'Pass' : 'Fix'}</span>
              <div>
                <div className="font-semibold text-gray-900">{c.label}{c.ai && <span className="ml-2 text-xs font-bold text-[#C2501F]">AI</span>}</div>
                <div className="text-sm text-gray-600 break-words">{c.detail}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-gray-500 mt-4">An automatic check of your home page only. It doesn&rsquo;t replace a full audit.</p>
    </div>
  )
}
