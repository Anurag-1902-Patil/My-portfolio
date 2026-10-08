import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, Moon, Sun, Turtle, X, Zap } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useMotion } from '@/hooks/useMotion'
import { StatusPill } from '@/components/StatusPill'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/proof', label: 'Proof' },
  { to: '/updates', label: 'Updates' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { theme, toggle: toggleTheme } = useTheme()
  const { reduced, toggle: toggleMotion } = useMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change and lock scroll while open
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={`glass neo-border mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-shadow duration-300 sm:px-4 ${
          scrolled ? 'neo-shadow-sm' : ''
        }`}
      >
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Anurag Patil — home">
          <span className="neo-border flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground transition-transform duration-200 group-hover:-rotate-6">
            AP
          </span>
          <span className="font-display text-base font-bold tracking-tight">Anurag Patil</span>
        </Link>

        <div className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 font-display text-[0.8125rem] font-semibold tracking-wide transition-colors duration-150 ${
                  isActive ? 'bg-ink text-paper' : 'text-foreground/75 hover:bg-secondary hover:text-foreground'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <div className="hidden lg:block">
            <StatusPill compact />
          </div>
          <button
            type="button"
            onClick={toggleMotion}
            className="neu-raised flex h-9 w-9 items-center justify-center rounded-full text-foreground/80"
            aria-label={reduced ? 'Enable full motion' : 'Reduce motion'}
            aria-pressed={reduced}
            title={reduced ? 'Motion: reduced' : 'Motion: full'}
          >
            {reduced ? <Turtle size={15} aria-hidden="true" /> : <Zap size={15} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="neu-raised flex h-9 w-9 items-center justify-center rounded-full text-foreground/80"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="neo-border flex h-9 w-9 items-center justify-center rounded-full bg-card xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      {open && (
        <div className="glass neo-border neo-shadow mx-auto mt-2 max-w-6xl rounded-2xl p-3 xl:hidden" role="dialog" aria-label="Menu">
          <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-center font-display text-sm font-semibold ${
                      isActive ? 'neo-border bg-primary text-primary-foreground' : 'border-2 border-transparent bg-secondary/60'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-center lg:hidden">
            <StatusPill compact />
          </div>
        </div>
      )}
    </header>
  )
}
