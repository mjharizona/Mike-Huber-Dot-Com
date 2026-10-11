'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

async function call(body: Record<string, unknown>) {
  const r = await fetch('/api/admin/readiness', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
  const d = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(d.error || 'Something went wrong.')
  return d
}

export function CreateAssessment({ previous }: { previous: { id: string; label: string }[] }) {
  const router = useRouter()
  const [f, setF] = useState({ org: '', sponsorName: '', sponsorEmail: '', teamSize: '', workshopDate: '', note: '', compareTo: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }))
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError('')
    try {
      const d = await call({ action: 'create', ...f })
      router.push(`/admin/readiness/${d.id}`)
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed.') } finally { setBusy(false) }
  }
  return (
    <form onSubmit={submit} className="card grid gap-4">
      <h2 className="font-heading text-lg font-bold text-navy-900">New assessment</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="label">Organization</label><input className="input-field" value={f.org} onChange={set('org')} required /></div>
        <div><label className="label">Workshop date (optional)</label><input className="input-field" placeholder="e.g. March 3–5, 2027" value={f.workshopDate} onChange={set('workshopDate')} /></div>
        <div><label className="label">Sponsor name</label><input className="input-field" value={f.sponsorName} onChange={set('sponsorName')} required /></div>
        <div><label className="label">Sponsor email</label><input className="input-field" type="email" value={f.sponsorEmail} onChange={set('sponsorEmail')} required /></div>
        <div><label className="label">About how many people will take it?</label><input className="input-field" type="number" min={1} value={f.teamSize} onChange={set('teamSize')} /></div>
        <div>
          <label className="label">Compare with an earlier round (optional)</label>
          <select className="input-field" value={f.compareTo} onChange={set('compareTo')}>
            <option value="">No, this is the first round</option>
            {previous.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>
      </div>
      <div><label className="label">Private note (only you see this)</label><textarea className="input-field" value={f.note} onChange={set('note')} /></div>
      {error && <p className="text-red-700 text-sm">{error}</p>}
      <div><button className="btn-primary disabled:opacity-50" disabled={busy}>{busy ? 'Creating…' : 'Create assessment'}</button></div>
    </form>
  )
}

export function Actions({ id, org, status, ready, sentAt }: { id: string; org: string; status: 'open' | 'closed'; ready: boolean; sentAt: string | null }) {
  const router = useRouter()
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState('')
  async function act(action: string, extra: Record<string, unknown> = {}, done = '') {
    setBusy(action); setMsg('')
    try {
      const d = await call({ action, id, ...extra })
      if (action === 'delete') { router.push('/admin/readiness'); return }
      setMsg(d.queued ? 'Summarizing in the background. Refresh this page in a minute.' : done)
      router.refresh()
    } catch (e) { setMsg(e instanceof Error ? e.message : 'Failed.') } finally { setBusy('') }
  }
  const btn = 'px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-navy-900 hover:bg-gray-50 disabled:opacity-50'
  return (
    <div className="card grid gap-3">
      <h2 className="font-heading text-lg font-bold text-navy-900">Actions</h2>
      <div className="flex flex-wrap gap-2">
        <button className={btn} disabled={!!busy} onClick={() => act('send-links', {}, 'Links emailed to the sponsor, with you and Loren copied.')}>{sentAt ? 'Email links to sponsor again' : 'Email links to sponsor'}</button>
        <button className={btn} disabled={!!busy || !ready} onClick={() => act('themes', {}, 'Comments summarized. Review them in the report below before sending.')}>Summarize comments</button>
        <button className={btn} disabled={!!busy || !ready} onClick={() => act('send-report', {}, 'Report link emailed to the sponsor.')}>Email report to sponsor</button>
        <button className={btn} disabled={!!busy} onClick={() => act(status === 'open' ? 'close' : 'reopen', {}, status === 'open' ? 'Closed. No more responses will be accepted.' : 'Reopened.')}>{status === 'open' ? 'Close assessment' : 'Reopen assessment'}</button>
        <button className={`${btn} text-red-700`} disabled={!!busy} onClick={() => {
          const confirm = window.prompt(`This permanently deletes the assessment and every response. Type the organization name to confirm:\n\n${org}`)
          if (confirm) act('delete', { confirm })
        }}>Delete</button>
      </div>
      {busy && <p className="text-sm text-gray-500">Working…</p>}
      {msg && <p className="text-sm text-navy-800">{msg}</p>}
      {sentAt && <p className="text-xs text-gray-500">Links last emailed {new Date(sentAt).toLocaleString('en-US')}.</p>}
    </div>
  )
}

export function Copy({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button type="button" className="text-xs font-semibold text-navy-700 border border-navy-200 rounded px-2 py-1 hover:bg-navy-50" onClick={async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500) } catch {} }}>
      {ok ? 'Copied' : label}
    </button>
  )
}
