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
        title="Anurag Patil - B.Tech IT Student & Developer, Pune"
        description="Anurag Patil is a second-year B.Tech Information Technology student at Pune Vidyarthi Griha's College of Engineering and Technology (PVG's COET), Pune. Learning through AI and full-stack projects; currently a Full-Stack Developer Intern at Fit Ez."
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
