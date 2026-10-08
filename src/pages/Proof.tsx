import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { achievements } from '@/data/achievements'
import { projects } from '@/data/projects'
import { GithubChart } from '@/components/GithubChart'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'
import { Tag } from '@/components/Tag'

/** Proof of Work — evidence that things get built, in one place. */
export default function Proof() {
  return (
    <>
      <Seo
        title="Proof of Work — Anurag Patil"
        description="Projects, hackathon results, GitHub activity, leadership and milestones — evidence that Anurag Patil builds and ships."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="EVIDENCE"
          title="Proof of work"
          description="Claims are cheap. This page collects the receipts: shipped projects, competition results, contribution activity, and selected roles."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {/* projects as evidence */}
          <div className="space-y-4">
            <Reveal>
              <h2 className="font-display text-xl font-bold tracking-tight">
                Shipped projects<span className="text-primary">.</span>
              </h2>
            </Reveal>
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border-2 border-border bg-card p-5 transition-shadow duration-200 hover:neo-shadow-sm"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag tone="accent">{p.tierLabel}</Tag>
                      <span className="mono-label text-muted-foreground">{p.status}</span>
                    </div>
                    <p className="mt-2 font-display text-lg font-bold tracking-tight group-hover:text-primary">{p.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{p.subtitle}</p>
                  </div>
                  <ArrowRight size={16} className="shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>

          {/* results + activity */}
          <div className="space-y-5">
            <Reveal>
              <GithubChart />
            </Reveal>
            <Reveal delay={80}>
              <div className="neo-border rounded-xl bg-card p-5 sm:p-6">
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Competition record<span className="text-primary">.</span>
                </h2>
                <ul className="mt-4 space-y-3">
                  {achievements.slice(0, 4).map((a) => (
                    <li key={a.id} className="border-l-[3px] border-primary pl-3">
                      <p className="font-display text-sm font-bold">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.org}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
