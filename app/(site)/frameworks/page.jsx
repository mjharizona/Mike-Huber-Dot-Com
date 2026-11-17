export const metadata = {
  title: 'AI Marketing Frameworks: AI Fluency Ladder, CRAFT and More',
  description:
    'The frameworks behind Business Transformation Through AI-Powered Marketing: the AI fluency ladder, the CRAFT prompt, five AI ground rules, six stages over six quarters, ranked scoring and the five-part AI marketing system.',
  alternates: { canonical: '/frameworks' },
}

const ladder = [
  ['LEVEL 1', 'Not started.', 'Build understanding and agree on the ground rules.'],
  ['LEVEL 2', 'Experimenting.', 'You and a few people try it now and then.'],
  ['LEVEL 3', 'Using regularly.', 'People use it every week, but it depends on who remembers.'],
  ['LEVEL 4', 'Integrated.', 'AI is a written step in your workflows, prompts are saved and shared, and a person approves what it produces.'],
]

const craft = [
  ['C', 'Context', 'What the AI needs to know about your business, your buyer and the task.'],
  ['R', 'Role', 'Who you want it to act as, such as a senior SEO strategist or a project manager.'],
  ['A', 'Ask', 'The specific job you want done.'],
  ['F', 'Format', 'What the result should look like: a table, a short list, an email.'],
  ['T', 'Tighten', 'The limits: what to avoid, what to leave blank, how realistic to be.'],
]

const groundRules = [
  ['People approve everything public.', 'Nothing goes to a customer, onto the website or into an ad until a person has read and approved it.'],
  ['Verify facts.', 'AI will confidently misread numbers and invent facts. Check every figure against the source.'],
  ['Protect data.', 'Decide what AI may see, and keep customer details, payment information and personnel records out.'],
  ['Keep your voice.', 'Use AI to draft in your voice, not to replace it.'],
  ['Add what AI can’t.', 'Your first-hand experience, projects, photos, data and opinions are the difference.'],
]

const stages = [
  ['Q1', 'Foundation'],
  ['Q2', 'Deployment'],
  ['Q3', 'Traction'],
  ['Q4', 'Acceleration'],
  ['Q5', 'Expansion'],
  ['Q6', 'Ongoing'],
]

const journey = ['Awareness', 'Consideration', 'Decision', 'Retention', 'Advocacy']

const aiSkills = ['Briefing', 'Evaluating', 'Iterating', 'Choosing', 'Protecting', 'Systematizing']

const systemParts = [
  ['01', 'Knowledge base', 'What’s true about your business, written once.'],
  ['02', 'Standing instructions', 'How AI should work for your team.'],
  ['03', 'Skills', 'One job each, saved and reused.'],
  ['04', 'Workflows', 'Skills chained in order, with a named person approving at each checkpoint.'],
  ['05', 'Review loop', 'Log every skill, fix misses at the source, review each quarter.'],
]

