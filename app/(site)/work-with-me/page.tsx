import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Fractional marketing strategy, SEO, and content consulting from Mike Huber — for organizations that want a partner, not just a vendor.',
}

const challenges = [
  'You want to grow revenue, not just traffic',
  "You need help improving search engine rankings",
  "You don't have the time or internal resources to focus on marketing",
  'You need a holistic marketing strategy instead of one-off tactics',
  'You need to update a legacy website',
  'You need more qualified leads, not just more visitors',
  'You need a system and process to manage leads and customers',
  'You need to improve your brand, online reputation, and social presence',
  'You need help with email marketing, lead nurture, and automation',
  'You need content created in multiple formats, including video',
]

const services = [
  {
    title: 'Digital Marketing Strategy',
    description:
      'Strategy always comes first. What are you trying to achieve? What are your revenue goals?',
  },
  {
    title: 'Search Engine Optimization',
    description:
      'A strong technical and content foundation so your pages rank in search and customers can find you.',
  },
  {
    title: 'Persona Creation',
    description:
      'Clearly defined customer personas to make sure you create the right content in the right format.',
  },
  {
    title: 'Local Search',
    description:
      'Get found when your potential customers are actively looking for your products or services nearby.',
  },
  {
    title: 'Content Creation',
    description:
      'The right content, at the right time, in the right format — moving visitors through the customer journey.',
  },
  {
    title: 'Digital Marketing Training',
    description:
      'Customized training to close your team’s skills gaps, focused on your organization’s needs.',
  },
  {
    title: 'Video Marketing',
    description:
      'Video content is the easiest format for prospects to consume — I can help you plan and produce it.',
  },
  {
    title: 'Marketing Consultation',
    description:
      'Need a seasoned marketing professional to validate your current strategy and tactics? That’s me.',
  },
  {
    title: 'Content Amplification',
    description:
      'Get your content found by repurposing it across social channels through posts and advertising.',
  },
]

const aiIntegrationTags = ['AI-Built Websites', 'AI Content & SEO Workflows', 'AI Process Automation']

const aiUseCases = [
  'Content ideation and first drafts, done in minutes instead of hours',
  'SEO and keyword research at scale',
  'Competitive and market research',
  'Workflow, reporting, and internal process automation',
  'Repurposing content across formats and channels',
]

const approach = [
  {
    title: 'Strategy Comes First',
    description:
      'Real revenue growth starts with understanding your customers’ problems, motivations, and where they are in their buying journey — not with random tactics.',
  },
  {
    title: 'Content That Attracts Qualified Leads',
    description:
      'The right content, published consistently, answers your prospects’ questions and earns their trust before they ever talk to sales.',
  },
  {
    title: 'Nurture, Score & Communicate',
    description:
      'Nurtured leads fill your pipeline with prospects who are already informed and ready to buy — the easiest deals to close next to referrals.',
  },
  {
    title: 'Connect Content to the Customer Journey',
    description:
      'Every page and post needs a clear next step. Content that isn’t tied to the next stage of the journey doesn’t convert.',
  },
  {
    title: 'Improve the Brand Experience',
    description:
      'Great brands don’t set-and-forget their website. They launch a solid foundation, then iterate continuously based on real data.',
  },
  {
    title: 'Develop Your Marketing Team',
    description:
      'Strategy only goes so far — building internal skills and closing talent gaps is what sustains growth long-term.',
  },
]

const goodFit = [
  'Invest for the long term in content marketing, SEO, and promotion',
  'Educate your customers and answer their questions',
  'Commit to an adequate budget to fund an ongoing partnership',
  'Work with someone who can create strategy and content in multiple formats',
  'Promote your brand and content once it’s created',
  'Build systems and processes to improve efficiency',
  'Shorten your sales cycle and grow qualified leads and revenue',
]

const notGoodFit = [
  'Get immediate, overnight results',
  'Choose a partner based on price rather than quality of work',
  'Grow your digital marketing with an inadequate budget',
  'Move forward without top management on board',
  'Engage without dedicating internal resources to work alongside me',
  'Sit on approved content instead of publishing it',
]

