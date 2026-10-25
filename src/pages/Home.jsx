import Seo from '../components/common/Seo'
import Hero from '../components/home/Hero'
import ActionCards from '../components/home/ActionCards'
import WelcomeSection from '../components/home/WelcomeSection'
import MediaSection from '../components/home/MediaSection'
import TestimonialSection from '../components/home/TestimonialSection'
import EventsSection from '../components/home/EventsSection'
import CTASection from '../components/home/CTASection'

export default function Home() {
  return (
    <>
      <Seo
        title="Home - Jesus in Africa (JIA)"
        description="Strengthening Believers' Faith. We aim to deepen the faith of believers by teaching them to live by the Word of God and the Spirit."
      />
      <Hero />
      <WelcomeSection />
      <MediaSection />
      <TestimonialSection />
      <EventsSection />
      <CTASection />
    </>
  )
}
