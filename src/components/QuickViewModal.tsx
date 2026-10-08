import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { Link } from 'react-router'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Project } from '@/types'
import { Tag } from './Tag'
import { NeoButton } from './NeoButton'

interface Props {
  project: Project | null
  onClose: () => void
}

/** Quick-view modal: summary, key tech, result, mini architecture, links. */
export function QuickViewModal({ project, onClose }: Props) {
  return (
    <Dialog open={project !== null} onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="neo-border max-h-[85vh] overflow-y-auto rounded-2xl bg-card p-0 sm:max-w-2xl">
        {project && (
          <div className="p-6 sm:p-8">
            <DialogHeader>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Tag tone="accent">{project.tierLabel}</Tag>
                <Tag tone="outline">{project.status}</Tag>
              </div>
              <DialogTitle className="font-display display-tight text-2xl font-bold sm:text-3xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">{project.subtitle}</DialogDescription>
            </DialogHeader>

            <p className="mt-4 text-sm leading-relaxed text-foreground/90">{project.description}</p>

            {project.achievement && (
              <p className="mt-4 rounded-xl border-2 border-primary/40 bg-accent-soft px-4 py-3 text-sm font-medium text-foreground">
                {project.achievement}
              </p>
            )}

            <div className="mt-5">
              <p className="mono-label mb-2 text-muted-foreground">Key technology</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>

            {/* mini architecture strip */}
            <div className="mt-5">
              <p className="mono-label mb-2 text-muted-foreground">Pipeline</p>
              <div className="neu-inset flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-xl px-4 py-3">
                {project.caseStudy.architecture.slice(0, 5).map((step, i) => (
                  <span key={step.label} className="inline-flex items-center gap-2">
                    <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wide text-foreground/85">
                      {step.label}
                    </span>
                    {i < Math.min(project.caseStudy.architecture.length, 5) - 1 && (
                      <ArrowRight size={12} className="text-primary" aria-hidden="true" />
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <NeoButton to={`/projects/${project.slug}`} variant="primary" onClick={onClose}>
                View Full Case Study <ArrowRight size={15} aria-hidden="true" />
              </NeoButton>
              {project.links
                .filter((l) => l.kind === 'github' || l.kind === 'live' || l.kind === 'demo')
                .map((l) => (
                  <NeoButton key={l.label} href={l.href} external variant="outline">
                    {l.kind === 'github' ? (
                      <Github size={15} aria-hidden="true" />
                    ) : (
                      <ExternalLink size={15} aria-hidden="true" />
                    )}
                    {l.label}
                  </NeoButton>
                ))}
              <Link
                to={`/projects/${project.slug}`}
                onClick={onClose}
                className="sr-only"
                aria-label={`Open case study for ${project.title}`}
              >
                Case study
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
