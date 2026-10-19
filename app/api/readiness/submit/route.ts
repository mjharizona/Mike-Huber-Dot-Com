import { NextRequest, NextResponse } from 'next/server'
import { clean } from '@/lib/readiness'
import { addResponse, resolveToken } from '@/lib/readinessStore'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 30
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json()
    // Spam trap: pretend it worked. The IP is used only for this in-memory rate limit and is never stored.
    if (typeof b.website === 'string' && b.website.trim()) return NextResponse.json({ success: true })
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (limited(ip)) return NextResponse.json({ error: 'Too many submissions from here. Please try again later.' }, { status: 429 })
    const ref = await resolveToken(String(b.token || ''))
    if (!ref || ref.kind === 'report') return NextResponse.json({ error: 'This assessment link isn’t valid.' }, { status: 404 })
    if (ref.assessment.status !== 'open') return NextResponse.json({ error: 'This assessment is closed.' }, { status: 409 })
    const s = clean(b, ref.kind)
    if (typeof s === 'string') return NextResponse.json({ error: s }, { status: 400 })
    await addResponse(ref.assessment.id, s)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Readiness submit error', e)
    return NextResponse.json({ error: 'Something went wrong saving your answers. Please try again.' }, { status: 500 })
  }
}
