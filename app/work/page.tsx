import Link from 'next/link'
import { Container, Section } from '@/components/ui'
import { generatePageMetadata } from '@/lib/seo'
import { getAllWork } from '@/lib/content'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { ProfessionalWork } from '@/lib/types'

export const metadata = generatePageMetadata({
  title: 'Professional Work',
  description:
    'Enterprise integration, architecture, and AI initiatives at Palo Alto Networks by Arunkumar JS.',
  path: '/work',
})

/* ─── Individual work entry ─── */

function WorkEntry({ project, index }: { project: ProfessionalWork; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block wi-entry"
    >
      <div className="wi-entry-inner">
        {/* Left: sequence + meta */}
        <div className="wi-entry-head">
          <span className="wi-num" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="wi-entry-meta">
            <p className="wi-category">{project.category[0]}</p>
            {project.timeline && (
              <p className="wi-timeline">{project.timeline}</p>
            )}
          </div>
        </div>

        {/* Center: title, role, summary, techs */}
        <div className="wi-entry-body">
          <h2 className="wi-title">{project.title}</h2>
          <p className="wi-role">{project.role}</p>
          <p className="wi-summary">{project.summary}</p>

          <div className="wi-techs">
            {project.technologies.slice(0, 6).map((tech) => (
              <span key={tech} className="wi-tech">{tech}</span>
            ))}
            {project.technologies.length > 6 && (
              <span className="wi-tech wi-tech--more">
                +{project.technologies.length - 6}
              </span>
            )}
          </div>
        </div>

        {/* Right: metric + arrow */}
        <div className="wi-entry-end">
          {project.metrics && project.metrics.length > 0 && (
            <div className="wi-metric">
              <p className="wi-metric-value">{project.metrics[0].value}</p>
              <p className="wi-metric-label">{project.metrics[0].label}</p>
            </div>
          )}
          <span className="wi-arrow">
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ─── Page ─── */

export default function WorkPage() {
  const work = getAllWork()

  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-caption mb-4 text-muted tracking-widest">
            Professional Work
          </p>
          <h1 className="text-heading-1 text-foreground">
            Enterprise Projects
          </h1>
          <p className="text-body-lg mt-4 text-muted">
            Architecture, integration, and AI initiatives delivered
            at Palo Alto Networks — from full-stack platforms to
            multi-agent systems.
          </p>
        </div>

        {/* Work entries */}
        <div className="wi-list">
          {work.map((project, i) => (
            <WorkEntry key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </Container>
    </Section>
  )
}
