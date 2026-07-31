import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Business headshots and landscape photography by Mike Huber.',
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

export default function PhotographyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site">
          <span className="badge mb-4 inline-block">Photography</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Photography
          </h1>
          <p className="text-navy-300 text-lg max-w-xl">
            Business headshots and landscape photography.
          </p>
        </div>
      </section>

      {/* Business Headshots */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="mb-10">
            <span className="badge mb-3 inline-block">Portraits</span>
            <h2 className="font-heading text-3xl font-bold">Business Headshots</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {headshots.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Landscapes */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="mb-10">
            <span className="badge mb-3 inline-block">Landscapes</span>
            <h2 className="font-heading text-3xl font-bold">Landscape Photography</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {landscapes.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl bg-gray-200 group"
                style={{ aspectRatio: i === 4 || i === 7 ? '3/1' : '16/9' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-navy-900 text-white">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Need Business Headshots?
          </h2>
          <p className="text-navy-300 mb-8 max-w-md mx-auto">
            Get in touch to discuss headshot sessions for your team or organization.
          </p>
          <Link href="/contact" className="btn-gold">
            Contact Mike
          </Link>
        </div>
      </section>
    </>
  )
}
