import { ArrowDown, ArrowRight, FileDown, Mail } from 'lucide-react'
import { site } from '@/data/site'
import { achievements } from '@/data/achievements'
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas'
import { NeoButton } from '@/components/NeoButton'
import { StatusPill } from '@/components/StatusPill'
import { Reveal } from '@/components/Reveal'

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-6 sm:px-8 lg:pt-10" aria-label="Introduction">
      {/* asymmetric split: identity left, portrait right */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
        <div className="relative z-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill />
              <span className="mono-label text-muted-foreground">{site.location}</span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display-tight mt-6 font-display text-[2.9rem] font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
              Anurag
              <br />
              Patil<span className="text-primary">.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 inline-block neo-border bg-ink px-3 py-1.5 font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper sm:text-base">
              {site.identity}
            </p>
          </Reveal>

          <Reveal delay={230}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/85">
              {site.tagline} {site.statement}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <NeoButton to="/projects" variant="primary" size="lg">
                View My Work <ArrowRight size={17} aria-hidden="true" />
              </NeoButton>
              <NeoButton href={site.resumePath} download="Anurag-Sandeep-Patil-Resume.pdf" variant="ink" size="lg">
                Download Resume <FileDown size={16} aria-hidden="true" />
              </NeoButton>
              <NeoButton to="/contact" variant="outline" size="lg">
                Let's Connect <Mail size={16} aria-hidden="true" />
              </NeoButton>
            </div>
          </Reveal>

          <Reveal delay={380}>
            <dl className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="neu-raised rounded-xl px-4 py-3">
                <dt className="mono-label text-muted-foreground">Currently building</dt>
                <dd className="mt-1.5 text-sm font-medium leading-snug">Project Kranti — real-time progress tracking for infrastructure</dd>
              </div>
              <div className="neu-raised rounded-xl px-4 py-3">
                <dt className="mono-label text-muted-foreground">Currently exploring</dt>
                <dd className="mt-1.5 text-sm font-medium leading-snug">RAG pipelines, local LLM inference, vector search</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="neo-border neo-shadow relative mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl bg-card p-2">
            <PixelatedCanvas
              src="/me.jpeg"
              width={400}
              height={720}
              alt="Portrait of Anurag Patil"
              cellSize={2}
              dotScale={1}
              shape="square"
              backgroundColor="#211b16"
              dropoutStrength={0}
              interactive
              distortionStrength={2.5}
              distortionRadius={130}
              distortionMode="repel"
              followSpeed={0.2}
              jitterStrength={1.5}
              jitterSpeed={1}
              sampleAverage
              responsive
              objectFit="cover"
              className="block h-auto w-full rounded-xl"
            />
          </div>
        </Reveal>
      </div>

      {/* credibility indicators */}
      <Reveal delay={120}>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Credibility highlights">
          {[
            { k: 'Top 21', v: 'IIT Madras AI Hackathon' },
            { k: '1st Place', v: 'National Ignition Hackathon' },
            { k: '4×', v: 'National hackathon finalist' },
            { k: 'Intern', v: 'Full-Stack @ Fit Ez' },
          ].map((item) => (
            <li key={item.v} className="neo-border rounded-xl bg-card px-4 py-3.5">
              <p className="font-display text-xl font-bold text-primary">{item.k}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{item.v}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-14 flex justify-center" aria-hidden="true">
        <ArrowDown size={18} className="text-muted-foreground" />
      </div>
      <span className="sr-only">Achievements include: {achievements.map((a) => `${a.title} at ${a.org}`).join('; ')}</span>
    </section>
  )
}
