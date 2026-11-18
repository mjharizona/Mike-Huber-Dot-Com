'use client'

import { useEffect, useRef, useState } from 'react'

// Koalendar booking with a type picker. To add or change a type, edit this list.
// `url` is the Koalendar event link for that type (Koalendar > Event types > copy link).
// Until each type has its own Koalendar event, they all fall back to the original calendar, so nothing breaks.
const FALLBACK = 'https://koalendar.com/e/meet-with-mike-78'
const TYPES = [
  { id: 'speaking', label: 'Speaking inquiry', time: '20 min', blurb: 'For conference and event organizers. Bring the event name, date, audience and topic.', url: FALLBACK },
  { id: 'workshop', label: 'Team workshop discovery', time: '30 min', blurb: 'For leaders considering a workshop. Bring your team size and what you use AI for today.', url: FALLBACK },
  { id: 'audit', label: 'Free audit review', time: '20 min', blurb: 'Bring your audit report and we’ll go through your top three gaps.', url: FALLBACK },
  { id: 'advisory', label: 'Advisory intro', time: '30 min', blurb: 'For owners and marketing leads who want ongoing help.', url: FALLBACK },
]

export default function BookingEmbed() {
  const [active, setActive] = useState<string | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const type = TYPES.find((t) => t.id === active)

  // Preselect from ?type=speaking, so other pages can link straight to a type.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('type')
    if (q && TYPES.some((t) => t.id === q)) setActive(q)
  }, [])

  useEffect(() => {
    if (!type || !box.current) return
    const w = window as any
    w.Koalendar =
      w.Koalendar ||
      function (...args: unknown[]) {
        ;(w.Koalendar.props = w.Koalendar.props || []).push(args)
      }
    box.current.innerHTML = ''
    w.Koalendar('inline', { url: type.url, selector: '#booking-widget' })
    if (!document.querySelector('script[data-koalendar]')) {
      const s = document.createElement('script')
      s.src = 'https://koalendar.com/assets/widget.js'
      s.async = true
      s.dataset.koalendar = 'true'
      document.body.appendChild(s)
    }
  }, [type])

  return (
    <div>
      <p className="eyebrow">1. What would you like to talk about?</p>
      <div className="pick-grid" role="radiogroup" aria-label="Appointment type">
        {TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active === t.id}
            className={'pick' + (active === t.id ? ' on' : '')}
            onClick={() => setActive(t.id)}
          >
            <span className="pick-time">{t.time} · Free</span>
            <strong>{t.label}</strong>
            <span>{t.blurb}</span>
          </button>
        ))}
      </div>

      {type ? (
        <div style={{ marginTop: 40 }}>
          <p className="eyebrow">2. Pick a time</p>
          <div id="booking-widget" ref={box} style={{ minHeight: 640 }} />
          <p className="small muted">
            Calendar not showing?{' '}
            <a href={type.url} target="_blank" rel="noopener noreferrer" className="text-link">Open the booking page</a>.
          </p>
        </div>
      ) : (
        <p className="small muted" style={{ marginTop: 24 }}>Choose a type above to see available times.</p>
      )}
    </div>
  )
}
