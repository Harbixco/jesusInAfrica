import { Compass } from 'lucide-react'
import Seo from '../components/common/Seo'
import Container from '../components/common/Container'
import Button from '../components/common/Button'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist." />
      <section className="py-28 md:py-36 bg-white">
        <Container className="text-center max-w-lg">
          <div className="w-16 h-16 rounded-full bg-ink-950 flex items-center justify-center mx-auto mb-6">
            <Compass className="text-gold-300" size={28} />
          </div>
          <h1 className="text-4xl font-bold text-ink-950 mb-4">Page Not Found</h1>
          <p className="text-ink-700 leading-relaxed mb-8">
            The page you&rsquo;re looking for may have moved or no longer exists.
            Let&rsquo;s get you back on track.
          </p>
          <Button to="/" variant="dark">
            Back to Home
          </Button>
        </Container>
      </section>
    </>
  )
}
