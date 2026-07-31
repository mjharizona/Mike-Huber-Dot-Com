import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Mike',
  description:
    'Mike Huber is a seasoned digital marketing professional with over 25 years of experience in marketing and advertising.',
}

const specialties = [
  'Search Engine Optimization (SEO)',
  'Content Strategy & Creation',
  'Digital Marketing Training',
  'AI-Powered Marketing Strategy',
  'AI Workflow & Content Automation',
  'AI-Enhanced Website Design & Deployment',
  'Market Position Strategy',
  'Video Marketing',
  'Sales Strategy & Development',
  'Team Training & Development',
  'Conference Speaking',
  'Conflict Resolution Training',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site">
          <span className="badge mb-4 inline-block">About</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Mike Huber
          </h1>
          <p className="text-navy-300 text-lg max-w-2xl">
            Over 25 years of experience turning marketing confusion into confident, revenue-driving strategy.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="section bg-white">
        <div className="container-site grid md:grid-cols-3 gap-12 items-start">
          {/* Headshot */}
          <div className="md:col-span-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg bg-navy-100">
              <Image
                src="/images/Mike-Head-Shot-Self-Portrait.webp"
                alt="Mike Huber"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/contact" className="btn-primary justify-center">
                Book Mike
              </Link>
              <Link href="/speaking" className="btn-secondary justify-center">
                Speaking Topics
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2 prose prose-lg max-w-none">
            <p>
              Mike Huber is a seasoned marketing professional with over 25 years of experience in
              marketing and advertising and lead-author of the books{' '}
              <em>The Customer Journey: How an Owned Audience Can Transform Your Business</em>{' '}
              and <em>Business Transformation Through Digital Marketing</em>.
            </p>
            <p>
              He is frequently speaking at conferences about digital marketing — doing ½-day
              masterclasses and focused talks on digital strategy, content creation, video
              marketing, link building, SEO, website migration, and other digital marketing topics.
            </p>
            <p>
              Mike also spends time coaching and training internal marketing teams about the
              customer journey and how to align resources and budgets to transform business. Through
              his years of experience, he is able to train SMBs and enterprise-level teams.
            </p>
            <p>
              Mike creates, designs, and delivers training focused on all aspects of digital
              marketing. His customized training includes assessments, surveys, tools, and
              practical action items to reinforce learning.
            </p>
            <p>
              Many of his training classes have been accredited for continuing education units.
            </p>
            <div className="not-prose my-8 rounded-2xl border-l-4 border-gold-500 bg-navy-50 px-6 py-5">
              <p className="text-navy-900 text-lg font-medium leading-relaxed">
                Marketing has changed more in the past few years than in the previous twenty —
                almost entirely because of AI. Mike has been on the leading edge of that shift
                for over four years, using AI tools to accelerate content creation, sharpen SEO
                and market research, and rethink how marketing teams and even websites get built
                — well before most organizations had caught on.
              </p>
            </div>

            <h2>Career Highlights</h2>
            <ul>
              <li>Advertising Director — Yuma Daily Sun</li>
              <li>VP of Marketing & Sales — Alliance Reservations Network</li>
              <li>Client Services Director — Vertical Measures</li>
              <li>Guest Lecturer — MBA Marketing Classes (USD, Hult & others)</li>
              <li>Co-author — <em>The Customer Journey</em></li>
              <li>Speaker — Content Marketing World, Digital Summit, AMA Phoenix, and more</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="badge mb-3">Skills</span>
            <h2 className="font-heading text-3xl font-bold">Specialties</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {specialties.map((s) => (
              <span key={s} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-navy-800 shadow-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
