import { useState } from 'react'
import { Play, X } from 'lucide-react'
import { mediaCover } from '../../assets/images'

const VIDEO_EMBED_URL = 'https://www.youtube.com/embed/h7l84xOHYlI?autoplay=1&rel=0'

export default function MediaSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-20 lg:py-24 bg-[#0F172A] relative overflow-hidden text-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[2px] font-semibold text-[#FD9800] mb-3">
            Watch &amp; Experience
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
            See the Ministry in Action
          </h2>
          <div className="w-16 h-1 bg-[#FD9800] mx-auto my-4" />
          <p className="font-body text-sm sm:text-base text-gray-300">
            A glimpse into our crusades, conferences, and the supernatural power of God moving across Africa.
          </p>
        </div>

        <div className="relative rounded-none overflow-hidden shadow-2xl aspect-video max-w-4xl mx-auto bg-black border border-white/10">
          {isPlaying ? (
            <div className="relative w-full h-full">
              <iframe
                src={VIDEO_EMBED_URL}
                title="Jesus in Africa Ministry Video"
                className="w-full h-full border-0"
                allow="accelerate; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setIsPlaying(false)}
                aria-label="Close video"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#FD9800] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={mediaCover}
                alt="Ministry Conference Crowd"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/45 transition-opacity hover:bg-black/35" />

              <button
                onClick={() => setIsPlaying(true)}
                aria-label="Play highlight video"
                className="absolute inset-0 flex flex-col items-center justify-center group"
              >
                <div className="w-20 h-20 rounded-full bg-[#FD9800] group-hover:bg-[#E98C00] group-hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-xl">
                  <Play size={32} className="text-[#FEF9E1] fill-current ml-1" />
                </div>
                <span className="mt-4 text-xs tracking-[2px] uppercase font-bold text-white group-hover:text-[#FD9800] transition-colors">
                  Watch Highlights
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
