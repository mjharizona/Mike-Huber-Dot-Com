/**
 * Simple file-based lead storage.
 * In production, swap this out for a real database (Postgres, Supabase, PlanetScale, etc.)
 *
 * Note: on serverless hosts (Netlify, Vercel, etc.) the filesystem is read-only outside
 * of /tmp, so writes here will fail. That's expected — we catch and log rather than
 * throw, so a storage failure never blocks the contact form's email notification.
 */

import fs from 'fs'
import path from 'path'

const DATA_DIR  = path.join(process.cwd(), 'data', 'leads')
const LEADS_FILE = path.join(DATA_DIR, 'submissions.json')

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  interest: string
  message: string
  createdAt: string
  read: boolean
}

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(LEADS_FILE)) fs.writeFileSync(LEADS_FILE, '[]', 'utf8')
}

export function getLeads(): Lead[] {
  try {
    ensureFile()
    return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')) as Lead[]
  } catch (err) {
    console.warn('Unable to read lead storage (expected on read-only filesystems):', err)
    return []
  }
}

export function saveLead(lead: Omit<Lead, 'id' | 'createdAt' | 'read'>): Lead {
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  }

  try {
    ensureFile()
    const leads = getLeads()
    leads.unshift(newLead)
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8')
  } catch (err) {
    // Don't let storage failures block the email notification — the lead is still
    // returned below so the contact form succeeds and the email still sends.
    console.warn('Unable to persist lead (expected on read-only filesystems):', err)
  }

  return newLead
}

export function markLeadRead(id: string): void {
  try {
    ensureFile()
    const leads = getLeads()
    const idx = leads.findIndex((l) => l.id === id)
    if (idx !== -1) {
      leads[idx].read = true
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8')
    }
  } catch (err) {
    console.warn('Unable to update lead storage (expected on read-only filesystems):', err)
  }
}
