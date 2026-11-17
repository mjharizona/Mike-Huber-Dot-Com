import sessions from '@/public/assets/conference-session-proposals.json'

export const metadata = {
  title: 'Speaker Media Kit: Bios, Photos and Session Descriptions',
  description:
    'Everything an event organizer needs to promote and introduce Mike Huber: short and long bios, an introduction, headshots, four 45-minute AI marketing session descriptions and booking details.',
  alternates: { canonical: '/speaking/media-kit' },
}

const shortBio =
  'Mike Huber is a marketing strategist, speaker, author and advisor with more than 25 years of experience in marketing and advertising. He helps teams integrate AI into the marketing and business processes that serve their customers. He is the lead author of The Customer Journey and co-author of Business Transformation Through AI-Powered Marketing.'

const longBio =
  'Mike Huber is a marketing strategist, speaker, author and advisor with more than 25 years of experience in marketing and advertising. He has spoken at conferences for more than 15 years, including Digital Summit, Content Marketing World and AMA Phoenix. His corporate training experience includes John Deere, Medtronic and the United States Marine Corps. Mike is the lead author of The Customer Journey and the author, with Loren Ankarlo, of Business Transformation Through Digital Marketing. In the new AI-powered edition, he brings people, process and platforms together. His work focuses on integrating AI into marketing and business processes: redesigning workflows, building team skills and keeping human review and accountability in the work.'

const intro =
  'Our next speaker has spent more than 25 years in marketing and advertising, and more than 15 of them on conference stages. He’s the author of The Customer Journey and Business Transformation Through AI-Powered Marketing, and he helps teams turn AI from something they experiment with into a written, reviewed part of how they work. Please welcome Mike Huber.'

const photos = [
  ['/assets/mike-huber-portrait.jpg', 'Headshot'],
  ['/assets/mike-huber-on-stage.jpg', 'On stage'],
  ['/assets/mike-huber-speaking-wide.jpg', 'Speaking, wide'],
]

export default function Page() {
  return (
    <>
      <section className="inner-hero">
        <div className="wrap">
          <p className="eyebrow">Speaker media kit</p>
          <h1>
            Everything you need
            <br />
            to promote and introduce Mike.
          </h1>
          <p className="lead">
            Bios, an introduction, photos and session descriptions you can copy straight into your program, website or email. If you need something that isn’t here, ask and I’ll send it.
          </p>
          <div className="actions">
            <a className="button bronze" href="/contact/?interest=speaking">
              Discuss your event<span className="arrow" aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="/assets/mike-huber-speaker-brief.pdf">
              Download the speaker brief (PDF)<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="wrap proof-inner">
          <div className="proof-label">
            Speaking engagements
            <br />
            include
          </div>
          <div className="names">
            <span className="sans">Content Marketing World</span>
            <span>Digital Summit</span>
            <span className="sans">AMA Phoenix</span>
            <span>WVC</span>
          </div>
        </div>
      </section>

      <section className="section white" id="bios">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Bios</p>
              <h2>Copy, paste, publish.</h2>
            </div>
            <p>Use the short bio for a program listing and the long bio for a speaker page. Please don’t edit the facts without checking with me.</p>
          </div>
          <div className="service-grid">
            <div className="service">
              <span className="number">SHORT BIO</span>
              <p>{shortBio}</p>
            </div>
            <div className="service">
              <span className="number">LONG BIO</span>
              <p>{longBio}</p>
            </div>
            <div className="service">
              <span className="number">INTRODUCTION TO READ ALOUD</span>
              <p>{intro}</p>
            </div>
          </div>
          <p style={{ marginTop: 24 }}>
            <a className="text-link" href="/assets/mike-huber-bio.txt">
              Download the bio as a text file<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
      </section>

      <section className="section soft" id="photos">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Photos</p>
              <h2>Approved images.</h2>
            </div>
            <p>Right-click to save, or ask me for the original files. Please credit “Mike Huber” where a credit line is used.</p>
          </div>
          <div className="service-grid">
            {photos.map(([src, label]) => (
              <div className="service" key={src}>
                <img src={src} alt={`Mike Huber, ${label.toLowerCase()}`} style={{ width: '100%', height: 'auto', display: 'block', marginBottom: 12 }} />
                <h3>{label}</h3>
                <p>
                  <a className="text-link" href={src} download>
                    Download<span className="arrow" aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white" id="sessions">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Conference sessions</p>
              <h2>Four 45-minute sessions.</h2>
            </div>
            <p>Each includes an audience exercise and time for questions. Built for marketing managers and directors, with business owners and senior executives as a secondary audience.</p>
          </div>
          {sessions.map((s, i) => (
            <div key={s.title} style={{ marginTop: i === 0 ? 0 : 40 }}>
              <p className="eyebrow">Session {String(i + 1).padStart(2, '0')} · {s.track}</p>
              <h3 style={{ marginBottom: 4 }}>{s.title}</h3>
              <p className="muted" style={{ marginBottom: 12 }}>{s.subtitle}</p>
              <p>{s.abstract}</p>
              <p className="eyebrow" style={{ marginTop: 16 }}>What your audience takes away</p>
              <ul className="outcomes">
                {s.outcomes.map((o, j) => (
                  <li key={o}>
                    <span>{String(j + 1).padStart(2, '0')}</span>
                    {o}
                  </li>
                ))}
              </ul>
              <p className="small muted">{s.format}</p>
              <a className="text-link" href={`/contact/?interest=speaking`}>
                Discuss this session<span className="arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="section soft" id="more">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Beyond the keynote</p>
            <h2>Workshops and training for your attendees.</h2>
          </div>
          <div>
            <p className="lead">
              Many organizers add a private workshop or a post-conference training day for the host company’s team. Corporate training experience includes John Deere, Medtronic, the U.S. Marine Corps, APi Group and IDB, and Mike has been a guest lecturer in MBA programs at UC San Diego and Hult International Business School.
            </p>
            <a className="text-link" href="/workshops">
              See the workshops<span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <div>
            <h2>Planning an event?</h2>
            <p>Share your audience, your date and the outcome you want. I’ll recommend the right session.</p>
          </div>
          <a className="button bronze" href="/contact/?interest=speaking">
            Discuss your event<span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  )
}

/* TODO (Mike) before publishing:
   - "Many organizers add a private workshop..." is a pitch, not a fact from your records. Keep, soften or remove.
   - Add A/V and travel requirements, fee guidance and past-event testimonials from organizers once you have them. I did not invent any.
   - The short bio says "co-author of Business Transformation Through AI-Powered Marketing"; the second edition is still in preparation. Adjust if you prefer the first-edition title for now.
   - Confirm that the two images and the bio .txt may be offered for public download. */
