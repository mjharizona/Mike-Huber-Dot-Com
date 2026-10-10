'use client'

import { useEffect } from 'react'

// Koalendar inline booking widget. The script is loaded once; the widget is
// (re)drawn each time this component mounts, including after client-side navigation.
const URL = 'https://koalendar.com/e/meet-with-mike-78'
const ID = 'inline-widget-meet-with-mike-78'

export default function BookingEmbed() {
  useEffect(() => {
    const w = window as any
    w.Koalendar =
      w.Koalendar ||
      function (...args: unknown[]) {
        ;(w.Koalendar.props = w.Koalendar.props || []).push(args)
      }
    w.Koalendar('inline', { url: URL, selector: `#${ID}` })
    if (!document.querySelector('script[data-koalendar]')) {
      const s = document.createElement('script')
      s.src = 'https://koalendar.com/assets/widget.js'
      s.async = true
      s.dataset.koalendar = 'true'
      document.body.appendChild(s)
    }
  }, [])

  return (
    <div>
      <div id={ID} className="min-h-[640px]" />
      <p className="text-sm text-gray-500 mt-4">
        Calendar not showing?{' '}
        <a href={URL} target="_blank" rel="noopener noreferrer" className="underline text-navy-600">Open the booking page</a>.
      </p>
    </div>
  )
}
