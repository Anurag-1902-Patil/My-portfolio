import { ArrowRight } from 'lucide-react'
import { skillFlows } from '@/data/skills'
import { NeoButton } from '@/components/NeoButton'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'

/** Technology relationship preview — how tools connect, not a logo wall. */
export function SkillsPreview() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8" aria-labelledby="skills-preview">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          kicker="HOW I COMBINE TECHNOLOGIES"
          title="Tools are only interesting in combination"
          description="Not a wall of logos — the actual paths technologies take in my projects."
        />
        <Reveal delay={150}>
          <NeoButton to="/skills" variant="ghost" size="sm">
            All skills <ArrowRight size={14} aria-hidden="true" />
          </NeoButton>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {skillFlows.slice(0, 2).map((flow, i) => (
          <Reveal key={flow.label} delay={i * 100}>
            <div className="neu-raised h-full rounded-xl p-5">
              <p className="mono-label text-muted-foreground">{flow.label}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                {flow.steps.map((step, j) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="neo-border rounded-md bg-card px-2.5 py-1.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em]">
                      {step}
                    </span>
                    {j < flow.steps.length - 1 && (
                      <ArrowRight size={13} className="shrink-0 text-primary" aria-hidden="true" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
