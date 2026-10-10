import type { Metadata } from 'next'
import BookingEmbed from '@/components/BookingEmbed'

export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Pick a time for a free 20-minute call with Mike Huber.',
}

export default function BookPage() {
  return (
    <>
      <section className="bg-navy-900 text-white section">
        <div className="container-site max-w-4xl">
          <span className="badge mb-4 inline-block">Book a call</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Pick a time that works for you</h1>
          <p className="text-navy-200 text-xl leading-relaxed max-w-3xl">
            A free 20-minute call. If you took the audit, bring your report and we&rsquo;ll go through your top three gaps together.
          </p>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-site max-w-4xl">
          <BookingEmbed />
        </div>
      </section>
    </>
  )
}
