import { useEffect, useRef } from 'react'

/**
 * Restrained custom cursor: a small ink dot + a soft ring that trails with
 * lerp. Only on fine-pointer desktops with full motion. No trails, no sound.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = document.documentElement.dataset.motion === 'reduced'
    if (!fine || reduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf = 0
    let visible = false

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      const target = e.target as HTMLElement | null
      const interactive = target?.closest('a, button, [role="button"], input, textarea, [data-cursor]')
      ring.style.transform = `translate(${rx}px, ${ry}px) scale(${interactive ? 1.6 : 1})`
      ring.style.borderColor = interactive ? 'hsl(var(--primary))' : 'hsl(var(--ink) / 0.45)'
    }

    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      dot.style.transform = `translate(${x}px, ${y}px)`
      ring.style.transform = ring.style.transform.replace(/translate\([^)]*\)/, `translate(${rx}px, ${ry}px)`)
      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0 lg:block"
        style={{ marginLeft: -3, marginTop: -3 }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-7 w-7 rounded-full border-2 opacity-0 transition-[border-color] duration-200 lg:block"
        style={{ marginLeft: -14, marginTop: -14, borderColor: 'hsl(var(--ink) / 0.45)' }}
      />
    </>
  )
}
