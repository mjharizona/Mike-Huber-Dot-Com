// Shared logic for the free Marketing and Website Audit (/audit).
// Used by the page, the API routes and the Netlify background function, so keep it free of
// browser-only or Node-only imports.

export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || '/contact'
export const BOOK_URL = '/content-marketing'
export const FULL_AUDIT_URL = 'https://marketingfieldguide.ai'

export type Discipline = {
  id: string
  name: string
  chapter: string
  q: string
  ai?: boolean
}

export const DISCIPLINES: Discipline[] = [
  { id: 'strategy', name: 'Strategy', chapter: 'Ch. 2', q: 'We have a written marketing plan with goals and a budget.' },
  { id: 'content', name: 'Content', chapter: 'Ch. 9', q: 'We publish useful content on a schedule we actually keep.' },
  { id: 'seo', name: 'SEO and AI search', chapter: 'Ch. 6', q: 'We show up in Google and in AI answers for our main services.' },
  { id: 'paid', name: 'Paid media', chapter: 'Ch. 12', q: 'We know our cost per lead from paid ads.' },
  { id: 'social', name: 'Social media', chapter: 'Ch. 13', q: 'We post consistently on the one or two platforms where our buyers are.' },
  { id: 'email', name: 'Email and automation', chapter: 'Ch. 16', q: 'Every lead goes into one CRM and gets a fast, automatic follow-up.' },
  { id: 'video', name: 'Video', chapter: 'Ch. 11', q: 'We use short videos to answer our buyers’ top questions.' },
  { id: 'web', name: 'Website and conversion', chapter: 'Ch. 14', q: 'Our website turns visitors into inquiries, and we track the rate.' },
  { id: 'local', name: 'Local SEO and reviews', chapter: 'Ch. 8', q: 'Our Google Business Profile is complete, and we ask every customer for a review.' },
  { id: 'analytics', name: 'Analytics', chapter: 'Ch. 19', q: 'We know which channels bring in our best leads.' },
  { id: 'ai', name: 'AI fluency', chapter: 'Ch. 3', q: 'Our team uses AI every week, with ground rules for what people check.', ai: true },
]

export const SCALE = ['Not yet', 'Started', 'Mostly', 'Done well'] as const

export const BUDGETS = ['Under $1,000 a month', '$1,000 to $5,000 a month', '$5,000 to $15,000 a month', 'Over $15,000 a month', 'Not sure yet'] as const
export const TIMELINES = ['This month', 'In the next three months', 'Later this year', 'Just exploring'] as const

export type ScanCheck = { id: string; label: string; pass: boolean | null; detail: string; chapter: string; ai?: boolean }
export type ScanResult = { url: string; finalUrl: string; checks: ScanCheck[]; fetchedAt: string; error?: string }
export type SpeedResult = { score: number | null; lcp?: string; cls?: string; source?: 'field' | 'lab'; error?: string }

export type AuditAnswers = Record<string, number | null>

export function marketingScore(a: AuditAnswers): number | null {
  const ids = DISCIPLINES.filter((d) => !d.ai).map((d) => d.id)
  const v = ids.map((id) => a[id]).filter((x): x is number => typeof x === 'number')
  if (!v.length) return null
  return Math.round((v.reduce((s, x) => s + x, 0) / (ids.length * 3)) * 100)
}

export function websiteScore(scan?: ScanResult | null, speed?: SpeedResult | null): number | null {
  const checks = (scan?.checks || []).filter((c) => c.pass !== null)
  const parts: number[] = checks.map((c) => (c.pass ? 1 : 0))
  if (speed && typeof speed.score === 'number') parts.push(speed.score / 100)
  if (!parts.length) return null
  return Math.round((parts.reduce((s, x) => s + x, 0) / parts.length) * 100)
}

export function aiLevel(a: AuditAnswers): number | null {
  const v = a.ai
  return typeof v === 'number' ? v + 1 : null
}
export const AI_LEVELS = ['Not started', 'Experimenting', 'Using regularly', 'Integrated']

