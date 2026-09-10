import { classNames } from '../../utils/helpers'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
  className = '',
}) {
  return (
    <div
      className={classNames(
        'max-w-2xl mb-12',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={classNames(
            'inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3',
            light ? 'text-gold-300' : 'text-gold-600',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={classNames(
          'text-3xl md:text-4xl font-bold leading-tight',
          light ? 'text-white' : 'text-ink-950',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={classNames(
            'mt-4 text-base md:text-lg leading-relaxed',
            light ? 'text-white/80' : 'text-ink-700',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
