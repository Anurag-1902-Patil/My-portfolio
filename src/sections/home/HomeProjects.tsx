import { ArrowRight, ArrowUpRight, ExternalLink, Github, Play } from 'lucide-react'
import { Link } from 'react-router'
import { projects } from '@/data/projects'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'

const featuredSlugs = ['drivelegal', 'medisense-ai']

const linkIcons = {
  github: Github,
  live: ExternalLink,
  demo: Play,
} as const

export function HomeProjects() {
  const featured = projects.filter((project) => featuredSlugs.includes(project.slug))

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8" aria-label="Selected projects">
      <SectionHeading
        kicker="MORE BUILDS"
        title="Built to solve real problems."
        description="A couple of projects where AI and full-stack engineering meet practical use."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {featured.map((project, index) => (
          <Reveal key={project.slug} delay={index * 100}>
            <article className="neo-border group flex h-full flex-col rounded-2xl bg-card p-6 transition-shadow hover:neo-shadow-sm sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <p className="mono-label text-primary">{project.tierLabel}</p>
                <span className="mono-label text-right text-muted-foreground">{project.status}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">{project.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">{project.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.links.map((link) => {
                  if (link.kind === 'case-study' || link.kind === 'external') return null
                  const Icon = linkIcons[link.kind]
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icon size={14} aria-hidden="true" />
                      {link.label}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  )
                })}
              </div>

              <Link
                to={`/projects/${project.slug}`}
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Read the case study <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
