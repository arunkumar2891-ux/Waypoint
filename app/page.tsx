import { HeroSection } from '@/components/hero/HeroSection'
import { MetricsSection } from '@/components/metrics/MetricsSection'
import { WorkSection } from '@/components/work/WorkSection'
import { SkillsSection } from '@/components/skills/SkillsSection'
import { ProjectsSection } from '@/components/projects/ProjectsSection'
import { TimelineSection } from '@/components/timeline/TimelineSection'
import { AboutSection } from '@/components/about/AboutSection'
import { CTASection } from '@/components/hero/CTASection'
import { getFeaturedWork, getFeaturedProjects } from '@/lib/content'

export default function HomePage() {
  const featuredWork = getFeaturedWork()
  const featuredProjects = getFeaturedProjects()

  return (
    <>
      <HeroSection />
      <MetricsSection />
      <WorkSection work={featuredWork} />
      <SkillsSection />
      <ProjectsSection projects={featuredProjects} />
      <TimelineSection />
      <AboutSection />
      <CTASection />
    </>
  )
}
