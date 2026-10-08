import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { contributionChartUrl, GITHUB_PROFILE_URL, GITHUB_USERNAME } from '@/services/github'
import { useTheme } from '@/hooks/useTheme'

/**
 * GitHub contribution graph via the public ghchart image service —
 * no tokens, no secrets. Graceful fallback if the service is unreachable.
 */
export function GithubChart() {
  const { theme } = useTheme()
  const [failed, setFailed] = useState(false)

  return (
    <div className="neu-raised rounded-2xl p-5 sm:p-7">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-semibold">GitHub activity</h3>
        <span className="mono-label text-muted-foreground">@{GITHUB_USERNAME}</span>
      </div>
      {failed ? (
        <div className="neu-inset flex flex-col items-start gap-3 rounded-xl p-6">
          <p className="text-sm text-muted-foreground">
            Contribution graph couldn't be loaded right now — the activity itself lives on GitHub.
          </p>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-border neo-shadow-xs neo-press neo-press-sm inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 font-display text-sm font-semibold"
          >
            View GitHub profile <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      ) : (
        <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" aria-label="Open Anurag's GitHub profile">
          <img
            src={contributionChartUrl(theme)}
            alt={`GitHub contribution graph for ${GITHUB_USERNAME}`}
            className="w-full rounded-lg"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        </a>
      )}
    </div>
  )
}
