import { getLeads } from '@/lib/leads'
import { format } from 'date-fns'

export default function LeadsPage() {
  const leads = getLeads()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-navy-900">Leads & Inquiries</h1>
        <span className="badge">
          {leads.filter((l) => !l.read).length} unread
        </span>
      </div>

      {leads.length === 0 ? (
        <div className="card text-center py-20 text-gray-400">
          <p className="text-4xl mb-4">📭</p>
          <p>No leads yet. Contact form submissions will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className={`card transition-shadow hover:shadow-md ${!lead.read ? 'border-l-4 border-l-gold-500' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold text-navy-900">{lead.name}</p>
                    {!lead.read && (
                      <span className="text-xs font-medium bg-gold-400/10 text-gold-700 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
                    <a href={`mailto:${lead.email}`} className="hover:text-navy-700 underline">
                      {lead.email}
                    </a>
                    {lead.phone && <span>{lead.phone}</span>}
                    {lead.company && <span>{lead.company}</span>}
                    <span>{format(new Date(lead.createdAt), 'MMM d, yyyy · h:mm a')}</span>
                  </div>
                  <p className="text-xs font-semibold text-gold-700 mb-2">
                    Interest: {lead.interest}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {lead.message}
                  </p>
                </div>
                <a
                  href={`mailto:${lead.email}?subject=Re: ${encodeURIComponent(lead.interest)}`}
                  className="btn-primary text-sm shrink-0"
                >
                  Reply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
