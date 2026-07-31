/**
 * Simple file-based lead storage.
 * In production, swap this out for a real database (Postgres, Supabase, PlanetScale, etc.)
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
  ensureFile()
  return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')) as Lead[]
}

export function saveLead(lead: Omit<Lead, 'id' | 'createdAt' | 'read'>): Lead {
  ensureFile()
  const leads = getLeads()
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  }
  leads.unshift(newLead)
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8')
  return newLead
}

export function markLeadRead(id: string): void {
  ensureFile()
  const leads = getLeads()
  const idx = leads.findIndex((l) => l.id === id)
  if (idx !== -1) {
    leads[idx].read = true
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8')
  }
}
