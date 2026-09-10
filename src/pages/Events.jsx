import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react'
import Seo from '../components/common/Seo'
import EventGrid from '../components/events/EventGrid'
import CTASection from '../components/home/CTASection'
import { events } from '../data/events'
import {
  heroSlide1,
  heroSlide2,
  firstbackground,
  evangelismOutreachJIA,
  jiaOgun2024_4,
  jiaOgun2024,
  jiaOgun2024_6,
  jiaOgun2024_14,
  jiaOgun2024_10,
  jiaOgun2024_9,
  thirdbackground,
  jiaOgun2024_16,
} from '../assets/images'

const conferenceFlyers = [
  {
    id: 1,
    title: 'Ogun State Supernatural Conference',
    date: '13th - 14th Sept, 2024',
    location: '56, Ologbun Simawa Likosi Road, Ogun State',
    image: heroSlide1,
  },
  {
    id: 2,
    title: 'Super Natural Ilorin Conference',
    date: '19th & 20th September 2024',
    location: 'Hopehall Arena, Sawmill, Ilorin',
    image: heroSlide2,
  },
  {
    id: 3,
    title: 'Ogun State Supernatural Conference',
    date: '14th Sept, 2024',
    location: '56, Ologbun Simawa Likosi Road, Ogun State',
    image: heroSlide1,
  },
]

const conferenceGallery = [
  {
    src: jiaOgun2024_4,
    caption: 'Pastor Daramola ministering the Word during the Supernatural Conference',
  },
  {
    src: jiaOgun2024,
    caption: 'Mighty move of the Holy Spirit during prayer and deliverance session',
  },
  {
    src: jiaOgun2024_6,
    caption: 'Impartation service with the laying on of hands',
  },
  {
    src: jiaOgun2024_14,
    caption: 'Congregation lifting their voices in unified adoration and intercession',
  },
  {
    src: jiaOgun2024_10,
    caption: 'Special praise and worship ministration',
  },
  {
    src: jiaOgun2024_9,
    caption: 'Worship leaders leading the congregation into God’s presence',
  },
  {
    src: thirdbackground,
    caption: 'Supernatural atmosphere of intense prayer and spiritual renewal',
  },
  {
    src: jiaOgun2024_16,
    caption: 'Prophet Oludamola ministering healing and breakthrough to attendees',
  },
]

export default function Events() {
  const [activeFlyerIndex, setActiveFlyerIndex] = useState(1)
  const [lightboxImage, setLightboxImage] = useState(null)

  return (
    <>
      <Seo
        title="Events - Jesus in Africa (JIA)"
        description="Participate in our events. JIA hosts a variety of events aimed at equipping and empowering believers."
      />

      {/* Hero Header Banner */}
      <section className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center overflow-hidden bg-[#0F172A]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${firstbackground})` }}
        />
        {/* Overlay to match tone */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-12 md:py-16">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[3px] font-bold text-white/95 mb-3 drop-shadow">
            Participate to our
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
            Events
          </h1>
        </div>
      </section>

      {/* Top Section: Heading & Conference Flyers Showcase */}
      <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Showcase Title */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#0F172A] leading-tight">
              JIA hosts a variety of events aimed at equipping and empowering believers
            </h2>
          </div>

          {/* Flyers Showcase Carousel / Row */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
              {conferenceFlyers.map((flyer, idx) => {
                const isCenter = idx === activeFlyerIndex
                return (
                  <div
                    key={flyer.id}
                    onClick={() => {
                      setActiveFlyerIndex(idx)
                      setLightboxImage({ src: flyer.image, caption: flyer.title })
                    }}
                    className={`cursor-pointer transition-all duration-500 rounded-sm overflow-hidden group ${
                      isCenter
                        ? 'md:scale-105 z-10 shadow-2xl ring-2 ring-[#FD9800]/40'
                        : 'md:scale-95 opacity-90 hover:opacity-100 shadow-md hover:shadow-xl'
                    }`}
                  >
                    <div className="relative aspect-[3/4] bg-slate-900 overflow-hidden">
                      <img
                        src={flyer.image}
                        alt={flyer.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center items-center gap-2.5 mt-8">
              {conferenceFlyers.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveFlyerIndex(dotIdx)}
                  aria-label={`Show flyer ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    activeFlyerIndex === dotIdx
                      ? 'w-7 h-2 bg-[#FD9800]'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Middle Section: Evangelism Commitment Statement & Africa Map */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Bold Statement */}
            <div className="lg:col-span-6">
              <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#0F172A] leading-tight max-w-lg">
                We are committed to spreading the gospel with passion and zeal, reaching the unreached and transforming lives.
              </h3>
            </div>

            {/* Right Column: Africa Map Graphic */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <img
                src={evangelismOutreachJIA}
                alt="JIA Evangelism Outreach Across Africa"
                className="w-full max-w-[460px] h-auto object-contain hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conference Photo Gallery (8 photos 4x2 grid) */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {conferenceGallery.map((photo, pIdx) => (
              <div
                key={pIdx}
                onClick={() => setLightboxImage(photo)}
                className="group relative aspect-[4/3] overflow-hidden bg-slate-900 border border-gray-100 shadow-sm hover:shadow-md cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
                  <span className="text-[11px] sm:text-xs text-white line-clamp-2 drop-shadow font-medium">
                    {photo.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retained Section: Ministry Gatherings & Programs EventGrid */}
      <section className="py-10 bg-[#FAF9F5]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-body text-xs uppercase tracking-[3px] font-semibold text-[#FD9800] mb-3">
              Ministry Gatherings
            </p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] mb-4">
              Our Ongoing Programs &amp; Summits
            </h2>
            <div className="w-16 h-1 bg-[#FD9800] mx-auto mb-6" />
            <p className="font-body text-[15px] sm:text-[16px] text-[#454F5E] leading-relaxed">
              Explore our annual evangelism summits, healing crusades, and spiritual empowerment gatherings.
            </p>
          </div>

          <EventGrid events={events} />
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 text-sm uppercase tracking-wider flex items-center gap-1 font-semibold"
            >
              <X size={20} /> Close
            </button>

            <img
              src={lightboxImage.src}
              alt={lightboxImage.caption || 'Event enlarged'}
              className="max-h-[80vh] max-w-full object-contain rounded shadow-2xl"
            />

            {lightboxImage.caption && (
              <p className="text-white/90 text-sm text-center mt-3 font-medium px-4">
                {lightboxImage.caption}
              </p>
            )}
          </div>
        </div>
      )}

      <CTASection />
    </>
  )
}
