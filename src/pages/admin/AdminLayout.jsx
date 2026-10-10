import { useState } from 'react'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Shield,
  Flame,
} from 'lucide-react'
import { logo } from '../../assets/images'
import { useAdminAuth } from '../../context/AdminAuthContext'

export default function AdminLayout({ children }) {
  const { admin, isAuthenticated, loading, logout } = useAdminAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#FD9800] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-400">Loading Admin Center...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const navItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      to: '/admin',
      exact: true,
    },
    {
      label: 'All Blog Posts',
      icon: FileText,
      to: '/admin/posts',
    },
    {
      label: 'Create Post',
      icon: PlusCircle,
      to: '/admin/posts/new',
    },
  ]

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.to
    }
    return location.pathname.startsWith(item.to)
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col md:flex-row font-body">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0F172A] border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Jesus In Africa" className="h-8 w-auto object-contain" />
          <span className="font-heading font-bold text-base text-white tracking-wide">
            JIA <span className="text-[#FD9800]">Admin</span>
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0F172A] border-r border-slate-800/80 flex flex-col transition-transform duration-300 md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-0 hidden md:flex'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
          <img
            src={logo}
            alt="Jesus In Africa"
            className="h-10 w-auto object-contain flex-shrink-0"
          />
          <div className="min-w-0">
            <h1 className="font-heading font-bold text-base text-white tracking-wide leading-tight truncate">
              Jesus In Africa
            </h1>
            <p className="text-[11px] font-semibold tracking-wider text-[#FD9800] uppercase">
              Control Panel
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item)
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-[#FD9800] text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon size={18} className={active ? 'text-slate-950' : 'text-slate-400'} />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="pt-4 pb-2">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Quick Shortcuts
            </p>
          </div>

          <Link
            to="/posts"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink size={18} className="text-slate-400 group-hover:text-[#FD9800]" />
              <span>Public Blog</span>
            </div>
            <span className="text-xs text-slate-400">Live ↗</span>
          </Link>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <Flame size={18} className="text-slate-400 group-hover:text-[#FD9800]" />
              <span>Website Home</span>
            </div>
            <span className="text-xs text-slate-400">Live ↗</span>
          </Link>
        </nav>

        {/* Admin Footer / User Pill */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-[#FD9800]">
                <Shield size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {admin?.name || 'Admin'}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {admin?.email || 'admin@jia.org'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B1120]">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
