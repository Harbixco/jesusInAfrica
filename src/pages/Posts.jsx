import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, ArrowRight } from 'lucide-react'
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
        title="Posts - Jesus in Africa (JIA)"
        description="Latest posts, recaps, and teachings from the Jesus in Africa ministry conferences and outreaches."
      />

      {/* Hero Header Banner */}
      <section className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center overflow-hidden bg-[#0F172A]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${thirdbackground})` }}
        />
        {/* Overlay to match tone */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-12 md:py-16">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[3px] font-bold text-white/95 mb-3 drop-shadow">
            Articles &amp; Recaps
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
            Blogs
          </h1>
        </div>
      </section>

      {/* Posts List */}
      <section className="py-10 lg:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {postsList.map((post) => (
              <article
                key={post._id || post.id || post.slug}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
              >
                <Link
                  to={`/posts/${post.slug}`}
                  className="aspect-[16/10] overflow-hidden bg-gray-100 block"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80'
                    }}
                  />
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#FD9800] mb-3 uppercase tracking-wider">
                      <CalendarDays size={14} />
                      <span>{post.date}</span>
                    </div>

                    <h2 className="font-heading font-bold text-lg sm:text-xl text-[#0F172A] group-hover:text-[#FD9800] transition-colors mb-3 leading-snug">
                      <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="font-body text-[14px] leading-relaxed text-[#454F5E] mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    <Link
                      to={`/posts/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-[#FD9800] group-hover:text-[#E98C00] transition-colors"
                    >
                      Read Full Blog
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