export default function WorkWithMePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site">
          <span className="badge mb-4 inline-block">Consulting</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Work With Me
          </h1>
          <p className="text-navy-300 text-lg max-w-2xl mb-8">
            I take on a limited number of sole-proprietor consulting engagements — bringing 25+
            years of digital marketing strategy, SEO, and content experience directly to your
            team, without the overhead of a traditional agency.
          </p>
          <Link href="/contact" className="btn-gold">
            Schedule a Consultation
          </Link>
        </div>
      </section>

      {/* Challenges */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="badge mb-3">Sound Familiar?</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Challenges I Help Solve
            </h2>
          </div>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 max-w-4xl mx-auto">
            {challenges.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="badge mb-3">Services</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">How I Can Help</h2>
          </div>
          {/* AI Integration — full-width feature card */}
          <div className="card bg-navy-900 border-navy-900 mb-6">
            <span className="badge mb-3 bg-gold-400/20 text-gold-400 inline-block">
              Core Strength
            </span>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
              AI Integration &amp; Implementation
            </h3>
            <p className="text-navy-300 leading-relaxed mb-5 max-w-3xl">
              I don&rsquo;t just talk about AI — I build with it. From AI-assisted website design
              and development to embedding AI directly into your content, SEO, and internal
              marketing workflows, I help you move faster and work smarter without sacrificing
              quality or your brand&rsquo;s voice. It&rsquo;s a practical, revenue-driving skill
              set I&rsquo;ve been sharpening for years — not hype.
            </p>
            <div className="flex flex-wrap gap-2">
              {aiIntegrationTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-white/10 text-gold-300 px-3 py-1 rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="card hover:shadow-md transition-shadow">
                <h3 className="font-heading text-lg font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI */}
      <section className="section bg-white">
        <div className="container-site grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="badge mb-3 inline-block">AI &amp; Marketing</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              AI Has Already Changed Digital Marketing
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Generative AI has compressed research, drafting, and analysis from hours into
              minutes — and the organizations pulling ahead are the ones using it deliberately,
              not the ones ignoring it or using it carelessly.
            </p>
            <p className="text-gray-700 leading-relaxed">
              I help clients use AI to save time and effort across content creation, SEO
              research, competitive analysis, and internal processes — while keeping a human
              editor&rsquo;s judgment on strategy, brand voice, and what actually resonates with
              your customers. Done right, AI doesn&rsquo;t replace your team. It frees them up
              to do the work only they can do.
            </p>
          </div>
          <div className="card bg-navy-50 border-navy-100">
            <h3 className="font-heading text-xl font-bold text-navy-900 mb-5">
              Where AI Fits Into the Work
            </h3>
            <ul className="space-y-3">
              {aiUseCases.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* AI statement */}
      <section className="bg-navy-900 py-14">
        <div className="container-site text-center">
          <p className="text-2xl md:text-3xl font-bold text-gold-400">
            If You&rsquo;re Not Using AI, You&rsquo;re Already Behind.
          </p>
          <p className="mt-3 text-navy-300 max-w-xl mx-auto">
            AI won&rsquo;t replace your marketing team — but the marketer who uses it well will
            outperform the one who doesn&rsquo;t.
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="badge mb-3">My Approach</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              How I Think About Growth
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {approach.map((step, i) => (
              <div key={step.title} className="card hover:shadow-md transition-shadow">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-gold-400 text-sm font-bold mb-4">
                  {i + 1}
                </span>
                <h3 className="font-heading text-lg font-bold text-navy-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good fit / not a good fit */}
      <section className="section bg-navy-50">
        <div className="container-site grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
              I Could Be a Good Fit If You Want To:
            </h2>
            <ul className="space-y-3">
              {goodFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
              I Probably Won’t Be a Good Fit If You Want To:
            </h2>
            <ul className="space-y-3">
              {notGoodFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-navy-300 shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-navy-900 text-white">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Let&rsquo;s Talk About Your Marketing
          </h2>
          <p className="text-navy-300 mb-8 max-w-lg mx-auto">
            Tell me a bit about your current situation and what you&rsquo;re trying to achieve —
            I&rsquo;ll let you know honestly whether I can help.
          </p>
          <Link href="/contact" className="btn-gold">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
