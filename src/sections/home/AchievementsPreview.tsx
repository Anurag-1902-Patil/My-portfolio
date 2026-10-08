import { ArrowRight } from 'lucide-react'
import { achievements } from '@/data/achievements'
import { NeoButton } from '@/components/NeoButton'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'

/** Selected achievements — the three strongest. */
export function AchievementsPreview() {
  const selected = achievements.slice(0, 3)
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8" aria-labelledby="ach-preview">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker="PROOF" title="Selected achievements" />
        <Reveal delay={150}>
          <NeoButton to="/achievements" variant="ghost" size="sm">
            All achievements <ArrowRight size={14} aria-hidden="true" />
          </NeoButton>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {selected.map((a, i) => (
          <Reveal key={a.id} delay={i * 100}>
            <article className="neo-border flex h-full flex-col rounded-xl bg-card p-5 transition-shadow duration-200 hover:neo-shadow-sm">
              <p className="font-display text-2xl font-bold text-primary">{a.title}</p>
              <p className="mt-1 font-display text-sm font-semibold">{a.org}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{a.result}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
