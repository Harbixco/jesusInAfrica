export default function TestimonialCard({ testimonial }) {
  const { name, location, quote, image } = testimonial

  return (
    <div className="bg-white border border-gray-100 shadow-sm p-8 sm:p-12 text-center max-w-3xl mx-auto flex flex-col items-center">
      {/* Testifier Image */}
      {image && (
        <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-[#FD9800] shadow-md">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      )}

      {/* Quote Text */}
      <p className="font-body text-[15px] sm:text-[16px] leading-[1.8] text-[#454F5E] mb-6 italic">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Name and Details */}
      <h4 className="font-heading font-bold text-lg text-[#0F172A] mb-1">
        {name}
      </h4>
      <p className="text-xs uppercase tracking-wider text-[#FD9800] font-semibold">
        {location}
      </p>
    </div>
  )
}
