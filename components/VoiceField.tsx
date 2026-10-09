'use client'

import { useEffect, useRef, useState } from 'react'

export type VoiceClip = { b64: string; type: string; seconds: number }

const MAX_SECONDS = 90
// only one recording at a time across the page
let stopActive: (() => void) | null = null

function MicIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" />
    </svg>
  )
}

/**
 * Wraps a text box and adds a microphone button in its top-right corner.
 * One click starts recording, a second click stops. The clip plays back below the box.
 */
export default function VoiceField({
  id,
  what,
  onClip,
  children,
}: {
  id: string
  what: string
  onClip: (id: string, clip: VoiceClip | null) => void
  children: React.ReactNode
}) {
  const [state, setState] = useState<'idle' | 'recording' | 'done' | 'blocked'>('idle')
  const [secs, setSecs] = useState(0)
  const [url, setUrl] = useState('')
  const mr = useRef<MediaRecorder | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const secsRef = useRef(0)

  useEffect(() => () => { if (timer.current) clearInterval(timer.current) }, [])

  function stop() {
    if (timer.current) clearInterval(timer.current)
    if (mr.current && mr.current.state !== 'inactive') mr.current.stop()
    if (stopActive === stop) stopActive = null
  }

  async function start() {
    if (typeof window === 'undefined' || !navigator.mediaDevices || typeof MediaRecorder === 'undefined') {
      setState('blocked')
      return
    }
    if (stopActive) stopActive()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const type = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : ''
      const m = new MediaRecorder(stream, type ? { mimeType: type, audioBitsPerSecond: 32000 } : undefined)
      const chunks: BlobPart[] = []
      m.ondataavailable = (e) => e.data.size && chunks.push(e.data)
      m.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        const blob = new Blob(chunks, { type: m.mimeType || type || 'audio/webm' })
        setUrl(URL.createObjectURL(blob))
        const r = new FileReader()
        r.onloadend = () => onClip(id, { b64: String(r.result).split(',')[1] || '', type: blob.type, seconds: secsRef.current })
        r.readAsDataURL(blob)
        setState('done')
      }
      mr.current = m
      m.start()
      secsRef.current = 0
      setSecs(0)
      setState('recording')
      stopActive = stop
      timer.current = setInterval(() => {
        secsRef.current += 1
        setSecs(secsRef.current)
        if (secsRef.current >= MAX_SECONDS) stop()
      }, 1000)
    } catch {
      setState('blocked')
    }
  }

  function clear() {
    onClip(id, null)
    setUrl('')
    setState('idle')
  }

  const mmss = (n: number) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`
  const recording = state === 'recording'

  return (
    <div>
      <div className="relative">
        {children}
        <button
          type="button"
          onClick={recording ? stop : start}
          title={recording ? 'Stop recording' : `Record a voice note about ${what}`}
          aria-label={recording ? 'Stop recording' : `Record a voice note about ${what}`}
          className={`absolute top-2 right-2 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-colors ${
            recording ? 'bg-red-600 text-white animate-pulse' : state === 'done' ? 'bg-navy-700 text-white' : 'bg-white text-navy-700 hover:bg-navy-50 border border-navy-200'
          }`}
        >
          {recording ? <span className="h-3.5 w-3.5 rounded-sm bg-white" /> : <MicIcon className="h-5 w-5" />}
        </button>
      </div>
      {recording && (
        <p className="mt-2 text-base font-semibold text-red-700">
          Recording {mmss(secs)} / 1:30. Click the red button to stop.
        </p>
      )}
      {state === 'done' && url && (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <audio controls src={url} className="h-10 max-w-full" />
          <button type="button" onClick={clear} className="text-base text-navy-600 underline">
            Delete voice note
          </button>
        </div>
      )}
      {state === 'blocked' && (
        <p className="mt-2 text-base text-red-700">The microphone isn&rsquo;t available in this browser. You can type instead.</p>
      )}
    </div>
  )
}
