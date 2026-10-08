import type { CSSProperties, JSX, ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface RevealProps {
  children: ReactNode
  delay?: number
  as?: keyof JSX.IntrinsicElements
  className?: string
  id?: string
}

/** Staged scroll-reveal wrapper. Degrades to fully visible with reduced motion. */
export function Reveal({ children, delay = 0, as = 'div', className = '', id }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  const Tag = as as 'div'
  const style: CSSProperties = { '--reveal-delay': `${delay}ms` } as CSSProperties
  return (
    <Tag id={id} ref={ref as React.Ref<HTMLDivElement>} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  )
}
