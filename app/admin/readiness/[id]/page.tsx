import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import ReadinessReport from '@/components/ReadinessReport'
import { Actions, Copy } from '@/components/ReadinessAdmin'
import { composite } from '@/lib/readiness'
import { getAssessment, getResponses } from '@/lib/readinessStore'
import { inviteText, links } from '@/lib/readinessEmail'

export const dynamic = 'force-dynamic'

export default async function ReadinessDetail({ params }: { params: { id: string } }) {
  const a = await getAssessment(params.id)
  if (!a) notFound()
  const c = composite(await getResponses(a.id))
  let before = null
  let beforeDate = ''
  if (a.compareTo) {
    const prev = await getAssessment(a.compareTo)
    if (prev) {
      const pc = composite(await getResponses(prev.id))
      if (pc.ready) { before = pc.overall; beforeDate = format(new Date(prev.createdAt), 'MMM yyyy') }
    }
  }
  const l = links(a)
  const linkRows: [string, string, string][] = [
    ['Leadership link', l.leader, 'For the sponsor and leadership team. Reported as a group.'],
    ['Team link', l.team, 'For everyone else. Forward with the note below.'],
    ['Sponsor report', l.report, 'The composite report. Private to the sponsor, you and Loren.'],
  ]
  return (
    <div className="grid gap-6 max-w-5xl">
      <div>
        <Link href="/admin/readiness" className="text-sm text-navy-600 hover:underline">← All assessments</Link>
        <h1 className="font-heading text-2xl font-bold text-navy-900 mt-2">{a.org}</h1>
        <p className="text-gray-600">Sponsor: {a.sponsorName} &lt;{a.sponsorEmail}&gt; · created {format(new Date(a.createdAt), 'MMM d, yyyy')}{a.workshopDate ? ` · workshop ${a.workshopDate}` : ''}</p>
        {a.note && <p className="text-sm text-gray-500 mt-1">Note: {a.note}</p>}
      </div>
      <div className="card grid gap-4">
        <h2 className="font-heading text-lg font-bold text-navy-900">Links</h2>
        {linkRows.map(([t, u, d]) => (
          <div key={t} className="grid gap-1">
            <div className="flex items-center gap-3"><b className="text-navy-900 text-sm">{t}</b><Copy text={u} /></div>
            <a href={u} target="_blank" className="text-sm text-navy-700 underline break-all">{u}</a>
            <p className="text-xs text-gray-500">{d}</p>
          </div>
        ))}
        <div className="grid gap-1">
          <div className="flex items-center gap-3"><b className="text-navy-900 text-sm">Note for the sponsor to forward</b><Copy text={inviteText(a)} /></div>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 rounded-lg p-3 text-gray-700 font-sans">{inviteText(a)}</pre>
        </div>
      </div>
      <Actions id={a.id} org={a.org} status={a.status} ready={c.ready} sentAt={a.sentAt} />
      <ReadinessReport a={a} c={c} before={before} beforeDate={beforeDate} admin />
    </div>
  )
}
