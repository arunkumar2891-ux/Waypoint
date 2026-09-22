import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container, Section, Badge } from '@/components/ui'
import { generatePageMetadata } from '@/lib/seo'
import { getProjectBySlug, getAllProjects } from '@/lib/content'
import { ArrowLeft, ExternalLink, GitFork } from 'lucide-react'
import { ProjectVisualization } from '@/components/projects/ProjectVisualization'
import type { Metadata } from 'next'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return generatePageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
  })
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <Section>
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">{project.status}</Badge>
              <p className="text-caption text-muted">{project.category[0]}</p>
            </div>
            <h1 className="text-display mb-4">{project.title}</h1>
            <p className="text-body-lg text-muted mb-6">{project.summary}</p>

            {project.links && project.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    {link.type === 'github' ? <GitFork size={14} /> : <ExternalLink size={14} />}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <Section className="bg-surface-subtle border-y border-border py-12">
          <Container>
            <div className="flex flex-wrap gap-10">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-3xl font-bold text-foreground">{m.value}</p>
                  <p className="text-sm text-muted mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Problem / Solution */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            {project.problem && (
              <div>
                <h2 className="text-heading-3 mb-3">Problem</h2>
                <p className="text-body text-muted">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <h2 className="text-heading-3 mb-3">Solution</h2>
                <p className="text-body text-muted">{project.solution}</p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Architecture Visualization (select projects only) */}
      <Section>
        <Container>
          <ProjectVisualization slug={slug} />
        </Container>
      </Section>

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <Section className="bg-surface-subtle border-y border-border">
          <Container>
            <h2 className="text-heading-3 mb-6">Features</h2>
            <ul className="space-y-3 max-w-3xl">
              {project.features.map((feature, i) => (
                <li key={i} className="flex gap-3 text-body text-muted">
                  <span className="text-accent mt-1.5 shrink-0" aria-hidden="true">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Technologies */}
      <Section className="border-t border-border">
        <Container>
          <h2 className="text-heading-3 mb-4">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
