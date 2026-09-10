import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="py-10 bg-[#FAF9F5] border-t border-gray-200">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
        <h6 className="font-body font-semibold text-xs sm:text-sm uppercase tracking-[3px] text-[#FD9800] mb-3">
          Come work with us
        </h6>

        <div className="w-12 h-0.5 bg-[#FD9800] mx-auto mb-6" />

        <h4 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#0F172A] leading-tight mb-8">
          Join us in our mission to bring the light of the gospel to every corner of Africa and beyond.
        </h4>

        <div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] px-10 py-4 transition-colors shadow-md"
          >
            JOIN US TODAY
          </Link>
        </div>
      </div>
    </section>
  )
}
