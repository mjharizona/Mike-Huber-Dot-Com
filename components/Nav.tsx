'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type NavItem =
  | { href: string; label: string; children?: undefined }
  | { label: string; href?: undefined; children: { href: string; label: string }[] }

const links: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/work-with-me', label: 'Work With Me' },
  {
    label: 'Speak & Train',
    children: [
      { href: '/speaking', label: 'Speaking' },
      { href: '/training', label: 'Training' },
      { href: '/content-marketing', label: 'Books By Mike' },
    ],
  },
  { href: '/website-packages', label: 'Website Packages' },
  { href: '/photography', label: 'Photography' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/audit', label: 'Free Audit' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null)

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-50 bg-navy-900 shadow-lg">
      <div className="container-site flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image
            src="/images/logo-mh.png"
            alt="Mike Huber"
            width={40}
            height={36}
            className="h-9 w-auto rounded-sm"
            priority
          />
          <span className="text-white font-heading font-bold text-xl tracking-tight whitespace-nowrap group-hover:text-gold-400 transition-colors">
            Mike <span className="text-gold-400 group-hover:text-white transition-colors">Huber</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-0.5 ml-6">
          {links.map((item) => {
            if (item.children) {
              const active = item.children.some((c) => isActive(c.href))
              return (
                <div key={item.label} className="group relative">
                  <button
                    className={`flex items-center gap-1 px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                      active
                        ? 'bg-navy-700 text-white'
                        : 'text-navy-200 hover:text-white hover:bg-navy-800'
                    }`}
                  >
                    {item.label}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="invisible absolute left-0 top-full pt-1 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="w-56 rounded-lg border border-navy-800 bg-navy-900 py-2 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            isActive(child.href)
                              ? 'text-white bg-navy-800'
                              : 'text-navy-200 hover:text-white hover:bg-navy-800'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-navy-700 text-white'
                    : 'text-navy-200 hover:text-white hover:bg-navy-800'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link href="/book" className="ml-2 btn-gold text-sm whitespace-nowrap !px-4 !py-2">
            Book Mike
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="xl:hidden text-white p-2 rounded-md hover:bg-navy-800 transition-colors"
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
        <div className="xl:hidden bg-navy-950 border-t border-navy-800 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map((item) => {
              if (item.children) {
                const subOpen = mobileSubOpen === item.label
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileSubOpen(subOpen ? null : item.label)}
                      className="flex w-full items-center justify-between px-4 py-3 rounded-md text-sm font-medium text-navy-200 hover:text-white hover:bg-navy-800 transition-colors"
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${subOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {subOpen && (
                      <div className="flex flex-col gap-1 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              setOpen(false)
                              setMobileSubOpen(null)
                            }}
                            className={`px-4 py-2.5 rounded-md text-sm transition-colors ${
                              isActive(child.href)
                                ? 'bg-navy-700 text-white'
                                : 'text-navy-300 hover:text-white hover:bg-navy-800'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-navy-700 text-white'
                      : 'text-navy-200 hover:text-white hover:bg-navy-800'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/book"
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
