import { useState } from 'react'
import { experience } from '@/data/experience'
import type { ExperienceCategory } from '@/types'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'
import { Tag } from '@/components/Tag'

const categories: Array<'ALL' | ExperienceCategory> = ['ALL', 'WORK', 'LEADERSHIP', 'HACKATHON', 'FREELANCE', 'TECHNICAL']

export default function Experience() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('ALL')
  const filtered = filter === 'ALL' ? experience : experience.filter((e) => e.category === filter)

  return (
    <>
      <Seo
        title="Experience — Anurag Patil"
        description="Work, leadership, hackathons and technical experience — categorized honestly. Full-Stack Developer Intern at Fit Ez, Collab Team Lead at Forengers Foundation."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="TIMELINE"
          title="Experience, categorized honestly"
          description="Work is work, hackathons are hackathons. Each entry is labeled for what it actually is."
        />

        <Reveal className="mt-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((c) => {
              const count = c === 'ALL' ? experience.length : experience.filter((e) => e.category === c).length
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={filter === c}
                  className={`mono-label rounded-full px-3.5 py-2 transition-colors duration-150 ${
                    filter === c
                      ? 'neo-border bg-ink text-paper'
                      : 'border-2 border-transparent bg-secondary text-secondary-foreground hover:border-border'
                  }`}
                >
                  {c} <span className="text-primary">{count}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <ol className="mt-10 space-y-5" aria-live="polite">
          {filtered.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 70} as="li">
              <article className="neo-border rounded-xl bg-card p-6 transition-shadow duration-200 hover:neo-shadow-sm sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag tone={entry.category === 'WORK' ? 'accent' : 'default'}>{entry.category}</Tag>
                    <span className="mono-label text-muted-foreground">{entry.period}</span>
                  </div>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {entry.title} <span className="text-muted-foreground">· {entry.org}</span>
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/85">{entry.summary}</p>
                <ul className="mt-4 space-y-2">
                  {entry.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {entry.tags.map((t) => (
                    <Tag key={t} tone="outline">
                      {t}
                    </Tag>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <li className="neu-inset rounded-xl p-8 text-center text-sm text-muted-foreground">
              No entries in this category yet — freelancing is a goal, not a claim.
            </li>
          )}
        </ol>
      </div>
    </>
  )
}
