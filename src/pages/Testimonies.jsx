import { useState } from 'react'
import { Play, ChevronLeft, ChevronRight, Quote, Sparkles, Video, Clock } from 'lucide-react'
import Seo from '../components/common/Seo'
import CTASection from '../components/home/CTASection'
import { testimonials, videoTestimonials } from '../data/testimonials'
import { fourthbackground } from '../assets/images'

export default function Testimonies() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [activeTextIndex, setActiveTextIndex] = useState(0)

  const activeVideo = videoTestimonials[activeVideoIndex]
  const activeTestimony = testimonials[activeTextIndex]

  const nextVideo = () => {
    setActiveVideoIndex((prev) => (prev + 1) % videoTestimonials.length)
  }

  const prevVideo = () => {
    setActiveVideoIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length)
  }

  const nextTestimony = () => {
    setActiveTextIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimony = () => {
    setActiveTextIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <>
      <Seo
        title="Testimonies - Jesus in Africa (JIA)"
        description="We have seen great wonders of God during our journey. Watch and read miraculous testimonies of healing and breakthrough."
      />

      {/* Hero Header Banner */}
      <section className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center overflow-hidden bg-[#0F172A]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fourthbackground})` }}
        />
        {/* Overlay to match tone */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-12 md:py-16">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[3px] font-bold text-white/95 mb-3 drop-shadow">
            God's wonders
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
            Testimonies
          </h1>
        </div>
      </section>

      {/* Video Testimonies Section - Individual on Screen */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[3px] font-semibold text-[#FD9800] mb-3">
              <Video size={16} />
              <span>Video Testimonies</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] mb-4">
              We have seen great wonders of God during our journey
            </h2>
            <div className="w-16 h-1 bg-[#FD9800] mx-auto mb-6" />
            <p className="font-body text-[15px] sm:text-[16px] text-[#454F5E] leading-relaxed">
              Watch inspiring video testimonies of divine healing, breakthrough, and supernatural encounters recorded during our ministry gatherings.
            </p>
          </div>

          {/* Individual Video Player Showcase */}
          <div className="max-w-[1040px] mx-auto bg-[#FAF9F5] border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Main Individual Video Player Screen */}
              <div className="lg:col-span-8 p-4 sm:p-6 lg:p-8 bg-black flex flex-col justify-between">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 shadow-inner">
                  <iframe
                    key={activeVideo.youtubeId}
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&autoplay=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Video Info & Player Controls */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#FD9800] block mb-1">
                      Now Playing ({activeVideoIndex + 1} of {videoTestimonials.length})
                    </span>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                      {activeVideo.title}
                    </h3>
                  </div>

                  {/* Previous / Next Video Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={prevVideo}
                      className="p-2 rounded bg-white/10 hover:bg-[#FD9800] hover:text-[#0F172A] text-white transition-colors"
                      aria-label="Previous Video"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-xs font-semibold px-2 text-white/70">
                      {activeVideoIndex + 1} / {videoTestimonials.length}
                    </span>
                    <button
                      type="button"
                      onClick={nextVideo}
                      className="p-2 rounded bg-white/10 hover:bg-[#FD9800] hover:text-[#0F172A] text-white transition-colors"
                      aria-label="Next Video"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Playlist Tabs (Select Individual Video) */}
              <div className="lg:col-span-4 bg-[#FAF9F5] border-t lg:border-t-0 lg:border-l border-gray-200 p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
                    <h4 className="font-heading font-bold text-base text-[#0F172A]">
                      Playlist
                    </h4>
                    <span className="text-xs font-semibold text-[#FD9800] uppercase tracking-wider">
                      {videoTestimonials.length} Videos
                    </span>
                  </div>

                  <div className="space-y-3">
                    {videoTestimonials.map((v, idx) => {
                      const isActive = idx === activeVideoIndex
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setActiveVideoIndex(idx)}
                          className={`w-full text-left p-3 rounded transition-all flex items-center gap-3 border ${
                            isActive
                              ? 'bg-white border-[#FD9800] shadow-sm ring-1 ring-[#FD9800]'
                              : 'bg-white/60 hover:bg-white border-gray-200'
                          }`}
                        >
                          <div className="relative w-20 aspect-[16/10] overflow-hidden bg-slate-900 shrink-0 rounded-sm">
                            <img
                              src={v.thumbnail}
                              alt={v.title}
                              onError={(e) => {
                                e.currentTarget.src = v.fallbackThumbnail
                              }}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play
                                size={14}
                                className={isActive ? 'text-[#FD9800]' : 'text-white'}
                                fill="currentColor"
                              />
                            </div>
                            <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-white px-1 rounded font-mono">
                              {v.duration}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-xs sm:text-sm font-heading font-bold truncate ${
                                isActive ? 'text-[#FD9800]' : 'text-[#0F172A]'
                              }`}
                            >
                              {v.name}
                            </p>
                            <span className="text-[11px] text-[#454F5E] block truncate mt-0.5">
                              {v.title}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-[#454F5E]">
                  <p className="line-clamp-3 leading-relaxed italic">
                    &ldquo;{activeVideo.description}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Written Testimonies Section - Individual on Screen */}
      <section className="py-16 bg-[#FAF9F5] border-t border-b border-gray-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[3px] font-semibold text-[#FD9800] mb-3">
              <Sparkles size={16} />
              <span>Written Testimonies</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] mb-4">
              Living Proof of God's Healing Power
            </h2>
            <div className="w-16 h-1 bg-[#FD9800] mx-auto mb-6" />
            <p className="font-body text-[15px] sm:text-[16px] text-[#454F5E] leading-relaxed">
              Read individual firsthand accounts of instantaneous miracles and lasting deliverance from our meetings.
            </p>
          </div>

          {/* Individual Testimony Screen Presentation */}
          <div className="max-w-[960px] mx-auto">
            <div className="bg-white border border-gray-100 shadow-md p-8 sm:p-12 lg:p-16 relative">
              {/* Big Decorative Quote Icon */}
              <div className="w-14 h-14 bg-[#FEF9E1] rounded-full flex items-center justify-center text-[#FD9800] mb-8">
                <Quote size={28} />
              </div>

              {/* Individual Testimony Body */}
              <blockquote className="mb-10">
                <p className="font-body text-base sm:text-lg lg:text-xl text-[#0F172A] leading-relaxed sm:leading-[1.8] italic">
                  &ldquo;{activeTestimony.quote}&rdquo;
                </p>
              </blockquote>

              {/* Author Info & Navigation Controls */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                {/* Author Details */}
                <div className="flex items-center gap-4">
                  <img
                    src={activeTestimony.image}
                    alt={activeTestimony.name}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover border-2 border-[#FD9800] shadow-sm"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-lg sm:text-xl text-[#0F172A]">
                      {activeTestimony.name}
                    </h4>
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#FD9800]">
                      {activeTestimony.location}
                    </p>
                  </div>
                </div>

                {/* Individual Navigator */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={prevTestimony}
                    className="w-11 h-11 rounded-full border border-gray-300 hover:border-[#FD9800] hover:bg-[#FD9800] hover:text-white flex items-center justify-center text-[#0F172A] transition-colors"
                    aria-label="Previous testimony"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <span className="text-xs font-semibold uppercase tracking-wider text-[#454F5E] px-2">
                    {activeTextIndex + 1} / {testimonials.length}
                  </span>

                  <button
                    type="button"
                    onClick={nextTestimony}
                    className="w-11 h-11 rounded-full border border-gray-300 hover:border-[#FD9800] hover:bg-[#FD9800] hover:text-white flex items-center justify-center text-[#0F172A] transition-colors"
                    aria-label="Next testimony"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Person Switcher Dots / Selector */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {testimonials.map((t, idx) => {
                const isSelected = idx === activeTextIndex
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTextIndex(idx)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-semibold ${
                      isSelected
                        ? 'border-[#FD9800] bg-[#FEF9E1] text-[#0F172A] shadow-sm'
                        : 'border-gray-200 bg-white text-[#454F5E] hover:border-gray-300'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#FD9800]' : 'bg-gray-300'
                      }`}
                    />
                    <span>{t.name.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
