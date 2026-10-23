import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, ArrowRight, Clock, User, Sparkles } from 'lucide-react'
import Seo from '../components/common/Seo'
import CTASection from '../components/home/CTASection'
import { posts as staticPosts } from '../data/posts'
import { thirdbackground } from '../assets/images'
import api from '../utils/api'

export default function Posts() {
  const [postsList, setPostsList] = useState(staticPosts)

  useEffect(() => {
    const fetchLivePosts = async () => {
      try {
        const data = await api.get('/posts', { status: 'published' })
        if (data.success && data.posts && data.posts.length > 0) {
          setPostsList(data.posts)
        }
      } catch (err) {
        console.warn('Using static posts fallback:', err.message)
      }
    }

    fetchLivePosts()
  }, [])

  return (
    <>
      <Seo
        title="Conference Blogs & Recaps - Jesus in Africa (JIA)"
        description="Experience the miraculous encounters, deep teachings, and revival testimonies from the Ogun State Supernatural Conference and Jesus in Africa ministry."
      />

      {/* Hero Header Banner */}
      <section className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[380px] flex items-center overflow-hidden bg-[#0F172A]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${thirdbackground})` }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-transparent" />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 bg-[#FD9800]/20 border border-[#FD9800]/40 text-[#FD9800] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[2px] mb-4">
            <Sparkles size={14} />
            <span>Inspiring Encounters &amp; Recaps</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-4 drop-shadow-md">
            Conference Blogs
          </h1>
          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
            Witness how the fire of God touched hearts, broke yokes, and empowered believers at the landmark Ogun State Supernatural Conference.
          </p>
        </div>
      </section>

      {/* Posts List */}
      <section className="py-12 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {postsList.map((post) => (
              <article
                key={post._id || post.id || post.slug}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden hover:-translate-y-1"
              >
                {/* Image Box */}
                <Link
                  to={`/posts/${post.slug}`}
                  className="aspect-[16/10] overflow-hidden bg-slate-900 block relative"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80'
                    }}
                  />
                  {/* Category Pill Tag */}
                  {post.category && (
                    <span className="absolute top-3 left-3 bg-[#0F172A]/85 backdrop-blur-md text-[#FEF9E1] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 shadow-sm">
                      {post.category}
                    </span>
                  )}
                  {post.readTime && (
                    <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  )}
                </Link>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs font-semibold text-[#FD9800] mb-3">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        <span>{post.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-[#64748B] font-medium">
                        <User size={13} />
                        <span>{post.author || 'JIA Media'}</span>
                      </div>
                    </div>

                    <h2 className="font-heading font-bold text-xl text-[#0F172A] group-hover:text-[#FD9800] transition-colors mb-3 leading-snug">
                      <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="font-body text-[14.5px] leading-relaxed text-[#454F5E] mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      to={`/posts/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[1.5px] text-[#FD9800] group-hover:text-[#E98C00] transition-colors"
                    >
                      Read Full Article
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1.5 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
