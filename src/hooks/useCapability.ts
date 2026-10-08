import { useMemo } from 'react'

export type Capability = 'high' | 'normal' | 'low' | 'static'

/**
 * Capability-based rendering tier for 3D.
 *  - static : reduced motion or no WebGL → static fallback
 *  - low    : small screens / coarse pointers / weak hints → 2.5D
 *  - normal : typical laptops
 *  - high   : large screens with fine pointer and decent memory
 */
export function useCapability(): Capability {
  return useMemo<Capability>(() => {
    if (typeof window === 'undefined') return 'normal'
    if (document.documentElement.dataset.motion === 'reduced') return 'static'

    // WebGL support probe
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) return 'static'
    } catch {
      return 'static'
    }

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const narrow = window.innerWidth < 768
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
    const cores = navigator.hardwareConcurrency ?? 8

    if ((coarse && narrow) || memory <= 3 || cores <= 2) return 'low'
    if (coarse || narrow || memory <= 4 || cores <= 4) return 'normal'
    return 'high'
  }, [])
}
