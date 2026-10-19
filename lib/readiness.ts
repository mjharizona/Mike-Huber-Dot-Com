// Team Readiness Assessment: questions and scoring.
// Shared by the browser (form, personal results, PDF) and the server (composite report).
// Relative imports only, so a Netlify function can bundle it.

export type Group = 'leader' | 'team'

export type Item = { id: string; text: string; chapter: string; isNew?: boolean }

export const SCALE_SKILL = ['', 'No experience', 'Beginner', 'Can do it with help', 'Can do it on my own', 'Could teach it']
export const SCALE_AGREE = ['', 'Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
// Chapter 3 asks "how true each statement is for your organization today."
export const SCALE_TRUE = ['', 'Not true', 'Slightly true', 'Somewhat true', 'Mostly true', 'Completely true']
export const SCALE_DO = ['', 'Not at all', 'Poorly', 'Okay', 'Well', 'Very well']
export const SCALE_IMPORTANT = ['', 'Not important', 'Slightly', 'Moderately', 'Very', 'Critical']

// Section 1. Chapter 3: "Your personal digital marketing maturity" (16 items)
export const SKILLS: Item[] = [
  { id: 's1', text: 'Overall understanding of digital marketing', chapter: 'Ch 2' },
  { id: 's2', text: 'Knowledge and expertise in content marketing', chapter: 'Ch 9' },
  { id: 's3', text: 'Keyword research and on-page SEO, including optimizing for AI search', chapter: 'Ch 6–7' },
  { id: 's4', text: 'Creating and implementing backlink and digital PR strategies', chapter: 'Ch 6' },
  { id: 's5', text: 'Planning and managing paid media campaigns (search, social and video ads)', chapter: 'Ch 12' },
  { id: 's6', text: 'Developing and managing social media campaigns across channels and formats', chapter: 'Ch 13' },
  { id: 's7', text: 'Planning and producing video', chapter: 'Ch 11' },
  { id: 's8', text: 'Managing a Google Business Profile, local listings and online reviews', chapter: 'Ch 8' },
  { id: 's9', text: 'Analyzing and measuring campaigns, including attribution', chapter: 'Ch 19' },
  { id: 's10', text: 'Assessing channels and prioritizing campaigns based on goals', chapter: 'Ch 20' },
  { id: 's11', text: 'Identifying target audiences and creating personas', chapter: 'Ch 5' },
  { id: 's12', text: 'Creating and optimizing landing pages', chapter: 'Ch 14' },
  { id: 's13', text: 'Using marketing automation tools', chapter: 'Ch 15–16' },
  { id: 's14', text: 'Creating and running lead nurture campaigns, including content and workflows', chapter: 'Ch 16' },
  { id: 's15', text: 'Writing effective prompts and getting quality output from AI tools', chapter: 'Ch 1, 25' },
  { id: 's16', text: 'Reviewing AI output for accuracy, brand voice and quality', chapter: 'Ch 1, 9' },
]

// Section 2. Chapter 3: six AI skills, plus the Chapter 1 ladder for the person.
export const AI_SKILLS: Item[] = [
  { id: 'a1', text: 'Briefing: I give AI full context (audience, goal, voice, examples) instead of one-line requests', chapter: 'Ch 3' },
  { id: 'a2', text: 'Evaluating: I quickly spot factual errors, generic thinking and off-brand language', chapter: 'Ch 3' },
  { id: 'a3', text: 'Iterating: I push back and refine in two or three rounds instead of accepting the first draft', chapter: 'Ch 3' },
  { id: 'a4', text: 'Choosing: I pick the right AI for the task, and know when not to use AI at all', chapter: 'Appendix A' },
  { id: 'a5', text: 'Protecting: I keep confidential and customer data out of tools that aren’t approved for it', chapter: 'Ch 22–23' },
  { id: 'a6', text: 'Systematizing: I turn a prompt that works into a reusable template or shared workflow', chapter: 'Ch 25' },
]
export const LADDER_ME = [
  'I haven’t started using AI for work',
  'I experiment with AI tools now and then, on my own',
  'I use AI regularly for some tasks, but without a set process',
  'AI is built into how I work, with guidelines and saved prompts',
]
export const LADDER_TEAM = [
  'We haven’t started',
  'A few of us experiment with ChatGPT or similar tools on our own',
  'We use AI regularly for some tasks, but there’s no shared process',
  'AI is built into our workflows, with guidelines and shared prompts',
]
export const LADDER_NAMES = ['Not started', 'Experimenting', 'Using regularly', 'Integrated']

// Section 3. Chapter 3: "Your organization's digital marketing maturity" (19 items)
export const ORG: Item[] = [
  { id: 'o1', text: 'We continuously monitor and measure the ROI of our digital marketing.', chapter: 'Ch 19' },
  { id: 'o2', text: 'We keep up with emerging digital marketing trends and technology.', chapter: 'Ch 3' },
  { id: 'o3', text: 'Leadership actively supports and resources digital marketing.', chapter: 'Ch 2' },
  { id: 'o4', text: 'Our marketing team is trained in current digital marketing tactics.', chapter: 'Ch 3' },
  { id: 'o5', text: 'We use an omnichannel approach to create, distribute and promote content.', chapter: 'Ch 13' },
  { id: 'o6', text: 'Our decisions are driven by data.', chapter: 'Ch 19' },
  { id: 'o7', text: 'Comprehensive keyword research informs our SEO strategy.', chapter: 'Ch 7' },
  { id: 'o8', text: 'Our paid media is planned, tracked to conversions and optimized regularly.', chapter: 'Ch 12' },
  { id: 'o9', text: 'We post consistently on social media and engage with our community.', chapter: 'Ch 13' },
  { id: 'o10', text: 'We actively manage our Google Business Profile and customer reviews.', chapter: 'Ch 8' },
  { id: 'o11', text: 'We test and optimize our website and landing pages for conversions.', chapter: 'Ch 14' },
  { id: 'o12', text: 'We have clear definitions for KPIs such as CPA, CPL, LTV and ROAS.', chapter: 'Ch 19' },
  { id: 'o13', text: 'We produce high-quality video that resonates with our audience.', chapter: 'Ch 11' },
  { id: 'o14', text: 'We optimize content, titles, H1 tags, meta descriptions and images for search.', chapter: 'Ch 6' },
  { id: 'o15', text: 'We repurpose content to maximize its reach and impact.', chapter: 'Ch 9–10' },
  { id: 'o16', text: 'We use triggers and segmented workflows in our lead nurture programs.', chapter: 'Ch 16' },
  { id: 'o17', text: 'We have written guidelines for how our team uses AI.', chapter: 'Ch 22' },
  { id: 'o18', text: 'AI is built into our workflows, not just used by individuals on their own.', chapter: 'Ch 25' },
  { id: 'o19', text: 'We track how our brand appears in AI search and AI assistants.', chapter: 'Ch 6' },
]

// Section 4 (new). The ten core disciplines: how well we do it, and how important it is.
export const DISCIPLINES: Item[] = [
  { id: 'd1', text: 'Strategy', chapter: 'Ch 2' },
  { id: 'd2', text: 'Content', chapter: 'Ch 9–10' },
  { id: 'd3', text: 'SEO and AI search', chapter: 'Ch 6–7' },
  { id: 'd4', text: 'Paid media', chapter: 'Ch 12' },
  { id: 'd5', text: 'Social media', chapter: 'Ch 13' },
  { id: 'd6', text: 'Email and marketing automation', chapter: 'Ch 15–17' },
  { id: 'd7', text: 'Video', chapter: 'Ch 11' },
  { id: 'd8', text: 'Website and conversion optimization', chapter: 'Ch 14' },
  { id: 'd9', text: 'Local SEO and reviews', chapter: 'Ch 8' },
  { id: 'd10', text: 'Analytics', chapter: 'Ch 19' },
]

// Section 5 (new). Change readiness, from Loren Ankarlo's change-management lens.
export const CHANGE: Item[] = [
  { id: 'c1', text: 'I understand why our company wants to change how we market.', chapter: 'Ch 22' },
  { id: 'c2', text: 'I understand how AI is likely to change my role.', chapter: 'Ch 1, 22' },
  { id: 'c3', text: 'I trust leadership to be straight with us about AI and jobs.', chapter: 'Ch 22' },
  { id: 'c4', text: 'I have time in my week to learn new tools and ways of working.', chapter: 'Ch 3' },
  { id: 'c5', text: 'I could raise a concern about a change without it counting against me.', chapter: 'Ch 22' },
  { id: 'c6', text: 'I’m ready to change how I do my own work.', chapter: 'Ch 22' },
]

// Section 6 (new). AI ground rules in practice.
export const RULES: Item[] = [
  { id: 'r1', text: 'I know which AI tools I’m allowed to use for work.', chapter: 'Ch 22' },
  { id: 'r2', text: 'I know what customer and company information must never go into an AI tool.', chapter: 'Ch 23' },
  { id: 'r3', text: 'A person checks the facts and approves anything AI helped create before it goes public.', chapter: 'Ch 1' },
  { id: 'r4', text: 'I know who to ask when I’m not sure whether a use of AI is okay.', chapter: 'Ch 22' },
]

export const OPEN = [
  { id: 'q1', text: 'What worries you most about the changes AI is bringing to marketing and to your work?' },
  { id: 'q2', text: 'What are you most hopeful about?' },
  { id: 'q3', text: 'What would make the workshop worth your time?' },
]

export type Answers = Record<string, number>
export type OpenAnswers = Record<string, string>

export type Submission = {
  group: Group
  answers: Answers // s*, a*, o*, d*p (performance), d*i (importance), c*, r*, ladderMe, ladderTeam
  open: OpenAnswers
}

export const ALL_RATED: string[] = [
  ...SKILLS.map((i) => i.id),
  ...AI_SKILLS.map((i) => i.id),
  'ladderMe',
  ...ORG.map((i) => i.id),
  'ladderTeam',
  ...DISCIPLINES.flatMap((d) => [`${d.id}p`, `${d.id}i`]),
  ...CHANGE.map((i) => i.id),
  ...RULES.map((i) => i.id),
]

export const BANDS: [number, string, string][] = [
  [1.7, 'Novice', 'Little or no experience. Start with training basics.'],
  [2.5, 'Beginner', 'Some exposure, but you need guidance to execute.'],
  [3.3, 'Intermediate', 'You can execute independently in most areas.'],
  [4.1, 'Advanced', 'You execute well and can teach others.'],
  [5, 'Expert', 'You set the standard and lead strategy.'],
]
export function band(avg: number | null) {
  if (avg === null || Number.isNaN(avg)) return { name: '–', meaning: '' }
  const r = Math.round(avg * 10) / 10
  const b = BANDS.find(([max]) => r <= max) || BANDS[BANDS.length - 1]
  return { name: b[1], meaning: b[2] }
}

export function mean(xs: number[]) {
  const v = xs.filter((x) => typeof x === 'number' && x >= 1 && x <= 5)
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null
}
export const r1 = (x: number | null) => (x === null ? '–' : x.toFixed(1))

export function avgOf(a: Answers, items: Item[], suffix = '') {
  return mean(items.map((i) => a[i.id + suffix]))
}

export type Scores = {
  skills: number | null
  ai: number | null
  org: number | null
  change: number | null
  rules: number | null
  ladderMe: number | null
  ladderTeam: number | null
}
export function scores(a: Answers): Scores {
  const lv = (x: unknown) => (typeof x === 'number' && x >= 1 && x <= 4 ? x : null)
  return {
    skills: avgOf(a, SKILLS),
    ai: avgOf(a, AI_SKILLS),
    org: avgOf(a, ORG),
    change: avgOf(a, CHANGE),
    rules: avgOf(a, RULES),
    ladderMe: lv(a.ladderMe),
    ladderTeam: lv(a.ladderTeam),
  }
}

// Personal strengths and gaps from the skills and AI skills sections.
export function strengthsGaps(a: Answers, n = 3) {
  const items = [...SKILLS, ...AI_SKILLS].map((i) => ({ ...i, v: a[i.id] })).filter((i) => typeof i.v === 'number')
  const sorted = [...items].sort((x, y) => y.v - x.v)
  return { strengths: sorted.slice(0, n), gaps: [...items].sort((x, y) => x.v - y.v).slice(0, n) }
}

// Validate a submission from the browser. Returns an error string or the clean submission.
export function clean(raw: unknown, group: Group): Submission | string {
  if (!raw || typeof raw !== 'object') return 'Missing answers.'
  const r = raw as { answers?: Record<string, unknown>; open?: Record<string, unknown> }
  const answers: Answers = {}
  for (const id of ALL_RATED) {
    const v = Number(r.answers?.[id])
    const max = id.startsWith('ladder') ? 4 : 5
    if (!Number.isInteger(v) || v < 1 || v > max) return 'Please answer every question.'
    answers[id] = v
  }
  const open: OpenAnswers = {}
  for (const q of OPEN) {
    const t = typeof r.open?.[q.id] === 'string' ? (r.open[q.id] as string).trim().slice(0, 1200) : ''
    if (t) open[q.id] = t
  }
  return { group, answers, open }
}

// ---------- Composite ----------
export const MIN_RESPONSES = 3

export type Composite = {
  n: number
  nLeader: number
  nTeam: number
  ready: boolean
  overall: Scores
  leader: Scores | null
  team: Scores | null
  spread: Record<'skills' | 'ai' | 'org' | 'change' | 'rules', { min: number; max: number } | null>
  bandCounts: Record<'skills' | 'org', number[]> // Novice..Expert counts
  ladderMeCounts: number[]
  ladderTeamCounts: number[]
  items: Record<string, number | null> // average per rated item
  leaderItems: Record<string, number | null>
  teamItems: Record<string, number | null>
  disciplines: { id: string; name: string; chapter: string; perf: number | null; imp: number | null; gap: number | null }[]
}

function groupScores(list: Submission[]): Scores | null {
  if (!list.length) return null
  const per = list.map((s) => scores(s.answers))
  const m = (k: keyof Scores) => mean(per.map((p) => p[k] as number).filter((x) => x !== null))
  return { skills: m('skills'), ai: m('ai'), org: m('org'), change: m('change'), rules: m('rules'), ladderMe: m('ladderMe'), ladderTeam: m('ladderTeam') }
}
function itemAverages(list: Submission[]) {
  const out: Record<string, number | null> = {}
  for (const id of ALL_RATED) out[id] = list.length ? mean(list.map((s) => s.answers[id])) : null
  return out
}

export function composite(all: Submission[]): Composite {
  const leaders = all.filter((s) => s.group === 'leader')
  const team = all.filter((s) => s.group === 'team')
  const per = all.map((s) => scores(s.answers))
  const spreadOf = (k: 'skills' | 'ai' | 'org' | 'change' | 'rules') => {
    const v = per.map((p) => p[k]).filter((x): x is number => x !== null)
    return v.length ? { min: Math.min(...v), max: Math.max(...v) } : null
  }
  const bandIdx = (x: number | null) => (x === null ? -1 : BANDS.findIndex(([max]) => Math.round(x * 10) / 10 <= max))
  const counts = (k: 'skills' | 'org') => {
    const c = [0, 0, 0, 0, 0]
    per.forEach((p) => { const i = bandIdx(p[k]); if (i >= 0) c[i]++ })
    return c
  }
  const ladderCounts = (k: 'ladderMe' | 'ladderTeam') => {
    const c = [0, 0, 0, 0]
    all.forEach((s) => { const v = s.answers[k]; if (v >= 1 && v <= 4) c[v - 1]++ })
    return c
  }
  const items = itemAverages(all)
  const disciplines = DISCIPLINES.map((d) => {
    const perf = items[`${d.id}p`]
    const imp = items[`${d.id}i`]
    return { id: d.id, name: d.text, chapter: d.chapter, perf, imp, gap: perf !== null && imp !== null ? imp - perf : null }
  }).sort((x, y) => (y.gap ?? -9) - (x.gap ?? -9) || (y.imp ?? 0) - (x.imp ?? 0))
  return {
    n: all.length,
    nLeader: leaders.length,
    nTeam: team.length,
    ready: all.length >= MIN_RESPONSES,
    overall: groupScores(all) || { skills: null, ai: null, org: null, change: null, rules: null, ladderMe: null, ladderTeam: null },
    // Leadership is shown as its own group when it has any responses (the leadership link says so).
    // The team group is shown on its own only with at least MIN_RESPONSES people, so no one can be singled out.
    leader: leaders.length ? groupScores(leaders) : null,
    team: team.length >= MIN_RESPONSES ? groupScores(team) : null,
    spread: { skills: spreadOf('skills'), ai: spreadOf('ai'), org: spreadOf('org'), change: spreadOf('change'), rules: spreadOf('rules') },
    bandCounts: { skills: counts('skills'), org: counts('org') },
    ladderMeCounts: ladderCounts('ladderMe'),
    ladderTeamCounts: ladderCounts('ladderTeam'),
    items,
    leaderItems: leaders.length ? itemAverages(leaders) : {},
    teamItems: team.length >= MIN_RESPONSES ? itemAverages(team) : {},
    disciplines,
  }
}

// The lowest-rated items in a section, for the report.
export function lowest(items: Item[], avgs: Record<string, number | null>, n = 3) {
  return items
    .map((i) => ({ ...i, v: avgs[i.id] }))
    .filter((i): i is Item & { v: number } => typeof i.v === 'number')
    .sort((a, b) => a.v - b.v)
    .slice(0, n)
}
export function highest(items: Item[], avgs: Record<string, number | null>, n = 3) {
  return items
    .map((i) => ({ ...i, v: avgs[i.id] }))
    .filter((i): i is Item & { v: number } => typeof i.v === 'number')
    .sort((a, b) => b.v - a.v)
    .slice(0, n)
}

// Plain-language reading of the leadership vs. team gap (Chapter 3 PRO TIP logic).
export function readings(c: Composite): string[] {
  const out: string[] = []
  const o = c.overall
  if (o.skills !== null && o.org !== null) {
    if (o.skills - o.org >= 0.5) out.push('People rate their own skills well above the organization. Per Chapter 3, that points to process and leadership, not talent.')
    else if (o.org - o.skills >= 0.5) out.push('The organization rates higher than its people’s own skills. Per Chapter 3, you may be relying on one or two stars, which is a risk if either one leaves.')
  }
  if (c.leader && c.team && c.leader.org !== null && c.team.org !== null) {
    const d = c.leader.org - c.team.org
    if (d >= 0.5) out.push(`Leadership rates the organization ${d.toFixed(1)} points higher than the team does. Expect this to be the first conversation of the workshop.`)
    else if (d <= -0.5) out.push(`The team rates the organization ${(-d).toFixed(1)} points higher than leadership does. Leadership may be underestimating what’s already working.`)
    else out.push('Leadership and the team see the organization about the same way.')
  }
  if (o.change !== null && o.change < 3) out.push('Change readiness is below neutral. Plan time to address worries before introducing new tools (Chapter 22).')
  if (o.rules !== null && o.rules < 3.5) out.push('AI ground rules aren’t clear to everyone yet. An AI usage policy is a quick win (Chapter 22 template).')
  return out
}
