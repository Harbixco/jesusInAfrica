import { Link } from 'react-router-dom'
import Seo from '../components/common/Seo'
import CTASection from '../components/home/CTASection'
import EventsSection from '../components/home/EventsSection'
import {
  oludamolaDaramola,
  ministerAbiodunAgbaje,
  ministerJanet,
  ministerAkerejolaEni,
  heroSlide3,
  aboutus
} from '../assets/images'

const team = [
  {
    name: 'Oludamola Daramola',
    role: 'General Evangelist',
    bio: 'The founder and visionary leader of JIA, Prophet Oludamola is known for his powerful healing ministry and passion for evangelism.',
    image: oludamolaDaramola,
  },
  {
    name: 'Minister Abiodun Agbaje',
    role: 'Director of Evangelism',
    bio: 'Overseeing our evangelistic outreaches and training programs across different regions.',
    image: ministerAbiodunAgbaje,
  },
  {
    name: 'Minister Janet',
    role: 'Head of Faith Walk Training',
    bio: 'Overseeing discipleship, faith walk training programs, and community spiritual development.',
    image: ministerJanet,
  },
  {
    name: 'Minister Akerejola Eni',
    role: 'Media Director',
    bio: 'Directing media outreach, live broadcast operations, and digital evangelism content.',
    image: ministerAkerejolaEni,
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us - Jesus in Africa (JIA)"
        description="Learn about the divine mandate, vision, mission, and team behind Jesus in Africa (JIA)."
      />

      {/* Hero Header Banner */}
      <section className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center overflow-hidden bg-[#141006]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutus})` }}
        />
        {/* Overlay to match screenshot tone */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-12 md:py-16">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[3px] font-bold text-white/95 mb-3 drop-shadow">
            A FEW WORDS
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
            About Us
          </h1>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-10 lg:py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="relative shadow-xl overflow-hidden group">
                <img
                  src={heroSlide3}
                  alt="Jesus in Africa Ministry Gathering"
                  className="w-full h-[460px] object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] mb-6">
                Who We Are
              </h2>
              <p className="font-body text-[15px] sm:text-[16px] leading-[1.8] text-[#454F5E] mb-6">
                Jesus in Africa (JIA) was founded by <strong>Oludamola Daramola</strong>, a Healing Prophet and the General Evangelist of our ministry. Our foundation is built on the belief that every believer is called to walk in the power of the Spirit and the authority of Christ.
              </p>
              <div className="p-5 border-l-4 border-[#FD9800] bg-[#FEF9E1]/50 mb-6">
                <p className="font-body text-[15px] italic text-[#0F172A] leading-relaxed">
                  &ldquo;In my former book, Theophilus, I wrote about all that Jesus began to do and to teach...&rdquo; — <strong>Acts 1:1</strong>
                </p>
              </div>
              <p className="font-body text-[15px] sm:text-[16px] leading-[1.8] text-[#454F5E]">
                This encapsulates our mission to continue the works and teachings of Jesus through the empowerment of the Holy Spirit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-10 bg-[#FAF9F5] border-t border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 sm:p-10 border-t-4 border-[#FD9800] shadow-sm">
              <h3 className="font-heading font-bold text-2xl text-[#0F172A] mb-4">
                Our Vision
              </h3>
              <p className="font-body text-[15px] leading-[1.8] text-[#454F5E]">
                Our vision is to see a continent transformed by the power of the gospel, where every believer is walking in the fullness of their calling, and every nation is impacted by the love and power of Jesus Christ.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 border-t-4 border-[#FD9800] shadow-sm">
              <h3 className="font-heading font-bold text-2xl text-[#0F172A] mb-4">
                Our Mission
              </h3>
              <p className="font-body text-[15px] leading-[1.8] text-[#454F5E] mb-4">
                Our mission is to empower believers to live the God-life, to walk in the power of the Spirit, and to take nations for Jesus through evangelism. We strive to:
              </p>
              <ul className="space-y-3 font-body text-[14px] text-[#454F5E]">
                <li className="flex items-start gap-2">
                  <span className="text-[#FD9800] font-bold text-base">&bull;</span>
                  <span>Equip believers with the knowledge and tools needed to grow in their faith and live out their Christian calling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FD9800] font-bold text-base">&bull;</span>
                  <span>Strengthen local assemblies by providing training that emphasizes the workings of faith and love.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FD9800] font-bold text-base">&bull;</span>
                  <span>Foster a deep love for evangelism, inspiring believers to reach out to others with the gospel message.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Represent */}
      <section className="py-5 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] mb-3">
              What We Represent
            </h2>
            <div className="w-16 h-1 bg-[#FD9800] mx-auto mb-4" />
            <p className="font-body text-[15px] text-[#454F5E]">
              At JIA, we represent the embodiment of faith, love, and the supernatural power of the Holy Spirit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-100 bg-white hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FEF9E1] flex items-center justify-center text-[#FD9800] font-bold text-xl mb-6">
                01
              </div>
              <h4 className="font-heading font-bold text-lg text-[#0F172A] mb-3">
                Strengthening Believers' Faith Walk
              </h4>
              <p className="font-body text-[14px] leading-relaxed text-[#454F5E]">
                We aim to deepen the faith of believers by teaching them to live by the Word of God and the Spirit.
              </p>
            </div>

            <div className="p-8 border border-gray-100 bg-white hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FEF9E1] flex items-center justify-center text-[#FD9800] font-bold text-xl mb-6">
                02
              </div>
              <h4 className="font-heading font-bold text-lg text-[#0F172A] mb-3">
                Evangelism by Fire
              </h4>
              <p className="font-body text-[14px] leading-relaxed text-[#454F5E]">
                We are committed to spreading the gospel with passion and zeal, reaching the unreached and transforming lives.
              </p>
            </div>

            <div className="p-8 border border-gray-100 bg-white hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FEF9E1] flex items-center justify-center text-[#FD9800] font-bold text-xl mb-6">
                03
              </div>
              <h4 className="font-heading font-bold text-lg text-[#0F172A] mb-3">
                Partnership and Collaboration
              </h4>
              <p className="font-body text-[14px] leading-relaxed text-[#454F5E]">
                We work closely with other ministries across Africa and beyond, providing training and resources to local assemblies to help them experience the reality of Christianity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-10 bg-[#FAF9F5] border-t border-gray-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F172A] uppercase tracking-wide mb-3">
              Meet Our Team
            </h2>
            <div className="w-16 h-1 bg-[#FD9800] mx-auto mb-4" />
            <p className="font-body text-[15px] text-[#454F5E]">
              Dedicated leaders committed to igniting revival across Africa and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-heading font-bold text-lg text-[#0F172A] mb-1">
                    {member.name}
                  </h4>
                  <p className="text-xs uppercase tracking-wider text-[#FD9800] font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="font-body text-[13px] leading-relaxed text-[#454F5E]">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EventsSection />
      <CTASection />
    </>
  )
}
