import Link from 'next/link'
import { format } from 'date-fns'
import { CreateAssessment } from '@/components/ReadinessAdmin'
import { countResponses, listAssessments } from '@/lib/readinessStore'

export const dynamic = 'force-dynamic'

export default async function ReadinessAdminPage() {
  let list: Awaited<ReturnType<typeof listAssessments>> = []
  let error = ''
  try { list = await listAssessments() } catch (e) { console.error(e); error = 'Couldn’t load assessments. Storage may not be set up yet.' }
  const counts = await Promise.all(list.map((a) => countResponses(a.id).catch(() => ({ total: 0, leader: 0, team: 0 }))))
  return (
    <div className="grid gap-8 max-w-5xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy-900">Team Readiness Assessments</h1>
        <p className="text-gray-600 mt-1">Workshop pre-work. Create one per organization, email the links to the sponsor, then review the composite before the workshop.</p>
      </div>
      {error && <p className="text-red-700">{error}</p>}
      <div className="card">
        {list.length === 0 ? <p className="text-gray-400 text-sm text-center py-6">No assessments yet.</p> : (
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs uppercase tracking-widest text-gray-500 border-b border-gray-100"><th className="py-2 pr-4">Organization</th><th className="py-2 pr-4">Sponsor</th><th className="py-2 pr-4">Responses</th><th className="py-2 pr-4">Status</th><th className="py-2">Created</th></tr></thead>
            <tbody className="divide-y divide-gray-50">
              {list.map((a, i) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="py-3 pr-4"><Link href={`/admin/readiness/${a.id}`} className="font-semibold text-navy-800 hover:underline">{a.org}</Link>{a.compareTo && <span className="text-xs text-gray-500"> · round 2</span>}</td>
                  <td className="py-3 pr-4 text-gray-600">{a.sponsorName}</td>
                  <td className="py-3 pr-4 tabular-nums">{counts[i].total}{a.teamSize ? ` / ${a.teamSize}` : ''} <span className="text-gray-400 text-xs">({counts[i].leader} lead, {counts[i].team} team)</span></td>
                  <td className="py-3 pr-4"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${a.status === 'open' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{a.status}</span></td>
                  <td className="py-3 text-gray-400 text-xs">{format(new Date(a.createdAt), 'MMM d, yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <CreateAssessment previous={list.map((a) => ({ id: a.id, label: `${a.org} (${format(new Date(a.createdAt), 'MMM yyyy')})` }))} />
    </div>
  )
}
