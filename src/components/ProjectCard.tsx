import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'
import { Tag } from './Tag'
import { TiltCard } from './TiltCard'

interface Props {
  project: Project
  onOpen: (project: Project) => void
  large?: boolean
}

/**
 * Project card — product-like, not a repo card.
 * Tier controls visual weight; opens the quick-view modal.
 */
export function ProjectCard({ project, onOpen, large = false }: Props) {
  return (
    <TiltCard
      onClick={() => onOpen(project)}
      ariaLabel={`Open quick view for ${project.title}`}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-border bg-card text-left transition-shadow duration-200 hover:neo-shadow-sm focus-visible:neo-shadow-sm ${
        large ? 'p-7 sm:p-9' : 'p-5 sm:p-6'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <Tag tone="accent">{project.tierLabel}</Tag>
          <Tag tone="outline">{project.status}</Tag>
        </div>
        <span
          className="neo-border flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card transition-colors duration-150 group-hover:bg-primary group-hover:text-primary-foreground"
          aria-hidden="true"
        >
          <ArrowUpRight size={15} />
        </span>
      </div>

      <h3
        className={`mt-4 font-display font-bold tracking-tight transition-colors duration-150 group-hover:text-primary ${
          large ? 'display-tight text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
        }`}
      >
        {project.title}
      </h3>
      <p className={`mt-1 text-muted-foreground ${large ? 'text-base' : 'text-sm'}`}>{project.subtitle}</p>

      <p className={`mt-3 leading-relaxed text-foreground/85 ${large ? 'text-[0.95rem]' : 'text-sm'} ${large ? '' : 'line-clamp-3'}`}>
        {project.tagline}
      </p>

      {project.achievement && (
        <p className="mt-4 border-l-[3px] border-primary pl-3 text-sm font-medium text-foreground/90">
          {project.achievement}
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.stack.slice(0, large ? 6 : 4).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
        {project.stack.length > (large ? 6 : 4) && <Tag tone="outline">+{project.stack.length - (large ? 6 : 4)}</Tag>}
      </div>
    </TiltCard>
  )
}