export default function Page() {
  return (
    <>
      <section className="inner-hero">
        <div className="wrap">
          <p className="eyebrow">Frameworks</p>
          <h1>
            Simple models your team
            <br />
            can use on Monday.
          </h1>
          <p className="lead">
            These are the frameworks behind my book, my workshops and my conference sessions. Each one is short enough to remember and practical enough to use. The idea running through all of them: you think, AI drafts, you decide.
          </p>
          <div className="actions">
            <a className="button bronze" href="/contact/?interest=workshop">
              Bring these to your team<span className="arrow" aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="/books/business-transformation-ai-marketing">
              About the book<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section white" id="ai-fluency-ladder">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Framework 1</p>
              <h2>The AI fluency ladder.</h2>
            </div>
            <p>Using AI is not the same as building it in. The ladder shows where your team is today and what the next step looks like. Level 4 is the goal. AI agents come after that, not before.</p>
          </div>
          <ol className="fluency-ladder">
            {ladder.map(([level, title, text]) => (
              <li key={level}>
                <span>{level}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <p className="small muted" style={{ marginTop: 24 }}>
            Personal skill and team integration are different things. A team of advanced users can still be at Level 2.
          </p>
        </div>
      </section>

      <section className="section soft" id="craft">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Framework 2</p>
              <h2>The CRAFT prompt.</h2>
            </div>
            <p>A five-part way to brief AI so the first draft is useful. End every prompt with one more line: “Before you start, ask me any questions you need answered, and suggest ideas I may have missed.”</p>
          </div>
          <div className="service-grid">
            {craft.map(([letter, name, text]) => (
              <div className="service" key={letter}>
                <span className="number">{letter}</span>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white" id="ground-rules">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Framework 3</p>
            <h2>Five AI ground rules.</h2>
            <p className="lead">Agree on these before you start. They keep the speed of AI without the risk.</p>
          </div>
          <ul className="outcomes">
            {groundRules.map(([rule, text], i) => (
              <li key={rule}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{rule}</strong> {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark" id="six-stages">
        <div className="wrap">
          <p className="eyebrow light">Framework 4</p>
          <h2>
            Six stages over six quarters.
            <br />
            Reviewed every quarter.
          </h2>
          <p className="lead" style={{ maxWidth: 680 }}>
            A transformation happens where people, process and platforms meet. Pull on one without the others and nothing moves. The work runs in six stages.
          </p>
          <div className="service-grid">
            {stages.map(([q, name]) => (
              <div className="service" key={q}>
                <span className="number">{q}</span>
                <h3>{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white" id="customer-journey">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Framework 5</p>
            <h2>The five-stage customer journey.</h2>
          </div>
          <div>
            <p className="lead">
              Buyers don’t go in order. They loop, skip and stall, and some send an AI agent to shop for them. Build a persona from real customers, map what they need at each stage and find the dead ends where they drop out. Every page needs one clear next step.
            </p>
            <ul className="outcomes">
              {journey.map((stage, i) => (
                <li key={stage}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {stage}
                </li>
              ))}
            </ul>
            <p className="small muted" style={{ marginTop: 16 }}>
              Most businesses are heavy on Awareness and light on Retention and Advocacy.
            </p>
          </div>
        </div>
      </section>

      <section className="section soft" id="ranked-scoring">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Framework 6</p>
            <h2>Ranked scoring.</h2>
          </div>
          <div>
            <p className="lead">
              By now you have more ideas than time. Score each tactic from 1 to 5 on six criteria: revenue growth, strategic value, customer value, cost, risk and effort. For cost, risk and effort, a 5 means the lowest, so a high score is always good.
            </p>
            <p>
              Weight the criteria, multiply, add, and divide by 5 to get a score out of 100. The math starts the conversation. The team makes the call. The top five become your action plan.
            </p>
          </div>
        </div>
      </section>

      <section className="section white" id="ai-skills">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Framework 7</p>
            <h2>Six AI skills every team needs.</h2>
          </div>
          <div>
            <p className="lead">
              A transformation asks more of your people than of your tools. Rate each person and the whole team, then compare the two. The gap is the story.
            </p>
            <ul className="outcomes">
              {aiSkills.map((skill, i) => (
                <li key={skill}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {skill}
                </li>
              ))}
            </ul>
            <p className="small muted" style={{ marginTop: 16 }}>
              Close the gaps by training, hiring, outsourcing or automating. Practice on real work every week, not in a course.
            </p>
          </div>
        </div>
      </section>

      <section className="section dark" id="ai-marketing-system">
        <div className="wrap">
          <p className="eyebrow light">Framework 8</p>
          <h2>
            Stop writing prompts.
            <br />
            Start building a system.
          </h2>
          <p className="lead" style={{ maxWidth: 680 }}>
            At Level 4, teams still repeat themselves: they paste the persona again and explain the brand voice again. A five-part AI marketing system fixes that. Build the parts in this order.
          </p>
          <div className="service-grid">
            {systemParts.map(([n, name, text]) => (
              <div className="service" key={n}>
                <span className="number">{n}</span>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 24 }}>
            <a className="text-link light" href="/blog/what-is-an-ai-marketing-system">
              Read: What is an AI marketing system?<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <div>
            <h2>Want these frameworks built into your team’s work?</h2>
            <p>I teach them in conference sessions, private workshops and advisory engagements.</p>
          </div>
          <a className="button bronze" href="/workshops">
            See the workshops<span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  )
}
