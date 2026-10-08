import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { NeoButton } from '@/components/NeoButton'

/** Short positioning block — who I am, honestly stated. */
export function Positioning() {
  return (
    <section className="border-y-2 border-border bg-paper-sunken/60 py-20" aria-labelledby="positioning">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="mono-label text-primary">POSITIONING</p>
          <h2 id="positioning" className="display-tight mt-3 font-display text-3xl font-bold sm:text-4xl">
            A student developer who ships<span className="text-primary">.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground/85">
            <p>
              I'm not an "AI expert" and I won't pretend to be a senior engineer. I'm a second-year IT student who
              learns by building — RAG systems that run offline, pipelines that turn WhatsApp voice notes into
              structured data, websites that actually get deployed.
            </p>
            <p>
              Hackathons taught me to think fast, iterate, and recover from failure. Leadership at a sustainability
              NGO taught me that software is only half of shipping — the other half is people.
            </p>
            <div className="pt-2">
              <NeoButton to="/about" variant="outline">
                More about me <ArrowRight size={14} aria-hidden="true" />
              </NeoButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
