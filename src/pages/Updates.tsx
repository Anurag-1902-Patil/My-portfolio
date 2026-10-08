import { updates } from '@/data/updates'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'
import { Tag } from '@/components/Tag'

/** Personal developer journal — curated activity feed, no filler. */
export default function Updates() {
  return (
    <>
      <Seo
        title="Updates — Anurag Patil"
        description="A curated developer journal: what Anurag Patil is building, learning, and shipping — hackathons, AI experiments, and lessons."
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          kicker="JOURNAL"
          title="What I'm up to"
          description="A manually curated feed — things built, lessons learned, experiments run. No filler posts."
        />

        <ol className="mt-12 space-y-0">
          {updates.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 70} as="li" className="relative pb-10 pl-10 last:pb-0">
              {i < updates.length - 1 && (
                <span className="absolute left-[9px] top-7 h-full w-0.5 bg-line" aria-hidden="true" />
              )}
              <span
                className="neo-border absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-card"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <article>
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tone="accent">{entry.kind}</Tag>
                  <span className="mono-label text-muted-foreground">{entry.date}</span>
                </div>
                <h2 className="mt-2.5 font-display text-lg font-bold tracking-tight">{entry.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{entry.body}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </>
  )
}
