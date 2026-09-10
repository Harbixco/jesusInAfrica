import { useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'
import Button from '../common/Button'
import { isValidEmail } from '../../utils/helpers'

const initialValues = { name: '', email: '', request: '' }

async function mockSubmitPrayer(values) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return { ok: true, values }
}

export default function PrayerForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!values.email.trim()) nextErrors.email = 'Please enter your email.'
    else if (!isValidEmail(values.email)) nextErrors.email = 'Enter a valid email address.'
    if (!values.request.trim()) nextErrors.request = 'Please share your prayer request.'
    return nextErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')
    try {
      await mockSubmitPrayer(values)
      setStatus('success')
      setValues(initialValues)
    } catch {
      setStatus('error')
    }
  }

  const fieldClasses =
    'w-full rounded-md px-4 py-3 text-sm border border-ink-900/15 focus:border-gold-500 outline-none transition-colors bg-white'

  if (status === 'success') {
    return (
      <div className="flex items-start gap-3 rounded-md bg-green-50 text-green-800 px-5 py-4">
        <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">We received your request</p>
          <p className="text-sm">Our prayer team will be standing in agreement with you.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-ink-900 mb-1.5">Full Name</span>
        <input
          className={fieldClasses}
          type="text"
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
        />
        {errors.name && (
          <span className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle size={12} /> {errors.name}
          </span>
        )}
      </label>

      <label className="block">
        <span className="block text-sm font-medium text-ink-900 mb-1.5">Email Address</span>
        <input
          className={fieldClasses}
          type="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
        />
        {errors.email && (
          <span className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle size={12} /> {errors.email}
          </span>
        )}
      </label>

      <label className="block">
        <span className="block text-sm font-medium text-ink-900 mb-1.5">Prayer Request</span>
        <textarea
          className={fieldClasses}
          rows={5}
          value={values.request}
          onChange={(e) => update('request', e.target.value)}
        />
        {errors.request && (
          <span className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle size={12} /> {errors.request}
          </span>
        )}
      </label>

      {status === 'error' && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} /> Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" variant="dark" size="lg" disabled={status === 'loading'}>
        {status === 'loading' && <LoadingSpinner />}
        {status === 'loading' ? 'Submitting...' : 'Submit Prayer Request'}
      </Button>
    </form>
  )
}
