import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { site } from '@/data/site'
import { socials } from '@/data/socials'
import { CopyEmailButton } from '@/components/CopyEmailButton'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'
import { StatusPill } from '@/components/StatusPill'
import { TiltCard } from '@/components/TiltCard'

function SocialCard({ id }: { id: string }) {
  const social = socials.find((s) => s.id === id)!
  const [copied, setCopied] = useState(false)

  const copyHandle = async () => {
    if (!social.copyValue) return
    try {
      await navigator.clipboard.writeText(social.copyValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <TiltCard className="neo-border group h-full rounded-xl bg-card p-5 transition-shadow duration-200 hover:neo-shadow-sm">
      <div className="flex items-start justify-between">
        <p className="font-display text-lg font-bold">{social.label}</p>
        {social.href && (
          <ArrowUpRight
            size={16}
            className="text-muted-foreground transition-colors group-hover:text-primary"
            aria-hidden="true"
          />
        )}
      </div>
      <p className="mt-1 break-all font-mono text-xs text-muted-foreground">{social.handle}</p>
      <div className="mt-4">
        {social.copyValue ? (
          <button
            type="button"
            onClick={copyHandle}
            className="mono-label inline-flex items-center gap-1.5 rounded-full border border-line bg-secondary px-3 py-1.5 transition-colors hover:border-primary"
            aria-label={`Copy ${social.label} handle ${social.copyValue}`}
          >
            {copied ? <Check size={12} className="text-primary" aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        ) : (
          <a
            href={social.href}
            target={social.href?.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="mono-label inline-flex items-center gap-1.5 rounded-full border border-line bg-secondary px-3 py-1.5 transition-colors hover:border-primary"
          >
            Open <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        )}
      </div>
    </TiltCard>
  )
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact — Anurag Patil"
        description="Let's build something useful. Reach Anurag Patil via email, LinkedIn, GitHub, X, YouTube or Discord."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading kicker="CONTACT" title="Let's build something useful." description="" />
        <Reveal className="mt-4">
          <div className="flex flex-wrap items-center gap-4">
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Internships, freelance work, collaborations, or just a good technical conversation — my inbox is open.
            </p>
            <StatusPill />
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-8">
          <div className="neo-border neo-shadow flex flex-col items-start gap-4 rounded-2xl bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="mono-label text-muted-foreground">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 block break-all font-display text-xl font-bold tracking-tight hover:text-primary sm:text-2xl"
              >
                {site.email}
              </a>
            </div>
            <CopyEmailButton />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socials
            .filter((s) => s.id !== 'email')
            .map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <SocialCard id={s.id} />
              </Reveal>
            ))}
        </div>
      </div>
    </>
  )
}
