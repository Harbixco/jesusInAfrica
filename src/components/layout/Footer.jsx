import { useState } from 'react'
import { Link } from 'react-router-dom'
import { socialLinks } from '../../data/navigation'
import logo from '../../assets/images/logo.png'
import { facebook, instagram, telegram, youtube } from '../../assets/icons'

const socialIconMap = {
  Facebook: facebook,
  Instagram: instagram,
  Telegram: telegram,
  YouTube: youtube,
}

export default function Footer() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!name || !email) {
      setStatus('Please fill in both name and email.')
      return
    }
    setStatus('Thank you for subscribing to Jesus in Africa!')
    setName('')
    setEmail('')
  }

  return (
    <footer className="bg-[#FD9800] border-t border-[#E98C00] text-[#0F172A]" id="colophon">
      {/* Main Footer Content */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Brand & Mission */}
          <div>
            <Link to="/" className="inline-block mb-6 bg-white px-4 py-2.5 rounded-lg shadow-sm">
              <img
                src={logo}
                alt="Jesus in Africa (JIA)"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-[14px] leading-relaxed text-[#0F172A]/85 mb-6 font-medium">
              Become part of a movement that is changing lives and transforming nations. Join us in our mission to bring the light of the gospel to every corner of Africa and beyond.
            </p>
          </div>

          {/* Column 2: Newsletter Subscribe */}
          <div>
            <h2 className="font-heading font-bold text-[20px] text-[#0F172A] mb-6">
              Subscribe
            </h2>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                  Your name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#0F172A]/15 rounded-none text-sm text-[#0F172A] placeholder:text-gray-400 focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                  Your email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#0F172A]/15 rounded-none text-sm text-[#0F172A] placeholder:text-gray-400 focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-[13px] uppercase tracking-[2px] px-8 py-3.5 transition-colors shadow-md"
              >
                Submit
              </button>

              {status && (
                <p className="text-xs text-[#0F172A] font-semibold bg-white/50 px-3 py-1.5 rounded inline-block mt-2">
                  {status}
                </p>
              )}
            </form>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h2 className="font-heading font-bold text-[20px] text-[#0F172A] mb-6">
              Follow Us
            </h2>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const iconSrc = socialIconMap[social.label]
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-[#0F172A]/20 bg-white/40 flex items-center justify-center transition-all duration-200 group hover:border-transparent"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    <img
                      src={iconSrc}
                      alt={social.label}
                      className="w-4 h-4 transition-all duration-200 [filter:brightness(0)] group-hover:[filter:brightness(0)_invert(1)]"
                    />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-[#0F172A]/15 py-6 bg-[#E98C00]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#0F172A] font-medium">
          <p>
            Copyright © 2026 Jesus in Africa (JIA) •{' '}
            <Link to="/admin" className="hover:underline font-bold opacity-80 hover:opacity-100">
              Admin Portal
            </Link>
          </p>
          <p>
            Design by{' '}
            <a
              href="http://veltrixhub.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0F172A] hover:underline font-bold"
            >
              Veltrix Hub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
