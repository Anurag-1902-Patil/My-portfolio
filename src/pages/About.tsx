import { site } from '@/data/site'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'
import { Tag } from '@/components/Tag'

const story = [
  {
    id: 'mun',
    kicker: 'WHERE IT STARTED',
    title: 'Model United Nations',
    body: 'My journey didn\'t start with code — it started with MUN. Public speaking, diplomacy, critical thinking, and collaboration under pressure. Learning to argue a position you didn\'t choose teaches you to understand problems before solving them.',
  },
  {
    id: 'tech',
    kicker: 'THE SHIFT',
    title: 'From debate floors to build cycles',
    body: 'That curiosity evolved into technology. I started exploring — AI, full-stack development, APIs, cloud, even embedded systems and hardware prototyping with Arduino. The common thread: I learn fastest when I\'m building something real.',
  },
  {
    id: 'hackathons',
    kicker: 'FORGED UNDER PRESSURE',
    title: 'What hackathons taught me',
    body: 'Think quickly. Iterate. Work under pressure. Collaborate with strangers. Recover from failure in hours, not weeks. A hackathon compresses the whole product cycle into a weekend — and shows you exactly where your weak spots are.',
  },
  {
    id: 'leadership',
    kicker: 'BEYOND THE KEYBOARD',
    title: 'Leadership & collaboration',
    body: 'As Collab Team Lead at Forengers Foundation — a student-led sustainability NGO — I coordinate across teams and partners. Shipping software is half engineering, half people. The NGO work keeps me honest about the second half.',
  },
]

const exploring = ['RAG pipelines', 'Local LLM inference', 'Vector search', 'ASR / OCR systems', 'Schedule-matching algorithms']

const interests = ['Nature', 'Social causes', 'Geopolitics']

export default function About() {
  return (
    <>
      <Seo
        title="About — Anurag Patil"
        description="From Model United Nations to AI + full-stack development — how Anurag Patil learned to build, and what he's exploring now."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="ABOUT"
          title="Still learning. Still building."
          description={`${site.education.degree} at ${site.education.school} (${site.education.period}) · ${site.education.cgpa} · Based in ${site.location}.`}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {story.map((chapter, i) => (
            <Reveal key={chapter.id} delay={i * 80}>
              <article className="neu-raised h-full rounded-xl p-6 sm:p-7">
                <p className="mono-label text-primary">{chapter.kicker}</p>
                <h2 className="mt-2 font-display text-xl font-bold tracking-tight">{chapter.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">{chapter.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="neo-border h-full rounded-xl bg-card p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold tracking-tight">
                Currently exploring<span className="text-primary">.</span>
              </h2>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exploring.map((e) => (
                  <Tag key={e} tone="accent">
                    {e}
                  </Tag>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="neo-border h-full rounded-xl bg-card p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold tracking-tight">
                Outside coding<span className="text-primary">.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                Nature, social causes, and geopolitics. I've been involved with a sustainability-focused NGO, and I
                think the best engineers stay curious about the world their software runs in.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {interests.map((i) => (
                  <Tag key={i}>{i}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <p className="max-w-2xl text-lg leading-relaxed text-foreground/85">
            I'm still learning — that's not a disclaimer, it's the whole point. Every project on this site taught me
            something I didn't know when I started it.
          </p>
        </Reveal>
      </div>
    </>
  )
}
