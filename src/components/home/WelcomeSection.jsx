import { Link } from 'react-router-dom'
import { oludamolaDaramola } from '../../assets/images'

export default function WelcomeSection() {
  return (
    <section className="py-10 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#0F172A] leading-tight mb-6">
              Welcome to <span className="underline decoration-[#FD9800] decoration-4 underline-offset-8">Jesus in Africa (JIA)</span>
            </h2>

            <p className="font-body text-[16px] leading-[1.8] text-[#454F5E] mb-6 font-normal">
              Welcome to Jesus in Africa (JIA), a ministry founded with a divine mandate to strengthen evangelism across Africa and beyond. Under the leadership of our Healing Prophet, <strong>Oludamola Daramola</strong>, we are committed to igniting a revival that will bring transformation and renewal to individuals, communities, and nations. Our priority is living the God-life, and we are here to empower believers to walk in the fullness of their faith and purpose in Christ Jesus.
            </p>

            <div className="p-5 border-l-4 border-[#FD9800] bg-[#FEF9E1]/40 mb-8">
              <p className="font-body text-[15px] italic text-[#0F172A] font-medium leading-relaxed">
                &ldquo;We aim to deepen the faith of believers by teaching them to live by the Word of God and the Spirit.&rdquo;
              </p>
            </div>

            <div>
              <Link
                to="/about"
                className="inline-flex items-center justify-center bg-[#FD9800] hover:bg-[#E98C00] text-[#FEF9E1] font-semibold text-[13px] uppercase tracking-[2px] px-8 py-3.5 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative shadow-xl overflow-hidden group">
              <img
                src={oludamolaDaramola}
                alt="Prophet Oludamola Daramola"
                className="w-full h-auto object-cover object-top max-h-[500px] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-widest text-[#FD9800] font-semibold mb-1">
                  Healing Prophet
                </p>
                <h3 className="font-heading font-bold text-xl text-white">
                  Oludamola Daramola
                </h3>
                <p className="text-xs text-white/80 mt-1">
                  Founder &amp; General Overseer, Jesus in Africa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
