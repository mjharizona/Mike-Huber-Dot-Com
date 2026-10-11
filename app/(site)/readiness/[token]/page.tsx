import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReadinessForm from '@/components/ReadinessForm'
import ReadinessReport from '@/components/ReadinessReport'
import { composite } from '@/lib/readiness'
import { getAssessment, getResponses, resolveToken } from '@/lib/readinessStore'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Team Readiness Assessment',
  robots: { index: false, follow: false },
}

export default async function ReadinessPage({ params }: { params: { token: string } }) {
  const ref = await resolveToken(params.token)
  if (!ref) notFound()
  const a = ref.assessment

  if (ref.kind === 'report') {
    const c = composite(await getResponses(a.id))
    let before = null
    let beforeDate = ''
    if (a.compareTo) {
      const prev = await getAssessment(a.compareTo)
      if (prev) {
        const pc = composite(await getResponses(prev.id))
        if (pc.ready) { before = pc.overall; beforeDate = new Date(prev.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
      }
    }
    return (
      <section className="section bg-gray-50">
        <div className="container-site max-w-5xl">
          <ReadinessReport a={a} c={c} before={before} beforeDate={beforeDate} />
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="bg-navy-900 text-white section">
        <div className="container-site max-w-4xl">
          <span className="badge mb-4 inline-block">{a.org} · workshop pre-work</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5">Team Readiness Assessment</h1>
          <p className="text-navy-200 text-xl leading-relaxed max-w-3xl">
            About 15 minutes. You&rsquo;ll rate your own skills, your AI skills and {a.org} as a whole, then get your scores and a PDF to keep.
          </p>
          <ul className="grid sm:grid-cols-3 gap-4 mt-8 text-sm">
            <li className="rounded-2xl bg-white/5 border border-white/10 p-4"><b className="text-white block">Confidential</b><span className="text-navy-200">No name or email. {a.org} sees only combined results.</span></li>
            <li className="rounded-2xl bg-white/5 border border-white/10 p-4"><b className="text-white block">Honest beats high</b><span className="text-navy-200">There are no right answers. Low scores tell us where to help.</span></li>
            <li className="rounded-2xl bg-white/5 border border-white/10 p-4"><b className="text-white block">From the book</b><span className="text-navy-200">Questions from <em>Business Transformation</em>, Chapters 1 and 3, plus a few new ones.</span></li>
          </ul>
        </div>
      </section>
      <section className="section bg-gray-50">
        <div className="container-site max-w-4xl">
          <ReadinessForm token={params.token} org={a.org} group={ref.kind} open={a.status === 'open'} />
        </div>
      </section>
    </>
  )
}
