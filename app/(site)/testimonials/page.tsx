import type { Metadata } from 'next'
import Link from 'next/link'
import TestimonialCard from '@/components/TestimonialCard'
import { testimonials } from '@/data/testimonials'

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'See what clients, colleagues, and organizations say about working with Mike Huber.',
}

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site text-center">
          <span className="badge mb-4 inline-block">Social Proof</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            What Clients &amp; Colleagues Say
          </h1>
          <p className="text-navy-300 text-lg max-w-xl mx-auto">
            Mike has worked with hundreds of individuals and organizations. Here&rsquo;s what some of
            them have to say.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-navy-900 text-white">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to Add Your Own Story?
          </h2>
          <p className="text-navy-300 mb-8 max-w-lg mx-auto">
            Let&rsquo;s work together on speaking, training, or consulting.
          </p>
          <Link href="/contact" className="btn-gold">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
