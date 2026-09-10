import { useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'
import Button from '../common/Button'
import { isValidEmail } from '../../utils/helpers'

const initialValues = { name: '', email: '', phone: '', subject: '', message: '' }

async function mockSubmitContact(values) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return { ok: true, values }
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Name is required.'
    if (!values.email.trim()) nextErrors.email = 'Email is required.'
    else if (!isValidEmail(values.email)) nextErrors.email = 'Enter a valid email address.'
    if (!values.subject.trim()) nextErrors.subject = 'Please add a subject.'
    if (!values.message.trim()) nextErrors.message = 'Please write a message.'
    return nextErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')
    try {
      await mockSubmitContact(values)
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
          <p className="font-semibold">Message sent!</p>
          <p className="text-sm">Thank you for reaching out — we&rsquo;ll get back to you soon.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" error={errors.name}>
          <input
            className={fieldClasses}
            type="text"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </Field>
        <Field label="Email Address" error={errors.email}>
          <input
            className={fieldClasses}
            type="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone Number" error={errors.phone} optional>
          <input
            className={fieldClasses}
            type="tel"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </Field>
        <Field label="Subject" error={errors.subject}>
          <input
            className={fieldClasses}
            type="text"
            value={values.subject}
            onChange={(e) => update('subject', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Message" error={errors.message}>
        <textarea
          className={fieldClasses}
          rows={5}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
        />
      </Field>

      {status === 'error' && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle size={14} /> Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" variant="dark" size="lg" disabled={status === 'loading'}>
        {status === 'loading' && <LoadingSpinner />}
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

function Field({ label, error, optional, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-900 mb-1.5">
        {label} {optional && <span className="text-ink-700/50 font-normal">(optional)</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle size={12} /> {error}
        </span>
      )}
    </label>
  )
}
