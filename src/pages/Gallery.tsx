import { Camera, Film } from 'lucide-react'
import { gallery } from '@/data/gallery'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'

export default function Gallery() {
  return (
    <>
      <Seo
        title="Event Gallery — Anurag Patil"
        description="Photos and videos from technology events, hackathons, and student life."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="GALLERY"
          title="Moments from the events."
          description="Photos and videos from tech events, hackathons, and the people I meet along the way."
        />

        {gallery.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, i) => (
              <Reveal key={item.id} delay={i * 50}>
                <article className="neo-border h-full overflow-hidden rounded-xl bg-card">
                  {item.type === 'video' ? (
                    <video
                      className="aspect-video w-full bg-ink object-cover"
                      src={item.src}
                      poster={item.poster}
                      controls
                      preload="metadata"
                      aria-label={item.alt}
                    />
                  ) : (
                    <img
                      className="aspect-video w-full bg-secondary object-cover"
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                    />
                  )}
                  <div className="p-5">
                    <p className="mono-label text-primary">{item.event} · {item.date}</p>
                    <h2 className="mt-2 font-display text-lg font-bold tracking-tight">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.caption}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-10">
            <div className="neu-inset rounded-2xl p-8 text-center sm:p-10">
              <div className="mb-4 flex justify-center gap-2 text-primary" aria-hidden="true">
                <Camera size={22} />
                <Film size={22} />
              </div>
              <p className="font-display text-lg font-bold">Your event photos and videos will go here.</p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Add your own media and its event details in{' '}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  src/data/gallery.ts
                </code>
                . Put image and video files in{' '}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  public/gallery/
                </code>
                . No sample or AI-generated images are used.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </>
  )
}
