export const metadata = {
  title: 'Photography',
  description: 'Business headshots and landscape photography by Mike Huber.',
  alternates: { canonical: '/photography' },
}

const headshots = [
  { src: '/images/headshots/Mike-Head-Shot.jpg',            alt: 'Mike Huber Headshot' },
  { src: '/images/headshots/tiffanyG-3.21.23-sized.jpg',   alt: 'Business Headshot' },
  { src: '/images/headshots/Shantel-Sized-3.21.23.jpg',    alt: 'Business Headshot' },
  { src: '/images/headshots/SamZiggy-Sized-3.21.23.jpg',   alt: 'Business Headshot' },
  { src: '/images/headshots/Mel-3.21.23-sized.jpg',        alt: 'Business Headshot' },
  { src: '/images/headshots/MD-Sized-3.21.23.jpg',         alt: 'Business Headshot' },
  { src: '/images/headshots/Lina-Sized-3.21.23.jpg',       alt: 'Business Headshot' },
  { src: '/images/headshots/Josh-Sized-3.21.23.jpg',       alt: 'Business Headshot' },
  { src: '/images/headshots/Hailey2-sized-3.21.23.jpg',    alt: 'Business Headshot' },
  { src: '/images/headshots/Brianstairs-Sized-3.21.23.jpg',alt: 'Business Headshot' },
  { src: '/images/headshots/Ariana-sized-3.21.23.jpg',     alt: 'Business Headshot' },
  { src: '/images/headshots/Ariana-2-Sized-3.21.23.jpg',   alt: 'Business Headshot' },
]

const landscapes = [
  { src: '/images/landscapes/Bisbee-Cab...latest-version-Sized.jpg', alt: 'Bisbee, AZ' },
  { src: '/images/landscapes/Julian-1200x630.jpg',                   alt: 'Julian' },
  { src: '/images/landscapes/homestead-at-bridgers-2-1024x630.jpg',  alt: 'Homestead at Bridgers' },
  { src: '/images/landscapes/havasupai-hdr-845x563.jpeg',            alt: 'Havasupai' },
  { src: '/images/landscapes/blueridgepanoramic-1500x630.jpg',       alt: 'Blue Ridge Panoramic' },
  { src: '/images/landscapes/foxes-1280x630.jpeg',                   alt: 'Foxes' },
  { src: '/images/landscapes/floating-the-Bitterroot-sized-1280x630.png', alt: 'Floating the Bitterroot' },
  { src: '/images/landscapes/bitterroot-river-845x321.jpg',          alt: 'Bitterroot River, MT' },
  { src: '/images/landscapes/Kauai-rooster-80x80.jpg',               alt: 'Kauai' },
]

export default function Page() {
  return (
    <>
      <section className="inner-hero">
        <div className="wrap">
          <p className="eyebrow">Photography</p>
          <h1>Headshots and landscapes.</h1>
          <p className="lead">Business headshots for teams and organizations, and landscape photography from the places Mike travels.</p>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <p className="eyebrow">Portraits</p>
          <h2>Business headshots.</h2>
          <div className="gallery">
            {headshots.map((img, i) => (
              <figure key={i}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <p className="eyebrow">Landscapes</p>
          <h2>Landscape photography.</h2>
          <div className="gallery wide">
            {landscapes.map((img, i) => (
              <figure key={i}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <div>
            <h2>Need business headshots?</h2>
            <p>Get in touch to discuss headshot sessions for your team or organization.</p>
          </div>
          <a className="button bronze" href="/contact">
            Contact Mike<span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  )
}
