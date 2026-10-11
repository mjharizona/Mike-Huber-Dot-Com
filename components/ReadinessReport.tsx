import {
  AI_SKILLS, CHANGE, LADDER_NAMES, MIN_RESPONSES, ORG, RULES, SKILLS, BANDS,
  band, highest, lowest, r1, readings,
} from '@/lib/readiness'
import type { Composite, Item, Scores } from '@/lib/readiness'
import type { Assessment } from '@/lib/readinessStore'
import PrintButton from './PrintButton'

const ORANGE = '#C2501F'

function Bar({ v, ai }: { v: number | null; ai?: boolean }) {
  const w = v === null ? 0 : ((v - 1) / 4) * 100
  return (
    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${Math.max(2, w)}%`, background: ai ? '#EE6A35' : '#16285a' }} />
    </div>
  )
}

function delta(now: number | null, then: number | null | undefined) {
  if (now === null || then === null || then === undefined) return null
  const d = now - then
  return <span className={d >= 0 ? 'text-green-700' : 'text-red-700'}>{d >= 0 ? '+' : ''}{d.toFixed(1)}</span>
}

function ItemList({ title, items, ai, note }: { title: string; items: (Item & { v: number })[]; ai?: boolean; note?: string }) {
  return (
    <div>
      <h3 className="font-bold text-navy-900 mb-2">{title}</h3>
      {note && <p className="text-xs text-gray-500 -mt-1 mb-2">{note}</p>}
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="grid grid-cols-[3rem_1fr] gap-3 items-start text-sm">
            <b className="tabular-nums" style={{ color: ai ? ORANGE : '#0f1d44' }}>{i.v.toFixed(1)}</b>
            <span className="text-gray-800">{i.text} <span className="text-gray-500">({i.chapter})</span></span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ReadinessReport({ a, c, before, beforeDate, admin }: { a: Assessment; c: Composite; before?: Scores | null; beforeDate?: string; admin?: boolean }) {
  const rows: { key: keyof Scores; label: string; ai?: boolean; bandable?: boolean }[] = [
    { key: 'skills', label: 'Marketing skills (people rate themselves)', bandable: true },
    { key: 'ai', label: 'AI skills (people rate themselves)', ai: true, bandable: true },
    { key: 'org', label: 'Organization readiness (everyone rates the company)', bandable: true },
    { key: 'change', label: 'Change readiness' },
    { key: 'rules', label: 'AI ground rules in practice', ai: true },
  ]
  const notes = readings(c)
  const showSplit = !!(c.leader && c.team)

  return (
    <div className="grid gap-6">
      <style>{`@media print { header.sticky, footer, .no-print { display: none !important } body { background: #fff } .card { box-shadow: none !important; break-inside: avoid } main { min-height: 0 } }`}</style>

      <div className="card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="badge mb-3 inline-block">Composite report · confidential</span>
            <h1 className="font-heading text-3xl font-bold text-navy-900">{a.org}: Team Readiness</h1>
            <p className="text-gray-600 mt-1">
              {c.n} response{c.n === 1 ? '' : 's'}{a.teamSize ? ` of about ${a.teamSize}` : ''} · {c.nLeader} leadership, {c.nTeam} team · {a.status === 'open' ? 'still open' : 'closed'}
              {a.workshopDate ? ` · workshop ${a.workshopDate}` : ''}
            </p>
          </div>
          {c.ready && <div className="no-print"><PrintButton /></div>}
        </div>
        {!c.ready && (
          <div className="mt-5 rounded-xl bg-navy-50 p-4">
            <p className="text-navy-900 font-semibold">{c.n} of {MIN_RESPONSES} responses needed so far.</p>
            <p className="text-gray-600 text-sm mt-1">To keep everyone&rsquo;s answers confidential, results appear once at least {MIN_RESPONSES} people have responded. Check back here: this page updates as people finish.</p>
          </div>
        )}
      </div>

      {c.ready && (<>
        {notes.length > 0 && (
          <div className="card">
            <h2 className="font-heading text-xl font-bold text-navy-900 mb-3">What stands out</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">{notes.map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
        )}

        <div className="card overflow-x-auto">
          <h2 className="font-heading text-xl font-bold text-navy-900 mb-1">Scores at a glance</h2>
          <p className="text-sm text-gray-500 mb-4">Averages from 1 to 5. Levels from Chapter 3: {BANDS.map(([, n], i) => `${['1.0–1.7', '1.8–2.5', '2.6–3.3', '3.4–4.1', '4.2–5.0'][i]} ${n}`).join(' · ')}.</p>
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-gray-500 border-b border-gray-100">
                <th className="py-2 pr-4">Area</th>
                <th className="py-2 pr-4">Everyone</th>
                {showSplit && <><th className="py-2 pr-4">Leadership</th><th className="py-2 pr-4">Team</th></>}
                <th className="py-2 pr-4">Range</th>
                {before && <th className="py-2 pr-4">Change{beforeDate ? ` since ${beforeDate}` : ''}</th>}
                <th className="py-2 w-40"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((r) => {
                const v = c.overall[r.key]
                const sp = c.spread[r.key as 'skills']
                return (
                  <tr key={r.key}>
                    <td className="py-3 pr-4 text-gray-900">{r.label}</td>
                    <td className="py-3 pr-4"><b className="tabular-nums" style={{ color: r.ai ? ORANGE : '#0f1d44' }}>{r1(v)}</b>{r.bandable && <span className="text-gray-500"> · {band(v).name}</span>}</td>
                    {showSplit && <><td className="py-3 pr-4 tabular-nums">{r1(c.leader![r.key])}</td><td className="py-3 pr-4 tabular-nums">{r1(c.team![r.key])}</td></>}
                    <td className="py-3 pr-4 tabular-nums text-gray-500">{sp ? `${sp.min.toFixed(1)}–${sp.max.toFixed(1)}` : '–'}</td>
                    {before && <td className="py-3 pr-4 tabular-nums">{delta(v, before[r.key])}</td>}
                    <td className="py-3"><Bar v={v} ai={r.ai} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {!showSplit && <p className="text-xs text-gray-500 mt-3">{c.nLeader === 0 ? 'No one has used the leadership link yet, so leadership and team can’t be compared.' : `Leadership and team are shown separately once at least ${MIN_RESPONSES} team members respond.`}</p>}
          <div className="grid sm:grid-cols-2 gap-4 mt-5 text-sm">
            <div><b className="text-navy-900">Marketing skills by level:</b> {BANDS.map(([, n], i) => `${n} ${c.bandCounts.skills[i]}`).join(' · ')}</div>
            <div><b className="text-navy-900">Organization by level:</b> {BANDS.map(([, n], i) => `${n} ${c.bandCounts.org[i]}`).join(' · ')}</div>
          </div>
        </div>

        <div className="card">
          <h2 className="font-heading text-xl font-bold mb-1" style={{ color: ORANGE }}>The AI fluency ladder</h2>
          <p className="text-sm text-gray-500 mb-4">How many people place themselves, and the team, on each level. The book&rsquo;s goal is Level 4.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {([['How people use AI themselves', c.ladderMeCounts], ['Where people think the team is', c.ladderTeamCounts]] as const).map(([t, counts]) => {
              const max = Math.max(1, ...counts)
              return (
                <div key={t}>
                  <h3 className="font-bold text-navy-900 mb-2">{t}</h3>
                  {counts.map((n, i) => (
                    <div key={i} className="grid grid-cols-[9rem_1fr_2rem] items-center gap-3 text-sm mb-1.5">
                      <span className="text-gray-700">Level {i + 1} · {LADDER_NAMES[i]}</span>
                      <div className="h-3 bg-gray-100 rounded"><div className="h-full rounded" style={{ width: `${(n / max) * 100}%`, background: '#EE6A35' }} /></div>
                      <b className="tabular-nums text-right">{n}</b>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        <div className="card overflow-x-auto">
          <h2 className="font-heading text-xl font-bold text-navy-900 mb-1">The ten disciplines, ranked by gap</h2>
          <p className="text-sm text-gray-500 mb-4">Gap = how important it is minus how well you do it today. The biggest gaps on important disciplines are where the workshop should spend its time.</p>
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-gray-500 border-b border-gray-100">
                <th className="py-2 pr-4">Discipline</th><th className="py-2 pr-4">How well</th><th className="py-2 pr-4">How important</th><th className="py-2 pr-4">Gap</th><th className="py-2">Chapter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {c.disciplines.map((d, i) => (
                <tr key={d.id} className={i < 3 && (d.gap ?? 0) > 0 ? 'bg-navy-50/60' : ''}>
                  <td className="py-2.5 pr-4 font-semibold text-gray-900">{d.name}</td>
                  <td className="py-2.5 pr-4 tabular-nums">{r1(d.perf)}</td>
                  <td className="py-2.5 pr-4 tabular-nums">{r1(d.imp)}</td>
                  <td className="py-2.5 pr-4 tabular-nums font-bold" style={{ color: (d.gap ?? 0) >= 1 ? '#b42318' : '#0f1d44' }}>{d.gap === null ? '–' : `${d.gap > 0 ? '+' : ''}${d.gap.toFixed(1)}`}</td>
                  <td className="py-2.5 text-gray-500">{d.chapter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card grid md:grid-cols-2 gap-8">
          <ItemList title="Team skill gaps: train here first" items={lowest(SKILLS, c.items, 5)} />
          <ItemList title="Team skill strengths" items={highest(SKILLS, c.items, 3)} />
          <ItemList title="AI skills to build" items={lowest(AI_SKILLS, c.items, 3)} ai />
          <ItemList title="Organization: weakest areas" items={lowest(ORG, c.items, 5)} />
        </div>

        {showSplit && (() => {
          const gaps = ORG.map((o) => ({ ...o, l: c.leaderItems[o.id], t: c.teamItems[o.id] }))
            .filter((o): o is Item & { l: number; t: number } => typeof o.l === 'number' && typeof o.t === 'number')
            .map((o) => ({ ...o, d: o.l - o.t }))
            .sort((x, y) => Math.abs(y.d) - Math.abs(x.d))
            .slice(0, 5)
          return (
            <div className="card">
              <h2 className="font-heading text-xl font-bold text-navy-900 mb-1">Where leadership and the team see it differently</h2>
              <p className="text-sm text-gray-500 mb-4">The five organization statements with the biggest difference. These make good opening conversations.</p>
              <ul className="space-y-2 text-sm">
                {gaps.map((g) => (
                  <li key={g.id} className="grid grid-cols-[1fr_auto] gap-4">
                    <span className="text-gray-800">{g.text}</span>
                    <span className="tabular-nums text-gray-600">Leadership <b className="text-navy-900">{g.l.toFixed(1)}</b> · Team <b className="text-navy-900">{g.t.toFixed(1)}</b></span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })()}

        <div className="card grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-navy-900 mb-2">Change readiness</h3>
            <ul className="space-y-2 text-sm">{CHANGE.map((i) => <li key={i.id} className="grid grid-cols-[1fr_3rem] gap-3"><span className="text-gray-800">{i.text}</span><b className="tabular-nums text-right text-navy-900">{r1(c.items[i.id])}</b></li>)}</ul>
            <p className="text-xs text-gray-500 mt-3">1 = strongly disagree, 5 = strongly agree. Anything under 3 needs a conversation (Chapter 22).</p>
          </div>
          <div>
            <h3 className="font-bold mb-2" style={{ color: ORANGE }}>AI ground rules in practice</h3>
            <ul className="space-y-2 text-sm">{RULES.map((i) => <li key={i.id} className="grid grid-cols-[1fr_3rem] gap-3"><span className="text-gray-800">{i.text}</span><b className="tabular-nums text-right" style={{ color: ORANGE }}>{r1(c.items[i.id])}</b></li>)}</ul>
          </div>
        </div>

        <div className="card">
          <h2 className="font-heading text-xl font-bold text-navy-900 mb-1">In their own words, summarized</h2>
          {a.themes ? (
            <>
              <p className="text-sm text-gray-500 mb-4">Themes from {a.themes.n} people&rsquo;s comments, paraphrased by AI and checked by us. No one is quoted.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {([['Worries', a.themes.worries], ['Hopes', a.themes.hopes], ['What would make the workshop worth it', a.themes.workshop]] as const).map(([t, list]) => (
                  <div key={t}>
                    <h3 className="font-bold text-navy-900 mb-2">{t}</h3>
                    {list.length ? (
                      <ul className="space-y-3 text-sm">{list.map((x) => <li key={x.theme}><b className="text-navy-900">{x.theme}</b> <span className="text-gray-500">({x.mentions})</span><br /><span className="text-gray-700">{x.detail}</span></li>)}</ul>
                    ) : <p className="text-sm text-gray-500">No comments.</p>}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">{admin ? 'Not summarized yet. Use “Summarize comments” above once most people have responded.' : 'The comment themes will appear here once Mike and Loren have reviewed them.'}</p>
          )}
        </div>
      </>)}

      <p className="text-xs text-gray-500">Confidential. Individual answers are never shown; the team breakdown appears only with at least {MIN_RESPONSES} team responses. Questions from Chapters 1 and 3 of <em>Business Transformation Through AI-Powered Marketing</em>, plus new questions on the ten disciplines, change readiness and AI ground rules.</p>
    </div>
  )
}
