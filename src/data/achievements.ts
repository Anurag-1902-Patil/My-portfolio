import type { Achievement } from '@/types'

export const achievements: Achievement[] = [
  {
    id: 'iit-madras-top21',
    title: 'Top 21 Finalist',
    org: 'IIT Madras Road Safety AI Hackathon',
    result: 'Selected from 19,000+ submissions nationwide',
    detail: 'For DriveLegal — an offline RAG chatbot answering Indian traffic-law questions with cited legal sections and exact challan amounts.',
    relatedProjectSlug: 'drivelegal',
  },
  {
    id: 'ignition-winner',
    title: 'Winner — 1st Place',
    org: 'National Ignition Hackathon',
    result: 'First place, national level',
  },
  {
    id: 'hackathon-finalist',
    title: 'Finalist',
    org: '4 National-Level Hackathons',
    result: 'Reached final rounds across four national competitions',
  },
  {
    id: 'gssoc-2026',
    title: 'Selected Contributor',
    org: 'GirlScript Summer of Code (GSSoC) 2026',
    result: 'Selected to contribute to open-source projects under mentorship',
  },
  {
    id: 'forengers-lead',
    title: 'Collab Team Lead',
    org: 'Forengers Foundation',
    result: 'Leading collaboration efforts at a student-led sustainability NGO',
  },
]
