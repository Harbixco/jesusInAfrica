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
  Heart,
  Quote as QuoteIcon,
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

  // Reading progress state
  const [scrollProgress, setScrollProgress] = useState(0)

  // Floating action bar visibility
  const [showFloatingBar, setShowFloatingBar] = useState(false)

  // Likes state with localStorage persistence
  const [likesCount, setLikesCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const [likeAnimating, setLikeAnimating] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const data = await api.get(`/posts/${slug}`)
        if (data.success && data.post) {
          setLivePost(data.post)
        }
      } catch (err) {
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
  const storageKey = `jia_comments_${post?._id || post?.id || 'default'}`
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [commentText, setCommentText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  // Lightbox modal state for gallery
  const [activeImageIndex, setActiveImageIndex] = useState(null)

  // Initialize likes from post & localStorage
  useEffect(() => {
    if (!post) return
    const postKey = post._id || post.id || post.slug
    const initialLikes = post.likes ?? (post.id ? 14 + (post.id * 7) % 35 : 18)

    try {
      const likedList = JSON.parse(localStorage.getItem('jia_liked_posts') || '[]')
      const isAlreadyLiked = likedList.includes(postKey)
      setHasLiked(isAlreadyLiked)
      setLikesCount(initialLikes + (isAlreadyLiked && !post.likes ? 1 : 0))
    } catch {
      setLikesCount(initialLikes)
    }
  }, [post])

  // Track scroll progress and floating bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)))
      }
      setShowFloatingBar(window.scrollY > 380)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load comments
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

  // Calculate estimated reading time if not present
  const estimatedReadTime =
    post.readTime ||
    (() => {
      let words = (post.excerpt || '').split(/\s+/).filter(Boolean).length
      if (Array.isArray(post.content)) {
        post.content.forEach((b) => {
          if (b.text) words += b.text.split(/\s+/).filter(Boolean).length
        })
      }
      const mins = Math.max(2, Math.ceil(words / 190))
      return `${mins} min read`
    })()

  // Handle like toggle
  const handleToggleLike = async () => {
    const postKey = post._id || post.id || post.slug
    const nextState = !hasLiked
    setHasLiked(nextState)
    setLikeAnimating(true)
    setTimeout(() => setLikeAnimating(false), 400)

    const nextCount = nextState ? likesCount + 1 : Math.max(0, likesCount - 1)
    setLikesCount(nextCount)

    try {
      const likedList = JSON.parse(localStorage.getItem('jia_liked_posts') || '[]')
      let updated
      if (nextState) {
        updated = Array.from(new Set([...likedList, postKey]))
      } else {
        updated = likedList.filter((k) => k !== postKey)
      }
      localStorage.setItem('jia_liked_posts', JSON.stringify(updated))
    } catch {
      // ignore
    }

    // Call backend API if live post ID/slug exists
    try {
      await api.post(`/posts/${postKey}/like`, { action: nextState ? 'like' : 'unlike' })
    } catch (err) {
      // Local optimistic update stays intact
    }
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

  const scrollToComments = () => {
    const el = document.getElementById('comments')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const otherPosts = posts.filter((p) => (p.slug || String(p.id)) !== (post.slug || String(post.id)))

  return (
    <>
      <Seo
        title={`${post.title} - Jesus in Africa (JIA)`}
        description={post.excerpt}
      />

      {/* Medium-style Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3.5px] bg-[#FD9800] z-[100] transition-all duration-100 ease-out shadow-[0_0_8px_rgba(253,152,0,0.6)]"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      {/* Floating Medium-Style Bottom Interaction Bar (Mobile & Desktop) */}
      <aside
        aria-label="Article interactions"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
          showFloatingBar
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full px-5 py-2.5 flex items-center gap-5 sm:gap-7">
          {/* Like Button */}
          <button
            type="button"
            onClick={handleToggleLike}
            className={`flex items-center gap-2 text-sm font-semibold transition-all active:scale-95 ${
              hasLiked ? 'text-rose-600' : 'text-[#454F5E] hover:text-rose-600'
            }`}
            aria-label={hasLiked ? 'Unlike post' : 'Like post'}
          >
            <Heart
              size={18}
              className={`transition-transform ${likeAnimating ? 'scale-125' : 'scale-100'}`}
              fill={hasLiked ? 'currentColor' : 'none'}
            />
            <span className="font-mono text-xs">{likesCount}</span>
          </button>

          <span className="w-px h-4 bg-gray-200" aria-hidden="true" />

          {/* Comment Shortcut */}
          <button
            type="button"
            onClick={scrollToComments}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#454F5E] hover:text-[#FD9800] transition-colors"
            aria-label="Jump to comments"
          >
            <MessageSquare size={17} />
            <span className="font-mono text-xs">{comments.length}</span>
          </button>

          <span className="w-px h-4 bg-gray-200" aria-hidden="true" />

          {/* Share to WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#454F5E] hover:text-[#25D366] transition-colors"
            aria-label="Share on WhatsApp"
            title="Share on WhatsApp"
          >
            <Share2 size={17} />
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="text-[#454F5E] hover:text-[#FD9800] transition-colors"
            aria-label="Copy article link"
            title="Copy link"
          >
            {copied ? <Check size={17} className="text-emerald-600" /> : <Copy size={17} />}
          </button>
        </div>
      </aside>

      {/* Editorial Article Container */}
      <article className="pt-8 pb-16 lg:pb-24 bg-white">
        <div className="max-w-[760px] mx-auto px-5 sm:px-8">
          {/* Breadcrumb Nav */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-[1.5px] text-[#64748B] font-semibold mb-6">
            <Link to="/" className="hover:text-[#FD9800] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/posts" className="hover:text-[#FD9800] transition-colors">
              Blogs
            </Link>
            <span>/</span>
            <span className="text-[#FD9800] truncate max-w-[200px]">
              {post.category || 'Recap'}
            </span>
          </nav>

          {/* Category Pill Tag */}
          <div className="mb-4">
            <span className="inline-block bg-[#FEF9E1] border border-[#FD9800]/40 text-[#0F172A] font-bold text-[11px] uppercase tracking-[2px] px-3.5 py-1">
              {post.category || 'Article'}
            </span>
          </div>

          {/* Article Title (Medium-Style Bold Editorial Headline) */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-[44px] text-[#0F172A] leading-[1.2] tracking-tight mb-5">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt Lead */}
          {post.excerpt && (
            <p className="font-body text-lg sm:text-[21px] text-[#454F5E] leading-relaxed mb-7 font-normal">
              {post.excerpt}
            </p>
          )}

          {/* Author Byline & Story Metadata Bar */}
          <div className="pt-5 pb-6 border-t border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* Author Avatar with initials */}
              <div className="w-11 h-11 rounded-full bg-[#0F172A] text-[#FEF9E1] font-heading font-bold text-sm flex items-center justify-center border-2 border-[#FD9800]/50 shadow-xs">
                {(post.author || 'JIA')
                  .split(' ')
                  .map((w) => w[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </div>

              <div>
                <p className="font-heading font-bold text-sm text-[#0F172A] leading-tight">
                  {post.author || 'Prophet Oludamola Daramola'}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#64748B] mt-1 font-medium">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#FD9800] font-semibold">
                    <Clock size={12} />
                    {estimatedReadTime}
                  </span>
                </div>
              </div>
            </div>

            {/* In-Header Quick Engagement Row */}
            <div className="flex items-center gap-3">
              {/* Like Button */}
              <button
                type="button"
                onClick={handleToggleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold ${
                  hasLiked
                    ? 'border-rose-200 bg-rose-50 text-rose-600 shadow-xs'
                    : 'border-gray-200 text-[#454F5E] hover:border-gray-300 hover:text-rose-600'
                }`}
                aria-label={hasLiked ? 'Unlike article' : 'Like article'}
              >
                <Heart
                  size={15}
                  className={`transition-transform ${likeAnimating ? 'scale-125' : ''}`}
                  fill={hasLiked ? 'currentColor' : 'none'}
                />
                <span className="font-mono">{likesCount}</span>
              </button>

              {/* Comments jump */}
              <button
                type="button"
                onClick={scrollToComments}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-[#454F5E] hover:border-gray-300 hover:text-[#FD9800] transition-colors text-xs font-semibold"
                aria-label="View comments"
              >
                <MessageSquare size={15} />
                <span className="font-mono">{comments.length}</span>
              </button>

              {/* Share button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1.5 rounded-full border border-gray-200 text-[#454F5E] hover:text-[#FD9800] hover:border-[#FD9800] transition-colors"
                title={copied ? 'Link Copied!' : 'Copy link'}
                aria-label="Copy link"
              >
                {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Featured Cover Image */}
          {post.image && (
            <figure className="my-10">
              <div className="relative aspect-[16/10] sm:aspect-[21/11] overflow-hidden bg-slate-900 border border-gray-100 shadow-md">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-center text-xs text-[#64748B] italic mt-2.5">
                {post.title} — Jesus in Africa Ministry Gathering
              </figcaption>
            </figure>
          )}

          {/* Article Core Content Body (Medium Golden Width & Typography) */}
          <div className="space-y-7 text-[#334155] font-body text-[17px] sm:text-[18.5px] leading-[1.85] pt-2">
            {post.content && post.content.length > 0 ? (
              post.content.map((block, idx) => {
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={idx}
                      className="font-heading font-extrabold text-2xl sm:text-[28px] text-[#0F172A] pt-6 pb-1 tracking-tight leading-snug"
                    >
                      {block.text}
                    </h2>
                  )
                }

                if (block.type === 'quote') {
                  return (
                    <blockquote
                      key={idx}
                      className="my-9 p-6 sm:p-8 bg-[#FAF9F5] border-l-4 border-[#FD9800] relative shadow-xs"
                    >
                      <div className="w-8 h-8 text-[#FD9800]/40 mb-2">
                        <QuoteIcon size={26} />
                      </div>
                      <p className="font-body text-[18px] sm:text-[20px] text-[#0F172A] italic font-medium leading-[1.7] mb-2">
                        &ldquo;{block.text}&rdquo;
                      </p>
                      {block.author && (
                        <cite className="block text-xs uppercase tracking-[2px] text-[#FD9800] font-bold not-italic pt-2">
                          — {block.author}
                        </cite>
                      )}
                    </blockquote>
                  )
                }

                if (block.type === 'image') {
                  const imgSrc = block.url || block.src || block.text
                  if (!imgSrc) return null
                  return (
                    <figure key={idx} className="my-9 space-y-2.5">
                      <div className="overflow-hidden bg-slate-900 border border-gray-200 shadow-md">
                        <img
                          src={imgSrc}
                          alt={block.caption || block.text || 'Article photograph'}
                          className="w-full max-h-[550px] object-cover"
                          loading="lazy"
                        />
                      </div>
                      {(block.caption || (block.text && block.text !== imgSrc)) && (
                        <figcaption className="text-center text-xs text-[#64748B] italic">
                          {block.caption || block.text}
                        </figcaption>
                      )}
                    </figure>
                  )
                }

                return (
                  <p key={idx} className="leading-[1.85]">
                    {block.text}
                  </p>
                )
              })
            ) : (
              <p className="leading-[1.85]">{post.rawContent || post.excerpt}</p>
            )}

            {/* Medium-style section divider */}
            <div className="text-center text-gray-300 font-serif tracking-[12px] py-6 select-none" aria-hidden="true">
              • • •
            </div>
          </div>

          {/* Photo Gallery Section (if attached) */}
          {post.gallery && post.gallery.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-100" id="gallery">
              <div className="flex items-center gap-2 mb-2 text-[#FD9800]">
                <Sparkles size={18} />
                <h3 className="font-body text-xs uppercase tracking-[2.5px] font-bold">
                  Event Moments
                </h3>
              </div>
              <h4 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A] mb-3">
                See More Images
              </h4>
              <p className="font-body text-sm text-[#454F5E] mb-6">
                Click on any image to view in full resolution.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {post.gallery.map((photo, pIdx) => {
                  const photoSrc = typeof photo === 'string' ? photo : photo?.src || photo?.url || ''
                  const photoCaption = typeof photo === 'object' ? photo?.caption : ''
                  if (!photoSrc) return null
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setActiveImageIndex(pIdx)}
                      className="group relative aspect-[4/3] overflow-hidden bg-slate-100 border border-gray-200 text-left focus:outline-none focus:ring-2 focus:ring-[#FD9800]"
                    >
                      <img
                        src={photoSrc}
                        alt={photoCaption || `Gallery photo ${pIdx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                        <span className="text-[11px] font-medium text-white line-clamp-2 drop-shadow">
                          {photoCaption || 'View photo'}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {/* Reader Appreciation & Engagement Box */}
          <div className="mt-14 p-6 sm:p-8 bg-[#FAF9F5] border border-gray-200/80 rounded-none flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-heading font-bold text-lg sm:text-xl text-[#0F172A] mb-1">
                Did this message speak to you?
              </h4>
              <p className="font-body text-xs sm:text-sm text-[#64748B]">
                Tap the heart to show your appreciation and agree in faith.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleLike}
                className={`inline-flex items-center gap-2.5 px-6 py-3 font-semibold text-xs uppercase tracking-[1.5px] transition-all shadow-sm active:scale-95 ${
                  hasLiked
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-[#0F172A] hover:bg-[#FD9800] hover:text-[#0F172A] text-white'
                }`}
              >
                <Heart
                  size={17}
                  className={likeAnimating ? 'scale-125' : ''}
                  fill={hasLiked ? 'currentColor' : 'none'}
                />
                <span>{hasLiked ? 'Liked' : 'Like'}</span>
                <span className="opacity-80">({likesCount})</span>
              </button>

              <button
                type="button"
                onClick={scrollToComments}
                className="inline-flex items-center gap-2 px-5 py-3 border border-gray-300 hover:border-[#FD9800] text-[#0F172A] hover:text-[#FD9800] font-semibold text-xs uppercase tracking-[1.5px] transition-colors"
              >
                <MessageSquare size={16} />
                <span>Comment</span>
              </button>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-[2px] font-bold text-[#64748B]">
              Share with others:
            </span>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-[#25D366] text-white hover:bg-[#20b858] transition-colors shadow-xs"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-[#1877F2] text-white hover:bg-[#1665cb] transition-colors shadow-xs"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-[#0F172A] text-white hover:bg-black transition-colors shadow-xs"
              >
                X / Twitter
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3.5 py-2 border border-gray-300 hover:border-[#FD9800] text-[#0F172A] transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Link'}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <section className="mt-16 pt-10 border-t border-gray-200" id="comments">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A]">
                  Responses &amp; Comments ({comments.length})
                </h3>
                <div className="w-12 h-1 bg-[#FD9800] mt-2" />
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4 mb-12">
              {comments.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF9F5] border border-gray-100">
                  <p className="text-sm italic text-gray-500 mb-1">
                    No comments yet on this article.
                  </p>
                  <p className="text-xs text-gray-400">
                    Be the first to share how God touched you through this message!
                  </p>
                </div>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 sm:p-6 bg-[#FAF9F5] border border-gray-100"
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
            <div className="bg-white border border-gray-200 p-6 sm:p-8 shadow-xs">
              <h4 className="font-heading font-bold text-xl text-[#0F172A] mb-2">
                Leave a Comment
              </h4>
              <p className="font-body text-xs sm:text-sm text-[#64748B] mb-6">
                Share your reflections, testimony, or reaction with our community.
              </p>

              {submitted && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                  <Check size={16} />
                  <span>Thank you! Your comment has been posted below.</span>
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
                      className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#FD9800] transition-colors rounded-none"
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
                      className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#FD9800] transition-colors rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="comment-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-1.5"
                  >
                    Your Comment *
                  </label>
                  <textarea
                    id="comment-message"
                    required
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share what touched you from this message..."
                    className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#FD9800] transition-colors resize-y rounded-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-xs uppercase tracking-[2px] px-8 py-3.5 transition-colors shadow-sm"
                  >
                    <Send size={14} />
                    <span>Post Comment</span>
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </article>

      {/* Recommended Articles Section (Medium Style) */}
      {otherPosts.length > 0 && (
        <section className="py-16 lg:py-20 bg-[#FAF9F5] border-t border-gray-200">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
              <div>
                <p className="font-body text-xs uppercase tracking-[3px] font-semibold text-[#FD9800] mb-2">
                  More From Jesus in Africa
                </p>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A]">
                  Recommended Reads
                </h3>
              </div>
              <Link
                to="/posts"
                className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-[#FD9800] hover:text-[#E98C00] transition-colors"
              >
                <span>View All Articles</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherPosts.slice(0, 4).map((op) => (
                <article
                  key={op._id || op.id || op.slug}
                  className="bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row group overflow-hidden"
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
                        {op.readTime && (
                          <>
                            <span>•</span>
                            <span className="text-[#64748B] lowercase">{op.readTime}</span>
                          </>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-base sm:text-lg text-[#0F172A] group-hover:text-[#FD9800] transition-colors mb-2 leading-snug">
                        <Link to={`/posts/${op.slug}`}>{op.title}</Link>
                      </h4>
                      <p className="font-body text-xs sm:text-[13.5px] text-[#454F5E] line-clamp-2 mb-4 leading-relaxed">
                        {op.excerpt}
                      </p>
                    </div>
                    <div>
                      <Link
                        to={`/posts/${op.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.5px] text-[#FD9800] group-hover:text-[#E98C00] transition-colors"
                      >
                        <span>Read Story</span>
                        <ArrowRight size={13} />
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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
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
              <X size={20} />
              <span>Close</span>
            </button>

            <div className="relative w-full max-h-[75vh] flex items-center justify-center">
              {(() => {
                const current = post.gallery[activeImageIndex]
                const curSrc = typeof current === 'string' ? current : current?.src || current?.url
                const curCap = typeof current === 'object' ? current?.caption : ''
                return (
                  <div className="text-center">
                    <img
                      src={curSrc}
                      alt={curCap || `Gallery image ${activeImageIndex + 1}`}
                      className="max-h-[72vh] max-w-full object-contain mx-auto shadow-2xl"
                    />
                    {curCap && (
                      <p className="text-white/90 text-sm mt-3 font-medium drop-shadow">
                        {curCap}
                      </p>
                    )}
                  </div>
                )
              })()}

              {post.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? post.gallery.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-black/40 sm:bg-transparent"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={36} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === post.gallery.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-black/40 sm:bg-transparent"
                    aria-label="Next image"
                  >
                    <ChevronRight size={36} />
                  </button>
                </>
              )}
            </div>

            <p className="text-white/60 text-xs mt-4">
              {activeImageIndex + 1} of {post.gallery.length}
            </p>
          </div>
        </div>
      )}

      <CTASection />
    </>
  )
}
