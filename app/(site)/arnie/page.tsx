import type { Metadata } from 'next'
import ArnieResponseForm from '@/components/ArnieResponseForm'
import { ARNIE_DRAFTS } from '@/lib/arnieDrafts'

// Unlisted page for Arnie Kuenn. Not linked from the menu, footer or sitemap,
// and search engines are told not to index it.
export const metadata: Metadata = {
  title: 'For Arnie Kuenn',
  description: 'One quick ask for the second edition of Business Transformation.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

const downloads = [
  { href: '/review/business-transformation-2e-review-draft.pdf', label: 'The whole book (latest review draft)', note: 'All 25 chapters, about 410 pages and 15 MB.' },
  { href: '/review/field-guide-05-customer-journey-review-draft.pdf', label: 'Example: Field Guide 05, The Customer Journey', note: 'Where the book started. Each chapter also stands alone as a field guide, 23 pages.' },
  { href: '/review/field-guide-09-video-review-draft.pdf', label: 'Example: Field Guide 09, Video', note: 'Another stand-alone guide, 19 pages.' },
]

export default function ArniePage() {
  return (
    <>
      <section className="bg-navy-900 text-white section">
        <div className="container-site max-w-3xl">
          <span className="badge mb-4 inline-block">For Arnie Kuenn</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">One quick ask for the new book</h1>
          <p className="text-navy-200 text-xl leading-relaxed mb-4">
            Arnie, you wrote the foreword for <em>The Customer Journey</em> in 2019, and you gave the first edition of{' '}
            <em>Business Transformation</em> a fist bump in 2023. I&rsquo;m finishing the second edition, rebuilt around AI,
            and I&rsquo;d be honored to have you with us again.
          </p>
          <p className="text-navy-200 text-xl leading-relaxed mb-8">
            Whichever is easier for you: <strong className="text-white">a short foreword</strong> or{' '}
            <strong className="text-white">a fist bump</strong>. We drafted both, so you can edit instead of starting
            from scratch.
          </p>
          <a href="#answer" className="btn-gold text-lg">Answer in two minutes</a>
          <p className="text-navy-300 mt-8">
            And congratulations on{' '}
            <a href="https://www.dailyliving.ai/" target="_blank" rel="noopener noreferrer" className="underline text-white">
              AI for Daily Living
            </a>
            . It&rsquo;s been fun trading AI ideas with you. &mdash; Mike
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site max-w-3xl text-lg leading-relaxed text-gray-800">
          <h2 className="font-heading text-3xl font-bold text-navy-900 mb-4">What&rsquo;s new in the second edition</h2>
          <p className="mb-4">
            <em>Business Transformation Through AI-Powered Marketing</em> is a field guide for small businesses, small
            agencies and marketing teams who have tried AI but haven&rsquo;t built it into how they work. Readers read a
            section, fill in the forms, then use AI to turn their answers into a plan.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-12">
            <li><strong>25 chapters,</strong> from strategy and the customer journey to SEO and AI search, paid media, video, CRM and measurement.</li>
            <li><strong>AI in every chapter:</strong> ready-to-use prompts, and plain ground rules for using AI well.</li>
            <li><strong>Field guides:</strong> each chapter also stands alone as a short, color-coded guide.</li>
            <li><strong>An interactive PDF</strong> that readers can fill in and save.</li>
          </ul>

          <h2 className="font-heading text-3xl font-bold text-navy-900 mb-4">Your words, last time</h2>
          <figure className="rounded-2xl border-l-4 border-gold-500 bg-gold-400/10 p-5 mb-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold-600 mb-2">Your fist bump for the first edition (2023)</p>
            <blockquote className="italic">&ldquo;{ARNIE_DRAFTS.fistBump2023}&rdquo;</blockquote>
            <figcaption className="mt-3 text-base text-gray-600">&mdash; {ARNIE_DRAFTS.nameLine2023}</figcaption>
          </figure>
          <figure className="rounded-2xl border-l-4 border-navy-500 bg-navy-50 p-5 mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-navy-600 mb-2">From your foreword to The Customer Journey (2019)</p>
            <blockquote className="italic">&ldquo;{ARNIE_DRAFTS.foreword2019Excerpt}&rdquo;</blockquote>
            <figcaption className="mt-3 text-base text-gray-600">&mdash; Arnie Kuenn, Founder and CEO, Vertical Measures</figcaption>
          </figure>

          <h2 id="answer" className="font-heading text-3xl font-bold text-navy-900 mb-2">Answer right here</h2>
          <p className="text-gray-500 mb-6">Pick one, edit our draft, and press Send. Nothing goes in the book until you approve it, word for word.</p>
          <ArnieResponseForm />

          <h2 className="font-heading text-3xl font-bold text-navy-900 mt-16 mb-4">Take a look inside</h2>
          <ul className="space-y-4 mb-8">
            {downloads.map((d) => (
              <li key={d.href} className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-semibold text-navy-900">{d.label}</p>
                  <p className="text-gray-600 text-base">{d.note}</p>
                </div>
                <a href={d.href} download className="btn-primary shrink-0">Download</a>
              </li>
            ))}
          </ul>
          <p className="text-lg mt-8">Thanks, Arnie. &mdash; Mike</p>
        </div>
      </section>
    </>
  )
}
