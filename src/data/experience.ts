import type { ExperienceEntry } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    id: 'fit-ez',
    category: 'WORK',
    title: 'Full-Stack Developer Intern',
    org: 'Fit Ez',
    period: 'Oct 2026 — Present',
    summary:
      'Fit Ez builds personalized 1-on-1 diet and workout plans around goals like fat loss, muscle gain, and body recomposition. I work across the product — from the startup website to integrations.',
    points: [
      'Building and maintaining the startup website end to end',
      'Full-stack implementation with HTML, CSS, JavaScript, and Google Apps Script',
      'WhatsApp integration for customer communication flows',
      'Working across the stack in a small, fast-moving team',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Google Apps Script', 'WhatsApp Integration'],
  },
  {
    id: 'forengers-lead',
    category: 'LEADERSHIP',
    title: 'Collab Team Lead',
    org: 'Forengers Foundation',
    period: 'Ongoing',
    summary:
      'Forengers Foundation is a student-led, sustainability-focused organization. As Collab Team Lead I coordinate collaboration efforts across teams and partner groups.',
    points: [
      'Leading collaboration between teams on sustainability initiatives',
      'Coordinating with partner organizations and student volunteers',
    ],
    tags: ['Leadership', 'Coordination', 'Sustainability'],
  },
  {
    id: 'gssoc',
    category: 'TECHNICAL',
    title: 'Selected Contributor',
    org: 'GirlScript Summer of Code (GSSoC) 2026',
    period: '2026',
    summary:
      'Selected as a contributor for GSSoC 2026 — contributing to open-source projects under mentorship.',
    points: ['Contributing to open-source codebases', 'Working with maintainers through review cycles'],
    tags: ['Open Source', 'Git', 'Collaboration'],
  },
  {
    id: 'iit-madras-hack',
    category: 'HACKATHON',
    title: 'Top 21 Finalist — Road Safety AI Hackathon',
    org: 'IIT Madras',
    period: 'Hackathon',
    summary:
      'Built DriveLegal, an offline RAG chatbot for Indian traffic law. Selected as a Top 21 finalist from 19,000+ submissions nationwide.',
    points: [
      'Designed and built the full offline RAG pipeline',
      'Competed against 19,000+ submissions nationwide',
    ],
    tags: ['RAG', 'Mistral 7B', 'FAISS', 'FastAPI'],
  },
  {
    id: 'ignition-hack',
    category: 'HACKATHON',
    title: 'Winner — 1st Place',
    org: 'National Ignition Hackathon',
    period: 'Hackathon',
    summary: 'Won first place at the National Ignition Hackathon.',
    points: ['Rapid ideation, build, and pitch under hackathon time pressure'],
    tags: ['Hackathon', 'Rapid Prototyping'],
  },
]
