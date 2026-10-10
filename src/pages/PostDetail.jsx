import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  CalendarDays,
  User,
  Clock,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Send,
  Share2,
  Copy,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import Seo from '../components/common/Seo'
import CTASection from '../components/home/CTASection'
import { posts as staticPosts } from '../data/posts'
import api from '../utils/api'

export default function PostDetail() {
  const { slug } = useParams()
  const [livePost, setLivePost] = useState(() =>
    staticPosts.find((p) => p.slug === slug || String(p.id) === slug) || null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const data = await api.get(`/posts/${slug}`)
        if (data.success && data.post) {
          setLivePost(data.post)
        }
      } catch (err) {
        // Fallback to static post
        const found = staticPosts.find((p) => p.slug === slug || String(p.id) === slug)
        if (found) {
          setLivePost(found)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const post = livePost
  const posts = staticPosts


  // Comments state with localStorage support
  const storageKey = `jia_comments_${post?.id || 'default'}`
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [commentText, setCommentText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  // Lightbox modal state for gallery
  const [activeImageIndex, setActiveImageIndex] = useState(null)

  useEffect(() => {
    if (!post) return
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        setComments(JSON.parse(stored))
      } catch {
        setComments(post.comments || [])
      }
    } else {
      setComments(post.comments || [])
    }
  }, [post, storageKey])

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] mb-4">
          Article Not Found
        </h1>
        <p className="font-body text-[#454F5E] mb-8 max-w-md">
          The article you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/posts"
          className="inline-flex items-center gap-2 bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-sm uppercase tracking-wider px-6 py-3 transition-colors"
        >
          <ArrowLeft size={16} /> Back to All Posts
        </Link>
      </div>
    )
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!name.trim() || !commentText.trim()) return

    const newComment = {
      id: `c_${Date.now()}`,
      name: name.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      message: commentText.trim(),
    }

    const updated = [newComment, ...comments]
    setComments(updated)
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated))
    } catch {
      // ignore
    }

    setName('')
    setEmail('')
    setCommentText('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const otherPosts = posts.filter((p) => p.id !== post.id)

  return (
    <>
      <Seo
        title={`${post.title} - Jesus in Africa (JIA)`}
        description={post.excerpt}
      />

      {/* Hero Header Banner */}
      <section className="relative bg-[#0F172A] text-white py-16 md:py-24 overflow-hidden border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[2px]"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/80" />

        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 mb-6 font-medium">
            <Link to="/" className="hover:text-[#FD9800] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/posts" className="hover:text-[#FD9800] transition-colors">
              Posts
            </Link>
            <span>/</span>
            <span className="text-[#FD9800] truncate max-w-[200px] sm:max-w-none">
              {post.category}
            </span>
          </div>

          <span className="inline-block bg-[#FD9800] text-[#0F172A] text-[11px] font-bold uppercase tracking-[2px] px-3 py-1 mb-4">
            {post.category}
          </span>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/80 font-medium">
            <div className="flex items-center gap-2">
              <User size={15} className="text-[#FD9800]" />
              <span>{post.author || 'JIA Media Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-[#FD9800]" />
              <span>{post.date}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[#FD9800]" />
                <span>{post.readTime}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MessageSquare size={15} className="text-[#FD9800]" />
              <span>{comments.length} Comments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content */}
      <main className="py-14 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          {/* Featured Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/10] overflow-hidden shadow-xl mb-12 bg-slate-900 border border-gray-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Text Content */}
          <div className="max-w-[840px] mx-auto">
            {/* Excerpt Lead */}
            <p className="font-body text-lg sm:text-xl font-medium text-[#0F172A] leading-relaxed mb-8 border-l-4 border-[#FD9800] pl-5 italic">
              {post.excerpt}
            </p>

            {/* Content Sections */}
            <div className="space-y-6 text-[#454F5E] font-body text-[16px] sm:text-[17px] leading-[1.85]">
              {post.content?.map((block, idx) => {
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={idx}
                      className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A] pt-4 pb-1"
                    >
                      {block.text}
                    </h2>
                  )
                }
                if (block.type === 'quote') {
                  return (
                    <blockquote
                      key={idx}
                      className="my-8 p-6 sm:p-8 bg-[#FAF9F5] border-l-4 border-[#FD9800] rounded-r-sm"
                    >
                      <p className="font-body text-[17px] sm:text-[18px] text-[#0F172A] italic font-semibold leading-relaxed mb-2">
                        {block.text}
                      </p>
                      {block.author && (
                        <cite className="block text-xs uppercase tracking-wider text-[#FD9800] font-bold not-italic">
                          — {block.author}
                        </cite>
                      )}
                    </blockquote>
                  )
                }
                return <p key={idx}>{block.text}</p>
              })}
            </div>

            {/* Photo Gallery Section */}
            {post.gallery && post.gallery.length > 0 && (
              <section className="mt-14 pt-10 border-t border-gray-100" id="gallery">
                <div className="flex items-center gap-2 mb-2 text-[#FD9800]">
                  <Sparkles size={18} />
                  <h3 className="font-body text-xs uppercase tracking-[2.5px] font-bold">
                    Moments from the Event
                  </h3>
                </div>
                <h4 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A] mb-3">
                  See More Images
                </h4>
                <p className="font-body text-sm text-[#454F5E] mb-6">
                  Click on any picture to view it in full display.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {post.gallery.map((photo, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setActiveImageIndex(pIdx)}
                      className="group relative aspect-[4/3] overflow-hidden bg-slate-100 border border-gray-200 text-left focus:outline-none focus:ring-2 focus:ring-[#FD9800]"
                    >
                      <img
                        src={photo.src}
                        alt={photo.caption || `Gallery photo ${pIdx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                        <span className="text-[11px] font-medium text-white line-clamp-2 drop-shadow">
                          {photo.caption}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Share Article Bar */}
            <div className="mt-12 pt-8 pb-8 border-t border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                <Share2 size={18} className="text-[#FD9800]" />
                <span>Share this article:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2 border border-gray-300 hover:border-[#FD9800] hover:text-[#FD9800] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-600" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-[#25D366] text-white hover:bg-[#20b858] transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-[#1877F2] text-white hover:bg-[#1665cb] transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Comments Section */}
            <section className="mt-14" id="comments">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A]">
                    Comments ({comments.length})
                  </h3>
                  <div className="w-12 h-1 bg-[#FD9800] mt-2" />
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6 mb-12">
                {comments.length === 0 ? (
                  <p className="text-sm italic text-gray-500">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 sm:p-6 bg-[#FAF9F5] border border-gray-100 rounded-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#FD9800]/20 text-[#FD9800] font-bold flex items-center justify-center text-sm">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-heading font-bold text-sm text-[#0F172A]">
                            {c.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                          {c.date}
                        </span>
                      </div>
                      <p className="font-body text-sm text-[#454F5E] leading-relaxed pl-12">
                        {c.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Leave a Comment Form */}
              <div className="bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                <h4 className="font-heading font-bold text-xl text-[#0F172A] mb-2">
                  Leave a Comment
                </h4>
                <p className="font-body text-xs sm:text-sm text-[#454F5E] mb-6">
                  Your email address will not be published. Required fields are marked *
                </p>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2">
                    <Check size={16} />
                    <span>Your comment has been submitted and added below!</span>
                  </div>
                )}

                <form onSubmit={handleAddComment} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="comment-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-1.5"
                      >
                        Name *
                      </label>
                      <input
                        id="comment-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#FD9800] transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="comment-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-1.5"
                      >
                        Email (Optional)
                      </label>
                      <input
                        id="comment-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#FD9800] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="comment-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-1.5"
                    >
                      Comment *
                    </label>
                    <textarea
                      id="comment-message"
                      required
                      rows={4}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Share your testimony, reaction, or words of encouragement..."
                      className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#FD9800] transition-colors resize-y"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-xs uppercase tracking-[2px] px-8 py-3.5 transition-colors shadow-sm"
                    >
                      <Send size={14} />
                      Post Comment
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Other Articles Section */}
      {otherPosts.length > 0 && (
        <section className="py-16 lg:py-20 bg-[#FAF9F5] border-t border-gray-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
              <div>
                <p className="font-body text-xs uppercase tracking-[3px] font-semibold text-[#FD9800] mb-2">
                  Continue Reading
                </p>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A]">
                  Other Articles &amp; Recaps
                </h3>
              </div>
              <Link
                to="/posts"
                className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-[#FD9800] hover:text-[#E98C00] transition-colors"
              >
                View All Posts <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherPosts.map((op) => (
                <article
                  key={op.id}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row group overflow-hidden"
                >
                  <Link
                    to={`/posts/${op.slug}`}
                    className="sm:w-2/5 aspect-[16/10] sm:aspect-auto overflow-hidden bg-gray-100 block shrink-0"
                  >
                    <img
                      src={op.image}
                      alt={op.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#FD9800] mb-2 uppercase tracking-wider">
                        <CalendarDays size={13} />
                        <span>{op.date}</span>
                      </div>
                      <h4 className="font-heading font-bold text-base sm:text-lg text-[#0F172A] group-hover:text-[#FD9800] transition-colors mb-2 leading-snug">
                        <Link to={`/posts/${op.slug}`}>{op.title}</Link>
                      </h4>
                      <p className="font-body text-xs sm:text-[13px] text-[#454F5E] line-clamp-2 mb-4 leading-relaxed">
                        {op.excerpt}
                      </p>
                    </div>
                    <div>
                      <Link
                        to={`/posts/${op.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-[#FD9800] group-hover:text-[#E98C00] transition-colors"
                      >
                        Read Article <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal for Gallery Images */}
      {activeImageIndex !== null && post.gallery && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActiveImageIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImageIndex(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 text-sm uppercase tracking-wider flex items-center gap-1 font-semibold"
            >
              <X size={20} /> Close
            </button>

            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden">
              <img
                src={post.gallery[activeImageIndex].src}
                alt={post.gallery[activeImageIndex].caption || 'Enlarged photo'}
                className="max-h-[75vh] max-w-full object-contain rounded shadow-2xl"
              />

              {post.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveImageIndex(
                        (prev) => (prev - 1 + post.gallery.length) % post.gallery.length
                      )
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#FD9800] text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveImageIndex((prev) => (prev + 1) % post.gallery.length)
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#FD9800] text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {post.gallery[activeImageIndex].caption && (
              <p className="text-white/90 text-sm text-center mt-3 font-medium px-4">
                {post.gallery[activeImageIndex].caption} ({activeImageIndex + 1} /{' '}
                {post.gallery.length})
              </p>
            )}
          </div>
        </div>
      )}

      <CTASection />
    </>
  )
}
