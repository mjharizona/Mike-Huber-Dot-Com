export const metadata = {
  title: 'Customized Training for Enterprise Organizations',
  description:
    'Customized AI-powered and digital marketing training for small teams and enterprise organizations, built on the book Business Transformation Through AI-Powered Marketing.',
  alternates: { canonical: '/training' },
}

const features = [
  ['Needs analysis first', 'Every engagement starts with a needs analysis and skills assessment. For AI workshops, your team also takes a private Team Readiness Assessment, so the session starts where your people actually are.'],
  ['Skills assessments', 'Results are built directly into the training curriculum, so skill gaps are targeted and addressed for maximum impact.'],
  ['Enterprise focus', 'Training designed for large, complex organizations that need coordinated digital marketing transformation across teams and departments.'],
  ['CEU accredited', 'Many of Mike’s training classes have been accredited for continuing education units, adding professional development value.'],
  ['Workbooks and tools', 'Participants leave with customized workbooks, practical tools and specific action items to reinforce learning immediately.'],
  ['Interactive and adaptive', 'Sessions are entirely interactive, with real-world scenarios, live Q&A and content adapted to your industry’s specific challenges.'],
]

const topics = [
  'AI-Powered Marketing for Small Teams',
  'The AI Fluency Ladder: Getting Your Team Using AI',
  'AI Usage Policy & Guardrails',
  'Leading People Through Change (with Loren Ankarlo)',
  'Lead Response, Scoring & Nurture',
  'SEO & AI Search',
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

export default function Page() {
  return (
    <>
      <section className="inner-hero">
        <div className="wrap">
          <p className="eyebrow">Training</p>
          <h1>
            Customized training
            <br />
            for organizations.
          </h1>
          <p className="lead">
            Mike has created and delivered customized digital marketing workshops for some of the world’s most respected organizations, starting with a needs analysis and building from there.
          </p>
          <div className="actions">
            <a className="button bronze" href="/contact/?interest=workshop">
              Request a training proposal<span className="arrow" aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="/workshops">
              See the team workshops<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">The process</p>
              <h2>Training built around your team.</h2>
            </div>
            <p>No two organizations are the same. The process starts by understanding exactly where your team is and where it needs to go.</p>
          </div>
          <div className="service-grid">
            {features.map(([title, text], i) => (
              <div className="service" key={title}>
                <span className="number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Academia</p>
            <h2>MBA marketing class guest lecturer.</h2>
          </div>
          <div>
            <p className="lead">
              Mike has been a guest lecturer for MBA marketing classes on multiple occasions, including at UC San Diego and Hult International Business School.
            </p>
            <p>
              He adapts his half-day workshop to fit class schedules while keeping the sessions entirely interactive. The lectures give MBA students real-world digital marketing scenarios that bridge theory and practice.
            </p>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <p className="eyebrow">Topics</p>
          <h2>Training topics available.</h2>
          <ul className="chips">
            {topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <p className="eyebrow light">Clients</p>
          <h2>Organizations Mike has trained.</h2>
          <ul className="chips">
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <div>
            <h2>Ready to elevate your team?</h2>
            <p>Available for in-person workshops, virtual sessions and multi-day intensives.</p>
          </div>
          <a className="button bronze" href="/contact/?interest=workshop">
            Get a training proposal<span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  )
}
