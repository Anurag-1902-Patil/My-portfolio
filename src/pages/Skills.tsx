import { ArrowRight } from 'lucide-react'
import { skillCategories, skillFlows } from '@/data/skills'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'
import { Tag } from '@/components/Tag'

export default function Skills() {
  return (
    <>
      <Seo
        title="Skills — Anurag Patil"
        description="Languages, frontend, backend, AI/ML, cloud and tools — and how Anurag Patil actually combines them in real projects."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="CAPABILITIES"
          title="Skills, and how they connect"
          description="Categories for the map, flows for the territory — the paths below are how these technologies actually meet in my projects."
        />

        {/* relationship flows first — the interesting part */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {skillFlows.map((flow, i) => (
            <Reveal key={flow.label} delay={i * 80}>
              <div className="neo-border h-full rounded-xl bg-card p-5 transition-shadow duration-200 hover:neo-shadow-sm">
                <p className="mono-label text-primary">{flow.label}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                  {flow.steps.map((step, j) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-md border border-line bg-secondary px-2.5 py-1.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-secondary-foreground">
                        {step}
                      </span>
                      {j < flow.steps.length - 1 && <ArrowRight size={13} className="shrink-0 text-primary" aria-hidden="true" />}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* categorized inventory */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 60}>
              <div className="neu-raised h-full rounded-xl p-5">
                <p className="mono-label text-muted-foreground">{cat.label}</p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            No percentage bars — a number like "React: 80%" means nothing. What matters is what the tool was used to
            ship, and that's what the case studies are for.
          </p>
        </Reveal>
      </div>
    </>
  )
}
