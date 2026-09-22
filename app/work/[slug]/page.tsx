import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo'
import { getWorkBySlug, getAllWork, getAdjacentWork } from '@/lib/content'
import { CaseStudyPage } from '@/components/work/CaseStudyPage'
import type { Metadata } from 'next'

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const work = getAllWork()
  return work.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getWorkBySlug(slug)
  if (!project) return {}

  return generatePageMetadata({
    title: `${project.title} — Case Study`,
    description: project.summary,
    path: `/work/${slug}`,
    type: 'article',
  })
}

export default async function WorkDetailPage({
  params,
}: WorkDetailPageProps) {
  const { slug } = await params
  const project = getWorkBySlug(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentWork(slug)

  return <CaseStudyPage project={project} prev={prev} next={next} />
}
