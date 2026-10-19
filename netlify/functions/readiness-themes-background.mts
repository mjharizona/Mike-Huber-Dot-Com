// Netlify background function: summarizes a team's open-ended answers into themes.
// Runs for up to 15 minutes; the caller gets a 202 right away.
import { createHash } from 'node:crypto'
import { getAssessment, getResponses, saveAssessment } from '../../lib/readinessStore'
import { summarizeThemes } from '../../lib/readinessEmail'

export default async (req: Request) => {
  const apiKey = process.env.RESEND_API_KEY || process.env.ANTHROPIC_API_KEY || ''
  const secret = createHash('sha256').update(`bt-readiness:${apiKey}`).digest('hex')
  if (req.headers.get('x-readiness-secret') !== secret) {
    console.warn('Readiness themes: bad secret')
    return
  }
  const { id } = (await req.json().catch(() => ({}))) as { id?: string }
  const a = id ? await getAssessment(id) : null
  if (!a) return
  const themes = await summarizeThemes(await getResponses(a.id))
  if (!themes) return
  const fresh = (await getAssessment(a.id)) || a
  fresh.themes = themes
  await saveAssessment(fresh)
}
