import { useState } from 'react'
import Seo from '../components/common/Seo'
import CTASection from '../components/home/CTASection'
import { fourthbackground } from '../assets/images'

export default function Prayer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    request: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Let's Pray With You - Jesus in Africa (JIA)"
        description="It is our privilege to pray for you today and agree with you for your miracle answer to prayer."
      />

      {/* Hero Header Banner */}
      <section className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center overflow-hidden bg-[#0F172A]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fourthbackground})` }}
        />
        {/* Overlay to match tone */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-12 md:py-16">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[3px] font-bold text-white/95 mb-3 drop-shadow">
            A few words about
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
            Let's Pray With You
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] mb-4">
              Prayer Request
            </h2>
            <p className="font-body text-base sm:text-lg text-[#454F5E] max-w-2xl mx-auto leading-relaxed mb-8">
              It is our privilege to pray for you today and agree with you for your miracle answer to prayer.
            </p>

            {/* Scripture Box */}
            <div className="p-6 sm:p-8 bg-[#FAF9F5] border-l-4 border-[#FD9800] text-left mb-6 shadow-sm">
              <p className="font-body text-base sm:text-lg italic text-[#0F172A] leading-relaxed mb-2">
                &ldquo;I tell you that if two of you on earth agree about anything you ask for, it will be done for you by my Father in heaven.&rdquo;
              </p>
              <p className="font-heading font-bold text-sm text-[#FD9800] uppercase tracking-wider">
                Matthew 18:19
              </p>
            </div>

            <p className="font-heading font-semibold text-lg text-[#0F172A]">
              No matter how great your need maybe, it's not too great for God!
            </p>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-100 p-8 sm:p-12 shadow-sm">
            {submitted ? (
              <div className="p-8 bg-[#FEF9E1] border-l-4 border-[#FD9800] text-[#0F172A] text-center">
                <h4 className="font-heading font-bold text-xl mb-3">
                  Prayer Request Received!
                </h4>
                <p className="font-body text-[15px] leading-relaxed">
                  We are standing in faith and agreement with you for your miracle. May the Lord answer you speedily in Jesus' name. Amen!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[13px] font-medium text-[#454F5E] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-medium text-[#454F5E] mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#454F5E] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#454F5E] mb-1.5">
                    Your Prayer Request *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.request}
                    onChange={(e) =>
                      setFormData({ ...formData, request: e.target.value })
                    }
                    placeholder="Tell us what you are trusting God for..."
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:outline-none transition-colors"
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] px-10 py-4 transition-colors"
                  >
                    Submit Prayer Request
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
