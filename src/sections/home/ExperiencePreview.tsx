import { ArrowRight } from 'lucide-react'
import { experience } from '@/data/experience'
import { NeoButton } from '@/components/NeoButton'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Tag } from '@/components/Tag'

/** Selected experience — top entries, honest categories. */
export function ExperiencePreview() {
  const selected = experience.slice(0, 3)
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8" aria-labelledby="exp-preview">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker="EXPERIENCE" title="Where I've been working" />
        <Reveal delay={150}>
          <NeoButton to="/experience" variant="ghost" size="sm">
            Full timeline <ArrowRight size={14} aria-hidden="true" />
          </NeoButton>
        </Reveal>
      </div>

      <ol className="mt-10 space-y-4">
        {selected.map((entry, i) => (
          <Reveal key={entry.id} delay={i * 90} as="li">
            <article className="group grid gap-3 rounded-xl border-2 border-border bg-card p-5 transition-shadow duration-200 hover:neo-shadow-sm sm:grid-cols-[130px_1fr] sm:gap-6 sm:p-6">
              <div>
                <Tag tone={entry.category === 'WORK' ? 'accent' : 'default'}>{entry.category}</Tag>
                <p className="mono-label mt-2 text-muted-foreground">{entry.period}</p>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {entry.title} <span className="text-muted-foreground">· {entry.org}</span>
                </h3>
                <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-foreground/80">{entry.summary}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
