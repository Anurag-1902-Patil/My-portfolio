export interface ProjectLink {
  label: string
  href: string
  kind: 'github' | 'live' | 'demo' | 'case-study' | 'external'
}

export interface ArchitectureStep {
  label: string
  detail?: string
}

export interface TechGroup {
  group: string
  items: string[]
}

export interface CaseStudySection {
  heading: string
  body: string[]
  list?: string[]
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  tier: 1 | 2 | 3 | 4
  tierLabel: string
  status: string
  tagline: string
  description: string
  achievement?: string
  tech: TechGroup[]
  /** short chips for cards / modal */
  stack: string[]
  links: ProjectLink[]
  caseStudy: {
    hero: string
    sections: CaseStudySection[]
    architecture: ArchitectureStep[]
    decisions: { title: string; body: string }[]
    challenges: { title: string; body: string }[]
    results: string[]
    lessons: string[]
    future: string[]
  }
}

export type ExperienceCategory = 'WORK' | 'LEADERSHIP' | 'HACKATHON' | 'FREELANCE' | 'TECHNICAL'

export interface ExperienceEntry {
  id: string
  category: ExperienceCategory
  title: string
  org: string
  period: string
  summary: string
  points: string[]
  tags: string[]
}

export interface Achievement {
  id: string
  title: string
  org: string
  result: string
  detail?: string
  relatedProjectSlug?: string
}

export interface SkillCategory {
  id: string
  label: string
  items: string[]
}

export interface SkillFlow {
  label: string
  steps: string[]
}

export interface SocialLink {
  id: string
  label: string
  handle: string
  href?: string
  copyValue?: string
}

export interface BlogPost {
  id: string
  date: string
  title: string
  excerpt: string
  body: string[]
  tags: string[]
}

export interface GalleryItem {
  id: string
  title: string
  event: string
  date: string
  caption: string
  type: 'image' | 'video'
  src: string
  alt: string
  poster?: string
}
