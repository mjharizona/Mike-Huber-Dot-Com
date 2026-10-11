'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AI_SKILLS, CHANGE, DISCIPLINES, LADDER_ME, LADDER_NAMES, LADDER_TEAM, OPEN, ORG, RULES, SKILLS,
  SCALE_AGREE, SCALE_DO, SCALE_IMPORTANT, SCALE_SKILL, ALL_RATED,
  band, r1, scores, strengthsGaps,
} from '@/lib/readiness'
import type { Answers, Group, Item, OpenAnswers } from '@/lib/readiness'

type Props = { token: string; org: string; group: Group; open: boolean }

const STEPS = ['Your skills', 'AI skills', 'Your organization', 'The ten disciplines', 'Change and AI rules', 'Your thoughts']

function Scale({ name, value, onChange, labels, ai, max = 5 }: { name: string; value?: number; onChange: (v: number) => void; labels: string[]; ai?: boolean; max?: number }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden w-full md:w-auto" role="radiogroup">
      {Array.from({ length: max }, (_, i) => i + 1).map((v) => {
        const on = value === v
        return (
          <label key={v} title={labels[v]} className={`flex-1 md:flex-none md:w-12 text-center text-sm font-semibold py-2 cursor-pointer border-l first:border-l-0 border-gray-300 ${on ? (ai ? 'bg-[#EE6A35] text-white' : 'bg-navy-800 text-white') : 'text-gray-600 hover:bg-gray-50'}`}>
            <input type="radio" className="sr-only" name={name} value={v} checked={on} onChange={() => onChange(v)} aria-label={`${v}: ${labels[v]}`} />
            {v}
          </label>
        )
      })}
    </div>
  )
}

function Legend({ labels }: { labels: string[] }) {
  return (
    <p className="text-xs text-gray-500 mt-1">
      {labels.slice(1).map((l, i) => (
        <span key={l} className="mr-3 whitespace-nowrap"><b className="text-gray-700">{i + 1}</b> {l}</span>
      ))}
    </p>
  )
}

function Rows({ items, a, set, labels, ai }: { items: Item[]; a: Answers; set: (id: string, v: number) => void; labels: string[]; ai?: boolean }) {
  return (
    <div className="divide-y divide-gray-100">
      {items.map((it) => (
        <fieldset key={it.id} className="py-3 grid md:grid-cols-[1fr_auto] gap-2 md:gap-6 md:items-center">
          <legend className="sr-only">{it.text}</legend>
          <div className="text-gray-900">{it.text}</div>
          <Scale name={it.id} value={a[it.id]} onChange={(v) => set(it.id, v)} labels={labels} ai={ai} />
        </fieldset>
      ))}
    </div>
  )
}

function Ladder({ name, options, value, onChange }: { name: string; options: string[]; value?: number; onChange: (v: number) => void }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {options.map((o, i) => {
        const v = i + 1
        const on = value === v
        return (
          <label key={o} className={`rounded-xl border p-3 cursor-pointer text-sm ${on ? 'border-[#EE6A35] bg-[#FDEFE8]' : 'border-gray-200 hover:bg-gray-50'}`}>
            <input type="radio" className="sr-only" name={name} checked={on} onChange={() => onChange(v)} />
            <div className={`text-xs font-semibold uppercase tracking-widest ${on ? 'text-[#C2501F]' : 'text-gray-500'}`}>Level {v} · {LADDER_NAMES[i]}</div>
            <div className="text-gray-900 mt-1">{o}</div>
          </label>
        )
      })}
    </div>
  )
}

const missingIn = (ids: string[], a: Answers) => ids.filter((id) => typeof a[id] !== 'number').length

