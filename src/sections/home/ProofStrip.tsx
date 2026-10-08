import { projects } from '@/data/projects'
import { achievements } from '@/data/achievements'

const items = [
  ...projects.map((p) => ({ label: p.title, kind: 'PROJECT' })),
  ...achievements.map((a) => ({ label: `${a.title} — ${a.org}`, kind: 'PROOF' })),
]

/** Compact proof-of-work strip: quiet marquee, pauses on hover, static when reduced motion. */
export function ProofStrip() {
  const doubled = [...items, ...items]
  return (
    <section aria-label="Proof of work summary" className="mt-16 border-y-2 border-border bg-secondary/50 py-4">
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-8 px-4">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="mono-label text-primary">{item.kind}</span>
              <span className="font-display text-sm font-semibold tracking-wide">{item.label}</span>
              <span className="h-1.5 w-1.5 rotate-45 bg-primary" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
