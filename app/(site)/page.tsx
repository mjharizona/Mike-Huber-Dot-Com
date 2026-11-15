import Image from 'next/image'
import Link from 'next/link'
import TestimonialCard from '@/components/TestimonialCard'
import { testimonials } from '@/data/testimonials'

const highlights = [
  {
    icon: '🎤',
    title: 'Conference Speaker',
    description:
      'From ½-day master classes to conference sessions at Content Marketing World, Digital Summit, and many more.',
    href: '/speaking',
  },
  {
    icon: '📚',
    title: 'Author & Co-Author',
    description:
      'Author of Business Transformation Through AI-Powered Marketing (2nd edition, with Loren Ankarlo) and co-author of The Customer Journey.',
    href: '/content-marketing',
  },
  {
    icon: '🏢',
    title: 'Enterprise Training',
    description:
      'Customized digital marketing training for John Deere, Medtronic, USMC, and other enterprise organizations.',
    href: '/training',
  },
  {
    icon: '📈',
    title: 'Sales & Strategy',
    description:
      'Over 25 years driving revenue through digital strategy, SEO, content, and team development.',
    href: '/work-with-me',
  },
]

const featured = testimonials.filter((t) => t.featured)

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(230,180,34,0.08)_0%,_transparent_60%)]" />

        <div className="relative container-site section text-center md:text-left">
          <div className="max-w-3xl">
            <span className="badge mb-4 inline-block">Digital Marketing Strategist</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Helping Organizations{' '}
              <span className="text-gold-400">Transform</span> Their Marketing
            </h1>
            <p className="text-lg md:text-xl text-navy-300 leading-relaxed mb-8 max-w-2xl">
              Speaker. Trainer. Author. Consultant. Mike Huber has over 25 years of experience
              turning marketing departments into revenue engines — through strategy, education,
              and real-world execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/contact" className="btn-gold text-base">
                Book Mike to Speak
              </Link>
              <Link href="/about" className="btn-secondary border-navy-400 text-navy-200 hover:bg-navy-800 hover:text-white text-base">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Mike Does ──────────────────────────────────── */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="badge mb-3">Expertise</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              What Mike Brings to the Table
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => (
              <Link key={h.href} href={h.href} className="card hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
                <div className="text-3xl mb-3">{h.icon}</div>
                <h3 className="font-heading text-lg font-bold text-navy-900 mb-2 group-hover:text-navy-700">
                  {h.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{h.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Website Packages teaser ─────────────────────────── */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex-1">
              <span className="badge mb-4 inline-block">Website Packages</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                Need an AI-Assisted Website?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Clear, scoped pricing — from a quick professional presence to a full digital
                transformation. No bloated retainers, no mystery pricing.
              </p>
            </div>
            <Link href="/website-packages" className="btn-primary shrink-0">
              See Website Packages
            </Link>
          </div>
        </div>
      </section>

      {/* ── Book CTA ─────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="bg-navy-900 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-white">
              <span className="badge mb-4 bg-gold-400/20 text-gold-400 inline-block">New Book · Second Edition</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-snug text-white">
                Business Transformation Through AI-Powered Marketing
              </h2>
              <p className="text-navy-300 leading-relaxed mb-6">
                The field guide for small businesses and marketing teams, written with Loren Ankarlo. Read it,
                fill in the worksheets, then use AI to turn your answers into a plan. The tools, templates and
                workbook are free at marketingfieldguide.ai. When you want help putting it to work, that&rsquo;s
                what I do.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="https://marketingfieldguide.ai/book?utm_source=mikehuber.com&utm_medium=referral&utm_campaign=q1-2027&utm_content=home-book" className="btn-gold">
                  About the Book
                </a>
                <a
                  href="https://marketingfieldguide.ai/resources?utm_source=mikehuber.com&utm_medium=referral&utm_campaign=q1-2027&utm_content=home-book"
                  className="btn-secondary border-navy-500 text-navy-300 hover:bg-navy-700 hover:text-white"
                >
                  Free Tools
                </a>
              </div>
            </div>
            <div className="w-48 md:w-56 shrink-0">
              <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[3/4] bg-navy-800">
                <Image
                  src="/images/book-cover-2e.png"
                  alt="Business Transformation Through AI-Powered Marketing, second edition, by Mike Huber with Loren Ankarlo"
                  fill
                  className="object-contain"
                  sizes="224px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── From the field guide (Nov 10, 2026) ──────────────── */}
      <section className="pb-8 md:pb-12 bg-white">
        <div className="container-site">
          <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <span className="badge mb-2 inline-block">From the field guide</span>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-navy-900">
                One practical idea a week, with a free tool to put it to work.
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                From <em>Business Transformation Through AI-Powered Marketing</em>, by Mike Huber with Loren Ankarlo.
              </p>
            </div>
            <a
              href="https://marketingfieldguide.ai/blog?utm_source=mikehuber.com&utm_medium=referral&utm_campaign=q1-2027&utm_content=home"
              className="btn-primary shrink-0 justify-center"
            >
              Read the field guide blog →
            </a>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="badge mb-3">Testimonials</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">What Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featured.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/testimonials" className="btn-secondary">
              Read All Testimonials →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="section bg-gold-500">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Let&rsquo;s talk about speaking, training, or strategy. Mike is available for conferences,
            workshops, and consulting engagements.
          </p>
          <Link href="/contact" className="btn-primary bg-navy-900 hover:bg-navy-950 text-white text-base">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
