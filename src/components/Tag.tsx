import type { ReactNode } from 'react'

/** Monospace technical label chip — used for stack, metadata, categories. */
export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' | 'outline' }) {
  const tones = {
    default: 'bg-secondary text-secondary-foreground border border-line',
    accent: 'bg-accent-soft text-primary border border-primary/30',
    outline: 'bg-transparent text-muted-foreground border border-line',
  }
  return (
    <span className={`mono-label inline-flex items-center rounded-md px-2 py-1 normal-case tracking-[0.08em] ${tones[tone]}`}>
      {children}
    </span>
  )
}
