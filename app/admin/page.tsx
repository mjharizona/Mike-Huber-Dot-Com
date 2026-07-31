import Link from 'next/link'
import { getLeads } from '@/lib/leads'
import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'

export default function AdminDashboard() {
  const leads = getLeads()
  const posts = getAllPosts()

  const unread = leads.filter((l) => !l.read).length
  const recentLeads = leads.slice(0, 5)

  const stats = [
    { label: 'Total Leads',  value: leads.length,  icon: '📬', href: '/admin/leads' },
    { label: 'Unread',       value: unread,         icon: '🔔', href: '/admin/leads' },
    { label: 'Blog Posts',   value: posts.length,   icon: '📝', href: '/admin/posts' },
  ]

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">
                  {s.label}
                </p>
                <p className="font-heading text-3xl font-bold text-navy-900">{s.value}</p>
              </div>
              <span className="text-3xl">{s.icon}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-lg font-bold text-navy-900">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm text-navy-600 hover:underline">
            View all →
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-500 text-xs uppercase tracking-widest">Name</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-500 text-xs uppercase tracking-widest">Interest</th>
                  <th className="text-left py-2 font-semibold text-gray-500 text-xs uppercase tracking-widest">Date</th>
                  <th className="text-left py-2 font-semibold text-gray-500 text-xs uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-navy-900">{lead.name}</p>
                      <p className="text-gray-400 text-xs">{lead.email}</p>
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{lead.interest}</td>
                    <td className="py-3 text-gray-400 text-xs">
                      {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                          lead.read
                            ? 'bg-gray-100 text-gray-500'
                            : 'bg-gold-400/10 text-gold-700'
                        }`}
                      >
                        {lead.read ? 'Read' : 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
