import { useCallback, useState } from 'react'

export function isReducedMotion(): boolean {
  return document.documentElement.dataset.motion === 'reduced'
}

/**
 * Dedicated Reduce Motion setting backed by localStorage('ap-motion')
 * and html[data-motion]. Initial value set pre-paint in index.html;
 * respects prefers-reduced-motion when nothing is stored.
 */
export function useMotion() {
  const [reduced, setReduced] = useState<boolean>(() => isReducedMotion())

  const set = useCallback((value: boolean) => {
    document.documentElement.dataset.motion = value ? 'reduced' : 'full'
    localStorage.setItem('ap-motion', value ? 'reduced' : 'full')
    setReduced(value)
  }, [])

  const toggle = useCallback(() => set(!isReducedMotion()), [set])

  return { reduced, toggle, set }
}
