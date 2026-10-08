import { forwardRef, type ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'ink' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface NeoButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  to?: string
  onClick?: () => void
  external?: boolean
  className?: string
  ariaLabel?: string
  download?: boolean | string
  type?: 'button' | 'submit'
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground neo-border neo-shadow-sm neo-press neo-press-sm',
  ink: 'bg-ink text-paper neo-border neo-shadow-sm neo-press neo-press-sm',
  outline: 'bg-transparent text-foreground neo-border neo-shadow-sm neo-press neo-press-sm hover:bg-secondary',
  ghost: 'bg-transparent text-foreground border-2 border-transparent hover:border-border',
}

/**
 * The house button: neo-brutalist border + hard offset shadow,
 * springy press interaction, rounded control radius.
 */
export const NeoButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, NeoButtonProps>(
  function NeoButton(
    { children, variant = 'outline', size = 'md', href, to, onClick, external, className = '', ariaLabel, download, type = 'button' },
    ref,
  ) {
    const cls = `inline-flex items-center justify-center font-display font-semibold tracking-wide rounded-full select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

    if (to) {
      return (
        <Link to={to} className={cls} aria-label={ariaLabel} onClick={onClick} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </Link>
      )
    }
    if (href) {
      return (
        <a
          href={href}
          className={cls}
          aria-label={ariaLabel}
          onClick={onClick}
          download={download}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </a>
      )
    }
    return (
      <button type={type} className={cls} aria-label={ariaLabel} onClick={onClick} ref={ref as React.Ref<HTMLButtonElement>}>
        {children}
      </button>
    )
  },
)
