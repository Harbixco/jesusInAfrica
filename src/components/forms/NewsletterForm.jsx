import { useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'
import { isValidEmail, classNames } from '../../utils/helpers'

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

// Mock submission handler — replace with a real API call, e.g.
// await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify(values) })
async function mockSubscribe(values) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  if (!values.email) throw new Error('Email is required')
  return { ok: true }
}

export default function NewsletterForm({ light = false }) {
  const [values, setValues] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(STATUS.IDLE)

  const inputClasses = classNames(
    'w-full rounded-md px-4 py-3 text-sm outline-none border transition-colors',
    light
      ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold-400'
      : 'bg-white border-ink-900/15 text-ink-950 placeholder:text-ink-700/50 focus:border-gold-500',
  )

  function validate() {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!values.email.trim()) nextErrors.email = 'Please enter your email.'
    else if (!isValidEmail(values.email)) nextErrors.email = 'Enter a valid email address.'
    return nextErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus(STATUS.LOADING)
    try {
      await mockSubscribe(values)
      setStatus(STATUS.SUCCESS)
      setValues({ name: '', email: '' })
    } catch {
      setStatus(STATUS.ERROR)
    }
  }

  if (status === STATUS.SUCCESS) {
    return (
      <div
        className={classNames(
          'flex items-center gap-3 rounded-md px-4 py-4 text-sm',
          light ? 'bg-white/10 text-white' : 'bg-green-50 text-green-800',
        )}
        role="status"
      >
        <CheckCircle2 size={20} className="text-gold-400 shrink-0" />
        You&rsquo;re subscribed! Watch your inbox for updates.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div>
        <label htmlFor="newsletter-name" className="sr-only">
          Your name
        </label>
        <input
          id="newsletter-name"
          type="text"
          placeholder="Your name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className={inputClasses}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'newsletter-name-error' : undefined}
        />
        {errors.name && (
          <p id="newsletter-name-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          Your email
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Your email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          className={inputClasses}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
        />
        {errors.email && (
          <p id="newsletter-email-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.email}
          </p>
        )}
      </div>

      {status === STATUS.ERROR && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={12} /> Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === STATUS.LOADING}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 hover:bg-gold-400 disabled:opacity-70 text-ink-950 font-semibold text-sm uppercase tracking-wide px-4 py-3 transition-colors"
      >
        {status === STATUS.LOADING && <LoadingSpinner />}
        {status === STATUS.LOADING ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  )
}
