import { useEffect, useRef } from 'react'

/**
 * Staged scroll reveal via IntersectionObserver.
 * Attach the ref to an element with the `.reveal` class.
 * With reduced motion the CSS forces content visible, so this becomes a no-op.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (document.documentElement.dataset.motion === 'reduced') {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
