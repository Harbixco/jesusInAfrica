import { useEffect } from 'react'

/**
 * Lightweight SEO helper — sets document title and meta description/OG tags.
 * Swap for react-helmet-async if the project later needs SSR-safe head tags.
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Jesus in Africa (JIA)` : 'Jesus in Africa (JIA)'
    document.title = fullTitle

    const setMeta = (name, content, attr = 'name') => {
      if (!content) return
      let tag = document.querySelector(`meta[${attr}="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
  }, [title, description])

  return null
}
