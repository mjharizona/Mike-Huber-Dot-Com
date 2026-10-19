import { NextRequest, NextResponse } from 'next/server'
import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'
import type { ScanCheck, ScanResult } from '@/lib/audit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 20
}

// Block requests to private, loopback and link-local addresses so the scanner
// can't be used to reach internal services.
function privateIp(ip: string) {
  if (isIP(ip) === 4) {
    const [a, b] = ip.split('.').map(Number)
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224
  }
  const v = ip.toLowerCase()
  return v === '::1' || v === '::' || v.startsWith('fc') || v.startsWith('fd') || v.startsWith('fe80') || v.startsWith('::ffff:127.') || v.startsWith('::ffff:10.') || v.startsWith('::ffff:192.168.')
}

async function safeUrl(raw: string) {
  let u: URL
  try {
    u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
  } catch {
    throw new Error('That doesn’t look like a web address.')
  }
  if (!['http:', 'https:'].includes(u.protocol)) throw new Error('Use a web address that starts with http or https.')
  if (u.port && !['80', '443'].includes(u.port)) throw new Error('That address uses an unusual port.')
  if (!u.hostname.includes('.') || u.hostname.endsWith('.local') || u.hostname === 'localhost') throw new Error('Use your public website address.')
  const addrs = await lookup(u.hostname, { all: true }).catch(() => [])
  if (!addrs.length) throw new Error('We couldn’t find that website. Check the spelling.')
  if (addrs.some((a) => privateIp(a.address))) throw new Error('Use your public website address.')
  return u
}

async function fetchPage(start: URL) {
  let url = start
  for (let i = 0; i < 5; i++) {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 7000)
    const res = await fetch(url, {
      redirect: 'manual',
      signal: ctrl.signal,
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; MikeHuberAudit/1.0; +https://mikehuber.com/audit)', accept: 'text/html,*/*' },
    }).finally(() => clearTimeout(t))
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      url = await safeUrl(new URL(res.headers.get('location')!, url).toString())
      continue
    }
    const reader = res.body?.getReader()
    let html = ''
    if (reader) {
      const dec = new TextDecoder()
      let size = 0
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        size += value.length
        html += dec.decode(value, { stream: true })
        if (size > 1_500_000) {
          reader.cancel().catch(() => {})
          break
        }
      }
    }
    return { url, status: res.status, html }
  }
  throw new Error('That site redirects too many times.')
}

