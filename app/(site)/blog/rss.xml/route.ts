import { getAllPosts } from '@/lib/posts'

// RSS 2.0 feed of published posts. Refreshed hourly with the blog, so scheduled posts join the feed on their date.
export const revalidate = 3600

const SITE = 'https://mikehuber.com'
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET() {
  const posts = getAllPosts()
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T14:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${esc(p.author)}</dc:creator>
      <description>${esc(p.excerpt)}</description>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`,
    )
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Mike Huber Blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Practical digital marketing and AI insights from Mike Huber.</description>
    <language>en-us</language>
${posts[0] ? `    <lastBuildDate>${new Date(`${posts[0].date}T14:00:00Z`).toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=0, s-maxage=3600' } })
}
