import { Link } from 'react-router-dom'
import { classNames } from '../../utils/helpers'

const variants = {
  primary:
    'bg-gold-500 text-ink-950 hover:bg-gold-400 shadow-card',
  secondary:
    'bg-transparent border border-white/70 text-white hover:bg-white/10',
  dark:
    'bg-ink-900 text-white hover:bg-ink-800 shadow-card',
  ghost:
    'bg-transparent text-ink-900 hover:bg-ink-900/5',
}

const sizes = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  const classes = classNames(
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide uppercase transition-all duration-200 active:scale-[0.98]',
    variants[variant],
    sizes[size],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  )
}
