import { BookOpenText, Flame, Handshake, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import RevealSection from '../common/RevealSection'

const missions = [
  {
    icon: BookOpenText,
    title: "Strengthening Believers' Faith",
    description:
      'We aim to deepen the faith of believers by teaching them to live by the Word of God and the Spirit.',
  },
  {
    icon: Flame,
    title: 'Evangelism by Fire',
    description:
      'We are committed to spreading the gospel with passion and zeal, reaching the unreached and transforming lives.',
  },
  {
    icon: Handshake,
    title: 'Partnership & Collaboration',
    description:
      'We work closely with ministries across Africa and beyond, equipping local assemblies with training and resources.',
  },
]

export default function MissionCards() {
  return (
    <section className="py-20 md:py-28 bg-sand-50">
      <Container>
        <SectionHeading
          eyebrow="Our Mission"
          title="Three Pillars of Our Ministry"
          description="Everything we do flows from a call to build faith, spread the gospel, and walk alongside other ministries."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missions.map((item, index) => {
            const Icon = item.icon
            return (
              <RevealSection
                key={item.title}
                className="group bg-white rounded-xl2 p-8 shadow-card hover:-translate-y-1.5 transition-transform duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-lg bg-ink-950 flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-300">
                  <Icon className="text-gold-300 group-hover:text-ink-950 transition-colors duration-300" size={26} />
                </div>
                <h3 className="text-xl font-bold text-ink-950 mb-3">{item.title}</h3>
                <p className="text-ink-700 leading-relaxed mb-5">{item.description}</p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors"
                >
                  Learn More
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </RevealSection>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
