import { Seo } from '@/components/Seo'
import { Hero } from '@/sections/home/Hero'
import { ProofStrip } from '@/sections/home/ProofStrip'
import { FeaturedProject } from '@/sections/home/FeaturedProject'
import { Positioning } from '@/sections/home/Positioning'
import { ExperiencePreview } from '@/sections/home/ExperiencePreview'
import { SkillsPreview } from '@/sections/home/SkillsPreview'
import { AchievementsPreview } from '@/sections/home/AchievementsPreview'
import { HomeProjects } from '@/sections/home/HomeProjects'
import { FinalCta } from '@/sections/home/FinalCta'

export default function Home() {
  return (
    <>
      <Seo
        title="Anurag Patil — AI + Full-Stack Developer, Pune"
        description="Anurag Patil builds RAG systems, LLM-powered tools and modern web apps. Top 21 Finalist at IIT Madras Road Safety AI Hackathon. Full-Stack Developer Intern at Fit Ez."
      />
      <Hero />
      <ProofStrip />
      <FeaturedProject />
      <Positioning />
      <ExperiencePreview />
      <SkillsPreview />
      <AchievementsPreview />
      <HomeProjects />
      <FinalCta />
    </>
  )
}
