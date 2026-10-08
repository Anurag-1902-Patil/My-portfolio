import { useState } from 'react'
import type { Project } from '@/types'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { QuickViewModal } from '@/components/QuickViewModal'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'

/**
 * Projects as products, with deliberate visual hierarchy:
 * tier 1 flagship full-width, tier 2 half, tiers 3–4 paired.
 */
export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const [t1, t2, t3, t4] = projects

  return (
    <>
      <Seo
        title="Projects — Anurag Patil"
        description="DriveLegal, Project Kranti, MediSense AI, and the IT Department Website — real software built by Anurag Patil, with full case studies."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="SELECTED WORK"
          title="Projects that shipped"
          description="Four projects, four different problems. Click any of them for a quick view — or read the full case study."
        />

        <div className="mt-12 space-y-5">
          <Reveal>
            <ProjectCard project={t1} onOpen={setOpen} large />
          </Reveal>
          <Reveal delay={80}>
            <ProjectCard project={t2} onOpen={setOpen} large />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {[t3, t4].map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProjectCard project={p} onOpen={setOpen} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <QuickViewModal project={open} onClose={() => setOpen(null)} />
    </>
  )
}
