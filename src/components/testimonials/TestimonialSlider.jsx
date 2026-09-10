import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestimonialCard from './TestimonialCard'
import { classNames } from '../../utils/helpers'

export default function TestimonialSlider({ testimonials, autoPlayMs = 6000 }) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  const total = testimonials.length

  const goTo = useCallback(
    (nextIndex) => {
      setIndex(((nextIndex % total) + total) % total)
    },
    [total],
  )

  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (isPaused) return undefined
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % total)
    }, autoPlayMs)
    return () => clearInterval(timerRef.current)
  }, [isPaused, total, autoPlayMs])

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full shrink-0 px-2">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={goPrev}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-ink-900/15 flex items-center justify-center hover:bg-ink-950 hover:text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.id}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={classNames(
                'w-2.5 h-2.5 rounded-full transition-colors',
                i === index ? 'bg-gold-500' : 'bg-ink-900/20',
              )}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-ink-900/15 flex items-center justify-center hover:bg-ink-950 hover:text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
