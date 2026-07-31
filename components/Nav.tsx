'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/about',             label: 'About' },
  { href: '/work-with-me',      label: 'Work With Me' },
  { href: '/speaking',          label: 'Speaking' },
  { href: '/training',          label: 'Training' },
  { href: '/content-marketing', label: 'Books By Mike' },
  { href: '/photography',       label: 'Photography' },
  { href: '/testimonials',      label: 'Testimonials' },
  { href: '/contact',           label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-navy-900 shadow-lg">
      <div className="container-site flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link
          href="/"
          className="text-white font-heading font-bold text-xl tracking-tight hover:text-gold-400 transition-colors"
        >
          Mike <span className="text-gold-400">Huber</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname?.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-navy-700 text-white'
                    : 'text-navy-200 hover:text-white hover:bg-navy-800'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <Link href="/contact" className="ml-3 btn-gold text-sm !px-4 !py-2">
            Book Mike
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-md hover:bg-navy-800 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-950 border-t border-navy-800 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map(({ href, label }) => {
              const active = pathname === href || pathname?.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-navy-700 text-white'
                      : 'text-navy-200 hover:text-white hover:bg-navy-800'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-gold mt-2 justify-center text-sm"
            >
              Book Mike
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
