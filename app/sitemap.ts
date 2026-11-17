import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

// sitemap.xml (Nov 10, 2026): public pages and every published blog post. Rebuilt hourly so scheduled posts are
// listed on their date. Unlisted pages (/todd, /arnie, /readiness/<token>, /admin) are left out on purpose.
export const revalidate = 3600

const SITE = 'https://mikehuber.com'
<<<<<<< HEAD
const PAGES = ['', 'about', 'work-with-me', 'speaking', 'speaking/media-kit', 'workshops', 'frameworks', 'books/business-transformation-ai-marketing', 'training', 'content-marketing', 'website-packages', 'photography', 'testimonials', 'audit', 'contact', 'book', 'books', 'blog', 'privacy']
=======
const PAGES = ['', 'about', 'work-with-me', 'speaking', 'training', 'content-marketing', 'website-packages', 'photography', 'testimonials', 'audit', 'contact', 'book', 'blog', 'privacy']
>>>>>>> ceb7e94abb2a092f0c7d5ff3613819998bdb53bd

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  return [
    ...PAGES.map((p) => ({
      url: p ? `${SITE}/${p}` : SITE,
      changeFrequency: (p === '' || p === 'blog' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: p === '' ? 1 : p === 'work-with-me' || p === 'blog' ? 0.8 : 0.6,
      ...(p === 'blog' && posts[0] ? { lastModified: posts[0].date } : {}),
    })),
    ...posts.map((p) => ({ url: `${SITE}/blog/${p.slug}`, lastModified: p.updated ?? p.date, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
