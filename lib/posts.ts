import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked, type Token, type Tokens } from 'marked'
import { formatPostHtml } from './postFormat'
import calendar from '@/data/blog-calendar.json'

// The blog. Posts are content/posts/<slug>.md (or .mdx) with front matter: title, date (YYYY-MM-DD), excerpt,
// description (optional), author, tags, cta (optional, e.g. /training), ctaLabel (optional), tool (optional, a path on
// marketingfieldguide.ai such as /swot), toolName (optional), coverImage (optional), updated (optional).
// When cta or tool is missing, data/blog-calendar.json (the Q1 2027 content calendar) fills it in by slug.
//
// Scheduled publishing (Nov 10, 2026): a post shows only once its date is today or earlier, in BLOG_TZ
// (default America/Chicago). The blog pages, sitemap and RSS revalidate hourly, so a post appears on its date with
// no code change or redeploy. To review future posts locally only, set BLOG_SHOW_SCHEDULED=1 (never in Netlify).

const postsDir = path.join(process.cwd(), 'content', 'posts')
export const BLOG_TZ = process.env.BLOG_TZ || 'America/Chicago'
const MFG = 'https://marketingfieldguide.ai'
export const mfgUrl = (pathName: string, content: string) =>
  `${MFG}${pathName}?utm_source=mikehuber.com&utm_medium=referral&utm_campaign=q1-2027&utm_content=${encodeURIComponent(content)}`

export interface PostMeta {
  slug: string
  title: string
  date: string
  updated?: string
  excerpt: string
  description: string
  author: string
  tags: string[]
  coverImage?: string
  cta: string
  ctaLabel?: string
  tool?: string
  toolName?: string
  readingMinutes: number
}

export interface Post extends PostMeta {
  content: string
  /** Rendered HTML for .md posts; .mdx posts render through MDXRemote instead. */
  html?: string
  /** Questions and answers from the post's "## FAQ" section, for FAQPage JSON-LD. */
  faq: { q: string; a: string }[]
  format: 'md' | 'mdx'
}

/** Today as YYYY-MM-DD in the blog's time zone. */
export function today(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: BLOG_TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
}

// YAML turns an unquoted 2026-11-16 into a Date; quoted dates stay strings. Normalize both to YYYY-MM-DD.
function ymd(v: unknown): string {
  if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString().slice(0, 10)
  const s = String(v ?? '').trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10)
  const d = new Date(s)
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
}

export const isPublished = (date: string) => process.env.BLOG_SHOW_SCHEDULED === '1' || (!!date && date <= today())

function slugify(filename: string): string {
  return filename.replace(/\.mdx?$/, '')
}

function files(): string[] {
  if (!fs.existsSync(postsDir)) return []
  return fs.readdirSync(postsDir).filter((f) => /\.mdx?$/.test(f) && !f.startsWith('_'))
}

function load(filename: string): Post {
  const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
  const { data, content } = matter(raw)
  const slug = slugify(filename)
  const cal = (calendar as Record<string, { cta?: string; tool?: string }>)[slug] ?? {}
  const format = filename.endsWith('.mdx') ? 'mdx' : 'md'
  const excerpt = String(data.excerpt ?? data.description ?? '')
  return {
    slug,
    title: data.title ?? 'Untitled',
    date: ymd(data.date),
    updated: ymd(data.updated) || undefined,
    excerpt,
    description: String(data.description ?? excerpt),
    author: data.author ?? 'Mike Huber',
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: data.coverImage ?? undefined,
    cta: String(data.cta ?? cal.cta ?? '/work-with-me'),
    ctaLabel: data.ctaLabel ? String(data.ctaLabel) : undefined,
    tool: data.tool ? String(data.tool) : cal.tool,
    toolName: data.toolName ? String(data.toolName) : undefined,
    readingMinutes: Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 230)),
    content,
    // Plain .md posts render with marked, so AI prompts with {braces} or <angle brackets> can't break an MDX compile.
    html: format === 'md' ? formatPostHtml(marked.parse(content, { async: false, gfm: true }) as string) : undefined,
    faq: extractFaq(content),
    format,
  }
}

function toMeta(p: Post): PostMeta {
  const m: Partial<Post> = { ...p }
  delete m.content; delete m.html; delete m.format; delete m.faq
  return m as PostMeta
}

/** Published posts only (date today or earlier), newest first. */
export function getAllPosts(): PostMeta[] {
  return files()
    .map(load)
    .filter((p) => isPublished(p.date))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)))
    .map(toMeta)
}

/** Every post, scheduled ones included, newest first (for the admin list). */
export function getAllPostsIncludingScheduled(): (PostMeta & { scheduled: boolean })[] {
  return files()
    .map(load)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .map((p) => ({ ...toMeta(p), scheduled: !isPublished(p.date) }))
}

/** A published post, or null if it doesn't exist or its date hasn't arrived. */
export function getPost(slug: string): Post | null {
  const filename = [`${slug}.mdx`, `${slug}.md`].find((f) => fs.existsSync(path.join(postsDir, f)))
  if (!filename) return null
  const post = load(filename)
  return isPublished(post.date) ? post : null
}

/** Slugs of published posts (for generateStaticParams). */
export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}

export const formatPostDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })

/** A short label for a post's call to action, from its path. */
export function ctaLabel(p: PostMeta): string {
  if (p.ctaLabel) return p.ctaLabel
  const labels: Record<string, string> = {
    '/work-with-me': 'Work with Mike', '/training': 'Team training with Mike', '/audit': 'Get a free marketing audit',
    '/readiness': 'Take the AI readiness check', '/website-packages': 'See website packages', '/speaking': 'Book Mike to speak', '/contact': 'Talk with Mike',
  }
  return labels[p.cta] ?? 'Work with Mike'
}

// FAQ for FAQPage JSON-LD (Nov 11, 2026; same rule as marketingfieldguide.ai): a "## FAQ" or
// "## Frequently asked questions" section, each question an ### heading (or a bold line ending in "?") followed by its answer.
function plain(md: string) {
  return md.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`>#]+/g, '').replace(/\s+/g, ' ').trim()
}
export function extractFaq(md: string): { q: string; a: string }[] {
  const tokens = marked.lexer(md)
  const start = tokens.findIndex((t) => t.type === 'heading' && (t as Tokens.Heading).depth <= 3 && /^(faqs?|frequently asked questions)\b/i.test(plain((t as Tokens.Heading).text)))
  if (start < 0) return []
  const depth = (tokens[start] as Tokens.Heading).depth
  const out: { q: string; a: string[] }[] = []
  for (const t of tokens.slice(start + 1) as Token[]) {
    if (t.type === 'heading' && (t as Tokens.Heading).depth <= depth) break
    if (t.type === 'heading') { out.push({ q: plain((t as Tokens.Heading).text), a: [] }); continue }
    if (t.type === 'paragraph') {
      const m = (t as Tokens.Paragraph).text.match(/^\*\*(.+?\?)\*\*\s*([\s\S]*)$/)
      if (m) { out.push({ q: plain(m[1]), a: m[2] ? [plain(m[2])] : [] }); continue }
    }
    if (out.length && 'raw' in t && t.type !== 'space' && t.type !== 'code' && t.type !== 'hr') out[out.length - 1].a.push(plain(t.raw))
  }
  return out.filter((f) => f.q && f.a.join('').length > 0).map((f) => ({ q: f.q, a: f.a.join(' ') }))
}
