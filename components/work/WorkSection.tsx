'use client'

import { lazy, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Container, Section, ButtonLink } from '@/components/ui'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useReducedMotion, useMobile } from '@/lib/hooks'
import { SceneContainer } from '@/components/three/primitives/SceneContainer'
import { WebGLFallback } from '@/components/three'
import type { ProfessionalWork } from '@/lib/types'

const PortalArchitecture = lazy(() => import('@/components/three/PortalArchitecture'))

/* ─── Curated homepage selection ───
   Editorial curation — not a ranking.
   Full portfolio remains at /work (all 7 entries). */

const HOMEPAGE_SLUGS = [
  'snaplogic-automations-portal',
  'fw-flex-pipeline-redesign',
  'pc-cc-bigquery-migration',
  'quote-journey-tracker-agent',
  'multi-agent-pipeline-review',
]

/* ─── Curated highlight data per project ─── */

interface ProjectHighlight {
  metric?: { value: string; label: string }
  tags: string[]
}

const HIGHLIGHTS: Record<string, ProjectHighlight> = {
  'snaplogic-automations-portal': {
    metric: { value: '99.95%', label: 'Uptime' },
    tags: ['React', 'TypeScript', 'Express.js', 'BigQuery', 'Vertex AI', 'Kubernetes'],
  },
  'fw-flex-pipeline-redesign': {
    metric: { value: '66%', label: 'Snap Reduction' },
    tags: ['SnapLogic', 'Pub/Sub', 'Chronosphere'],
  },
  'pc-cc-bigquery-migration': {
    metric: { value: '4–10×', label: 'Query Performance' },
    tags: ['BigQuery', 'SnapLogic', 'Datadog'],
  },
  'quote-journey-tracker-agent': {
    metric: { value: '30–40 sec', label: 'Response Time' },
    tags: ['GCP Agent Studio', 'Vertex AI RAG', 'Gemini 3.5'],
  },
  'multi-agent-pipeline-review': {
    metric: { value: '~90%', label: 'Perf. Improvement' },
    tags: ['Google ADK', 'Gemini 3.5', 'Cloud Agent Engine'],
  },
}

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

/* ─── Featured project (first/largest) ─── */

function FeaturedProject({
  project,
  reducedMotion,
  mobile,
}: {
  project: ProfessionalWork
  reducedMotion: boolean
  mobile: boolean
}) {
  const hl = HIGHLIGHTS[project.slug]
  const Wrapper = reducedMotion ? 'div' : motion.div

  return (
    <Wrapper {...(!reducedMotion ? { variants: fadeUp } : {})}>
      <Link href={`/work/${project.slug}`} className="group block work-featured">
        <div className="work-featured-inner">
          {/* ─ Left: content ─ */}
          <div className="work-featured-content">
            <p className="work-eyebrow">Featured</p>
            <h3 className="work-featured-title">{project.title}</h3>
            <p className="work-role">{project.role}</p>
            <p className="work-summary">{project.summary}</p>

            {/* Key highlights */}
            <div className="work-featured-highlights">
              {project.impact.slice(0, 3).map((item, i) => (
                <p key={i} className="work-highlight-item">
                  <span className="work-highlight-bullet" aria-hidden="true">→</span>
                  {item}
                </p>
              ))}
            </div>

            {/* Tags */}
            {hl && (
              <div className="work-tags">
                {hl.tags.map((tag) => (
                  <span key={tag} className="work-tag">{tag}</span>
                ))}
              </div>
            )}

            <span className="work-cta">
              View Case Study
              <ArrowRight size={14} className="work-cta-arrow" aria-hidden="true" />
            </span>
          </div>

          {/* ─ Right: architecture visualization ─ */}
          <div className="work-featured-visual" aria-hidden="true">
            <SceneContainer
              height="h-full"
              fallback={
                <WebGLFallback sceneName="Portal Architecture" />
              }
            >
              <PortalArchitecture reducedMotion={reducedMotion} mobile={mobile} />
            </SceneContainer>
          </div>
        </div>
      </Link>
    </Wrapper>
  )
}

/* ─── Standard project row item ─── */

function WorkItem({
  project,
  reducedMotion,
}: {
  project: ProfessionalWork
  reducedMotion: boolean
}) {
  const hl = HIGHLIGHTS[project.slug]
  const Wrapper = reducedMotion ? 'div' : motion.div

  return (
    <Wrapper {...(!reducedMotion ? { variants: fadeUp } : {})}>
      <Link href={`/work/${project.slug}`} className="group block work-item">
        <div className="work-item-inner">
          {/* Left: title + meta */}
          <div className="work-item-content">
            <p className="work-eyebrow">{project.category[0]}</p>
            <h3 className="work-item-title">{project.title}</h3>
            <p className="work-role">{project.role}</p>
            <p className="work-summary-compact">{project.summary}</p>

            {hl && (
              <div className="work-tags work-tags--compact">
                {hl.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="work-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Right: metric + arrow */}
          <div className="work-item-aside">
            {hl?.metric && (
              <div className="work-item-metric">
                <p className="work-item-metric-value">{hl.metric.value}</p>
                <p className="work-item-metric-label">{hl.metric.label}</p>
              </div>
            )}
            <ArrowUpRight
              size={18}
              className="work-item-arrow"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </Wrapper>
  )
}

/* ─── Exported section ─── */

interface WorkSectionProps {
  work: ProfessionalWork[]
}

export function WorkSection({ work }: WorkSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const mobile = useMobile()

  const curated = HOMEPAGE_SLUGS
    .map((slug) => work.find((w) => w.slug === slug))
    .filter((w): w is ProfessionalWork => w !== undefined)

  const featured = curated[0]
  const remaining = curated.slice(1)
  const MotionWrap = reducedMotion ? 'div' : motion.div

  return (
    <Section id="work">
      <Container>
        <div ref={sectionRef}>
          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <p className="text-caption mb-4 text-muted tracking-widest">Work</p>
            <h2 className="text-heading-1 text-foreground">Selected Work</h2>
            <p className="text-body-lg mt-4 text-muted">
              Enterprise integration architecture, AI-powered platforms, and
              production engineering at Palo Alto Networks.
            </p>
          </div>

          <MotionWrap
            {...(!reducedMotion ? {
              variants: stagger,
              initial: 'hidden',
              animate: isInView ? 'visible' : 'hidden',
            } : {})}
          >
            {/* Featured project */}
            {featured && (
              <FeaturedProject
                project={featured}
                reducedMotion={reducedMotion}
                mobile={mobile}
              />
            )}

            {/* Curated secondary work */}
            <div className="work-grid">
              {remaining.map((project) => (
                <WorkItem
                  key={project.slug}
                  project={project}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </MotionWrap>

          {/* Footer link */}
          <div className="mt-12">
            <ButtonLink href="/work" variant="secondary">
              View All Work
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}
