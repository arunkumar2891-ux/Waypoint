import Link from 'next/link'
import { Container, Section, Card, Badge } from '@/components/ui'
import { generatePageMetadata } from '@/lib/seo'
import { getAllProjects } from '@/lib/content'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Personal Projects',
  description:
    'Personal products and tools built by Arunkumar JS — from concept to production using AI-augmented development.',
  path: '/projects',
})

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <Section>
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="text-caption mb-4 text-muted tracking-widest">
            Personal Projects
          </p>
          <h1 className="text-heading-1 text-foreground">
            Things I&apos;ve Built
          </h1>
          <p className="text-body-lg mt-4 text-muted">
            Products and tools — from concept to production using AI-augmented development.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <Card hover className="h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                  />
                </div>
                <h2 className="text-heading-3 mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h2>
                <p className="text-body-sm text-muted mb-4 flex-1">
                  {project.summary}
                </p>

                {project.links && project.links.length > 0 && (
                  <div className="mb-4">
                    {project.links.filter((l) => l.type === 'live').map((link) => (
                      <span key={link.url} className="inline-flex items-center gap-1 text-xs text-accent">
                        <ExternalLink size={12} />
                        Live
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-border">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="muted">{tech}</Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="muted">+{project.technologies.length - 4}</Badge>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
