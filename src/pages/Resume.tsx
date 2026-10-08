import { useEffect, useState } from 'react'
import { FileDown, FileWarning } from 'lucide-react'
import { site } from '@/data/site'
import { CopyEmailButton } from '@/components/CopyEmailButton'
import { NeoButton } from '@/components/NeoButton'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'

type PdfState = 'checking' | 'available' | 'missing'

export default function Resume() {
  const [pdf, setPdf] = useState<PdfState>('checking')

  useEffect(() => {
    let cancelled = false
    fetch(site.resumePath, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return
        const type = res.headers.get('content-type') ?? ''
        // Static hosts fall back to index.html for missing files — only a
        // real PDF content type counts as available.
        setPdf(res.ok && type.includes('pdf') ? 'available' : 'missing')
      })
      .catch(() => !cancelled && setPdf('missing'))
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <Seo
        title="Resume — Anurag Patil"
        description="Anurag Patil is a second-year B.Tech Information Technology student at Pune Vidyarthi Griha's College of Engineering and Technology (PVG's COET), Pune, and a Full-Stack Developer Intern at Fit Ez."
      />
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading kicker="RESUME" title="The one-page version" description="Everything on this site, condensed." />

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <NeoButton href={site.resumePath} download="Anurag-Sandeep-Patil-Resume.pdf" variant="primary" size="lg">
              <FileDown size={16} aria-hidden="true" /> Download Resume (PDF)
            </NeoButton>
            <CopyEmailButton />
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-8">
          {pdf === 'available' ? (
            <div className="neo-border neo-shadow overflow-hidden rounded-2xl bg-card">
              <iframe
                src={site.resumePath}
                title="Resume preview — Anurag Sandeep Patil"
                className="h-[75vh] w-full"
              />
            </div>
          ) : pdf === 'missing' ? (
            <div className="neu-inset flex flex-col items-start gap-3 rounded-2xl p-8">
              <FileWarning size={22} className="text-primary" aria-hidden="true" />
              <p className="font-display text-lg font-bold">Resume PDF not placed yet</p>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                The on-page preview activates automatically once the PDF is placed at{' '}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  /public/resume/Anurag-Sandeep-Patil-Resume.pdf
                </code>
                . Until then, the download button points to that path.
              </p>
            </div>
          ) : (
            <div className="neu-inset h-64 animate-pulse rounded-2xl" aria-label="Checking resume availability" />
          )}
        </Reveal>

        {/* text summary fallback — useful for screen readers and quick scans */}
        <Reveal delay={160} className="mt-10">
          <div className="neo-border rounded-xl bg-card p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold tracking-tight">Summary</h2>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="mono-label text-muted-foreground">Education</dt>
                <dd className="mt-1 text-sm font-medium">
                  {site.education.degree} — {site.education.school}, {site.education.period} · {site.education.cgpa}
                </dd>
              </div>
              <div>
                <dt className="mono-label text-muted-foreground">Current role</dt>
                <dd className="mt-1 text-sm font-medium">Full-Stack Developer Intern — Fit Ez (Oct 2026 — Present)</dd>
              </div>
              <div>
                <dt className="mono-label text-muted-foreground">Headline results</dt>
                <dd className="mt-1 text-sm font-medium">
                  Top 21 Finalist — IIT Madras Road Safety AI Hackathon (19,000+ submissions) · 1st Place — National
                  Ignition Hackathon · GSSoC 2026 Selected Contributor
                </dd>
              </div>
              <div>
                <dt className="mono-label text-muted-foreground">Contact</dt>
                <dd className="mt-1 font-mono text-sm">{site.email}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </>
  )
}
