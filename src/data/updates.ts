import type { UpdateEntry } from '@/types'

// Manually curated developer journal. Add entries at the top as things happen.
// Longer entries can be moved to Markdown files later — keep this feed honest
// and filler-free.
export const updates: UpdateEntry[] = [
  {
    id: 'kranti-matching',
    date: '2026-10',
    kind: 'BUILDING',
    title: 'Confidence-scored schedule matching in Project Kranti',
    body: 'Working on the matching layer: fuzzy string matching plus BGE-M3 embeddings against L5/L6 schedule nodes. The interesting part is deciding when *not* to match — low-confidence cases now route to a human review queue instead of guessing.',
  },
  {
    id: 'fit-ez-start',
    date: '2026-10',
    kind: 'SHIPPED',
    title: 'Started as Full-Stack Developer Intern at Fit Ez',
    body: 'Working across the startup\'s website and product implementation — HTML/CSS/JS, Google Apps Script automation, and WhatsApp integration for customer flows.',
  },
  {
    id: 'gssoc-2026',
    date: '2026',
    kind: 'OSS',
    title: 'Selected as a GSSoC 2026 contributor',
    body: 'Started contributing to open-source projects under GirlScript Summer of Code. Learning how real codebases review and merge changes.',
  },
  {
    id: 'iit-madras-finalist',
    date: '2025',
    kind: 'HACKATHON',
    title: 'Top 21 at IIT Madras Road Safety AI Hackathon',
    body: 'DriveLegal — my offline RAG chatbot for Indian traffic law — made the Top 21 from 19,000+ submissions. Biggest lesson: chunking strategy moved answer quality more than any model tweak.',
  },
  {
    id: 'ignition-win',
    date: '2025',
    kind: 'HACKATHON',
    title: '1st place at National Ignition Hackathon',
    body: 'Won the National Ignition Hackathon. Hackathons keep teaching the same lesson: cut scope ruthlessly, ship something that works end to end, then talk about it clearly.',
  },
]
