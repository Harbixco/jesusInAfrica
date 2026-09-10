import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ChevronDown, X, Heart } from 'lucide-react'
import { navLinks, socialLinks } from '../../data/navigation'
import logo from '../../assets/images/logo.png'
import { facebook, instagram, telegram, youtube } from '../../assets/icons'

const socialIconMap = {
  Facebook: facebook,
  Instagram: instagram,
  Telegram: telegram,
  YouTube: youtube,
}

export default function MobileMenu({ open, isOpen, onClose }) {
  const isVisible = open ?? isOpen ?? false
  const location = useLocation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-expand dropdown if user is on one of its subpages
  const isConnectSubpage = location.pathname === '/testimonies' || location.pathname === '/prayer'
  const [openDropdown, setOpenDropdown] = useState(isConnectSubpage)

  // Close when pathname changes
  useEffect(() => {
    onClose?.()
  }, [location.pathname])

  // Close on Escape key press
  useEffect(() => {
    if (!isVisible) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, onClose])

  if (!mounted) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] lg:hidden ${
        isVisible ? 'visible' : 'invisible pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop with fade transition */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel with slide transition */}
      <div
        className={`fixed top-0 right-0 h-full h-[100dvh] w-[85%] max-w-sm bg-white shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out transform ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
          <Link to="/" onClick={onClose} className="flex items-center">
            <img
              src={logo}
              alt="Jesus in Africa (JIA)"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#FD9800] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FD9800]/50 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
          {navLinks.map((link) => {
            if (link.dropdown) {
              const isChildActive = link.dropdown.some((child) => location.pathname === child.path)

              return (
                <div key={link.label} className="border-b border-gray-100 py-1">
                  <button
                    type="button"
                    className={`w-full flex items-center justify-between py-3.5 text-[15px] font-semibold transition-colors ${
                      isChildActive ? 'text-[#FD9800]' : 'text-[#0F172A] hover:text-[#FD9800]'
                    }`}
                    onClick={() => setOpenDropdown((prev) => !prev)}
                    aria-expanded={openDropdown}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        openDropdown ? 'rotate-180 text-[#FD9800]' : 'text-gray-400'
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openDropdown ? 'max-h-40 opacity-100 pl-4 pb-2 space-y-1' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {link.dropdown.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block py-2.5 text-[14px] font-medium transition-colors ${
                            isActive
                              ? 'text-[#FD9800] font-bold pl-2 border-l-2 border-[#FD9800]'
                              : 'text-[#454F5E] hover:text-[#FD9800]'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `block py-3.5 border-b border-gray-100 text-[15px] font-semibold transition-colors ${
                    isActive ? 'text-[#FD9800]' : 'text-[#0F172A] hover:text-[#FD9800]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Drawer Footer: Donate CTA & Social Links */}
        <div className="p-6 border-t border-gray-100 bg-[#FAF9F5] space-y-4">
          <Link
            to="/donate"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] py-3.5 shadow-sm transition-colors"
          >
            <Heart size={16} fill="currentColor" />
            <span>Donate</span>
          </Link>

          {/* Social Icons in mobile menu */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-[#FD9800] flex items-center justify-center transition-colors shadow-xs"
              >
                <img
                  src={socialIconMap[s.label]}
                  alt={s.label}
                  className="w-4 h-4 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
