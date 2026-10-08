import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function currentTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/**
 * Theme toggle backed by localStorage('ap-theme') + `.dark` class.
 * Initial value is set pre-paint by the inline script in index.html;
 * falls back to system preference when nothing is stored.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => currentTheme())

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystem = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('ap-theme')) {
        apply(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', onSystem)
    return () => mq.removeEventListener('change', onSystem)
  }, [])

  const apply = (t: Theme) => {
    document.documentElement.classList.toggle('dark', t === 'dark')
    setTheme(t)
  }

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    localStorage.setItem('ap-theme', next)
    apply(next)
  }, [])

  return { theme, toggle }
}
