import { FileDown, Mail } from 'lucide-react'
import { site } from '@/data/site'
import { socials } from '@/data/socials'
import { NeoButton } from '@/components/NeoButton'
import { Reveal } from '@/components/Reveal'

/** Bold final CTA — the "I should talk to this guy" moment. */
export function FinalCta() {
  const linkedin = socials.find((s) => s.id === 'linkedin')
  const github = socials.find((s) => s.id === 'github')
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8" aria-labelledby="final-cta">
      <Reveal>
        <div className="neo-border neo-shadow rounded-2xl bg-ink px-6 py-14 text-center text-paper sm:px-12">
          <p className="mono-label text-primary">FINAL CALL</p>
          <h2 id="final-cta" className="display-tight mx-auto mt-4 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Have an idea worth building<span className="text-primary">?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-paper/75">
            Let's build something useful. Internships, freelance, collaborations — if it's real work, I'm interested.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <NeoButton href={`mailto:${site.email}`} variant="primary" size="lg">
              <Mail size={16} aria-hidden="true" /> Email me
            </NeoButton>
            {linkedin && (
              <NeoButton href={linkedin.href} external variant="outline" size="lg" className="border-paper text-paper hover:bg-paper/10">
                LinkedIn
              </NeoButton>
            )}
            {github && (
              <NeoButton href={github.href} external variant="outline" size="lg" className="border-paper text-paper hover:bg-paper/10">
                GitHub
              </NeoButton>
            )}
            <NeoButton href={site.resumePath} download="Anurag-Sandeep-Patil-Resume.pdf" variant="outline" size="lg" className="border-paper text-paper hover:bg-paper/10">
              <FileDown size={15} aria-hidden="true" /> Resume
            </NeoButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
