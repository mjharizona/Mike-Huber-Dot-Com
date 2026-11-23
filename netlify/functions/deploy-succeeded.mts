// IndexNow (Nov 23, 2026). Netlify runs this function by itself after every successful deploy (the file name
// "deploy-succeeded" is the trigger; nobody can call it from the web). On a production deploy it reads the live
// sitemap.xml and tells the IndexNow search engines (Bing, Yandex, Seznam, Naver and others; Bing feeds ChatGPT
// search) which pages are new or changed, so they recrawl them within hours instead of weeks.
// Google doesn't use IndexNow: submit the sitemap in Google Search Console for Google.
// A page is sent when it is new, when its <lastmod> changed, or when it hasn't been sent for 7 days (pages without a
// lastmod still get picked up after an edit). What was sent is kept in the Netlify Blobs store "indexnow".
// The key below is public by design: IndexNow checks it against public/<key>.txt on this site.
import { getStore } from '@netlify/blobs'

const SITE = 'https://mikehuber.com'
const KEY = 'be6683803ed8a7e9c3e0a76d956b4f4d'
const RESEND_DAYS = 7

type Sent = Record<string, { lastmod: string; sent: number }>

export default async (req: Request) => {
  const body = await req.json().catch(() => ({}))
  const deploy = body?.payload ?? {}
  if (deploy.context && deploy.context !== 'production') {
    console.log(`IndexNow: skipped (${deploy.context} deploy)`)
    return new Response('skipped')
  }

  const host = new URL(SITE).host
  const res = await fetch(`${SITE}/sitemap.xml`, { headers: { 'cache-control': 'no-cache' } })
  if (!res.ok) {
    console.warn(`IndexNow: sitemap.xml returned ${res.status}`)
    return new Response('no sitemap')
  }
  const xml = await res.text()
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((m) => ({
      loc: (m[1].match(/<loc>\s*([^<]+?)\s*<\/loc>/) || [])[1] || '',
      lastmod: (m[1].match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/) || [])[1] || '',
    }))
    .filter((e) => {
      try { return new URL(e.loc).host === host } catch { return false }
    })

  const store = getStore('indexnow')
  const prev = ((await store.get('sent', { type: 'json' })) as Sent | null) || {}
  const now = Date.now()
  const due = entries.filter((e) => {
    const p = prev[e.loc]
    return !p || p.lastmod !== e.lastmod || now - p.sent > RESEND_DAYS * 864e5
  })
  if (!due.length) {
    console.log(`IndexNow: nothing new or changed (${entries.length} pages in the sitemap)`)
    return new Response('nothing to send')
  }

  const out = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: due.slice(0, 10000).map((e) => e.loc) }),
  })
  console.log(`IndexNow: sent ${due.length} of ${entries.length} pages, response ${out.status}`)
  if (out.ok) {
    for (const e of due) prev[e.loc] = { lastmod: e.lastmod, sent: now }
    await store.setJSON('sent', prev)
  } else {
    console.warn(`IndexNow: ${await out.text().catch(() => '')}`)
  }
  return new Response(`sent ${due.length}`)
}
