import { useCallback, useRef } from 'react'

/**
 * Subtle 3D card tilt (max ~4deg). Disabled for touch and reduced motion.
 * Uses direct style writes (no re-renders) with a spring-ish CSS transition.
 */
export function useTilt<T extends HTMLElement>(maxDeg = 4) {
  const ref = useRef<T | null>(null)

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const el = ref.current
      if (!el) return
      if (document.documentElement.dataset.motion === 'reduced') return
      if (e.pointerType !== 'mouse') return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transition = 'transform 90ms ease-out'
      el.style.transform = `perspective(800px) rotateX(${(-py * maxDeg).toFixed(2)}deg) rotateY(${(px * maxDeg).toFixed(2)}deg)`
    },
    [maxDeg],
  )

  const onPointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}