const strip = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
function meta(html: string, attr: string, name: string) {
  const re = new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]*>`, 'i')
  const tag = html.match(re)?.[0]
  return tag?.match(/content=["']([^"']*)["']/i)?.[1]?.trim() ?? null
}

function analyze(finalUrl: URL, status: number, html: string): ScanCheck[] {
  const head = html.slice(0, 200_000)
  const title = strip(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '')
  const desc = meta(head, 'name', 'description')
  const h1s = Array.from(html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/gi)).map((m) => strip(m[0]))
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(head)
  const robots = (meta(head, 'name', 'robots') || '').toLowerCase()
  const ld = Array.from(html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)).map((m) => m[1]).join(' ')
  const types = Array.from(ld.matchAll(/"@type"\s*:\s*(\[[^\]]*\]|"[^"]*")/g)).map((m) => m[1]).join(' ')
  const bizSchema = /LocalBusiness|Organization|Corporation|Store|Restaurant|Service|Contractor|Plumber|Electrician|Dentist|Attorney|LegalService|MedicalBusiness|HomeAndConstructionBusiness|ProfessionalService|AutomotiveBusiness|FinancialService|RealEstateAgent|HealthAndBeautyBusiness|FoodEstablishment/i.test(types)
  const tel = /href=["']tel:/i.test(html)
  const form = /<form[\s>]/i.test(html) || /href=["'][^"']*contact[^"']*["']/i.test(html)
  const ogImage = !!meta(head, 'property', 'og:image')
  const imgs = Array.from(html.matchAll(/<img\b[^>]*>/gi)).map((m) => m[0])
  const withAlt = imgs.filter((t) => /\balt=["'][^"']+["']/i.test(t)).length
  const body = html.match(/<body[\s\S]*<\/body>/i)?.[0] || html
  const words = strip(body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/gi, ' ')).split(' ').filter(Boolean).length
  const jsOnly = words < 60 && /<div id=["'](root|app|__next)["']/i.test(html)

  const c = (id: string, label: string, pass: boolean | null, detail: string, chapter: string, ai = false): ScanCheck => ({ id, label, pass, detail, chapter, ai })
  return [
    c('https', 'Secure connection (https)', finalUrl.protocol === 'https:', finalUrl.protocol === 'https:' ? 'The site loads securely.' : 'The site loads without https. Browsers flag it as not secure.', 'Ch. 14'),
    c('noindex', 'Visible to search engines', !robots.includes('noindex'), robots.includes('noindex') ? 'The page tells search engines not to index it.' : 'No noindex tag found.', 'Ch. 6'),
    c('title', 'Page title', title.length >= 15 && title.length <= 70, title ? `“${title.slice(0, 90)}” (${title.length} characters). Aim for 15 to 70, naming your service and area.` : 'No page title found.', 'Ch. 6'),
    c('description', 'Meta description', !!desc && desc.length >= 50 && desc.length <= 170, desc ? `${desc.length} characters. Aim for about 50 to 160.` : 'No meta description found. Google writes its own, often badly.', 'Ch. 6'),
    c('h1', 'One clear main headline', h1s.length >= 1 && h1s.length <= 2 && h1s[0].length > 3, h1s.length ? `${h1s.length} main headline${h1s.length > 1 ? 's' : ''}: “${h1s[0].slice(0, 90)}”` : 'No main (H1) headline found.', 'Ch. 14'),
    c('viewport', 'Set up for phones', viewport, viewport ? 'The page is set to fit phone screens.' : 'No mobile viewport tag, so the page may not fit phone screens.', 'Ch. 14'),
    c('phone', 'Tap-to-call phone number', tel, tel ? 'A tap-to-call link was found.' : 'No tap-to-call link found on the home page.', 'Ch. 14'),
    c('form', 'Contact form or contact link', form, form ? 'A form or contact link was found.' : 'No form or contact link found on the home page.', 'Ch. 14'),
    c('schema', 'Business schema for search and AI', bizSchema, bizSchema ? 'Business details are marked up for search engines and AI tools.' : 'No business schema found. Search engines and AI tools have to guess your details.', 'Ch. 6', true),
    c('social_preview', 'Share image for social links', ogImage, ogImage ? 'A share image is set.' : 'No share image set, so links to your site look plain on social media.', 'Ch. 13'),
    c('alt', 'Image descriptions (alt text)', imgs.length ? withAlt / imgs.length >= 0.8 : null, imgs.length ? `${withAlt} of ${imgs.length} images have alt text.` : 'No images found on the page.', 'Ch. 6'),
    c('words', 'Enough useful text', jsOnly ? null : words >= 250, jsOnly ? 'The page builds its text with JavaScript, so we couldn’t count it.' : `About ${words} words on the home page.`, 'Ch. 9'),
  ].map((x) => (status >= 400 ? { ...x, pass: null } : x))
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (limited(ip)) return NextResponse.json({ error: 'Too many scans from here. Please try again in an hour.' }, { status: 429 })
    const b = await req.json().catch(() => ({}))
    const raw = typeof b.url === 'string' ? b.url.trim().slice(0, 300) : ''
    if (!raw) return NextResponse.json({ error: 'Enter your website address.' }, { status: 400 })
    const start = await safeUrl(raw)
    const page = await fetchPage(start)
    const result: ScanResult = {
      url: start.toString(),
      finalUrl: page.url.toString(),
      checks: analyze(page.url, page.status, page.html),
      fetchedAt: new Date().toISOString(),
      ...(page.status >= 400 ? { error: `The site answered with an error (${page.status}), so most checks couldn’t run.` } : {}),
    }
    return NextResponse.json(result)
  } catch (e) {
    const msg = e instanceof Error && e.name === 'AbortError' ? 'The site took too long to answer.' : e instanceof TypeError ? 'We couldn’t reach that website. Check the address and try again.' : e instanceof Error ? e.message : 'We couldn’t scan that site.'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
