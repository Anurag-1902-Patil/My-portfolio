/**
 * GitHub activity service — public-data only, no tokens in the frontend.
 *
 * The contribution graph uses the public ghchart.rshah.org image service,
 * which renders GitHub's public contribution data without any credentials.
 * If the image fails to load, callers render a graceful fallback linking to
 * the profile instead.
 */
export const GITHUB_USERNAME = 'Anurag-1902-Patil'
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`

export function contributionChartUrl(theme: 'light' | 'dark'): string {
  // 201k shades: warm ink on light, warm paper on dark — matches site tokens.
  const color = theme === 'dark' ? 'e8ded0' : '2b241c'
  return `https://ghchart.rshah.org/${color}/${GITHUB_USERNAME}`
}
