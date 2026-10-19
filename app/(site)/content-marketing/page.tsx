import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Content & Book',
  description:
    'Books by Mike Huber: The Customer Journey — How an Owned Audience Can Transform Your Business, and Business Transformation Through Digital Marketing.',
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
          <ul className="mt-2 space-y-2">
            <li className="text-navy-200 text-lg font-medium">
              1. <em>The Customer Journey: How an Owned Audience Can Transform Your Business</em>
            </li>
            <li className="text-navy-200 text-lg font-medium">
              2. <em>Business Transformation Through Digital Marketing</em>
            </li>
          </ul>
        </div>
      </section>

      {/* Book 1 — The Customer Journey */}
      <section className="section bg-white">
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

      {/* Book 2 — Business Transformation */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="bg-navy-900 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 md:w-56 shrink-0">
              <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[3/4] bg-navy-800">
                <Image
                  src="/images/book-cover-2.jpg"
                  alt="Business Transformation Through Digital Marketing by Mike Huber"
                  fill
                  className="object-contain"
                  sizes="224px"
                />
              </div>
            </div>
            <div className="flex-1 text-white">
              <span className="badge mb-4 bg-gold-400/20 text-gold-400 inline-block">Lead Author</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 leading-snug text-white">
                Business Transformation Through Digital Marketing
              </h2>
              <p className="text-navy-400 text-sm italic mb-6">
                by Mike Huber with Loren Ankarlo
              </p>
              <p className="text-navy-300 leading-relaxed mb-4">
                In the digital marketing space, every organization finds itself at a unique point
                on a continuum. Some marketers are beginners, taking their first steps, while
                others have already gained valuable experience and seek to elevate their efforts
                to the next level.
              </p>
              <p className="text-navy-300 leading-relaxed mb-4">
                Wherever you stand on your continuum, this book is designed to meet you where you
                are. It offers a wealth of information and insights that you can tailor to your
                specific needs, goals and aspirations. Whether you choose to dive in and implement
                everything or selectively focus on certain areas, the choice is yours.
              </p>
              <p className="text-navy-300 leading-relaxed mb-4">
                One thing is certain: embarking on a digital marketing transformation requires
                making crucial real-time decisions. Restructuring, talent acquisition, process
                management, accountability, training, budgeting, and more will be on your agenda.
                Along the way, you will encounter conflicts, face setbacks, and experience fits
                and starts.
              </p>
              <p className="text-navy-300 leading-relaxed mb-4">
                However, rest assured that the journey will be well worth the effort as you
                transform your marketing department and your organization.
              </p>
              <p className="text-navy-300 leading-relaxed mb-6">
                Within the pages of this book, you will find guidance, strategies, tactics, and
                real-world examples to help you navigate the challenges and seize the marketing
                opportunities that lie ahead. It&rsquo;s time to embrace the transformative power
                of digital marketing and embark on a journey that promises tremendous rewards.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://www.amazon.com/Business-Transformation-Through-Digital-Marketing-ebook/dp/B0CL1F7D5V/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Buy on Amazon →
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
            Mike publishes practical digital marketing insights on this site as well. Check out
            the latest posts.
          </p>
          <Link href="/blog" className="btn-gold">
            Visit the Blog →
          </Link>
        </div>
      </section>
    </>
  )
}
