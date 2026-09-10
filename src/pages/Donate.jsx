import { useState } from 'react'
import { Building2, Copy, Check, CheckCircle2, ShieldCheck, Mail, HeartHandshake } from 'lucide-react'
import Seo from '../components/common/Seo'
import CTASection from '../components/home/CTASection'
import { secondbackground } from '../assets/images'

export default function Donate() {
  const [copiedZenith, setCopiedZenith] = useState(false)
  const [copiedGTB, setCopiedGTB] = useState(false)

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
    if (type === 'zenith') {
      setCopiedZenith(true)
      setTimeout(() => setCopiedZenith(false), 2500)
    } else {
      setCopiedGTB(true)
      setTimeout(() => setCopiedGTB(false), 2500)
    }
  }

  return (
    <>
      <Seo
        title="Donate - Jesus in Africa (JIA)"
        description="Support Jesus in Africa's crusades, outreaches, and evangelism across nations through direct bank transfer."
      />

      {/* Hero Header Banner */}
      <section className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center overflow-hidden bg-[#0F172A]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${secondbackground})` }}
        />
        {/* Overlay to match tone */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-12 md:py-16">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[3px] font-bold text-white/95 mb-3 drop-shadow">
            Partner With Us
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
            Donate
          </h1>
        </div>
      </section>

      {/* Main Account Details & Giving Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Mission & Impact */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[3px] font-semibold text-[#FD9800] mb-3">
                <HeartHandshake size={16} />
                <span>Kingdom Partnership</span>
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] mb-6 leading-tight">
                Make a Measurable Difference
              </h2>
              <p className="font-body text-[15px] sm:text-[16px] leading-[1.8] text-[#454F5E] mb-6">
                Your generosity powers evangelistic crusades, miracle conferences, faith workshops, and leadership trainings across Africa and beyond. Every seed you sow enables us to reach unreached communities with the light and salvation of Jesus Christ.
              </p>

              {/* Impact Bullet Points */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FD9800] shrink-0 mt-0.5" />
                  <p className="font-body text-sm text-[#454F5E] leading-relaxed">
                    Support Healing Crusades and Supernatural Conferences in cities and rural regions.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FD9800] shrink-0 mt-0.5" />
                  <p className="font-body text-sm text-[#454F5E] leading-relaxed">
                    Equip ministers and believers through hands-on Faith Walk workshops.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FD9800] shrink-0 mt-0.5" />
                  <p className="font-body text-sm text-[#454F5E] leading-relaxed">
                    Provide spiritual, training, and material resources to local assemblies.
                  </p>
                </div>
              </div>

              {/* Scripture Inspiration */}
              <div className="p-6 sm:p-7 bg-[#FAF9F5] border-l-4 border-[#FD9800] shadow-sm">
                <p className="font-body text-[15px] italic text-[#0F172A] leading-relaxed mb-2">
                  &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
                </p>
                <cite className="font-heading font-bold text-xs uppercase tracking-wider text-[#FD9800] not-italic">
                  — 2 Corinthians 9:7
                </cite>
              </div>
            </div>

            {/* Right Column: Prominent Account Details Display */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-[#FAF9F5] border border-gray-200 shadow-md p-8 sm:p-10 relative">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <div className="w-11 h-11 bg-[#FEF9E1] rounded-lg flex items-center justify-center text-[#FD9800]">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#0F172A]">
                      Bank Account Details
                    </h3>
                    <p className="text-xs text-[#454F5E]">Direct wire &amp; local bank transfer</p>
                  </div>
                </div>

                {/* Account Details Box */}
                <div className="space-y-6">
                  {/* Account Name */}
                  <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
                    <span className="block text-xs uppercase tracking-wider font-semibold text-[#454F5E] mb-1">
                      Account Name
                    </span>
                    <p className="font-heading font-bold text-lg text-[#0F172A]">
                      Jesus in Africa Ministry
                    </p>
                  </div>

                  {/* Bank Option 1: Zenith Bank */}
                  <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="block text-xs uppercase tracking-wider font-semibold text-[#454F5E] mb-1">
                        Bank Name
                      </span>
                      <p className="font-heading font-bold text-base text-[#0F172A]">
                        Zenith Bank Plc
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Nigeria &amp; International</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy('Jesus in Africa Ministry - Zenith Bank Plc', 'zenith')}
                      className="inline-flex items-center gap-1.5 self-start sm:self-center px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#FAF9F5] hover:bg-[#FEF9E1] border border-gray-300 hover:border-[#FD9800] text-[#0F172A] transition-colors"
                    >
                      {copiedZenith ? (
                        <>
                          <Check size={14} className="text-green-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} className="text-[#FD9800]" />
                          <span>Copy Details</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Bank Option 2: GTBank */}
                  <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="block text-xs uppercase tracking-wider font-semibold text-[#454F5E] mb-1">
                        Bank Name
                      </span>
                      <p className="font-heading font-bold text-base text-[#0F172A]">
                        Guaranty Trust Bank (GTBank)
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Nigeria &amp; International</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy('Jesus in Africa Ministry - Guaranty Trust Bank (GTBank)', 'gtb')}
                      className="inline-flex items-center gap-1.5 self-start sm:self-center px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#FAF9F5] hover:bg-[#FEF9E1] border border-gray-300 hover:border-[#FD9800] text-[#0F172A] transition-colors"
                    >
                      {copiedGTB ? (
                        <>
                          <Check size={14} className="text-green-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} className="text-[#FD9800]" />
                          <span>Copy Details</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Transfer Notification Note */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex items-start gap-3 text-xs text-[#454F5E] leading-relaxed">
                  <Mail size={18} className="text-[#FD9800] shrink-0 mt-0.5" />
                  <p>
                    After completing your transfer, please send your confirmation or receipt to{' '}
                    <a
                      href="mailto:info@jesusinafrica.org"
                      className="font-semibold text-[#FD9800] hover:underline"
                    >
                      info@jesusinafrica.org
                    </a>{' '}
                    so we may acknowledge your seed and agree with you in prayer.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-6">
                  <ShieldCheck size={16} className="text-[#FD9800]" />
                  <span>Official Ministry Giving Channels</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
