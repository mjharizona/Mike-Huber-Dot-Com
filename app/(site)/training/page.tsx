import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Training',
  description:
    'Customized digital marketing training for enterprise organizations including John Deere, Medtronic, and the USMC.',
}

const trainingFeatures = [
  {
    title: 'Needs Analysis First',
    description:
      'Every engagement starts with a needs analysis and skills assessment to measure digital marketing maturity for each team member and the overall department.',
  },
  {
    title: 'Skills Assessments',
    description:
      'Results are baked directly into the training curriculum, ensuring skill gaps are targeted and addressed for maximum impact.',
  },
  {
    title: 'Enterprise Focus',
    description:
      'Training designed for large, complex organizations that need coordinated digital marketing transformation across teams and departments.',
  },
  {
    title: 'CEU Accredited',
    description:
      'Many of Mike\'s training classes have been accredited for continuing education units, adding professional development value.',
  },
  {
    title: 'Workbooks & Tools',
    description:
      'Participants leave with customized workbooks, practical tools, and specific action items to reinforce learning immediately.',
  },
  {
    title: 'Interactive & Adaptive',
    description:
      'Sessions are entirely interactive — including real-world scenarios, live Q&A, and content adapted to your industry\'s specific challenges.',
  },
]

const topics = [
  'Digital Marketing Strategy & Transformation',
  'Content Marketing & the Customer Journey',
  'Search Engine Optimization (SEO)',
  'Video Marketing',
  'Link Building',
  'Website Migration & Redesign',
  'Market Position Strategy',
  'Pricing & Process Management',
  'Team Deployment & Development',
  'Sales Strategy & Development',
  'Account-Based Marketing',
]

const clients = [
  'United States Marine Corps',
  'John Deere',
  'APi Group',
  'Medtronic',
  'Inter-American Development Bank',
  'Boehringer Ingelheim',
  'Arizona Public Service',
  'Water Use It Wisely',
  'Destination Hotels',
]

export default function TrainingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site">
          <span className="badge mb-4 inline-block">Training</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Customized Training for Enterprise Organizations
          </h1>
          <p className="text-navy-300 text-lg max-w-2xl mb-8">
            Mike has created and delivered customized digital marketing workshops for some of the
            world&rsquo;s most respected organizations — starting with a needs analysis and building
            from there.
          </p>
          <Link href="/contact" className="btn-gold">
            Request a Training Proposal
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="badge mb-3">The Process</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Training Built Around Your Team
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              No two organizations are the same. Mike&rsquo;s training process starts by understanding
              exactly where your team is and where it needs to go.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingFeatures.map((f) => (
              <div key={f.title} className="card hover:shadow-md transition-shadow">
                <h3 className="font-heading text-lg font-bold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MBA Guest Lecturer */}
      <section className="section bg-navy-50">
        <div className="container-site grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge mb-3 inline-block">Academia</span>
            <h2 className="font-heading text-3xl font-bold mb-4">MBA Marketing Class Guest Lecturer</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mike has had the opportunity to be a guest lecturer for MBA marketing classes on
              multiple occasions, including at USD, Hult International Business School. He
              customizes his ½-day workshop into a shorter timeframe to accommodate class
              schedules while keeping the sessions entirely interactive.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These lectures provide valuable real-world digital marketing scenarios for MBA
              students bridging the gap between theory and practice.
            </p>
          </div>
          <div className="card bg-white text-center py-10">
            <div className="text-6xl mb-4">🎓</div>
            <p className="font-heading text-lg font-bold text-navy-900">USD, Hult International Business School</p>
            <p className="text-sm text-gray-500 mt-2">and other institutions</p>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="badge mb-3">Topics</span>
            <h2 className="font-heading text-3xl font-bold">Training Topics Available</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {topics.map((t) => (
              <span key={t} className="bg-navy-50 border border-navy-100 px-4 py-2 rounded-full text-sm font-medium text-navy-800">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-10">
            <span className="badge mb-3">Clients</span>
            <h2 className="font-heading text-3xl font-bold">
              Organizations Mike Has Trained
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {clients.map((c) => (
              <div key={c} className="card text-center py-5 hover:shadow-md transition-shadow">
                <p className="font-semibold text-navy-800 text-sm">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-navy-900 text-white">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to Elevate Your Team?
          </h2>
          <p className="text-navy-300 mb-8 max-w-lg mx-auto">
            Contact Mike to discuss a customized training program for your organization. Available
            for in-person workshops, virtual sessions, and multi-day intensives.
          </p>
          <Link href="/contact" className="btn-gold">
            Get a Training Proposal
          </Link>
        </div>
      </section>
    </>
  )
}
