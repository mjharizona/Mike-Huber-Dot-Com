import type { Metadata } from 'next'
import BookingEmbed from '@/components/BookingEmbed'

export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Pick a time for a free 20-minute call with Mike Huber.',
}

export default function BookPage() {
  return (
    <>
      <section className="inner-hero">
        <div className="wrap">
          <p className="eyebrow">Book a call</p>
          <h1>Pick a time that works for you.</h1>
          <p className="lead">A free 20-minute call. If you took the audit, bring your report and we’ll go through your top three gaps together.</p>
        </div>
      </section>
      <section className="section white">
        <div className="wrap tool-shell">
          <BookingEmbed />
        </div>
      </section>
    </>
  )
}
