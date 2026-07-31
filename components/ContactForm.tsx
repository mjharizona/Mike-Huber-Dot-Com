'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormValues {
  name: string
  email: string
  phone?: string
  company?: string
  interest: string
  message: string
}

const interests = [
  'Conference Speaking',
  'Half-Day Master Class / Workshop',
  'Corporate Training Program',
  'Consulting / Strategy',
  'Book / Content Marketing',
  'Other',
]

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="card bg-green-50 border-green-200 text-center py-12">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-heading text-xl font-bold text-green-800 mb-2">Message Received!</h3>
        <p className="text-green-700 text-sm mb-6">
          Thanks for reaching out. Mike typically responds within 1–2 business days.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-secondary text-sm"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === 'error' && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Something went wrong. Please try again or email{' '}
          <a href="mailto:mike@mikehuber.com" className="underline">
            mike@mikehuber.com
          </a>{' '}
          directly.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="label" htmlFor="name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={`input-field ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
            placeholder="Jane Smith"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="label" htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`input-field ${errors.email ? 'border-red-400' : ''}`}
            placeholder="jane@company.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
            })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="label" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className="input-field"
            placeholder="(555) 000-0000"
            {...register('phone')}
          />
        </div>

        {/* Company */}
        <div>
          <label className="label" htmlFor="company">
            Company / Organization
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            className="input-field"
            placeholder="Acme Corp"
            {...register('company')}
          />
        </div>
      </div>

      {/* Interest */}
      <div>
        <label className="label" htmlFor="interest">
          What are you interested in? <span className="text-red-500">*</span>
        </label>
        <select
          id="interest"
          className={`input-field ${errors.interest ? 'border-red-400' : ''}`}
          {...register('interest', { required: 'Please select an option' })}
          defaultValue=""
        >
          <option value="" disabled>
            Select one…
          </option>
          {interests.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        {errors.interest && <p className="mt-1 text-xs text-red-600">{errors.interest.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="label" htmlFor="message">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
          placeholder="Tell Mike about your event, organization, or what you're looking for…"
          {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Please write at least 20 characters' } })}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending…
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
