import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Heart, CheckCircle2, MessageSquareQuote, ArrowRight, Share2 } from 'lucide-react'
import Seo from '../components/common/Seo'
import CTASection from '../components/home/CTASection'
import { secondbackground } from '../assets/images'

const categories = [
  'Healing & Physical Miracle',
  'Salvation & Life Transformation',
  'Deliverance & Spiritual Freedom',
  'Financial Breakthrough & Divine Provision',
  'Family & Relationship Restoration',
  'Encounter at Crusade / Outreach',
  'Other Praise Report',
]

export default function TellStory() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    category: 'Healing & Physical Miracle',
    title: '',
    story: '',
    videoUrl: '',
    permission: true,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      window.scrollTo({ top: 350, behavior: 'smooth' })
    }, 600)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      category: 'Healing & Physical Miracle',
      title: '',
      story: '',
      videoUrl: '',
      permission: true,
    })
    setSubmitted(false)
  }

  return (
    <>
      <Seo
        title="Tell Us Your Story - Jesus in Africa (JIA)"
        description="Share your testimony of what God has done in your life through Jesus in Africa. Inspire faith and glorify God across nations."
      />

      {/* Hero Header Banner */}
      <section className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center overflow-hidden bg-[#0F172A]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${secondbackground})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-12 md:py-16">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[3px] font-bold text-[#FD9800] mb-3 drop-shadow">
            Share God&apos;s Goodness
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
            Tell Us Your Story
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introductory Headline & Scripture */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[3px] font-semibold text-[#FD9800] mb-3">
              <MessageSquareQuote size={16} />
              <span>Your Testimony Matters</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] mb-4">
              Has God Done Something Wonderful in Your Life?
            </h2>
            <div className="w-16 h-1 bg-[#FD9800] mx-auto mb-6" />
            <p className="font-body text-base sm:text-lg text-[#454F5E] max-w-2xl mx-auto leading-relaxed mb-8">
              Your story has divine power to spark hope, ignite faith, and reveal Jesus to someone waiting for their own miracle.
            </p>

            {/* Scripture Highlight Box */}
            <div className="p-6 sm:p-8 bg-[#FAF9F5] border-l-4 border-[#FD9800] text-left shadow-xs">
              <p className="font-body text-base sm:text-lg italic text-[#0F172A] leading-relaxed mb-2">
                &ldquo;And they overcame him by the blood of the Lamb and by the word of their testimony.&rdquo;
              </p>
              <p className="font-heading font-bold text-sm text-[#FD9800] uppercase tracking-wider">
                Revelation 12:11
              </p>
            </div>
          </div>

          {/* Form Container / Success State */}
          <div className="bg-white border border-gray-200 p-6 sm:p-10 md:p-12 shadow-sm rounded-none">
            {submitted ? (
              <div className="text-center py-8 px-4 space-y-6">
                <div className="w-16 h-16 bg-[#FEF9E1] rounded-full flex items-center justify-center text-[#FD9800] mx-auto shadow-inner">
                  <CheckCircle2 size={36} />
                </div>

                <div className="max-w-lg mx-auto">
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A] mb-3">
                    Thank You for Sharing Your Story!
                  </h3>
                  <p className="font-body text-[15px] sm:text-base text-[#454F5E] leading-relaxed mb-4">
                    We rejoice with you in what God has done! Your testimony has been received and will encourage believers across our community and ministry gatherings.
                  </p>
                  <p className="font-body text-sm text-[#FD9800] font-semibold">
                    May God continually multiply His blessings and miracles in your life!
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/testimonies"
                    className="inline-flex items-center gap-2 bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[1.5px] px-6 py-3.5 transition-colors"
                  >
                    <span>Read Other Testimonies</span>
                    <ArrowRight size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 bg-transparent hover:bg-gray-100 text-[#0F172A] border border-gray-300 font-semibold text-[13px] uppercase tracking-[1.5px] px-6 py-3.5 transition-colors"
                  >
                    <span>Submit Another Story</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#0F172A] mb-1">
                    Story Submission Form
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Please provide as much detail as you like. Fields marked with * are required.
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Emmanuel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                      Location (City, Country) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lagos, Nigeria"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                    Category of Testimony *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:bg-white focus:outline-none transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Story Title */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                    Story Title / Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Healed of chronic chest pain at the Lagos Outreach"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Story Body */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                    Your Testimony / What God Did *
                  </label>
                  <textarea
                    rows={7}
                    required
                    placeholder="Tell us what your situation was like before, how God answered or ministered to you, and what the outcome is today..."
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:bg-white focus:outline-none transition-colors leading-relaxed"
                  />
                </div>

                {/* Optional Video / Link */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                    Optional: Link to Video or Audio Testimony (YouTube, Drive, etc.)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permission}
                      onChange={(e) => setFormData({ ...formData, permission: e.target.checked })}
                      className="mt-1 h-4 w-4 text-[#FD9800] focus:ring-[#FD9800] border-gray-300 rounded-none"
                    />
                    <span className="text-[13px] text-[#454F5E] leading-normal select-none">
                      I give permission to Jesus in Africa (JIA) to share my testimony publicly on the website, social platforms, and ministry materials to build faith and glorify God.
                    </span>
                  </label>
                </div>

                {/* Submit CTA */}
                <div className="pt-4 text-center sm:text-left">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] px-10 py-4 transition-all duration-200 shadow-sm active:scale-98 disabled:opacity-70"
                  >
                    <Heart size={16} fill="currentColor" />
                    <span>{submitting ? 'Submitting...' : 'Submit Your Story'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
