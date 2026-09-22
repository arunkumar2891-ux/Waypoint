'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Container, Section, ButtonLink } from '@/components/ui'
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import { useReducedMotion } from '@/lib/hooks'
import type { PersonalProject } from '@/lib/types'

/* ─── Curated presentation data per project ─── */

interface ProjectHighlight {
  slug: string
  tags: string[]
  trait: string
}

const HIGHLIGHTS: Record<string, ProjectHighlight> = {
  'careerpilot-ai': {
    slug: 'careerpilot-ai',
    tags: ['React', 'TypeScript', 'Supabase', 'Gemini 3.6 Flash', 'Apify'],
    trait: 'Autonomous 18-step daily execution flow',
  },
  'cric-scorer': {
    slug: 'cric-scorer',
    tags: ['React', 'TypeScript', 'Supabase'],
    trait: '3 domain engines · 14-table schema with RLS',
  },
  'pic-reel': {
    slug: 'pic-reel',
    tags: ['React 19', 'TanStack Start', 'FFmpeg.wasm'],
    trait: '100% client-side — photos never leave the browser',
  },
  'ipl-2026-prediction': {
    slug: 'ipl-2026-prediction',
    tags: ['React', 'Express.js', 'Supabase', 'CricAPI'],
    trait: 'Fully automated lifecycle · 29 registered players',
  },
  planitx: {
    slug: 'planitx',
    tags: ['React', 'TypeScript', 'Zustand', 'Supabase'],
    trait: 'India-first features · 12 custom hooks · vendor marketplace',
  },
}

/* ─── CareerPilot workflow stages (documented in resume) ─── */

const WORKFLOW_STAGES = [
  { id: 'sources', label: 'Job Sources', detail: 'LinkedIn via Apify' },
  { id: 'discovery', label: 'Discovery', detail: 'Query + scrape + parse' },
  { id: 'qualify', label: 'Qualification', detail: 'Match score filter' },
  { id: 'tailor', label: 'Resume Tailoring', detail: 'Gemini ATS enhancement' },
  { id: 'compile', label: 'Document Build', detail: 'LaTeX → PDF → Cloud' },
  { id: 'submit', label: 'Submission', detail: 'Email via Gmail API' },
]

/* ─── Animation ─── */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

/* ─── Featured project (CareerPilot AI) ─── */

