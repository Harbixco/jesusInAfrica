import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { navLinks } from '../../data/navigation'

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
      {navLinks.map((link) => {
        if (link.dropdown) {
          return (
            <div
              key={link.label}
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button
                className="flex items-center gap-1.5 text-[15px] font-medium text-[#0F172A] hover:text-[#FD9800] transition-colors py-2"
                aria-expanded={openDropdown}
                aria-haspopup="true"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                <span>{link.label}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 text-[#0F172A]/70 ${
                    openDropdown ? 'rotate-180 text-[#FD9800]' : ''
                  }`}
                />
              </button>

              {openDropdown && (
                <div
                  role="menu"
                  className="absolute left-0 top-full pt-1 w-56 z-50 animate-fadeIn"
                >
                  <div className="bg-white rounded-sm shadow-[0_4px_15px_rgba(0,0,0,0.12)] border-t-2 border-[#FD9800] py-1.5 overflow-hidden">
                    {link.dropdown.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        role="menuitem"
                        onClick={() => setOpenDropdown(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2.5 text-[14px] font-medium transition-colors ${
                            isActive
                              ? 'text-[#FD9800] bg-[#FEF9E1]/60 font-semibold'
                              : 'text-[#0F172A] hover:text-[#FD9800] hover:bg-neutral-50'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        }

        return (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `text-[15px] font-medium transition-colors py-2 relative ${
                isActive
                  ? 'text-[#FD9800] font-semibold'
                  : 'text-[#0F172A] hover:text-[#FD9800]'
              }`
            }
          >
            {link.label}
          </NavLink>
        )
      })}
    </nav>
  )
}
