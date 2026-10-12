import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  PlusCircle,
  ExternalLink,
  Edit,
  TrendingUp,
  RefreshCw,
  FolderTree,
} from 'lucide-react'
import api from '../../utils/api'
import { adminLogo } from '../../assets/images'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await api.get('/stats')
      if (data.success && data.stats) {
        setStats(data.stats)
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err)
      setError(err.message || 'Failed to load dashboard metrics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <img
            src={adminLogo}
            alt="Jesus In Africa"
            className="h-16 w-auto object-contain flex-shrink-0 drop-shadow-lg"
          />
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Ministry Affairs Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Overview and publication controls for the Jesus In Africa website.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            title="Refresh statistics"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FD9800] hover:bg-[#E98C00] text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all duration-200"
          >
            <PlusCircle size={17} />
            <span>New Blog Post</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-sm">
          {error}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Posts */}
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Articles
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#FD9800] flex items-center justify-center">
              <FileText size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading font-bold text-3xl sm:text-4xl text-white">
              {loading ? '...' : stats?.totalPosts ?? 0}
            </div>
            <p className="text-xs text-slate-400 mt-1">Stored in MongoDB</p>
          </div>
        </div>

        {/* Published */}
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Published Live
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading font-bold text-3xl sm:text-4xl text-white">
              {loading ? '...' : stats?.publishedPosts ?? 0}
            </div>
            <p className="text-xs text-emerald-400/80 mt-1">Live on website</p>
          </div>
        </div>

        {/* Drafts */}
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Drafts &amp; Queued
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading font-bold text-3xl sm:text-4xl text-white">
              {loading ? '...' : stats?.draftPosts ?? 0}
            </div>
            <p className="text-xs text-slate-400 mt-1">In progress</p>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Article Views
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Eye size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading font-bold text-3xl sm:text-4xl text-white">
              {loading ? '...' : stats?.totalViews ?? 0}
            </div>
            <p className="text-xs text-slate-400 mt-1">Reader engagements</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Recent Posts & Category Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts Column (2 cols) */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-slate-800/90 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-heading font-bold text-lg text-white">
                Recent Blog Posts
              </h2>
              <p className="text-xs text-slate-400">Latest articles in the database</p>
            </div>
            <Link
              to="/admin/posts"
              className="text-xs font-semibold text-[#FD9800] hover:underline"
            >
              View all ({stats?.totalPosts || 0}) →
            </Link>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center text-slate-500 text-sm">
              Loading recent articles...
            </div>
          ) : !stats?.recentPosts || stats.recentPosts.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              No articles found. Click &quot;New Blog Post&quot; to publish your first post!
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {stats.recentPosts.map((post) => (
                <div
                  key={post._id}
                  className="py-3.5 flex items-center justify-between gap-4 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-[#FD9800]">
                        {post.category || 'Article'}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          post.status === 'published'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-white truncate group-hover:text-[#FD9800] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {post.date || 'Recently added'} • {post.views || 0} views
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/posts/edit/${post._id}`}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Edit Post"
                    >
                      <Edit size={14} />
                    </Link>
                    <Link
                      to={`/posts/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="View live post"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Categories Breakdown Column (1 col) */}
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FolderTree size={18} className="text-[#FD9800]" />
              <h2 className="font-heading font-bold text-lg text-white">
                Categories
              </h2>
            </div>

            {loading ? (
              <p className="text-xs text-slate-500">Loading categories...</p>
            ) : !stats?.categories || stats.categories.length === 0 ? (
              <p className="text-xs text-slate-500">No categories recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {stats.categories.map((cat) => (
                  <div
                    key={cat._id || 'Uncategorized'}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
                  >
                    <span className="text-xs font-medium text-slate-200">
                      {cat._id || 'Uncategorized'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-700 text-[11px] font-bold text-[#FD9800]">
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions Panel */}
          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Admin Shortcuts
            </h3>
            <div className="space-y-2">
              <Link
                to="/admin/posts/new"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                <PlusCircle size={14} className="text-[#FD9800]" />
                <span>Write New Article</span>
              </Link>
              <Link
                to="/posts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ExternalLink size={14} />
                <span>Open Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
