import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Sparkles,
  Link as LinkIcon,
  CheckCircle,
  Eye,
  Type,
  Quote,
  Heading,
} from 'lucide-react'
import api from '../../utils/api'
import { compressImage } from '../../utils/imageOptimizer'

export default function AdminPostEditor() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  // Form State
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [autoSlug, setAutoSlug] = useState(!isEditing)
  const [category, setCategory] = useState('Recap')
  const [author, setAuthor] = useState('Prophet Oludamola Daramola')
  const [date, setDate] = useState(() =>
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  )
  const [excerpt, setExcerpt] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('published')
  const [featured, setFeatured] = useState(false)

  // Content blocks state
  const [contentBlocks, setContentBlocks] = useState([
    { type: 'paragraph', text: '' },
  ])

  // UI State
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Helper to convert title to slug
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  // Handle Title Change
  const handleTitleChange = (val) => {
    setTitle(val)
    if (autoSlug) {
      setSlug(slugify(val))
    }
  }

  // Fetch existing post if editing
  useEffect(() => {
    if (!isEditing) return

    const loadPost = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await api.get(`/posts/${id}`)
        if (data.success && data.post) {
          const p = data.post
          setTitle(p.title || '')
          setSlug(p.slug || '')
          setCategory(p.category || 'Recap')
          setAuthor(p.author || 'Prophet Oludamola Daramola')
          setDate(p.date || '')
          setExcerpt(p.excerpt || '')
          setImage(p.image || '')
          setStatus(p.status || 'published')
          setFeatured(Boolean(p.featured))
          if (Array.isArray(p.content) && p.content.length > 0) {
            setContentBlocks(p.content)
          } else {
            setContentBlocks([{ type: 'paragraph', text: '' }])
          }
        }
      } catch (err) {
        console.error('Error loading post:', err)
        setError(err.message || 'Failed to load post details')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id, isEditing])

  // Block management
  const addBlock = (type = 'paragraph') => {
    setContentBlocks((prev) => [...prev, { type, text: '', author: '' }])
  }

  const updateBlock = (index, field, value) => {
    setContentBlocks((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const removeBlock = (index) => {
    if (contentBlocks.length <= 1) {
      setContentBlocks([{ type: 'paragraph', text: '' }])
      return
    }
    setContentBlocks((prev) => prev.filter((_, i) => i !== index))
  }

  // Image Upload handler with pre-upload compression
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      // Compress image client-side to modern WebP and max 1600x1200 dimensions
      const optimizedFile = await compressImage(file, 1600, 1200, 0.82)
      const res = await api.uploadImage(optimizedFile)
      if (res.success && res.url) {
        setImage(res.url)
      }
    } catch (err) {
      alert(`Image upload error: ${err.message}`)
    } finally {
      setUploadingImage(false)
      if (e.target) e.target.value = ''
    }
  }

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!title.trim()) {
      setError('Article title is required.')
      return
    }

    if (!excerpt.trim()) {
      setError('Article excerpt/summary is required.')
      return
    }

    // Filter out completely empty blocks
    const filteredContent = contentBlocks.filter(
      (b) => b.text && b.text.trim().length > 0
    )

    const postPayload = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      category,
      author: author.trim(),
      date: date.trim(),
      excerpt: excerpt.trim(),
      image: image.trim(),
      status,
      featured,
      content: filteredContent.length > 0 ? filteredContent : [{ type: 'paragraph', text: excerpt }],
    }

    try {
      setSaving(true)
      if (isEditing) {
        await api.put(`/posts/${id}`, postPayload)
        setSuccessMessage('Article updated successfully!')
      } else {
        await api.post('/posts', postPayload)
        setSuccessMessage('Article published successfully!')
      }

      setTimeout(() => {
        navigate('/admin/posts')
      }, 1000)
    } catch (err) {
      console.error('Save post error:', err)
      setError(err.message || 'Failed to save article')
    } finally {
      setSaving(false)
    }
  }

  const categories = [
    'Recap',
    'Outreach',
    'Teaching',
    'Conference',
    'Sermon',
    'Testimony',
    'News',
    'Announcement',
  ]

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-8 h-8 border-3 border-[#FD9800] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Loading article details...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/posts"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Back to posts"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              {isEditing
                ? 'Update article details, media, and structured content.'
                : 'Compose and publish a new post to the Jesus In Africa website.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FD9800] hover:bg-[#E98C00] text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all duration-200 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>{isEditing ? 'Update Article' : 'Publish Article'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle size={16} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Editor Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Article Essentials */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-5">
          <h2 className="font-heading font-bold text-lg text-white border-b border-slate-800/80 pb-3">
            Article Essentials
          </h2>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. A Glorious Evening at the Ogun State Supernatural Conference"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#FD9800]"
            />
          </div>

          {/* Slug & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-[11px] text-[#FD9800] hover:underline"
                >
                  {autoSlug ? 'Lock Slug' : 'Auto-sync with Title'}
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false)
                    setSlug(e.target.value)
                  }}
                  placeholder="glorious-evening-conference"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-[#FD9800]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-[#FD9800]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Author & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Prophet Oludamola Daramola"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FD9800]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Publication Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="September 14, 2024"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FD9800]"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Summary / Excerpt *
            </label>
            <textarea
              rows={3}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A concise summary of the article displayed on cards and search results..."
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#FD9800]"
            />
          </div>
        </div>

        {/* Card 2: Cover Media */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-heading font-bold text-lg text-white border-b border-slate-800/80 pb-3">
            Cover Image
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Image URL or Upload
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://... or choose file below"
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FD9800]"
                />
                <LinkIcon
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-colors border border-slate-700/60 disabled:opacity-50">
                  <Upload size={14} className={`text-[#FD9800] ${uploadingImage ? 'animate-bounce' : ''}`} />
                  <span>{uploadingImage ? 'Uploading to Cloud CDN...' : 'Upload Image File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="flex items-center justify-center p-3 rounded-xl bg-slate-900 border border-slate-800 min-h-[140px]">
              {image ? (
                <div className="relative w-full h-36 rounded-lg overflow-hidden group">
                  <img
                    src={image}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs text-white font-medium bg-black/70 px-2.5 py-1 rounded-md">
                      Preview
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500">
                  <ImageIcon size={32} className="mx-auto mb-1 opacity-50" />
                  <p className="text-xs">No cover image specified</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 3: Structured Content Builder */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="font-heading font-bold text-lg text-white">
                Article Body Content
              </h2>
              <p className="text-xs text-slate-400">
                Build your article with paragraphs, subheadings, and scriptures.
              </p>
            </div>

            {/* Quick Add block buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => addBlock('paragraph')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              >
                <Type size={13} className="text-[#FD9800]" />
                <span>+ Paragraph</span>
              </button>
              <button
                type="button"
                onClick={() => addBlock('heading')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              >
                <Heading size={13} className="text-[#FD9800]" />
                <span>+ Heading</span>
              </button>
              <button
                type="button"
                onClick={() => addBlock('quote')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              >
                <Quote size={13} className="text-[#FD9800]" />
                <span>+ Quote</span>
              </button>
            </div>
          </div>

          {/* Blocks List */}
          <div className="space-y-4 pt-2">
            {contentBlocks.map((block, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FD9800]">
                      #{index + 1} {block.type}
                    </span>
                    <select
                      value={block.type}
                      onChange={(e) => updateBlock(index, 'type', e.target.value)}
                      className="py-1 px-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs focus:outline-none"
                    >
                      <option value="paragraph">Paragraph</option>
                      <option value="heading">Subheading</option>
                      <option value="quote">Scripture / Quote</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeBlock(index)}
                    title="Remove block"
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {block.type === 'heading' ? (
                  <input
                    type="text"
                    value={block.text || ''}
                    onChange={(e) => updateBlock(index, 'text', e.target.value)}
                    placeholder="Enter subheading text..."
                    className="w-full px-3.5 py-2 bg-[#080E1A] border border-slate-700/80 rounded-lg text-white font-heading font-semibold text-sm focus:outline-none focus:border-[#FD9800]"
                  />
                ) : block.type === 'quote' ? (
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      value={block.text || ''}
                      onChange={(e) => updateBlock(index, 'text', e.target.value)}
                      placeholder="“For the kingdom of God is not in word, but in power.” — 1 Cor 4:20"
                      className="w-full px-3.5 py-2 bg-[#080E1A] border border-slate-700/80 rounded-lg text-amber-200 text-xs italic focus:outline-none focus:border-[#FD9800]"
                    />
                    <input
                      type="text"
                      value={block.author || ''}
                      onChange={(e) => updateBlock(index, 'author', e.target.value)}
                      placeholder="Quote attribution (e.g. 1 Corinthians 4:20 or Prophet Oludamola)"
                      className="w-full px-3 py-1.5 bg-[#080E1A] border border-slate-700/80 rounded-lg text-slate-400 text-xs focus:outline-none focus:border-[#FD9800]"
                    />
                  </div>
                ) : (
                  <textarea
                    rows={4}
                    value={block.text || ''}
                    onChange={(e) => updateBlock(index, 'text', e.target.value)}
                    placeholder="Write your paragraph here..."
                    className="w-full px-3.5 py-2.5 bg-[#080E1A] border border-slate-700/80 rounded-lg text-slate-200 text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-[#FD9800]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Publishing Status */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-[#FD9800]"
              >
                <option value="published">Published (Visible to all)</option>
                <option value="draft">Draft (Hidden from public)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="featuredToggle"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-[#FD9800] bg-slate-900 border-slate-700 focus:ring-0"
              />
              <label htmlFor="featuredToggle" className="text-xs font-medium text-slate-300">
                Mark as Featured
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              to="/admin/posts"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FD9800] hover:bg-[#E98C00] text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all duration-200 disabled:opacity-50"
            >
              <Save size={16} />
              <span>{isEditing ? 'Update Article' : 'Publish Article'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
