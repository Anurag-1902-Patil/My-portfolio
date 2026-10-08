import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react'
import { getProject, projects } from '@/data/projects'
import { NeoButton } from '@/components/NeoButton'
import { Reveal } from '@/components/Reveal'
import { Seo } from '@/components/Seo'
import { Tag } from '@/components/Tag'
import NotFound from './NotFound'

/** Full case study — product + technical storytelling, driven by project data. */
export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  if (!project) return <NotFound />

  const cs = project.caseStudy
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2)

  return (
    <>
      <Seo
        title={`${project.title} — ${project.subtitle} | Anurag Patil`}
        description={project.tagline}
        path={`/projects/${project.slug}`}
      />
      <article className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* hero */}
        <Reveal>
          <Link
            to="/projects"
            className="mono-label inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={13} aria-hidden="true" /> All projects
          </Link>
          <div className="mt-5 flex flex-wrap gap-1.5">
            <Tag tone="accent">{project.tierLabel}</Tag>
            <Tag tone="outline">{project.status}</Tag>
          </div>
          <h1 className="display-tight mt-4 font-display text-4xl font-bold sm:text-5xl">{project.title}</h1>
          <p className="mt-2 font-display text-lg font-medium text-muted-foreground">{project.subtitle}</p>
          <p className="mt-6 max-w-3xl border-l-[3px] border-primary pl-4 text-lg leading-relaxed text-foreground/90">
            {cs.hero}
          </p>
          {project.achievement && (
            <p className="mt-6 rounded-xl border-2 border-primary/40 bg-accent-soft px-5 py-4 text-sm font-semibold sm:text-base">
              {project.achievement}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {project.links
              .filter((l) => l.kind !== 'case-study')
              .map((l) => (
                <NeoButton key={l.label} href={l.href} external variant="outline" size="sm">
                  {l.kind === 'github' ? <Github size={14} aria-hidden="true" /> : <ArrowUpRight size={14} aria-hidden="true" />}
                  {l.label}
                </NeoButton>
              ))}
          </div>
        </Reveal>

        {/* narrative sections */}
        {cs.sections.map((section, i) => (
          <Reveal key={section.heading} delay={60} className="mt-14">
            <h2 className="flex items-baseline gap-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="mono-label text-primary">{String(i + 1).padStart(2, '0')}</span>
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.body.map((para, j) => (
                <p key={j} className="leading-relaxed text-foreground/85">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        ))}

        {/* architecture */}
        <Reveal className="mt-16">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Architecture<span className="text-primary">.</span>
          </h2>
          <ol className="mt-6 space-y-0">
            {cs.architecture.map((step, i) => (
              <li key={step.label} className="relative flex gap-4 pb-5 last:pb-0">
                {i < cs.architecture.length - 1 && (
                  <span className="absolute left-[15px] top-8 h-full w-0.5 bg-line" aria-hidden="true" />
                )}
                <span className="neo-border z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card font-mono text-[0.625rem] font-semibold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="neu-raised flex-1 rounded-xl px-4 py-3">
                  <p className="font-display text-sm font-bold">{step.label}</p>
                  {step.detail && <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* tech groups */}
        <Reveal className="mt-14">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Technology<span className="text-primary">.</span>
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.tech.map((group) => (
              <div key={group.group} className="rounded-xl border border-line bg-card p-4">
                <p className="mono-label text-muted-foreground">{group.group}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* decisions + challenges */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Key decisions<span className="text-primary">.</span>
            </h2>
            <div className="mt-5 space-y-4">
              {cs.decisions.map((d) => (
                <div key={d.title} className="border-l-[3px] border-primary pl-4">
                  <p className="font-display text-sm font-bold">{d.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">{d.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Challenges<span className="text-primary">.</span>
            </h2>
            <div className="mt-5 space-y-4">
              {cs.challenges.map((c) => (
                <div key={c.title} className="border-l-[3px] border-taupe pl-4">
                  <p className="font-display text-sm font-bold">{c.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">{c.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* results / lessons / future */}
        <Reveal className="mt-14">
          <div className="neo-border neo-shadow rounded-2xl bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Results<span className="text-primary">.</span>
            </h2>
            <ul className="mt-4 space-y-2.5">
              {cs.results.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-xl font-bold tracking-tight">What I learned</h2>
            <ul className="mt-4 space-y-2.5">
              {cs.lessons.map((l) => (
                <li key={l} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-xl font-bold tracking-tight">Future improvements</h2>
            <ul className="mt-4 space-y-2.5">
              {cs.future.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-ink bg-transparent" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* related */}
        <Reveal className="mt-16">
          <h2 className="font-display text-xl font-bold tracking-tight">Related projects</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/projects/${r.slug}`}
                className="group flex items-center justify-between gap-3 rounded-xl border-2 border-border bg-card p-5 transition-shadow duration-200 hover:neo-shadow-sm"
              >
                <div>
                  <p className="font-display font-bold group-hover:text-primary">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.subtitle}</p>
                </div>
                <ArrowRight size={16} className="shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal className="mb-4 mt-14">
          <NeoButton to="/projects" variant="outline">
            <ArrowLeft size={15} aria-hidden="true" /> Back to all projects
          </NeoButton>
        </Reveal>
      </article>
    </>
  )
}
