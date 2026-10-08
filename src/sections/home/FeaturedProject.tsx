import { ArrowRight, Github } from 'lucide-react'
import { featuredProject } from '@/data/projects'
import { NeoButton } from '@/components/NeoButton'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Tag } from '@/components/Tag'

/** Flagship showcase: split editorial presentation of DriveLegal. */
export function FeaturedProject() {
  const p = featuredProject
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8" aria-labelledby="featured-project">
      <SectionHeading
        kicker="FLAGSHIP PROJECT"
        title={
          <>
            DriveLegal<span className="text-primary">.</span>
          </>
        }
        description="An offline RAG chatbot that answers Indian traffic-law questions with exact challan amounts and cited legal sections."
      />

      <Reveal delay={120} className="mt-10">
        <div className="neo-border neo-shadow grid overflow-hidden rounded-2xl bg-card lg:grid-cols-2">
          {/* visual side — product representation */}
          <div className="neu-inset relative flex min-h-[300px] flex-col justify-center gap-3 p-6 sm:p-10">
            <p className="mono-label absolute left-5 top-4 text-muted-foreground">RAG PIPELINE</p>
            <div className="mt-6 space-y-2.5">
              {[
                { label: 'Legal PDFs', note: 'MV Act + state amendments' },
                { label: 'Chunk + Embed', note: 'all-MiniLM-L6-v2' },
                { label: 'FAISS Retrieval', note: 'local vector index' },
                { label: 'Mistral 7B · Ollama', note: 'offline generation' },
                { label: 'Cited Answer', note: 'sections + challan amounts' },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <span className="mono-label w-5 text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <div className="neo-border flex-1 rounded-lg bg-card px-3.5 py-2.5">
                    <p className="font-display text-sm font-semibold">{step.label}</p>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-foreground">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* story side */}
          <div className="border-t-2 border-border p-6 sm:p-10 lg:border-l-2 lg:border-t-0">
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
              The law, queryable — even with no internet.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              Most people fined under Indian traffic law can't easily verify what the law says. DriveLegal indexes the
              Motor Vehicles Act and state amendments into a local vector store and answers questions with citations —
              running fully offline on Mistral 7B.
            </p>
            <p className="mt-4 border-l-[3px] border-primary pl-3 text-sm font-semibold">
              Top 21 Finalist — IIT Madras Road Safety AI Hackathon, from 19,000+ submissions nationwide.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <NeoButton to={`/projects/${p.slug}`} variant="primary">
                View Case Study <ArrowRight size={15} aria-hidden="true" />
              </NeoButton>
              <NeoButton href={p.links[0].href} external variant="outline">
                <Github size={15} aria-hidden="true" /> GitHub
              </NeoButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