export function band(p: number | null) {
  if (p === null) return 'Not scored'
  if (p >= 70) return 'Strong'
  if (p >= 40) return 'Building'
  return 'Gap'
}

export type Fix = { title: string; area: string; chapter: string; ai?: boolean; key: string }

const ACTIONS: Record<string, string> = {
  strategy: 'Write a one-page plan: three goals with numbers, your ideal customer, and a monthly budget.',
  content: 'Pick one hub topic per main service and publish on a schedule you can keep for 90 days.',
  seo: 'Give each service its own page, and check whether AI tools name you when asked about your category and city.',
  paid: 'Track cost per lead by channel before you spend another dollar, then move budget to what works.',
  social: 'Narrow to the one or two platforms where your buyers are, and post on a schedule you can keep.',
  email: 'Put every lead into one CRM and set an automatic reply within the hour.',
  video: 'Record three short videos that answer your most-asked buyer questions.',
  web: 'Give every page one clear next step and start tracking your conversion rate.',
  local: 'Complete your Google Business Profile and ask every customer for a review.',
  analytics: 'Set up lead tracking by channel and review a one-page report each month.',
  ai: 'Write simple AI ground rules, then pick one weekly task for the team to do with AI.',
  https: 'Move the whole site to https so browsers stop warning visitors.',
  title: 'Rewrite the home page title to name your main service and location.',
  description: 'Add a meta description that tells searchers what you do and why to click.',
  h1: 'Give the home page one clear main headline that says what you do.',
  viewport: 'Fix mobile display: the page isn’t set up to fit phone screens.',
  schema: 'Add business schema (LocalBusiness or Organization) so search engines and AI tools read your details correctly.',
  phone: 'Add a tap-to-call phone number near the top of the page.',
  form: 'Add a short contact form or a clear contact button on the home page.',
  social_preview: 'Add a share image and title so links to your site look right on social media.',
  alt: 'Describe your images with alt text, for accessibility and search.',
  noindex: 'Remove the noindex tag: it tells search engines to hide this page.',
  words: 'Add more useful text to the home page: who you serve, what you do and what happens next.',
  speed: 'Speed up the mobile site: compress images and remove heavy scripts.',
}

export function fixAction(key: string) {
  return ACTIONS[key] || ''
}

export function fixes(a: AuditAnswers, scan?: ScanResult | null, speed?: SpeedResult | null): Fix[] {
  const out: (Fix & { rank: number })[] = []
  DISCIPLINES.forEach((d) => {
    const v = a[d.id]
    if (typeof v === 'number' && v <= 1) out.push({ key: d.id, title: ACTIONS[d.id], area: d.name, chapter: d.chapter, ai: d.ai, rank: v * 10 + (d.ai ? 2 : 0) })
  })
  ;(scan?.checks || []).forEach((c) => {
    if (c.pass === false) out.push({ key: c.id, title: ACTIONS[c.id] || c.label, area: 'Website', chapter: c.chapter, ai: c.ai, rank: ['https', 'noindex', 'viewport', 'phone', 'form'].includes(c.id) ? 1 : 5 })
  })
  if (speed && typeof speed.score === 'number' && speed.score < 50) out.push({ key: 'speed', title: ACTIONS.speed, area: 'Website', chapter: 'Ch. 14', rank: 4 })
  return out.sort((x, y) => x.rank - y.rank).map(({ rank, ...f }) => f)
}

// A plan built from the scores, used when AI isn't available.
export function basicPlan(list: Fix[]) {
  const months = [list.slice(0, 2), list.slice(2, 4), list.slice(4, 6)]
  return months
    .map((m, i) => ({ month: `Month ${i + 1}`, items: m.map((f) => `${f.title} (${f.area}, ${f.chapter})`) }))
    .filter((m) => m.items.length)
}
