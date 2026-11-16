import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  ArrowRight,
  Clock,
  User,
  Sparkles,
  Heart,
  HeartPulse,
  ShieldCheck,
  Send,
  BookOpen,
} from 'lucide-react'
import Seo from '../components/common/Seo'
import CTASection from '../components/home/CTASection'
import { posts as staticPosts } from '../data/posts'
import { eventHealing } from '../assets/images'
import api from '../utils/api'
import { sortPostsLatestFirst } from '../utils/postUtils'

export default function HealingRoom() {
  // Filter static posts initially for 'Healing Room' category (case-insensitive)
  const initialHealingPosts = staticPosts.filter(
    (p) => p.category?.toLowerCase() === 'healing room'
  )

  const [postsList, setPostsList] = useState(() => sortPostsLatestFirst(initialHealingPosts))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHealingPosts = async () => {
      try {
        setLoading(true)
        // Request Healing Room posts from API
        const data = await api.get('/posts', { category: 'Healing Room', status: 'published' })
        if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
          // Strictly ensure only Healing Room category posts are set
          const filtered = data.posts.filter(
            (p) => p.category?.toLowerCase() === 'healing room'
          )
          if (filtered.length > 0) {
            setPostsList(sortPostsLatestFirst(filtered))
          }
        }
      } catch (err) {
        console.warn('Using static Healing Room fallback:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHealingPosts()
  }, [])

  return (
    <>
      <Seo
        title="Healing Room - Jesus in Africa (JIA)"
        description="Experience the supernatural healing power and compassion of Jesus Christ. Access faith resources, divine health teachings, and miracle testimonies."
      />

      {/* Hero Header Banner */}
      <section className="relative min-h-[300px] sm:min-h-[340px] md:min-h-[400px] flex items-center overflow-hidden bg-[#0F172A]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${eventHealing})` }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-transparent" />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-14 md:py-20">
          <div className="inline-flex items-center gap-2 bg-[#FD9800]/20 border border-[#FD9800]/40 text-[#FD9800] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[2px] mb-4">
            <HeartPulse size={15} />
            <span>Divine Health &amp; Restoration</span>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-4 drop-shadow-md">
            Healing Room
          </h1>
          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
            “He was wounded for our transgressions, He was bruised for our iniquities... and with His stripes we are healed.” — Isaiah 53:5. Enter into an atmosphere of divine compassion, prevailing prayer, and total physical wholeness.
          </p>
        </div>
      </section>

      {/* Introduction & Ministry Mandate */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-[#FD9800]">
                <ShieldCheck size={16} />
                <span>The Covenant of Divine Health</span>
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] leading-tight">
                Where Faith Meets God’s Miraculous Power
              </h2>
              <p className="font-body text-[15px] sm:text-base text-[#454F5E] leading-relaxed">
                The Healing Room is dedicated to ministering the tangible healing power of Jesus Christ to all who are oppressed by sickness, pain, and infirmity. Through the preaching of God’s Word, anointed intercession, and personal ministry, we witness cancers dried up, blind eyes opened, broken bones restored, and terminal verdicts reversed.
              </p>
              <p className="font-body text-[15px] sm:text-base text-[#454F5E] leading-relaxed">
                Whether you need physical healing, emotional restoration, or spiritual freedom, Jesus is the same yesterday, today, and forever. No case is too difficult for Him.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#FAF9F5] border-t-4 border-[#FD9800] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-xl text-[#0F172A]">
                Need Healing Prayer Right Now?
              </h3>
              <p className="text-sm text-[#454F5E] leading-relaxed">
                Our intercessory team and anointed ministers are standing in faith with you. Submit your personal prayer request or explore miraculous testimonies of what God has done.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/prayer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-xs uppercase tracking-[1.5px] transition-colors shadow-sm"
                >
                  <Send size={15} />
                  <span>Send Prayer Request</span>
                </Link>
                <Link
                  to="/testimonies"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-neutral-100 text-[#0F172A] border border-gray-300 font-semibold text-xs uppercase tracking-[1.5px] transition-colors"
                >
                  <span>See Testimonies</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healing Room Publications Feed */}
      <section className="py-12 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-gray-200 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] font-bold text-[#FD9800] mb-2">
                <BookOpen size={15} />
                <span>Healing Room Publications</span>
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A]">
                Teachings, Revelations &amp; Miracle Reports
              </h2>
              <p className="font-body text-sm text-[#64748B] mt-1 max-w-xl">
                Articles specifically categorized under Healing Room. All posts here also display across the main ministry Blogs.
              </p>
            </div>

            <Link
              to="/posts"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.5px] text-[#FD9800] hover:text-[#E98C00] transition-colors shrink-0"
            >
              <span>Explore All Blogs</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="py-16 text-center text-[#64748B]">
              <div className="w-8 h-8 border-3 border-[#FD9800] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium">Loading Healing Room articles...</p>
            </div>
          ) : postsList.length === 0 ? (
            <div className="bg-white rounded-xl p-10 border border-gray-100 text-center max-w-xl mx-auto shadow-sm">
              <HeartPulse size={40} className="mx-auto text-[#FD9800] mb-3 opacity-80" />
              <h3 className="font-heading font-bold text-xl text-[#0F172A] mb-2">
                Healing Room Teachings Coming Soon
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                New faith-building articles and miracle accounts are being prepared for the Healing Room. In the meantime, discover all our publications on the main blog.
              </p>
              <Link
                to="/posts"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FD9800] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md"
              >
                <span>Browse All Blogs</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
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
                      src={post.image || eventHealing}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80'
                      }}
                    />
                    {/* Category Pill Tag */}
                    <span className="absolute top-3 left-3 bg-[#FD9800] text-slate-950 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {post.category || 'Healing Room'}
                    </span>
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

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        to={`/posts/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.5px] text-[#FD9800] group-hover:text-[#E98C00] transition-colors"
                      >
                        <span>Read Article</span>
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1.5 transition-transform"
                        />
                      </Link>

                      <div className="flex items-center gap-3 text-xs text-[#64748B] font-medium">
                        <span className="flex items-center gap-1 hover:text-rose-600 transition-colors">
                          <Heart size={14} />
                          <span>{post.likes ?? 24}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  )
}

