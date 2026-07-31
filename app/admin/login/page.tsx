'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const { error } = await res.json()
        setError(error ?? 'Login failed.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-white font-heading font-bold text-2xl">
            Mike <span className="text-gold-400">Huber</span>
          </p>
          <p className="text-navy-400 text-sm mt-1">Admin Dashboard</p>
        </div>

        <div className="bg-navy-900 rounded-2xl p-8 shadow-2xl">
          <h1 className="font-heading text-lg font-bold text-white mb-6">Sign In</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-300 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                className="w-full rounded-lg bg-navy-800 border border-navy-700 text-white px-4 py-3 text-sm placeholder-navy-500 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-colors"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full btn-gold justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
