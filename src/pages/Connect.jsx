import { MessageCircleHeart, HeartHandshake, ArrowRight, MessageSquareQuote } from 'lucide-react'
import { Link } from 'react-router-dom'
import Seo from '../components/common/Seo'
import CTASection from '../components/home/CTASection'

const links = [
  {
    icon: MessageCircleHeart,
    title: 'Testimonies',
    description:
      'Read real stories of miraculous healing, faith encounters, and divine intervention from believers in our ministry.',
    to: '/testimonies',
    cta: 'Read Testimonies',
  },
  {
    icon: HeartHandshake,
    title: "Let's Pray With You",
    description:
      'It is our privilege to pray for you today and agree with you for your miracle answer to prayer. Whatever your need, God is able.',
    to: '/prayer',
    cta: 'Send Prayer Request',
  },
  {
    icon: MessageSquareQuote,
    title: 'Tell Us Your Story',
    description:
      "Has God touched your life through Jesus in Africa? Share your testimony and let your story inspire faith across nations.",
    to: '/tell-us-your-story',
    cta: 'Share Your Story',
  },
]

export default function Connect() {
  return (
    <>
      <Seo
        title="Connect - Jesus in Africa (JIA)"
        description="Connect with Jesus in Africa through miraculous testimonies, heartfelt prayer requests, and sharing what God has done."
      />

      {/* Header Banner */}
      <section className="bg-[#0F172A] py-20 md:py-24 text-center relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <p className="font-body text-xs uppercase tracking-[3px] font-semibold text-[#FD9800] mb-3">
            Fellowship &amp; Faith
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white">
            Connect
          </h1>
          <div className="w-16 h-1 bg-[#FD9800] mx-auto mt-4" />
        </div>
      </section>

      {/* Main Options */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {links.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-[#FAF9F5] p-8 sm:p-10 border-t-4 border-[#FD9800] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 bg-[#FEF9E1] flex items-center justify-center mb-6 text-[#FD9800]">
                      <Icon size={28} />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-[#0F172A] mb-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-[15px] leading-relaxed text-[#454F5E] mb-8">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <Link
                      to={item.to}
                      className="inline-flex items-center gap-2 bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] px-6 py-3.5 transition-colors"
                    >
                      {item.cta}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
