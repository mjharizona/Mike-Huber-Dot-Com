export const metadata = {
  title: 'AI Marketing Transformation Workshops for Teams',
  description:
    'Facilitated workshops built from the book Business Transformation Through AI-Powered Marketing. A three-day immersion, one-day tracks, a half-day AI workshop or a single module, led by Mike Huber.',
  alternates: { canonical: '/workshops' },
}

const days = [
  {
    label: 'Day 1 · Foundation',
    modules: [
      ['M01', 'Kickoff and AI Ground Rules'],
      ['M02', 'Strategy on a Page'],
      ['M03', 'Skills and AI Fluency Assessment'],
      ['M04', 'SWOT and the OODA Loop'],
    ],
  },
  {
    label: 'Day 2 · Customers and channels',
    modules: [
      ['M05', 'The Customer Journey'],
      ['M06', 'Get Found: Search, AI Answers and Local'],
      ['M07', 'Content, Hub and Spoke, and Video'],
      ['M08', 'Channels That Convert: Paid, Social, Email and Your Website'],
    ],
  },
  {
    label: 'Day 3 · Prioritize and commit',
    modules: [
      ['M09', 'Measurement and KPIs'],
      ['M10', 'Prioritize: Ranked Scoring and Your Roadmap'],
      ['M11', 'Leading People Through Change'],
      ['M12', 'Your First 90 Days'],
    ],
  },
  {
    label: 'Day 4 (optional) · Keep, comply and systematize',
    modules: [
      ['M13', 'Keep, Grow and Get Referred'],
      ['M14', 'Marketing Within the Rules'],
      ['M15', 'Your AI Marketing System'],
    ],
  },
]

const formats = [
  ['Full immersion (3 days)', 'Modules 1 to 12 in order. Best for a company starting its transformation or resetting it.'],
  ['Foundation day', 'Ground rules and AI policy, strategy, skills, SWOT and OODA. A strong start for leadership teams.'],
  ['Channel day', 'Customer journey, getting found, content and video, and channels that convert. For marketing teams that already have a strategy.'],
  ['Commit day', 'Measurement, prioritization and roadmap, leading change and the first 90 days. For teams with too many ideas and too little follow-through.'],
  ['Day 4 (optional)', 'Retention and referrals, marketing within the rules, and your team’s AI marketing system. Best after the immersion or for teams that already have a plan.'],
  ['Single module', 'Any module on its own, in person or by video. Common picks: AI ground rules, AI search visibility, change and conflict, and compliance.'],
]

const leaveWith = [
  'A one-page strategy the whole team can read in two minutes',
  'Your team’s AI fluency baseline, a skills heat map and a ranked gap list',
  'A SWOT with evidence, scored against three competitors',
  'A customer journey map for one priority buyer, with the dead ends ranked',
  'An AI visibility check of what ChatGPT, Gemini and Google say about you, with a fix for each gap',
  'Measures that tie to revenue, and a ranked list of what to do first',
  'A roadmap with named owners, and your first quarterly review on the calendar',
  'An AI usage policy and ground rules your people agreed to in the room',
]

