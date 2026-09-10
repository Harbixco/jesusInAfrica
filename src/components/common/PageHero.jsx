import Container from './Container'

export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative bg-ink-950 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(209,156,47,0.15),transparent_55%)]" />
      <Container className="relative text-center max-w-2xl mx-auto">
        {eyebrow && (
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-gold-300 mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>
        {description && <p className="text-white/75 leading-relaxed">{description}</p>}
      </Container>
    </section>
  )
}
