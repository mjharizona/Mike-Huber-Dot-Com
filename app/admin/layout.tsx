'use client'

import Link from 'next/link'

const navItems = [
  { href: '/admin',        label: 'Dashboard', icon: '📊' },
  { href: '/admin/leads',  label: 'Leads',     icon: '📬' },
  { href: '/admin/posts',  label: 'Blog Posts', icon: '📝' },
  { href: '/admin/readiness', label: 'Readiness', icon: '🧭' },
]

function AdminNav() {
  return (
    <aside className="w-56 bg-navy-950 min-h-screen flex flex-col">
      <div className="p-6 border-b border-navy-800">
        <Link href="/" className="text-white font-heading font-bold text-lg">
          Mike <span className="text-gold-400">Huber</span>
        </Link>
        <p className="text-navy-500 text-xs mt-1">Admin</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-navy-300 hover:text-white hover:bg-navy-800 text-sm font-medium transition-colors"
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-navy-800">
        <form action="/api/admin/login" method="DELETE">
          <button
            formAction="/api/admin/login"
            className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-navy-500 hover:text-white hover:bg-navy-800 text-sm transition-colors"
            onClick={async (e) => {
              e.preventDefault()
              await fetch('/api/admin/login', { method: 'DELETE' })
              window.location.href = '/admin/login'
            }}
          >
            <span>🚪</span> Sign Out
          </button>
        </form>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-navy-500 hover:text-white hover:bg-navy-800 text-sm transition-colors mt-1"
        >
          <span>🌐</span> View Site
        </Link>
      </div>
    </aside>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
