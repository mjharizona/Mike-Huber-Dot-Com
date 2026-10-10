import Image from 'next/image'
import Link from 'next/link'

const footerLinks = [
  { href: '/about',             label: 'About' },
  { href: '/work-with-me',      label: 'Work With Me' },
  { href: '/website-packages',  label: 'Website Packages' },
  { href: '/speaking',          label: 'Speaking' },
  { href: '/training',          label: 'Training' },
  { href: '/content-marketing', label: 'Books By Mike' },
  { href: '/photography',       label: 'Photography' },
  { href: '/testimonials',      label: 'Testimonials' },
  { href: '/audit',             label: 'Free Audit' },
  { href: '/contact',           label: 'Contact' },
  { href: '/privacy',           label: 'Privacy' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-300">
      <div className="container-site py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/images/logo-mh.png"
                alt="Mike Huber"
                width={40}
                height={36}
                className="h-9 w-auto rounded-sm"
              />
              <p className="text-white font-heading font-bold text-xl">
                Mike <span className="text-gold-400">Huber</span>
              </p>
            </div>
            <p className="text-sm leading-relaxed text-navy-400">
              Digital marketing strategist, author, speaker, and trainer. Helping organizations
              transform their marketing through education and strategy.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Pages</p>
            <nav className="flex flex-col gap-2">
              {footerLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-navy-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Get In Touch</p>
            <p className="text-sm text-navy-400 mb-4">
              Interested in having Mike speak at your event or train your team?
            </p>
            <Link href="/contact" className="btn-gold text-sm">
              Book Mike
            </Link>
            <p className="mt-4 text-sm">
              <a
                href="mailto:mike@mikehuber.com"
                className="text-navy-400 hover:text-white transition-colors"
              >
                mike@mikehuber.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-navy-500">
          <p>© {new Date().getFullYear()} Mike Huber. All rights reserved.</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
