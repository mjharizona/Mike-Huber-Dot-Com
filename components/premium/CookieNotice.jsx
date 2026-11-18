'use client';
import { useEffect, useState } from 'react';

// Notice only: this site sets no tracking or advertising cookies (see /privacy).
// If analytics or ad pixels are ever added, change this to Accept / Decline and load them only after "Accept".
const KEY = 'mh-cookie-notice-v1';

export default function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  function close() {
    try {
      localStorage.setItem(KEY, new Date().toISOString().slice(0, 10));
    } catch {}
    setShow(false);
  }

  if (!show) return null;
  return (
    <div className="cookie-notice no-print" role="region" aria-label="Cookie notice">
      <p>
        This site doesn’t use tracking or advertising cookies. It sets one login cookie for the private admin area, and the booking calendar (Koalendar) may set its own. <a href="/privacy/">Read the privacy policy</a>.
      </p>
      <button type="button" onClick={close}>Got it</button>
    </div>
  );
}