export default function ReadinessForm({ token, org, group, open: isOpen }: Props) {
  const [step, setStep] = useState(0)
  const [a, setA] = useState<Answers>({})
  const [txt, setTxt] = useState<OpenAnswers>({})
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [already, setAlready] = useState(false)
  const top = useRef<HTMLDivElement>(null)
  const trap = useRef<HTMLInputElement>(null)
  const key = `readiness:${token}`

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null')
      if (saved?.a) setA(saved.a)
      if (saved?.txt) setTxt(saved.txt)
      if (saved?.done) { setAlready(true) }
    } catch {}
  }, [key])
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify({ a, txt, done: done || already })) } catch {}
  }, [a, txt, done, already, key])

  const set = (id: string, v: number) => setA((p) => ({ ...p, [id]: v }))
  const stepIds: string[][] = [
    SKILLS.map((i) => i.id),
    [...AI_SKILLS.map((i) => i.id), 'ladderMe'],
    [...ORG.map((i) => i.id), 'ladderTeam'],
    DISCIPLINES.flatMap((d) => [`${d.id}p`, `${d.id}i`]),
    [...CHANGE.map((i) => i.id), ...RULES.map((i) => i.id)],
    [],
  ]
  const left = missingIn(stepIds[step], a)
  const totalLeft = missingIn(ALL_RATED, a)
  const pct = Math.round(((ALL_RATED.length - totalLeft) / ALL_RATED.length) * 100)
  const go = (n: number) => { setStep(n); setError(''); top.current?.scrollIntoView({ behavior: 'smooth' }) }

  async function submit() {
    if (totalLeft) { setError(`Please answer the ${totalLeft} question${totalLeft === 1 ? '' : 's'} you skipped. Use Back to find them.`); return }
    setSending(true); setError('')
    try {
      const r = await fetch('/api/readiness/submit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token, answers: a, open: txt, website: trap.current?.value || '' }) })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d.error || 'Something went wrong. Please try again.')
      setDone(true)
      top.current?.scrollIntoView({ behavior: 'smooth' })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally { setSending(false) }
  }

  if (done || (already && !isOpen)) return <div ref={top} className="scroll-mt-24"><Results a={a} org={org} /></div>
  if (!isOpen) return <div className="card"><h2 className="font-heading text-2xl font-bold text-navy-900">This assessment is closed</h2><p className="text-gray-600 mt-2">Thanks for your interest. If you think this is a mistake, ask the person who sent you the link.</p></div>

  return (
    <div ref={top} className="scroll-mt-24 grid gap-6">
      {already && (
        <div className="card border-l-4 border-gold-500">
          <p className="text-gray-800">It looks like you already finished this assessment on this device. <button className="underline font-semibold" onClick={() => setDone(true)}>See your results again</button>. Please don&rsquo;t submit twice: it would count you twice in the team&rsquo;s results.</p>
        </div>
      )}
      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-2"><span>Step {step + 1} of {STEPS.length}: <b className="text-navy-900">{STEPS[step]}</b></span><span>{pct}% answered</span></div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-navy-800 transition-all" style={{ width: `${pct}%` }} /></div>
      </div>

      <div className="card">
        {step === 0 && (<>
          <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">Your digital marketing skills</h2>
          <p className="text-gray-600">Rate your own skill on each one today. Be honest: no one at {org} sees your individual answers.</p>
          <Legend labels={SCALE_SKILL} />
          <Rows items={SKILLS} a={a} set={set} labels={SCALE_SKILL} />
        </>)}
        {step === 1 && (<>
          <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">Your AI skills</h2>
          <p className="text-gray-600">Six skills that separate people who get real value from AI from people who just make more content.</p>
          <Legend labels={SCALE_SKILL} />
          <Rows items={AI_SKILLS} a={a} set={set} labels={SCALE_SKILL} ai />
          <h3 className="font-bold text-navy-900 mt-6 mb-3">Which best describes how you use AI at work today?</h3>
          <Ladder name="ladderMe" options={LADDER_ME} value={a.ladderMe} onChange={(v) => set('ladderMe', v)} />
        </>)}
        {step === 2 && (<>
          <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">Your organization</h2>
          <p className="text-gray-600">How true is each statement for {org} today?</p>
          <Legend labels={SCALE_AGREE} />
          <Rows items={ORG} a={a} set={set} labels={SCALE_AGREE} />
          <h3 className="font-bold text-navy-900 mt-6 mb-3">Where is your team on AI today?</h3>
          <Ladder name="ladderTeam" options={LADDER_TEAM} value={a.ladderTeam} onChange={(v) => set('ladderTeam', v)} />
        </>)}
        {step === 3 && (<>
          <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">The ten core disciplines</h2>
          <p className="text-gray-600">For each one: how well does {org} do it today, and how important is it to your growth? If you don&rsquo;t know, give your best guess.</p>
          <p className="text-xs text-gray-500 mt-1"><b className="text-gray-700">How well we do it:</b> 1 {SCALE_DO[1]} to 5 {SCALE_DO[5]} · <b className="text-gray-700">How important:</b> 1 {SCALE_IMPORTANT[1]} to 5 {SCALE_IMPORTANT[5]}</p>
          <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-6 text-xs text-gray-500 mt-4 font-semibold"><span /><span className="w-60 text-center">How well we do it</span><span className="w-60 text-center">How important</span></div>
          <div className="divide-y divide-gray-100">
            {DISCIPLINES.map((d) => (
              <div key={d.id} className="py-3 grid md:grid-cols-[1fr_auto_auto] gap-2 md:gap-6 md:items-center">
                <div className="font-semibold text-gray-900">{d.text}</div>
                <div><div className="text-xs text-gray-500 md:hidden">How well we do it</div><Scale name={`${d.id}p`} value={a[`${d.id}p`]} onChange={(v) => set(`${d.id}p`, v)} labels={SCALE_DO} /></div>
                <div><div className="text-xs text-gray-500 md:hidden">How important</div><Scale name={`${d.id}i`} value={a[`${d.id}i`]} onChange={(v) => set(`${d.id}i`, v)} labels={SCALE_IMPORTANT} /></div>
              </div>
            ))}
          </div>
        </>)}
        {step === 4 && (<>
          <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">Change and AI ground rules</h2>
          <p className="text-gray-600">How much do you agree? These answers are the ones people are least likely to say out loud, which is why they&rsquo;re confidential.</p>
          <Legend labels={SCALE_AGREE} />
          <Rows items={CHANGE} a={a} set={set} labels={SCALE_AGREE} />
          <h3 className="font-bold text-navy-900 mt-6">AI ground rules</h3>
          <Rows items={RULES} a={a} set={set} labels={SCALE_AGREE} ai />
        </>)}
        {step === 5 && (<>
          <h2 className="font-heading text-2xl font-bold text-navy-900 mb-1">Your thoughts (optional)</h2>
          <p className="text-gray-600">These are summarized into themes. No one sees your words as you wrote them. Please leave out names.</p>
          <div className="grid gap-4 mt-4">
            {OPEN.map((q) => (
              <div key={q.id}>
                <label className="label" htmlFor={q.id}>{q.text}</label>
                <textarea id={q.id} className="input-field min-h-[90px]" maxLength={1200} value={txt[q.id] || ''} onChange={(e) => setTxt((p) => ({ ...p, [q.id]: e.target.value }))} />
              </div>
            ))}
          </div>
          <input ref={trap} type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        </>)}
      </div>

      {error && <p className="text-red-700 text-sm" role="alert">{error}</p>}
      <div className="flex flex-wrap items-center gap-4">
        {step > 0 && <button type="button" className="px-5 py-3 rounded-lg border border-gray-300 font-semibold text-navy-900 hover:bg-gray-50" onClick={() => go(step - 1)}>Back</button>}
        {step < STEPS.length - 1 ? (
          <button type="button" className="btn-gold text-lg" onClick={() => (left ? setError(`Please answer all ${left} remaining question${left === 1 ? '' : 's'} on this page.`) : go(step + 1))}>Next</button>
        ) : (
          <button type="button" className="btn-gold text-lg disabled:opacity-50" disabled={sending} onClick={submit}>{sending ? 'Saving…' : 'See my results'}</button>
        )}
        {left > 0 && step < STEPS.length - 1 && <span className="text-sm text-gray-500">{left} left on this page</span>}
      </div>
      <p className="text-xs text-gray-500">{group === 'leader' ? 'You’re using the leadership link. Leadership answers are reported as a group; if you’re the only leader, your answers show on their own.' : 'Confidential: no name, email or device details are saved with your answers.'} Your progress is saved on this device until you finish.</p>
    </div>
  )
}

// ---------- Personal results ----------
function Results({ a, org }: { a: Answers; org: string }) {
  const s = useMemo(() => scores(a), [a])
  const { strengths, gaps } = useMemo(() => strengthsGaps(a), [a])
  const [pdfBusy, setPdfBusy] = useState(false)
  const cards = [
    { label: 'Your marketing skills', v: s.skills, b: band(s.skills) },
    { label: 'Your AI skills', v: s.ai, b: band(s.ai), ai: true },
    { label: `${org}, as you see it`, v: s.org, b: band(s.org) },
  ]

  async function pdf() {
    setPdfBusy(true)
    try { await makePdf(a, org) } finally { setPdfBusy(false) }
  }

  return (
    <div className="grid gap-6">
      <div className="card">
        <span className="badge mb-3 inline-block">Thank you</span>
        <h2 className="font-heading text-2xl font-bold text-navy-900">Your answers are in. Here are your results.</h2>
        <p className="text-gray-600 mt-1">Scores are averages from 1 to 5, using the levels from Chapter 3 of <em>Business Transformation</em>. Download the PDF to keep them: nothing here is linked to your name.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-5">
          {cards.map((c) => (
            <div key={c.label} className={`rounded-2xl p-4 ${c.ai ? 'bg-[#FDEFE8]' : 'bg-navy-50'}`}>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">{c.label}</div>
              <div className={`text-4xl font-extrabold tabular-nums ${c.ai ? 'text-[#C2501F]' : 'text-navy-900'}`}>{r1(c.v)}</div>
              <div className="font-bold text-navy-900">{c.b.name}</div>
              <div className="text-sm text-gray-600">{c.b.meaning}</div>
            </div>
          ))}
        </div>
        {s.ladderMe && (
          <p className="mt-4 text-gray-800"><b className="text-[#C2501F]">AI fluency: Level {s.ladderMe}, {LADDER_NAMES[s.ladderMe - 1]}.</b> The goal is Level 4, AI built into how you work. Climb one rung at a time.</p>
        )}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-bold text-navy-900 mb-2">Your strengths</h3>
            <ul className="space-y-1 text-sm">{strengths.map((i) => <li key={i.id}><b>{i.v}</b> · {i.text}</li>)}</ul>
          </div>
          <div>
            <h3 className="font-bold text-navy-900 mb-2">Where to grow first</h3>
            <ul className="space-y-1 text-sm">{gaps.map((i) => <li key={i.id}><b>{i.v}</b> · {i.text} <span className="text-gray-500">({i.chapter})</span></li>)}</ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <button type="button" className="btn-gold text-lg disabled:opacity-50" disabled={pdfBusy} onClick={pdf}>{pdfBusy ? 'Making your PDF…' : 'Download my results (PDF)'}</button>
          <span className="text-sm text-gray-500">Bring it to the workshop.</span>
        </div>
      </div>
    </div>
  )
}

async function makePdf(a: Answers, org: string) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })
  const W = 612, M = 48
  const NAVY: [number, number, number] = [15, 29, 68]
  const ORANGE: [number, number, number] = [194, 80, 31]
  const GREY: [number, number, number] = [91, 100, 114]
  const s = scores(a)
  const { strengths, gaps } = strengthsGaps(a)
  let y = 0
  const need = (h: number) => { if (y + h > 740) { doc.addPage(); y = M } }
  const text = (t: string, x: number, size = 10, color = GREY, bold = false, width = W - 2 * M) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size); doc.setTextColor(...color)
    const lines = doc.splitTextToSize(t, width) as string[]
    need(lines.length * size * 1.3)
    doc.text(lines, x, y); y += lines.length * size * 1.3
  }

  doc.setFillColor(...NAVY); doc.rect(0, 0, W, 96, 'F')
  doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(20)
  doc.text('Team Readiness Assessment: your results', M, 46)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10)
  doc.text(`${org} · ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · Business Transformation workshop pre-work`, M, 70)
  y = 128

  const rows: [string, number | null, boolean][] = [['Your marketing skills', s.skills, false], ['Your AI skills', s.ai, true], [`${org}, as you see it`, s.org, false], ['Change readiness', s.change, false], ['AI ground rules', s.rules, true]]
  text('Your scores (average, 1 to 5)', M, 13, NAVY, true); y += 4
  rows.forEach(([label, v, ai]) => {
    need(20)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); doc.setTextColor(22, 24, 29); doc.text(label, M, y)
    doc.setFont('helvetica', 'bold'); doc.setTextColor(...(ai ? ORANGE : NAVY)); doc.text(r1(v), M + 250, y)
    doc.setFont('helvetica', 'normal'); doc.setTextColor(...GREY); doc.text(label.includes('Change') || label.includes('rules') ? '' : band(v).name, M + 290, y)
    y += 18
  })
  if (s.ladderMe) { y += 4; text(`AI fluency: Level ${s.ladderMe}, ${LADDER_NAMES[s.ladderMe - 1]}. The goal is Level 4: AI built into how you work.`, M, 10.5, ORANGE, true) }
  y += 8
  text('Levels: 1.0–1.7 Novice · 1.8–2.5 Beginner · 2.6–3.3 Intermediate · 3.4–4.1 Advanced · 4.2–5.0 Expert (Chapter 3)', M, 9)
  y += 12
  text('Your strengths', M, 13, NAVY, true)
  strengths.forEach((i) => text(`${i.v} · ${i.text}`, M + 8, 10))
  y += 8
  text('Where to grow first', M, 13, NAVY, true)
  gaps.forEach((i) => text(`${i.v} · ${i.text} (${i.chapter})`, M + 8, 10))
  y += 12

  const section = (title: string, items: Item[], ai = false) => {
    text(title, M, 12, ai ? ORANGE : NAVY, true); y += 2
    items.forEach((i) => {
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5)
      const lines = doc.splitTextToSize(i.text, W - 2 * M - 70) as string[]
      need(lines.length * 12.5 + 2)
      doc.setTextColor(22, 24, 29); doc.text(lines, M + 8, y)
      doc.setFont('helvetica', 'bold'); doc.setTextColor(...(ai ? ORANGE : NAVY)); doc.text(String(a[i.id] ?? '–'), W - M - 40, y)
      doc.setFont('helvetica', 'normal'); doc.setTextColor(...GREY); doc.setFontSize(8); doc.text(i.chapter, W - M - 28, y)
      y += lines.length * 12.5 + 2
    })
    y += 8
  }
  section('Your marketing skills', SKILLS)
  section('Your AI skills', AI_SKILLS, true)
  section(`${org}, as you see it`, ORG)
  text('The ten disciplines: how well we do it / how important', M, 12, NAVY, true); y += 2
  DISCIPLINES.forEach((d) => text(`${d.text}: ${a[`${d.id}p`]} / ${a[`${d.id}i`]}   (${d.chapter})`, M + 8, 9.5, [22, 24, 29]))
  y += 8
  section('Change readiness', CHANGE)
  section('AI ground rules', RULES, true)

  need(60)
  text('What to do with this', M, 12, NAVY, true)
  text('Pick one gap and practice it on real work this week. The chapter numbers point to the part of Business Transformation Through AI-Powered Marketing that covers it. Take the assessment again in 90 days: the change in your scores is the clearest sign of progress.', M, 9.5)
  y += 6
  text('Your individual answers are confidential. Your organization sees only combined results.', M, 8.5)
  doc.save('Team Readiness - My Results.pdf')
}
