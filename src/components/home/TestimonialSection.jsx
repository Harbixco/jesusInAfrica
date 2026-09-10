import { Link } from 'react-router-dom'
import TestimonialSlider from '../testimonials/TestimonialSlider'
import { testimonials } from '../../data/testimonials'

export default function TestimonialSection() {
  return (
    <section className="py-10 lg:py-20 bg-[#FAFAFA] border-t border-b border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] uppercase tracking-wide mb-3">
            Testimonies
          </h2>
          <div className="w-16 h-1 bg-[#FD9800] mx-auto mb-4" />
          <p className="font-body text-[15px] text-[#454F5E] max-w-xl mx-auto">
            Witness the great wonders and miraculous healings of God through our ministry.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <TestimonialSlider testimonials={testimonials} />
        </div>

        <div className="text-center mt-12">
          <Link
            to="/testimonies"
            className="inline-flex items-center justify-center bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] px-8 py-3.5 transition-colors"
          >
            More Testimonies
          </Link>
        </div>
      </div>
    </section>
  )
}
