export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function classNames(...values) {
  return values.filter(Boolean).join(' ')
}
