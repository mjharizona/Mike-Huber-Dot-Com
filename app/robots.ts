import type { MetadataRoute } from 'next'

// robots.txt (Nov 10, 2026): everything public is open; admin and API routes are not. Points crawlers to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/todd', '/arnie', '/readiness/'] }], sitemap: 'https://mikehuber.com/sitemap.xml' }
}
