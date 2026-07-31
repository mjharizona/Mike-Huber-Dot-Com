import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Mike Huber | Digital Marketing Strategist, Speaker & Author',
    template: '%s | Mike Huber',
  },
  description:
    'Mike Huber is a seasoned digital marketing strategist, conference speaker, corporate trainer, and co-author of The Customer Journey. Helping organizations transform marketing through strategy, training, and content.',
  openGraph: {
    type: 'website',
    url: 'https://mikehuber.com',
    siteName: 'Mike Huber',
    images: [{ url: '/images/og-default.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mikehuber.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
