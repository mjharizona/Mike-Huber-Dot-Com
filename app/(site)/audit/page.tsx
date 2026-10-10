import type { Metadata } from 'next'
import AuditTool from '@/components/AuditTool'

export const metadata: Metadata = {
  title: 'Free Marketing and Website Audit',
  description: 'Score your marketing across the ten core disciplines and AI, get an automatic scan of your website, and see your top three fixes in about five minutes.',
}

const steps = [
  ['Scan', 'Enter your website. We check it automatically while you answer.'],
  ['Score', 'Answer eleven quick statements about your marketing and AI use.'],
  ['Fix', 'See your scores and top three fixes. Get the full report and a 90-day plan by email.'],
]

export default function AuditPage() {
  return (
    <>
      <section className="bg-navy-900 text-white section">
        <div className="container-site max-w-4xl">
          <span className="badge mb-4 inline-block">Free tool</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5">Where is your marketing leaking leads?</h1>
          <p className="text-navy-200 text-xl leading-relaxed max-w-3xl">
            A five-minute audit of your marketing and your website. You get a score for each of the ten core disciplines and AI,
            an automatic scan of your site, and your top three fixes, each tied to a chapter of <em>Business Transformation</em>.
          </p>
          <ol className="grid sm:grid-cols-3 gap-4 mt-8">
            {steps.map(([t, d], i) => (
              <li key={t} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-gold-400 text-sm font-semibold">Step {i + 1}</div>
                <div className="font-bold text-white text-lg">{t}</div>
                <div className="text-navy-200 text-sm mt-1">{d}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section bg-gray-50">
        <div className="container-site max-w-4xl">
          <AuditTool />
        </div>
      </section>
    </>
  )
}
