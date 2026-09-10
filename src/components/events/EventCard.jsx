import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  const { title, description, image } = event

  return (
    <div className="group bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading font-bold text-lg text-[#0F172A] group-hover:text-[#FD9800] transition-colors mb-3">
            {title}
          </h3>
          <p className="font-body text-[14px] leading-relaxed text-[#454F5E] mb-6">
            {description}
          </p>
        </div>

        <div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-[#FD9800] hover:text-[#E98C00] transition-colors"
          >
            Learn More
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
