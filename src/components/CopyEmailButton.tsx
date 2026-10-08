import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { site } from '@/data/site'

/** Copy-email interaction with clear inline + screen-reader feedback. */
export function CopyEmailButton({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
    } catch {
      // Fallback for older browsers / permissions
      const ta = document.createElement('textarea')
      ta.value = site.email
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2200)
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={copy}
        className="neo-border neo-shadow-xs neo-press neo-press-sm inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 font-mono text-xs font-medium tracking-wide"
        aria-label={`Copy email address ${site.email}`}
      >
        {copied ? <Check size={14} className="text-primary" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {copied ? 'Copied!' : 'Copy email'}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </span>
  )
}
