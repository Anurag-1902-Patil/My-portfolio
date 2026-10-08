import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  kicker: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
}

/** Editorial section header: mono kicker + display title + optional context. */
export function SectionHeading({ kicker, title, description, align = 'left' }: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <Reveal className={`flex flex-col gap-3 ${alignCls}`}>
      <span className="mono-label text-primary">{kicker}</span>
      <h2 className="font-display display-tight text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p> : null}
    </Reveal>
  )
}
