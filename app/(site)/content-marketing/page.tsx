import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { mfgUrl } from '@/lib/posts'

const inside = [
  'Strategy, skills and SWOT',
  'The customer journey',
  'SEO and AI search',
  'Local SEO and reviews',
  'Content, hub and spoke',
  'Video',
  'Paid media and promotion',
  'Social media and distribution',
  'Website and conversion',
  'AI and your CRM',
  'Lead nurture',
  'SMS and text messaging',
  'Retention, loyalty and referrals',
  'Measurement and analytics',
  'Ranked scoring and your transformation plan',
  'Leading people through change',
  'Privacy, consent and compliance',
  'Your AI marketing system',
]

export const metadata: Metadata = {
  title: 'Content & Book',
  description:
    'Books by Mike Huber: Business Transformation Through AI-Powered Marketing (second edition, with Loren Ankarlo) and The Customer Journey: How an Owned Audience Can Transform Your Business.',
}

export default function ContentMarketingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site">
          <span className="badge mb-4 inline-block">Books By Mike</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Books By Mike
          </h1>
          <p className="text-navy-200 text-lg max-w-2xl mb-6">
            Practical books for small businesses and marketing teams. Read them, use the worksheets, then put the ideas to
            work with the free tools.
          </p>
          <ul className="mt-2 space-y-2">
            <li className="text-navy-200 text-lg font-medium">
              1. <em>Business Transformation Through AI-Powered Marketing</em> (second edition, with Loren Ankarlo)
            </li>
            <li className="text-navy-200 text-lg font-medium">
              2. <em>The Customer Journey: How an Owned Audience Can Transform Your Business</em>
            </li>
          </ul>
        </div>
      </section>

      {/* Book 1: Business Transformation, second edition (Nov 15, 2026) */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="bg-navy-900 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 md:w-56 shrink-0">
              <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[3/4] bg-navy-800">
                <Image
                  src="/images/book-cover-2e.png"
                  alt="Business Transformation Through AI-Powered Marketing, second edition, by Mike Huber with Loren Ankarlo"
                  fill
                  className="object-contain"
                  sizes="224px"
                />
              </div>
            </div>
            <div className="flex-1 text-white">
              <span className="badge mb-4 bg-gold-400/20 text-gold-400 inline-block">New · Second Edition</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 leading-snug text-white">
                Business Transformation Through AI-Powered Marketing
              </h2>
              <p className="text-navy-400 text-sm italic mb-6">
                The Field Guide for Small Businesses and Marketing Teams · by Mike Huber with Loren Ankarlo
              </p>
              <p className="text-navy-300 leading-relaxed mb-4">
                The second edition of <em>Business Transformation Through Digital Marketing</em>, rebuilt for the AI era. Ten
                core disciplines, six stages and one plan your team can run.
              </p>
              <p className="text-navy-300 leading-relaxed mb-4">
                AI shows up in every chapter: CRAFT prompts you can use right away, the AI fluency ladder, an AI usage policy
                template and a chapter on building your own AI marketing system. Loren Ankarlo brings the people side: how to
                lead a team through change so the plan actually sticks.
              </p>
              <p className="text-navy-300 leading-relaxed mb-6">
                Available in paperback, for writing in the forms by hand, and as an interactive PDF where totals and scores
                calculate for you.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href={mfgUrl('/book', 'books-page')} className="btn-gold">
                  About the Book
                </a>
                <a
                  href={mfgUrl('/resources', 'books-page')}
                  className="btn-secondary border-navy-500 text-navy-300 hover:bg-navy-700 hover:text-white"
                >
                  Free Tools &amp; Workbook
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
            <div>
              <h3 className="font-heading text-2xl font-bold text-navy-900 mb-4">What&rsquo;s inside</h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
                {inside.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold-600 font-bold">›</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-heading text-xl font-bold text-navy-900 mb-2">Own the 2023 edition?</h3>
                <p className="text-gray-600">
                  Search, content, advertising, AI and measurement all moved since the first edition. Strategy still comes
                  first. The new edition updates every chapter and adds AI throughout.
                </p>
              </div>
              <div className="card">
                <h3 className="font-heading text-xl font-bold text-navy-900 mb-2">Want help putting it to work?</h3>
                <p className="text-gray-600 mb-4">
                  I run workshops and training built on the book, and Loren and I lead team readiness sessions for
                  organizations taking on AI.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="/training" className="font-semibold text-navy-800 underline">
                    Training
                  </Link>
                  <Link href="/work-with-me" className="font-semibold text-navy-800 underline">
                    Work with me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book 2 — The Customer Journey */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="bg-navy-900 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 md:w-56 shrink-0">
              <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[3/4] bg-navy-800">
                <Image
                  src="/images/book-cover.jpg"
                  alt="The Customer Journey by Mike Huber"
                  fill
                  className="object-contain"
                  sizes="224px"
                />
              </div>
            </div>
            <div className="flex-1 text-white">
              <span className="badge mb-4 bg-gold-400/20 text-gold-400 inline-block">Lead Author</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 leading-snug text-white">
                The Customer Journey
              </h2>
              <p className="text-navy-400 text-sm italic mb-6">
                How an Owned Audience Can Transform Your Business
              </p>
              <p className="text-navy-300 leading-relaxed mb-6">
                What started as a conversation at the end of a meeting turned into a definitive book
                on digital marketing transformation. The book follows Sophia as she researches a
                college to finish her degree — letting readers understand the mindset of a potential
                customer as they make decisions based on search, content, and promotion.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="/images/FINAL-The-Customer-Journey_website_Book-copy.pdf"
                  download
                  className="btn-gold"
                >
                  Download Free PDF
                </a>
                <Link href="/contact" className="btn-secondary border-navy-500 text-navy-300 hover:bg-navy-700 hover:text-white">
                  Book Mike to Speak About It
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="section bg-navy-900 text-white">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            More on the Blog
          </h2>
          <p className="text-navy-300 mb-8 max-w-lg mx-auto">
            One practical question a week, answered from the field: AI, leads, websites and
            leading a team through change.
          </p>
          <Link href="/blog" className="btn-gold">
            Visit the Blog →
          </Link>
        </div>
      </section>
    </>
  )
}
