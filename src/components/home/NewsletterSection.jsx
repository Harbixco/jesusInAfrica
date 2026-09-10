import Container from '../common/Container'
import RevealSection from '../common/RevealSection'
import NewsletterForm from '../forms/NewsletterForm'

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-gold-50">
      <Container className="max-w-3xl text-center">
        <RevealSection>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold-600 mb-3">
            Stay Connected
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ink-950 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-ink-700 mb-8 max-w-xl mx-auto">
            Get the latest news, teachings, event updates, and stories of
            transformation delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </RevealSection>
      </Container>
    </section>
  )
}
