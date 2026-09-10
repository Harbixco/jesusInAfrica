import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import Seo from '../components/common/Seo'
import CTASection from '../components/home/CTASection'
import { firstbackground } from '../assets/images'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Contact - Jesus in Africa (JIA)"
        description="We would love to hear from you! Reach out to Jesus in Africa for inquiries, prayers, or partnerships."
      />

      {/* Hero Header Banner */}
      <section className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center overflow-hidden bg-[#0F172A]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${firstbackground})` }}
        />
        {/* Overlay to match tone */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-12 md:py-16">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[3px] font-bold text-white/95 mb-3 drop-shadow">
            Get in touch
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
            Contact
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h5 className="font-heading font-normal text-lg sm:text-xl text-[#454F5E] leading-relaxed">
              We would love to hear from you! Whether you have a prayer request, need more information about our ministry, or want to partner with us, feel free to reach out.
            </h5>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-[#FAF9F5] p-8 sm:p-10 border-t-4 border-[#FD9800]">
              <h3 className="font-heading font-bold text-2xl text-[#0F172A] mb-8">
                Address &amp; Info
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#FEF9E1] flex items-center justify-center shrink-0 text-[#FD9800]">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0F172A] uppercase tracking-wider mb-1">
                      Address
                    </h4>
                    <p className="font-body text-sm text-[#454F5E]">
                      Surulere, Lagos State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#FEF9E1] flex items-center justify-center shrink-0 text-[#FD9800]">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0F172A] uppercase tracking-wider mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:+2347066400376"
                      className="font-body text-sm text-[#454F5E] hover:text-[#FD9800] transition-colors"
                    >
                      +234 706 640 0376
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#FEF9E1] flex items-center justify-center shrink-0 text-[#FD9800]">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0F172A] uppercase tracking-wider mb-1">
                      Email
                    </h4>
                    <div className="space-y-1">
                      <a
                        href="mailto:info@jesusinafrica.org"
                        className="block font-body text-sm text-[#454F5E] hover:text-[#FD9800] transition-colors"
                      >
                        info@jesusinafrica.org
                      </a>
                      <a
                        href="mailto:jesusinafrica20@gmail.com"
                        className="block font-body text-sm text-[#454F5E] hover:text-[#FD9800] transition-colors"
                      >
                        jesusinafrica20@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-gray-100 shadow-sm">
              <h3 className="font-heading font-bold text-2xl text-[#0F172A] mb-6">
                Send Us a Message
              </h3>

              {submitted ? (
                <div className="p-6 bg-[#FEF9E1] border-l-4 border-[#FD9800] text-[#0F172A]">
                  <h4 className="font-heading font-bold text-lg mb-2">Thank you!</h4>
                  <p className="font-body text-sm">
                    Your message has been sent successfully. We will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-medium text-[#454F5E] mb-1.5">
                        Your name *
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
                    <div>
                      <label className="block text-[13px] font-medium text-[#454F5E] mb-1.5">
                        Your email *
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
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#454F5E] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#454F5E] mb-1.5">
                      Your message
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none text-sm text-[#0F172A] focus:border-[#FD9800] focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] px-8 py-3.5 transition-colors"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
