import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { site } from '@/data/site'
import { socials } from '@/data/socials'
import { StatusPill } from '@/components/StatusPill'

const footerNav = [
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/proof', label: 'Proof of Work' },
  { to: '/updates', label: 'Updates' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t-2 border-border">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display display-tight text-4xl font-bold sm:text-5xl">
              Anurag
              <br />
              Patil<span className="text-primary">.</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{site.statement}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-taupe">{site.footerLine}</p>
            <div className="mt-5">
              <StatusPill />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-2.5">
            {footerNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-display text-sm font-semibold text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="mono-label mb-3 text-muted-foreground">Elsewhere</p>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.id}>
                  {s.href ? (
                    <a
                      href={s.href}
                      target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {s.label}
                      <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-sm text-foreground/80">
                      {s.label} <span className="font-mono text-xs text-muted-foreground">{s.handle}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} {site.fullName} · {site.location}
          </p>
          <p className="font-mono text-xs text-muted-foreground">Designed & built by hand — no template.</p>
        </div>
      </div>
    </footer>
  )
}
