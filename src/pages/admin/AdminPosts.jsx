import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Filter,
} from 'lucide-react'
import api from '../../utils/api'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [error, setError] = useState('')

  // Delete modal state
  const [postToDelete, setPostToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError('')
      const params = {
        isAdminView: 'true',
        search: search || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        category: categoryFilter !== 'All' ? categoryFilter : undefined,
      }
      const data = await api.get('/posts', params)
      if (data.success && data.posts) {
        setPosts(data.posts)
      }
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError(err.message || 'Failed to load posts from database')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [statusFilter, categoryFilter])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchPosts()
  }

  const confirmDelete = async () => {
    if (!postToDelete) return
    try {
      setDeleting(true)
      await api.delete(`/posts/${postToDelete._id}`)
      setPosts((prev) => prev.filter((p) => p._id !== postToDelete._id))
      setPostToDelete(null)
    } catch (err) {
      alert(`Error deleting post: ${err.message}`)
    } finally {
      setDeleting(false)
    }
  }

  // Extract unique categories for filter
  const categories = ['All', ...new Set(posts.map((p) => p.category).filter(Boolean))]

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Manage Blog Posts
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Create, edit, and organize all publications on Jesus In Africa.
          </p>
        </div>

        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FD9800] hover:bg-[#E98C00] text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all duration-200 self-start sm:self-auto"
        >
          <PlusCircle size={18} />
          <span>Create New Post</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="w-full md:w-80 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or topic..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FD9800]"
          />
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </form>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            {['all', 'published', 'draft'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === status
                    ? 'bg-[#FD9800] text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-1.5 pl-3 pr-8 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 text-xs focus:outline-none focus:border-[#FD9800]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchPosts}
            title="Refresh"
            className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-sm">
          {error}
        </div>
      )}

      {/* Posts Table / List */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <div className="w-8 h-8 border-3 border-[#FD9800] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Loading articles from MongoDB...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto mb-4 text-[#FD9800]">
              <PlusCircle size={32} />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-1">
              No blog posts found
            </h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto mb-6">
              There are no articles matching your current filter. Get started by writing a new publication.
            </p>
            <Link
              to="/admin/posts/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FD9800] text-slate-950 font-bold text-xs shadow-md"
            >
              <PlusCircle size={15} />
              <span>Create Post</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4 sm:px-6">Article</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    {/* Article Thumbnail + Title */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3.5 min-w-[280px]">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-12 h-12 rounded-lg object-cover bg-slate-800 flex-shrink-0 border border-slate-700/60"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs flex-shrink-0">
                            JIA
                          </div>
                        )}
                        <div className="min-w-0">
                          <Link
                            to={`/admin/posts/edit/${post._id}`}
                            className="font-medium text-white group-hover:text-[#FD9800] transition-colors line-clamp-1 text-sm"
                          >
                            {post.title}
                          </Link>
                          <p className="text-xs text-slate-400 truncate max-w-sm mt-0.5">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-[#FD9800] border border-slate-700/60">
                        {post.category || 'Article'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${
                          post.status === 'published'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {post.status || 'published'}
                      </span>
                    </td>

                    {/* Views */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Eye size={14} className="text-slate-500" />
                        <span>{post.views || 0}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-500" />
                        <span>{post.date || 'Recent'}</span>
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Live preview */}
                        <Link
                          to={`/posts/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on public website"
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        >
                          <ExternalLink size={15} />
                        </Link>

                        {/* Edit */}
                        <Link
                          to={`/admin/posts/edit/${post._id}`}
                          title="Edit article"
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        >
                          <Edit size={15} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => setPostToDelete(post)}
                          title="Delete article"
                          className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0F172A] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Delete Blog Post?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete{' '}
                <strong className="text-white">&quot;{postToDelete.title}&quot;</strong>? This
                action cannot be undone and will remove it permanently from MongoDB.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setPostToDelete(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition-all flex items-center gap-2"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
