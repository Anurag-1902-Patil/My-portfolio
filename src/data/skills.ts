import type { SkillCategory, SkillFlow } from '@/types'

export const skillCategories: SkillCategory[] = [
  { id: 'languages', label: 'Languages', items: ['C++', 'JavaScript', 'TypeScript', 'Python', 'Bash'] },
  { id: 'frontend', label: 'Frontend', items: ['HTML5', 'React', 'Next.js', 'Tailwind CSS', 'React Query'] },
  { id: 'backend', label: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI'] },
  { id: 'ai-ml', label: 'AI / ML', items: ['RAG', 'LLM Systems', 'OpenCV', 'AI APIs'] },
  { id: 'cloud', label: 'Cloud / Deployment', items: ['Vercel', 'Google Cloud'] },
  { id: 'hardware', label: 'Hardware', items: ['Arduino'] },
  { id: 'tools', label: 'Tools', items: ['Git', 'GitHub'] },
]

/** How the technologies actually connect in real projects. */
export const skillFlows: SkillFlow[] = [
  {
    label: 'Full-stack product path',
    steps: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Vercel'],
  },
  {
    label: 'RAG pipeline path',
    steps: ['Documents', 'Embeddings', 'Vector Search', 'RAG', 'LLM'],
  },
  {
    label: 'AI product path',
    steps: ['Python', 'LLM APIs', 'FastAPI', 'React', 'Google Cloud'],
  },
  {
    label: 'Field-data path',
    steps: ['WhatsApp API', 'Whisper / OCR', 'LLM Extraction', 'PostgreSQL', 'Next.js Console'],
  },
]