export default function Page() {
  return (
    <>
      <section className="inner-hero">
        <div className="wrap">
          <p className="eyebrow">Private workshops for teams</p>
          <h1>
            Build your AI marketing plan
            <br />
            in the room, with your team.
          </h1>
          <p className="lead">
            Facilitated workshops built from the book <em>Business Transformation Through AI-Powered Marketing</em>. Your people fill in the field guide with their own answers. AI helps draft. Your team decides. You leave with a plan that has owners and dates.
          </p>
          <div className="actions">
            <a className="button bronze" href="/contact/?interest=workshop">
              Request a workshop proposal<span className="arrow" aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#modules">
              See the modules<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="wrap proof-inner">
          <div className="proof-label">
            Corporate training
            <br />
            experience includes
          </div>
          <div className="names">
            <span className="sans">John Deere</span>
            <span>Medtronic</span>
            <span className="sans">U.S. Marine Corps</span>
            <span>APi Group</span>
            <a href="https://idb.org" aria-label="IDB website"><span className="sans">IDB</span></a>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Who it’s for</p>
            <h2>
              Teams that use AI but haven’t
              <br />
              built it into how they work.
            </h2>
          </div>
          <div>
            <p className="lead">
              Most small businesses already use AI. Few have built it in. These workshops are for owners, small agencies and in-house marketing teams that have basic AI experience and want a written plan, shared rules and a way to choose what comes first.
            </p>
            <ul className="outcomes">
              <li><span>01</span>Leadership and marketing teams that have too many ideas and no clear way to choose.</li>
              <li><span>02</span>Teams where AI use depends on who remembers, not on a written process.</li>
              <li><span>03</span>Leaders who want their people to hear the plan from them first, with honest answers about roles.</li>
              <li><span>04</span>Groups of about 4 to 20, depending on the module. Include the person who decides budget.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section soft" id="formats">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Choose a format</p>
              <h2>Start with the part you need.</h2>
            </div>
            <p>Every module stands alone and opens with a ten-minute context setter. Each runs about two hours, with four modules in a day.</p>
          </div>
          <div className="service-grid">
            {formats.map(([name, text], i) => (
              <div className="service" key={name}>
                <span className="number">{String(i + 1).padStart(2, '0')} / FORMAT</span>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white" id="modules">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">The three-day immersion</p>
              <h2>Fifteen modules. Use the ones that fit.</h2>
            </div>
            <p>Mike leads the marketing, AI and channel sessions. Co-author Loren Ankarlo leads change, team dynamics and conflict, and some modules are co-led.</p>
          </div>
          {days.map((day) => (
            <div key={day.label} style={{ marginTop: 32 }}>
              <p className="eyebrow">{day.label}</p>
              <ul className="outcomes">
                {day.modules.map(([code, title]) => (
                  <li key={code}>
                    <span>{code}</span>
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <p className="eyebrow light">What your team leaves with</p>
          <h2>
            Answers written down.
            <br />
            Owners named. Dates set.
          </h2>
          <ul className="outcomes" style={{ marginTop: 32 }}>
            {leaveWith.map((item, i) => (
              <li key={item}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section white" id="how-it-works">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>People hear it from their leader first.</h2>
          </div>
          <div>
            <p className="lead">
              A workshop changes how people work, so the preparation matters as much as the days in the room. Here’s the sequence.
            </p>
            <ul className="outcomes">
              <li><span>01</span>The leader announces the workshop, with a short FAQ, at least 14 days ahead (10 for a single module), before any pre-work goes out.</li>
              <li><span>02</span>Participants get short pre-work with tasks for everyone, the leader, the website owner and the Google Business Profile owner.</li>
              <li><span>03</span>In the room, each table has one scribe on a company laptop. Only company-approved AI accounts are used.</li>
              <li><span>04</span>The leader restates the goals on Day 1. An updated FAQ goes out two days after.</li>
              <li><span>05</span>We follow up at 30 and 90 days, and your first quarterly business review is already on the calendar.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section soft" id="horizon-plan">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Shorter option</p>
            <h2>The Horizon Plan.</h2>
          </div>
          <div>
            <p className="lead">
              Build tomorrow while you run today. A half-day workshop (3.5 hours), a 90-minute version, or four weekly sessions that help your team decide where AI fits across everything it already has on its plate.
            </p>
            <ul className="outcomes">
              <li><span>1</span>List 12 to 25 real initiatives, projects and recurring jobs.</li>
              <li><span>2</span>Sort each into Horizon 1 (improve the core), Horizon 2 (build what is emerging) or Horizon 3 (explore the future).</li>
              <li><span>3</span>Tag the AI role for each: enablement, automation or reinvention.</li>
              <li><span>4</span>Split team time and budget across the horizons.</li>
              <li><span>5</span>Set 90-day tests, each with one question, one measure, one owner and a stop/go date.</li>
            </ul>
            <p className="small muted" style={{ marginTop: 16 }}>
              You leave with a one-page Horizon Plan and a review rhythm.
            </p>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <p className="eyebrow">Behind the workshop</p>
          <h2>It starts from the book.</h2>
          <p className="lead" style={{ maxWidth: 680 }}>
            Every module draws on <em>Business Transformation Through AI-Powered Marketing</em>, the field guide for small businesses and marketing teams. Participants take the free companion workbook and the book home, so the work keeps going after the session ends.
          </p>
          <div className="actions">
            <a className="text-link" href="/books/business-transformation-ai-marketing">
              About the book<span className="arrow" aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="/frameworks">
              The frameworks we use<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <div>
            <h2>Which part would help your team most?</h2>
            <p>Tell me about your team and what you want AI to help you do. I’ll recommend a format and send a proposal.</p>
          </div>
          <a className="button bronze" href="/contact/?interest=workshop">
            Request a proposal<span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  )
}

/* TODO (Mike) before publishing:
    - Confirm Loren Ankarlo's co-facilitation line (the brief says his place on the site is still open).
    - Pricing is intentionally left off: the brief says prices are recommendations awaiting your decision.
    - Confirm the group-size range (the Horizon Plan guide still says "[Mike: confirm range]").
    - Confirm the 30/90-day follow-up and the Day 4 module names against the final kit. */