function FeaturedProject({
  project,
  reducedMotion,
}: {
  project: PersonalProject
  reducedMotion: boolean
}) {
  const Wrapper = reducedMotion ? 'div' : motion.div
  const liveLink = project.links?.find((l) => l.type === 'live')

  return (
    <Wrapper {...(!reducedMotion ? { variants: fadeUp } : {})}>
      <div className="proj-featured">
        <div className="proj-featured-inner">
          {/* ─ Left: content ─ */}
          <div className="proj-featured-content">
            <p className="proj-eyebrow">Featured Project</p>
            <Link
              href={`/projects/${project.slug}`}
              className="group"
            >
              <h3 className="proj-featured-title">
                {project.title}
                <ArrowUpRight
                  size={20}
                  className="proj-featured-arrow"
                  aria-hidden="true"
                />
              </h3>
            </Link>

            {project.problem && (
              <p className="proj-problem">{project.problem}</p>
            )}

            <p className="proj-summary">{project.summary}</p>

            {/* Key features */}
            {project.features && (
              <div className="proj-features">
                {project.features.slice(0, 4).map((feat, i) => (
                  <p key={i} className="proj-feature-item">
                    <span className="proj-feature-bullet" aria-hidden="true">→</span>
                    {feat}
                  </p>
                ))}
              </div>
            )}

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="proj-metrics">
                {project.metrics.map((m) => (
                  <div key={m.label} className="proj-metric">
                    <span className="proj-metric-value">{m.value}</span>
                    <span className="proj-metric-label">{m.label}</span>
                  </div>
                ))}
                <p className="proj-metric-date">As of Sep 21, 2026</p>
              </div>
            )}

            {/* Actions */}
            <div className="proj-actions">
              <Link
                href={`/projects/${project.slug}`}
                className="proj-cta"
              >
                View Project
                <ArrowRight size={14} className="proj-cta-arrow" aria-hidden="true" />
              </Link>
              {liveLink && (
                <a
                  href={liveLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-cta proj-cta--live"
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  Live App
                </a>
              )}
            </div>
          </div>

          {/* ─ Right: workflow visualization ─ */}
          <div className="proj-featured-visual" aria-hidden="true">
            <div className="proj-workflow">
              <p className="proj-workflow-title">Execution Flow</p>
              <div className="proj-workflow-stages">
                {WORKFLOW_STAGES.map((stage, i) => (
                  <div key={stage.id} className="proj-workflow-stage group/stage">
                    <div className="proj-workflow-node">
                      <span className="proj-workflow-dot" />
                      {i < WORKFLOW_STAGES.length - 1 && (
                        <span className="proj-workflow-connector" />
                      )}
                    </div>
                    <div className="proj-workflow-text">
                      <span className="proj-workflow-label">{stage.label}</span>
                      <span className="proj-workflow-detail">{stage.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="proj-workflow-hint">Workflow visualization — coming soon</p>
            </div>
          </div>

          {/* ─ Accessible workflow summary (screen readers) ─ */}
          <div className="sr-only">
            <p>CareerPilot AI workflow: {WORKFLOW_STAGES.map((s) => s.label).join(' → ')}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

/* ─── Standard project item ─── */

function ProjectItem({
  project,
  reducedMotion,
}: {
  project: PersonalProject
  reducedMotion: boolean
}) {
  const hl = HIGHLIGHTS[project.slug]
  const Wrapper = reducedMotion ? 'div' : motion.div

  return (
    <Wrapper {...(!reducedMotion ? { variants: fadeUp } : {})}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block proj-item"
      >
        <div className="proj-item-inner">
          <div className="proj-item-head">
            <p className="proj-eyebrow">{project.category[0]}</p>
            <h3 className="proj-item-title">
              {project.title}
              <ArrowUpRight
                size={16}
                className="proj-item-arrow"
                aria-hidden="true"
              />
            </h3>
            <p className="proj-item-summary">{project.summary}</p>
          </div>

          <div className="proj-item-foot">
            {hl && (
              <p className="proj-item-trait">{hl.trait}</p>
            )}
            {hl && (
              <p className="proj-item-tags">
                {hl.tags.map((tag, i) => (
                  <span key={tag}>
                    <span className="proj-item-tag">{tag}</span>
                    {i < hl.tags.length - 1 && (
                      <span className="proj-item-tag-sep" aria-hidden="true"> · </span>
                    )}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </Link>
    </Wrapper>
  )
}

/* ─── Exported section ─── */

interface ProjectsSectionProps {
  projects: PersonalProject[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()

  const featured = projects[0]
  const remaining = projects.slice(1)
  const MotionWrap = reducedMotion ? 'div' : motion.div

  return (
    <Section id="projects">
      <Container>
        <div ref={sectionRef}>
          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <p className="text-caption mb-4 text-muted tracking-widest">
              Personal Projects
            </p>
            <h2 className="text-heading-1 text-foreground">
              Built Beyond the Enterprise
            </h2>
            <p className="text-body-lg mt-4 text-muted">
              End-to-end product delivery — from identifying real problems to
              shipping production applications using AI-augmented development.
            </p>
          </div>

          <MotionWrap
            {...(!reducedMotion
              ? {
                  variants: stagger,
                  initial: 'hidden',
                  animate: isInView ? 'visible' : 'hidden',
                }
              : {})}
          >
            {/* Featured project */}
            {featured && (
              <FeaturedProject
                project={featured}
                reducedMotion={reducedMotion}
              />
            )}

            {/* Remaining projects grid */}
            <div className="proj-grid">
              {remaining.map((project) => (
                <ProjectItem
                  key={project.slug}
                  project={project}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </MotionWrap>

          {/* Footer link */}
          <div className="mt-12">
            <ButtonLink href="/projects" variant="secondary">
              View All Projects
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}
