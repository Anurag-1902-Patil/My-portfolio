import type { JSX, ReactNode } from 'react'
import { useTilt } from '@/hooks/useTilt'

interface TiltCardProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  id?: string
  onClick?: () => void
  ariaLabel?: string
}

/** Card with subtle pointer tilt + neumorphic lift. Safe on touch/reduced motion. */
export function TiltCard({ children, className = '', as = 'div', id, onClick, ariaLabel }: TiltCardProps) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLElement>()
  const Tag = as as 'div'
  return (
    <Tag
      id={id}
      ref={ref as React.Ref<HTMLDivElement>}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      aria-label={ariaLabel}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      className={`will-change-transform ${className}`}
    >
      {children}
    </Tag>
  )
}
