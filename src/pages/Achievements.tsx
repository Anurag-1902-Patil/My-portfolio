import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { achievements } from '@/data/achievements'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'

export default function Achievements() {
  return (
    <>
      <Seo
        title="Achievements — Anurag Patil"
        description="Top 21 Finalist at IIT Madras Road Safety AI Hackathon, National Ignition Hackathon winner, GSSoC 2026 contributor, and more."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="RECOGNITION"
          title="Achievements"
          description="Results from competitions, selections, and leadership roles — each linked to the work behind it where one exists."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 70}>
              <article className="neo-border flex h-full flex-col rounded-xl bg-card p-6 transition-shadow duration-200 hover:neo-shadow-sm">
                <p className="display-tight font-display text-2xl font-bold text-primary">{a.title}</p>
                <p className="mt-2 font-display text-sm font-semibold leading-snug">{a.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.result}</p>
                {a.detail && <p className="mt-3 text-xs leading-relaxed text-foreground/75">{a.detail}</p>}
                {a.relatedProjectSlug && (
                  <Link
                    to={`/projects/${a.relatedProjectSlug}`}
                    className="mono-label mt-auto inline-flex items-center gap-1.5 pt-4 text-primary hover:underline"
                  >
                    Related project <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  )
}
