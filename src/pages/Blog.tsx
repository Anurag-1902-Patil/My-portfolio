import { blogs } from '@/data/blogs'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'
import { Tag } from '@/components/Tag'

export default function Blog() {
  return (
    <>
      <Seo
        title="Blog — Anurag Patil"
        description="Notes and articles about learning Information Technology, building projects, and exploring software."
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          kicker="BLOG"
          title="Notes from the build."
          description="Lessons, ideas, and write-ups from my journey as an Information Technology student and developer."
        />

        {blogs.length > 0 ? (
          <div className="mt-10 space-y-5">
            {blogs.map((post, i) => (
              <Reveal key={post.id} delay={i * 70}>
                <article className="neo-border rounded-xl bg-card p-6 sm:p-8">
                  <p className="mono-label text-muted-foreground">{post.date}</p>
                  <h2 className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">{post.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Tag key={tag} tone="outline">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <details className="group mt-5 border-t border-line pt-4">
                    <summary className="cursor-pointer font-display text-sm font-semibold text-primary">
                      Read article
                    </summary>
                    <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/85">
                      {post.body.map((paragraph, index) => (
                        <p key={`${post.id}-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-10">
            <div className="neu-inset rounded-2xl p-8 text-center sm:p-10">
              <p className="font-display text-lg font-bold">The first post is in progress.</p>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                I’ll share project notes and things I learn here. New posts are added in{' '}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  src/data/blogs.ts
                </code>
                .
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </>
  )
}
