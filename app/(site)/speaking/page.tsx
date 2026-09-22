import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Mike Huber has spoken at conferences for over 15 years — from ½-day masterclasses to breakout sessions at Content Marketing World, Digital Summit, and more.',
}

const sessions = [
  'From Frustration to Success with Digital Marketing',
  'Google Rewards High Quality Content — But What Constitutes High Quality?',
  'The 5 Must-Haves for Your Website',
  'Common SEO Mistakes and How to Fix Them',
  'Discover 100s of Content Ideas for Your Website',
  'How to Build A Strong Backlink Profile',
  'How to Use Video to Market Your Organization',
]

const conferences = [
  'Digital Summit',
  'Content Marketing World',
  'HIGH5 Conference',
  'AMA Phoenix',
  'Western Veterinary Conference (WVC)',
  'American Veterinary Medical Association (AVMA)',
  'VMX Conference',
  'DMA West',
]

const orgs = [
  'United States Marine Corps',
  'John Deere',
  'APi Group',
  'Medtronic',
  'Inter-American Development Bank (IADB)',
  'Boehringer Ingelheim',
  'Arizona Public Service (APS)',
  'Water Use It Wisely',
  'Destination Hotels',
]

export default function SpeakingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site">
          <span className="badge mb-4 inline-block">Speaking</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Mike Has Spoken at Conferences for Over 15 Years
          </h1>
          <p className="text-navy-300 text-lg max-w-2xl mb-8">
            From ½-day master classes to breakout sessions — Mike delivers content-rich, highly
            interactive talks that audiences consistently rate among the best of the event.
          </p>
          <Link href="/contact" className="btn-gold">
            Invite Mike to Speak
          </Link>
        </div>
      </section>

      {/* Master Class */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-6 items-center mb-14">
            <div>
              <span className="badge mb-3 inline-block">Signature Workshop</span>
              <h2 className="font-heading text-3xl font-bold mb-4">
                Half-Day Master Class: The Customer Journey
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Four hours is a long time to hold an audience&rsquo;s attention. It requires great
                content, lots of interaction, and a great workbook. Mike has developed and
                continually improved a half-day digital marketing master class that is
                consistently rated one of the top presentations at conferences where it has been
                presented.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Attendees leave with a complete workbook, practical action items, and the clarity
                to move their digital marketing forward immediately.
              </p>
              <Link href="/contact" className="btn-primary">
                Inquire About This Workshop
              </Link>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <Image
                src="/images/DSPHX-Mike-1536x1152-1-1030x773.jpg"
                alt="Mike Huber presenting a hub-and-spoke content marketing strategy on stage at a conference"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="card bg-navy-50 border-navy-100">
            <h3 className="font-heading text-xl font-bold text-navy-900 mb-5">Session Topics</h3>
            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
              {sessions.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                  <span className="text-gray-700 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Conferences */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="badge mb-3">Venues</span>
            <h2 className="font-heading text-3xl font-bold">Conferences Where Mike Has Presented</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {conferences.map((c) => (
              <div key={c} className="card text-center py-5 hover:shadow-md transition-shadow">
                <p className="font-semibold text-navy-800 text-sm">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training orgs */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="badge mb-3">Corporate Training</span>
            <h2 className="font-heading text-3xl font-bold">Organizations Where Mike Has Delivered Customized Training</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {orgs.map((o) => (
              <div key={o} className="bg-gray-50 rounded-xl px-5 py-4 text-center">
                <p className="text-sm font-medium text-navy-800">{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-navy-900 text-white">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Interested in Having Mike Speak?
          </h2>
          <p className="text-navy-300 mb-8 max-w-lg mx-auto">
            Mike is available for breakout sessions, workshops, and corporate training
            engagements.
          </p>
          <Link href="/contact" className="btn-gold">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
