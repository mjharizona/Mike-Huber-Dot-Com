import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach out to Mike Huber for speaking inquiries, corporate training requests, consulting, or general questions.',
}

const quickFacts = [
  { icon: '📍', label: 'Location', value: 'Available Nationally & Internationally' },
  { icon: '📧', label: 'Email',    value: 'mike@mikehuber.com', href: 'mailto:mike@mikehuber.com' },
  { icon: '⏱️', label: 'Response', value: 'Typically within 1–2 business days' },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site">
          <span className="badge mb-4 inline-block">Contact</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Let&rsquo;s Work Together
          </h1>
          <p className="text-navy-300 text-lg max-w-xl">
            Interested in having Mike speak at your conference, train your team, or consult on
            your digital marketing strategy? Fill out the form and Mike will be in touch.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-gray-50">
        <div className="container-site grid md:grid-cols-3 gap-12">
          {/* Info sidebar */}
          <aside className="md:col-span-1 flex flex-col gap-6">
            <div className="card">
              <h2 className="font-heading text-lg font-bold text-navy-900 mb-4">Contact Info</h2>
              <div className="flex flex-col gap-4">
                {quickFacts.map((f) => (
                  <div key={f.label} className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{f.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-0.5">
                        {f.label}
                      </p>
                      {f.href ? (
                        <a href={f.href} className="text-sm text-navy-700 hover:underline font-medium">
                          {f.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-700">{f.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-navy-50 border-navy-100">
              <h3 className="font-heading text-base font-bold text-navy-900 mb-3">
                Available for:
              </h3>
              <ul className="space-y-2 text-sm text-navy-800">
                {[
                  'Half-Day Workshops',
                  'Corporate Training Programs',
                  'MBA / Academic Guest Lectures',
                  'Digital Marketing Consulting',
                  'Podcast Guest Appearances',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="card">
              <h2 className="font-heading text-xl font-bold text-navy-900 mb-6">
                Send Mike a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
