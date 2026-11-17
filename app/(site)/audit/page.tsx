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
      <section className="inner-hero">
        <div className="wrap">
          <p className="eyebrow">Free tool</p>
          <h1>Where is your marketing leaking leads?</h1>
          <p className="lead">
            A five-minute audit of your marketing and your website. You get a score for each of the ten core disciplines and AI, an automatic scan of your site, and your top three fixes, each tied to a chapter of <em>Business Transformation</em>.
          </p>
          <div className="service-grid" style={{ marginTop: 40 }}>
            {steps.map(([t, d], i) => (
              <div className="service" key={t}>
                <span className="number">STEP {i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="wrap tool-shell">
          <AuditTool />
        </div>
      </section>
    </>
  )
}
