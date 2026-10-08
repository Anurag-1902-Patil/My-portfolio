import { site } from '@/data/site'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'

const focusAreas = [
  'Building stronger fundamentals in full-stack development',
  'Learning GenAI, RAG, LLMs, and AI engineering',
  'Building projects that solve practical, real-world problems',
  'Contributing to open source and collaborating with other developers',
]

export default function About() {
  return (
    <>
      <Seo
        title="About — Anurag Patil"
        description="I'm a second-year B.Tech Information Technology student who enjoys building software to solve real problems."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="ABOUT"
          title="Learning by building."
          description={`${site.education.degree} at ${site.education.school} (${site.education.period}) · ${site.education.cgpa} · Based in ${site.location}.`}
        />

        <Reveal className="mt-10">
          <div className="neo-border neo-shadow rounded-2xl bg-card p-6 sm:p-9">
            <div className="max-w-3xl space-y-5 text-base leading-relaxed text-foreground/85">
              <p>
                I'm a second-year B.Tech Information Technology student who enjoys building software to solve real
                problems.
              </p>
              <p>
                I spend most of my time learning by building. Over the past year, that has taken me from web
                development and backend systems to exploring GenAI, RAG pipelines, local LLMs, and AI-powered
                applications. I'm particularly interested in understanding how these systems work under the hood
                rather than just using them.
              </p>
              <p>
                Along the way, I've built projects across AI, full-stack development, and embedded systems,
                participated in multiple hackathons, contributed to open source through GSSoC'26, and learned that the
                best way to understand technology is to build something that eventually breaks.
              </p>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <h2 className="font-display text-xl font-bold tracking-tight">
                Right now, I'm focused on<span className="text-primary">.</span>
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {focusAreas.map((area) => (
                  <li key={area} className="neu-raised rounded-lg px-4 py-3 text-sm leading-relaxed">
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground/85">
              I'm always curious about new technologies and enjoy working with people who like building ambitious
              things. If you're building something interesting, I'd love to connect.
            </p>
          </div>
        </Reveal>
      </div>
    </>
  )
}
