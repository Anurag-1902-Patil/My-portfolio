/** "Open to opportunities" indicator — blinking dot + mono label. */
export function StatusPill({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`glass neo-border inline-flex items-center gap-2 rounded-full font-mono font-medium ${
        compact ? 'px-2.5 py-1 text-[0.625rem]' : 'px-3.5 py-1.5 text-[0.6875rem]'
      } uppercase tracking-[0.14em] text-foreground`}
      role="status"
    >
      <span className="status-dot inline-block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
      Open to opportunities
    </span>
  )
}
