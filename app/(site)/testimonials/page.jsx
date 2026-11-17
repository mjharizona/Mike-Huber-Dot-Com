import { testimonials } from '@/data/testimonials'

export const metadata = {
  title: 'Testimonials',
  description: 'What clients, colleagues and organizations say about working with Mike Huber.',
  alternates: { canonical: '/testimonials' },
}

export default function Page() {
  return (
    <>
      <section className="inner-hero">
        <div className="wrap">
          <p className="eyebrow">Testimonials</p>
          <h1>
            What clients and
            <br />
            colleagues say.
          </h1>
          <p className="lead">Mike has worked with hundreds of individuals and organizations. Here is what some of them have to say.</p>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <figure key={t.id}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  {t.author}
                  {t.role ? `, ${t.role}` : ''}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <div>
            <h2>Want results like these?</h2>
            <p>Let’s talk about speaking, training or consulting.</p>
          </div>
          <a className="button bronze" href="/contact">
            Get in touch<span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  )
}
