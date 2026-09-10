import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { firstbackground, secondbackground, thirdbackground, fourthbackground } from '../../assets/images'

const slides = [
  {
    id: 1,
    heading: "Strengthening Believers' Faith",
    description:
      'We aim to deepen the faith of believers by teaching them to live by the Word of God and the Spirit.',
    image: firstbackground,
    btnText: 'Learn More',
    btnLink: '/about',
  },
  {
    id: 2,
    heading: 'Evangelism by Fire',
    description:
      'We are committed to spreading the gospel with passion and zeal, reaching the unreached and transforming lives.',
    image: secondbackground,
    btnText: 'Learn More',
    btnLink: '/about',
  },
  {
    id: 3,
    heading: 'Partnership and Collaboration',
    description:
      'We work closely with other ministries across Africa and beyond, providing training and resources to local assemblies to help them experience the reality of Christianity.',
    image: thirdbackground,
    btnText: 'Learn More',
    btnLink: '/about',
  },
  {
    id: 4,
    heading: 'Prayer Movement',
    description:
      'Prayer is the bedrock of our ministry. We believe in the power of intercession and corporate prayer to transform lives, communities, and nations.',
    image: fourthbackground,
    btnText: 'Join Prayer Movement',
    btnLink: '/prayer-movement',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative w-full h-[520px] md:h-[620px] lg:h-[700px] overflow-hidden bg-black select-none">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out transform scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Color Overlay */}
          <div className="absolute inset-0 bg-[#E98C00]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/40" />

          {/* Slide Content */}
          <div className="relative z-20 h-full max-w-[1100px] mx-auto px-6 sm:px-12 flex flex-col items-center justify-center text-center">
            <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-wide max-w-4xl leading-tight mb-5 drop-shadow-md">
              {slide.heading}
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-white/95 max-w-2xl font-normal leading-relaxed mb-8 drop-shadow">
              {slide.description}
            </p>

            <Link
              to={slide.btnLink}
              className="inline-flex items-center justify-center bg-[#E98C00] hover:bg-[#FD9800] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] px-8 py-3.5 transition-all duration-300 shadow-lg"
            >
              {slide.btnText}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-[#FD9800] text-white flex items-center justify-center transition-colors backdrop-blur-xs"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-[#FD9800] text-white flex items-center justify-center transition-colors backdrop-blur-xs"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-[#FD9800] scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
          />
        ))}
      </div>
    </section>
  )
}
