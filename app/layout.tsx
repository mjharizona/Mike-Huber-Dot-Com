import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Mike Huber | AI Marketing, Speaking & Advisory',
    template: '%s | Mike Huber',
  },
  description:
    'AI-powered marketing and business transformation with Mike Huber. Conference speaking, team workshops and advisory grounded in customer insight and human judgment.',
  openGraph: {
    type: 'website',
    url: 'https://mikehuber.com',
    siteName: 'Mike Huber',
    images: [{ url: '/assets/mike-huber-speaking-wide.jpg' }],
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
