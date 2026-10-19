// Storage for the Team Readiness Assessment.
// On Netlify: Netlify Blobs (no extra account or database needed).
// In local development only: JSON files under .data/readiness (never used in production).
// Relative imports only, so a Netlify function can bundle it.
import { randomBytes, randomUUID } from 'node:crypto'
import type { Group, Submission } from './readiness'

export type Assessment = {
  id: string
  org: string
  sponsorName: string
  sponsorEmail: string
  teamSize: number | null
  workshopDate: string
  note: string
  compareTo: string | null // an earlier assessment for the same organization, for before-and-after
  leaderToken: string
  teamToken: string
  reportToken: string
  status: 'open' | 'closed'
  createdAt: string
  sentAt: string | null
  themes: Themes | null
}
export type Themes = { at: string; n: number; worries: Theme[]; hopes: Theme[]; workshop: Theme[] }
export type Theme = { theme: string; detail: string; mentions: number }

type KV = {
  get(key: string): Promise<string | null>
  set(key: string, value: string): Promise<void>
  del(key: string): Promise<void>
  list(prefix: string): Promise<string[]>
}

let kv: KV | null = null

async function store(): Promise<KV> {
  if (kv) return kv
  const local = process.env.READINESS_LOCAL === '1' || (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY_BLOBS_CONTEXT && !process.env.NETLIFY)
  if (local) {
    const fs = await import('node:fs/promises')
    const path = await import('node:path')
    const dir = path.join(process.cwd(), '.data', 'readiness')
    const file = (k: string) => path.join(dir, encodeURIComponent(k) + '.json')
    kv = {
      async get(k) { try { return await fs.readFile(file(k), 'utf8') } catch { return null } },
      async set(k, v) { await fs.mkdir(dir, { recursive: true }); await fs.writeFile(file(k), v, 'utf8') },
      async del(k) { try { await fs.unlink(file(k)) } catch {} },
      async list(prefix) {
        try { return (await fs.readdir(dir)).map((f) => decodeURIComponent(f.replace(/\.json$/, ''))).filter((k) => k.startsWith(prefix)) } catch { return [] }
      },
    }
    return kv
  }
  const { getStore } = await import('@netlify/blobs')
  const s = getStore({ name: 'readiness', consistency: 'strong' })
  kv = {
    async get(k) { return (await s.get(k, { type: 'text' })) ?? null },
    async set(k, v) { await s.set(k, v) },
    async del(k) { await s.delete(k) },
    async list(prefix) {
      const out: string[] = []
      const { blobs } = await s.list({ prefix })
      for (const b of blobs) out.push(b.key)
      return out
    },
  }
  return kv
}

const token = (n = 12) => randomBytes(n).toString('base64url').replace(/[-_]/g, '').slice(0, n)

async function getJSON<T>(k: string): Promise<T | null> {
  const t = await (await store()).get(k)
  if (!t) return null
  try { return JSON.parse(t) as T } catch { return null }
}
async function setJSON(k: string, v: unknown) {
  await (await store()).set(k, JSON.stringify(v))
}

export async function createAssessment(input: { org: string; sponsorName: string; sponsorEmail: string; teamSize: number | null; workshopDate: string; note: string; compareTo: string | null }) {
  const a: Assessment = {
    id: token(10),
    ...input,
    leaderToken: token(),
    teamToken: token(),
    reportToken: token(16),
    status: 'open',
    createdAt: new Date().toISOString(),
    sentAt: null,
    themes: null,
  }
  await setJSON(`org/${a.id}`, a)
  await setJSON(`tok/${a.leaderToken}`, { id: a.id, kind: 'leader' })
  await setJSON(`tok/${a.teamToken}`, { id: a.id, kind: 'team' })
  await setJSON(`tok/${a.reportToken}`, { id: a.id, kind: 'report' })
  return a
}

export async function getAssessment(id: string) {
  return getJSON<Assessment>(`org/${id}`)
}
export async function saveAssessment(a: Assessment) {
  await setJSON(`org/${a.id}`, a)
}
export async function listAssessments() {
  const keys = await (await store()).list('org/')
  const all = await Promise.all(keys.map((k) => getJSON<Assessment>(k)))
  return all.filter((a): a is Assessment => !!a).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function resolveToken(t: string) {
  if (!/^[A-Za-z0-9]{8,40}$/.test(t)) return null
  const ref = await getJSON<{ id: string; kind: Group | 'report' }>(`tok/${t}`)
  if (!ref) return null
  const a = await getAssessment(ref.id)
  return a ? { assessment: a, kind: ref.kind } : null
}

// Responses carry no name, email or IP address: only the group (leadership or team) and the answers.
export async function addResponse(id: string, s: Submission) {
  await setJSON(`resp/${id}/${randomUUID()}`, { ...s, at: new Date().toISOString().slice(0, 10) })
}
export async function getResponses(id: string) {
  const keys = await (await store()).list(`resp/${id}/`)
  const all = await Promise.all(keys.map((k) => getJSON<Submission>(k)))
  return all.filter((s): s is Submission => !!s)
}
export async function countResponses(id: string) {
  const r = await getResponses(id)
  return { total: r.length, leader: r.filter((x) => x.group === 'leader').length, team: r.filter((x) => x.group === 'team').length }
}

export async function deleteAssessment(a: Assessment) {
  const s = await store()
  const keys = await s.list(`resp/${a.id}/`)
  await Promise.all(keys.map((k) => s.del(k)))
  await Promise.all([a.leaderToken, a.teamToken, a.reportToken].map((t) => s.del(`tok/${t}`)))
  await s.del(`org/${a.id}`)
}
