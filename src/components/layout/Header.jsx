import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Navbar from './Navbar'
import MobileMenu from './MobileMenu'
import logo from '../../assets/images/logo.png'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] py-2.5'
          : 'bg-white/95 backdrop-blur-md py-3.5 border-b border-gray-100'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Jesus in Africa (JIA) Home">
          <img
            src={logo}
            alt="Jesus in Africa (JIA)"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <Navbar />

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/donate"
            className="hidden sm:inline-flex items-center justify-center bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] px-6 py-2.5 transition-all duration-200"
          >
            donate
          </Link>

          <button
            type="button"
            className="lg:hidden text-[#0F172A] p-2 sm:p-2.5 rounded-md hover:bg-gray-100 hover:text-[#FD9800] focus:outline-none focus:ring-2 focus:ring-[#FD9800]/50 transition-colors flex items-center justify-center"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
