export const metadata = {
  title: 'Business Transformation Through AI-Powered Marketing (2nd Edition)',
  description:
    'The field guide for small businesses and marketing teams, by Mike Huber with Loren Ankarlo. 25 chapters on strategy, the customer journey, search, content, CRM, measurement, leading people and building an AI marketing system.',
  alternates: { canonical: '/books/business-transformation-ai-marketing' },
}

const parts = [
  ['Know where you stand', 'Strategy, skills and SWOT', 'Chapters 2 to 4'],
  ['Know your buyer', 'The customer journey', 'Chapter 5'],
  ['Get found and chosen', 'SEO and AI search, keywords, local, content, hub and spoke, video, paid media, social and your website', 'Chapters 6 to 14'],
  ['Keep the relationship', 'CRM, lead nurture, texting, retention and referrals', 'Chapters 15 to 18'],
  ['Measure, rank and plan', 'Measurement, ranked scoring and transformation', 'Chapters 19 to 21'],
  ['Lead the people and follow the rules', 'Leading people through change, and marketing within the rules', 'Chapters 22 and 23'],
  ['Act', 'Your first 90 days, then your AI marketing system', 'Chapters 24 and 25'],
]

const forWho = [
  'Small business owners and leaders who already use AI and want to build it into how they work',
  'In-house marketing teams that need one plan everyone can follow',
  'Small agencies that want a shared process to use with clients',
  'Anyone who is tired of AI advice that skips strategy, people and process',
]

const inside = [
  'You read a section, fill in the boxes with your own answers, then hand those answers to AI to draft the plan.',
  'AI TIPs: ready-to-use prompts built on the CRAFT framework, at the point in each chapter where they help most.',
  'The AI fluency ladder, so you can place your team honestly and climb one rung at a time.',
  'A real small business followed in real time, so the examples come from real work and not from a made-up company.',
  'A free companion workbook of templates for the exercises, with the caveat on every tab that a template is a structure, not a strategy.',
  'A first-90-days plan and a one-page blueprint of the whole book.',
]

export default function Page() {
  return (
    <>
      <section className="inner-hero">
        <div className="wrap">
          <p className="eyebrow">Second edition · With Loren Ankarlo</p>
          <h1>
            Business Transformation
            <br />
            Through AI-Powered Marketing
          </h1>
          <p className="lead">
            The field guide for small businesses and marketing teams. Most businesses already use AI. Few have built it into how they work. This book closes that gap, one discipline at a time. You think. AI drafts. You decide.
          </p>
          <div className="actions">
            <a className="button bronze" href="https://marketingfieldguide.ai">
              Visit the field guide site<span className="arrow" aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="/contact/?interest=speaking">
              Invite Mike to speak about it<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="small muted" style={{ marginTop: 16 }}>The new edition is in preparation.</p>
        </div>
      </section>

      <section className="section white">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">The idea</p>
            <h2>
              People, process and platforms.
              <br />
              Pull on one and nothing moves.
            </h2>
          </div>
          <div>
            <p className="lead">
              Transformation happens where people, process and platforms meet. The book follows the order a real transformation takes, and it ends with a plan your team can run: six stages over six quarters, reviewed every quarter.
            </p>
            <p>
              The goal is Level 4 on the AI fluency ladder: AI is a written step in your workflows, and a person approves what it produces.
            </p>
            <a className="text-link" href="/frameworks">
              See the frameworks<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">What’s inside</p>
              <h2>Twenty-five chapters in seven steps.</h2>
            </div>
            <p>Each chapter teaches a discipline, has you write your own answers and gives you AI prompts that turn those answers into drafts.</p>
          </div>
          <div className="service-grid">
            {parts.map(([title, text, chapters], i) => (
              <div className="service" key={title}>
                <span className="number">{String(i + 1).padStart(2, '0')} / {chapters.toUpperCase()}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>Read it. Build it. Let AI help you move faster.</h2>
          </div>
          <ul className="outcomes">
            {inside.map((item, i) => (
              <li key={item}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow light">Who it’s for</p>
            <h2>Teams ready to move past experimenting.</h2>
          </div>
          <ul className="outcomes">
            {forWho.map((item, i) => (
              <li key={item}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section white">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">About the authors</p>
            <h2>Written by practitioners.</h2>
          </div>
          <div>
            <p className="lead">
              Mike Huber brings more than 25 years in marketing and advertising and more than 15 years of conference speaking. Loren Ankarlo brings more than 35 years of leadership, facilitation and organizational change. The second edition updates their first book, <em>Business Transformation Through Digital Marketing</em>, for the AI era.
            </p>
            <a className="text-link" href="/about">
              More about Mike<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <div>
            <h2>Put the book to work with your team.</h2>
            <p>Ask about a conference session, a private workshop built from the book or strategic advisory.</p>
          </div>
          <a className="button bronze" href="/workshops">
            See the workshops<span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  )
}

/* TODO (Mike) before publishing:
   - Add the paperback and interactive PDF links, the publication date and the cover image (Business Transformation 2nd Edition - Front Cover.jpg
     is in the Business Transformation V2 folder) once they exist. I did not invent a price, page count or release date.
   - Confirm Loren's bio line ("more than 35 years of leadership, facilitation and organizational change" comes from his site, not the book).
   - Confirm "25 chapters" against the frozen book and the "free companion workbook" wording.
   - Add a newsletter sign-up ("Transformation Field Notes") once it exists. */
