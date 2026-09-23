'use client'

import { lazy, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion, useMobile } from '@/lib/hooks'
import { SceneContainer } from '@/components/three/primitives/SceneContainer'
import { WebGLFallback } from '@/components/three'
import type { ProfessionalWork } from '@/lib/types'

const DiagnosticPipeline = lazy(() => import('@/components/three/DiagnosticPipeline'))
const AgentOrchestration = lazy(() => import('@/components/three/AgentOrchestration'))
const PortalArchitecture = lazy(() => import('@/components/three/PortalArchitecture'))

/* ─── Types ─── */

interface CaseStudyPageProps {
  project: ProfessionalWork
  prev: ProfessionalWork | null
  next: ProfessionalWork | null
}

/* ─── Animation ─── */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

/* ─── Animated section wrapper ─── */

function AnimatedSection({
  children,
  className,
  reducedMotion,
}: {
  children: React.ReactNode
  className?: string
  reducedMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const Wrapper = reducedMotion ? 'div' : motion.div

  return (
    <div ref={ref} className={className}>
      <Wrapper
        {...(!reducedMotion
          ? {
              variants: stagger,
              initial: 'hidden',
              animate: isInView ? 'visible' : 'hidden',
            }
          : {})}
      >
        {children}
      </Wrapper>
    </div>
  )
}

function Fade({
  children,
  reducedMotion,
  className,
}: {
  children: React.ReactNode
  reducedMotion: boolean
  className?: string
}) {
  const Wrapper = reducedMotion ? 'div' : motion.div
  return (
    <Wrapper
      {...(!reducedMotion ? { variants: fadeUp } : {})}
      className={className}
    >
      {children}
    </Wrapper>
  )
}

/* ─── Primary metric for hero ─── */

function pickPrimaryMetric(project: ProfessionalWork): {
  value: string
  label: string
} | null {
  if (!project.metrics || project.metrics.length === 0) return null
  const primary: Record<string, number> = {
    Uptime: 1,
    'Snap Reduction': 1,
    'Latency Improvement': 1,
    'Inconsistency After': 1,
    Restored: 1,
    'Response Time After': 1,
    'Performance Improvement': 1,
  }
  const found = project.metrics.find((m) => primary[m.label])
  return found ?? project.metrics[0]
}

/* ─── Before → After pairs ─── */

interface BeforeAfterPair {
  label: string
  before: string
  after: string
}

function extractBeforeAfter(project: ProfessionalWork): BeforeAfterPair[] {
  if (!project.metrics) return []
  const pairs: BeforeAfterPair[] = []
  const m = project.metrics

  if (project.slug === 'fw-flex-pipeline-redesign') {
    const before = m.find((x) => x.label === 'Before')
    const after = m.find((x) => x.label === 'After')
    if (before && after) {
      pairs.push({ label: 'Pipeline Complexity', before: before.value, after: after.value })
    }
  }

  if (project.slug === 'pc-cc-bigquery-migration') {
    pairs.push({ label: 'Query Latency', before: '2–5s', after: '<500ms' })
  }

  if (project.slug === 'rag-corpus-optimization') {
    const before = m.find((x) => x.label === 'Inconsistency Before')
    const after = m.find((x) => x.label === 'Inconsistency After')
    if (before && after) {
      pairs.push({ label: 'AI Review Inconsistency', before: before.value, after: after.value })
    }
    const clBefore = m.find((x) => x.label === 'Clusters Before')
    const clAfter = m.find((x) => x.label === 'Clusters After')
    if (clBefore && clAfter) {
      pairs.push({ label: 'Error Report Clusters', before: clBefore.value, after: clAfter.value })
    }
  }

  if (project.slug === 'quote-journey-tracker-agent') {
    const before = m.find((x) => x.label === 'Response Time Before')
    const after = m.find((x) => x.label === 'Response Time After')
    if (before && after) {
      pairs.push({ label: 'Investigation Response Time', before: before.value, after: after.value })
    }
  }

  return pairs
}

/* ─── Curated tags for architecture domains ─── */

function deriveDomainTags(project: ProfessionalWork): string[] {
  const tags: string[] = []
  const techSet = new Set(project.technologies.map((t) => t.toLowerCase()))
  const catStr = project.category.join(' ').toLowerCase()

  if (catStr.includes('integration') || techSet.has('snaplogic')) tags.push('Integration')
  if (catStr.includes('architecture') || project.role.toLowerCase().includes('architect'))
    tags.push('Architecture')
  if (
    techSet.has('kubernetes') ||
    techSet.has('helm') ||
    techSet.has('docker') ||
    techSet.has('gcp') ||
    techSet.has('google bigquery') ||
    techSet.has('gcp agent studio') ||
    techSet.has('google cloud agent engine') ||
    techSet.has('google adk')
  )
    tags.push('Cloud')
  if (techSet.has('bigquery') || techSet.has('google bigquery') || techSet.has('sql'))
    tags.push('Data')
  if (
    techSet.has('vertex ai') ||
    techSet.has('gemini 2.5 pro') ||
    techSet.has('gemini 2.5 flash') ||
    techSet.has('gemini 3.5 flash') ||
    techSet.has('vertex ai rag engine') ||
    techSet.has('vertex ai reasoning engine') ||
    techSet.has('rag') ||
    catStr.includes('genai') ||
    catStr.includes('rag') ||
    catStr.includes('ai agent')
  )
    tags.push('GenAI')
  if (techSet.has('datadog') || techSet.has('datadog apm') || techSet.has('chronosphere') || techSet.has('opentelemetry') || techSet.has('cloud trace'))
    tags.push('Observability')
  if (techSet.has('vault') || techSet.has('helm')) tags.push('DevOps')
  if (
    techSet.has('react 18') ||
    techSet.has('typescript') ||
    techSet.has('express.js')
  )
    tags.push('Full Stack')
  if (catStr.includes('production')) tags.push('Production Engineering')

  return [...new Set(tags)]
}

/* ─── Main component ─── */

export function CaseStudyPage({ project, prev, next }: CaseStudyPageProps) {
  const reducedMotion = useReducedMotion()
  const mobile = useMobile()
  const primaryMetric = pickPrimaryMetric(project)
  const beforeAfter = extractBeforeAfter(project)
  const domainTags = deriveDomainTags(project)
  const implementationSteps =
    typeof project.implementation === 'string'
      ? [project.implementation]
      : project.implementation ?? []

  return (
    <article className="cs">
      {/* ━━━ HERO ━━━ */}
      <header className="cs-hero">
        <Container>
          <AnimatedSection reducedMotion={reducedMotion}>
            <Fade reducedMotion={reducedMotion}>
              <Link
                href="/work"
                className="cs-back"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Work
              </Link>
            </Fade>

            <Fade reducedMotion={reducedMotion}>
              <p className="cs-eyebrow">Work / Case Study</p>
            </Fade>

            <Fade reducedMotion={reducedMotion}>
              <h1 className="cs-title">{project.title}</h1>
            </Fade>

            <Fade reducedMotion={reducedMotion}>
              <p className="cs-summary">{project.summary}</p>
            </Fade>

            {/* Meta row */}
            <Fade reducedMotion={reducedMotion} className="cs-meta">
              <div className="cs-meta-item">
                <span className="cs-meta-label">Role</span>
                <span className="cs-meta-value">{project.role}</span>
              </div>
              <div className="cs-meta-item">
                <span className="cs-meta-label">Organization</span>
                <span className="cs-meta-value">{project.employer}</span>
              </div>
              {project.timeline && (
                <div className="cs-meta-item">
                  <span className="cs-meta-label">Timeline</span>
                  <span className="cs-meta-value">{project.timeline}</span>
                </div>
              )}
              <div className="cs-meta-item">
                <span className="cs-meta-label">Domain</span>
                <span className="cs-meta-value">{project.category[0]}</span>
              </div>
            </Fade>

            {/* Hero metric */}
            {primaryMetric && (
              <Fade reducedMotion={reducedMotion} className="cs-hero-metric">
                <p className="cs-hero-metric-value">{primaryMetric.value}</p>
                <p className="cs-hero-metric-label">{primaryMetric.label}</p>
              </Fade>
            )}

            {/* Technology tags */}
            <Fade reducedMotion={reducedMotion} className="cs-tech-tags">
              {project.technologies.slice(0, 8).map((tech) => (
                <span key={tech} className="cs-tech-tag">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 8 && (
                <span className="cs-tech-tag cs-tech-tag--more">
                  +{project.technologies.length - 8}
                </span>
              )}
            </Fade>
          </AnimatedSection>
        </Container>
      </header>

      {/* ━━━ CONTEXT + CHALLENGE ━━━ */}
      {(project.context || project.challenge) && (
        <section className="cs-section" aria-labelledby="cs-context-heading">
          <Container>
            <AnimatedSection reducedMotion={reducedMotion}>
              <div className="cs-two-col">
                {project.context && (
                  <Fade reducedMotion={reducedMotion} className="cs-col">
                    <h2 id="cs-context-heading" className="cs-section-heading">
                      Context
                    </h2>
                    <p className="cs-body">{project.context}</p>
                  </Fade>
                )}
                {project.challenge && (
                  <Fade reducedMotion={reducedMotion} className="cs-col">
                    <h2 className="cs-section-heading">Challenge</h2>
                    <p className="cs-body">{project.challenge}</p>
                  </Fade>
                )}
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ━━━ ROLE ━━━ */}
      <section className="cs-section cs-section--bordered" aria-labelledby="cs-role-heading">
        <Container>
          <AnimatedSection reducedMotion={reducedMotion}>
            <Fade reducedMotion={reducedMotion}>
              <h2 id="cs-role-heading" className="cs-section-heading">
                Role
              </h2>
              <p className="cs-role-value">{project.role}</p>
              <p className="cs-body cs-body--narrow">
                {project.employer} · {project.category[0]}
                {project.timeline ? ` · ${project.timeline}` : ''}
              </p>
            </Fade>
          </AnimatedSection>
        </Container>
      </section>

      {/* ━━━ ARCHITECTURE ━━━ */}
      {project.architecture && (
        <section className="cs-section" aria-labelledby="cs-arch-heading">
          <Container>
            <AnimatedSection reducedMotion={reducedMotion}>
              <Fade reducedMotion={reducedMotion}>
                <h2 id="cs-arch-heading" className="cs-section-heading">
                  Architecture
                </h2>
                {project.architecture.includes('\n\n') ? (
                  <div className="cs-arch-prose">
                    {project.architecture.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="cs-body cs-body--wide">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="cs-body cs-body--wide">{project.architecture}</p>
                )}
              </Fade>

              {/* Architecture visualization */}
              <Fade reducedMotion={reducedMotion}>
                {project.slug === 'quote-journey-tracker-agent' ? (
                  <div className="cs-arch-visual cs-arch-visual--pipeline" aria-hidden="true">
                    <SceneContainer
                      height="h-[420px] md:h-[480px]"
                      fallback={<WebGLFallback sceneName="Diagnostic Pipeline" />}
                    >
                      <DiagnosticPipeline reducedMotion={reducedMotion} mobile={mobile} />
                    </SceneContainer>
                  </div>
                ) : project.slug === 'multi-agent-pipeline-review' ? (
                  <div className="cs-arch-visual cs-arch-visual--pipeline" aria-hidden="true">
                    <SceneContainer
                      height="h-[460px] md:h-[540px]"
                      fallback={<WebGLFallback sceneName="Agent Orchestration" />}
                    >
                      <AgentOrchestration reducedMotion={reducedMotion} mobile={mobile} />
                    </SceneContainer>
                  </div>
                ) : project.slug === 'snaplogic-automations-portal' ? (
                  <div className="cs-arch-visual cs-arch-visual--pipeline" aria-hidden="true">
                    <SceneContainer
                      height="h-[420px] md:h-[500px]"
                      fallback={<WebGLFallback sceneName="Portal Architecture" />}
                    >
                      <PortalArchitecture reducedMotion={reducedMotion} mobile={mobile} />
                    </SceneContainer>
                  </div>
                ) : (
                  <div className="cs-arch-visual" aria-hidden="true">
                    <div className="cs-arch-visual-inner">
                      <div className="cs-arch-nodes">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <div key={tech} className="cs-arch-node">
                            <span className="cs-arch-node-dot" />
                            <span className="cs-arch-node-label">{tech}</span>
                          </div>
                        ))}
                      </div>
                      <p className="cs-arch-hint">
                        Architecture visualization — coming soon
                      </p>
                    </div>
                  </div>
                )}
              </Fade>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ━━━ IMPLEMENTATION ━━━ */}
      {implementationSteps.length > 0 && (
        <section
          className="cs-section cs-section--bordered"
          aria-labelledby="cs-impl-heading"
        >
          <Container>
            <AnimatedSection reducedMotion={reducedMotion}>
              <Fade reducedMotion={reducedMotion}>
                <h2 id="cs-impl-heading" className="cs-section-heading">
                  Implementation
                </h2>
              </Fade>
              <ol className="cs-steps">
                {implementationSteps.map((step, i) => (
                  <Fade key={i} reducedMotion={reducedMotion}>
                    <li className="cs-step">
                      <span className="cs-step-num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="cs-step-text">{step}</p>
                    </li>
                  </Fade>
                ))}
              </ol>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ━━━ IMPACT ━━━ */}
      {project.impact.length > 0 && (
        <section className="cs-section cs-impact-section" aria-labelledby="cs-impact-heading">
          <Container>
            <AnimatedSection reducedMotion={reducedMotion}>
              <Fade reducedMotion={reducedMotion}>
                <h2 id="cs-impact-heading" className="cs-section-heading">
                  Impact
                </h2>
              </Fade>

              {/* Metrics grid */}
              {project.metrics && project.metrics.length > 0 && (
                <Fade reducedMotion={reducedMotion}>
                  <div className="cs-metrics-grid">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="cs-metric-cell">
                        <p className="cs-metric-value">{m.value}</p>
                        <p className="cs-metric-label">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </Fade>
              )}

              {/* Before → After */}
              {beforeAfter.length > 0 && (
                <Fade reducedMotion={reducedMotion}>
                  <div className="cs-before-after-grid">
                    {beforeAfter.map((pair) => (
                      <div key={pair.label} className="cs-before-after">
                        <p className="cs-ba-label">{pair.label}</p>
                        <div className="cs-ba-row">
                          <span className="sr-only">From </span>
                          <span className="cs-ba-from">{pair.before}</span>
                          <span className="cs-ba-arrow" aria-hidden="true">→</span>
                          <span className="sr-only"> to </span>
                          <span className="cs-ba-to">{pair.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Fade>
              )}

              {/* Impact list */}
              <Fade reducedMotion={reducedMotion}>
                <ul className="cs-impact-list">
                  {project.impact.map((item, i) => (
                    <li key={i} className="cs-impact-item">
                      <span className="cs-impact-bullet" aria-hidden="true">
                        →
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Fade>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ━━━ TECHNICAL HIGHLIGHTS ━━━ */}
      {project.technicalHighlights && project.technicalHighlights.length > 0 && (
        <section className="cs-section" aria-labelledby="cs-tech-heading">
          <Container>
            <AnimatedSection reducedMotion={reducedMotion}>
              <Fade reducedMotion={reducedMotion}>
                <h2 id="cs-tech-heading" className="cs-section-heading">
                  Technical Highlights
                </h2>
              </Fade>
              <div className="cs-highlights">
                {project.technicalHighlights.map((item, i) => (
                  <Fade key={i} reducedMotion={reducedMotion}>
                    <div className="cs-highlight-item">
                      <span className="cs-highlight-marker" aria-hidden="true" />
                      <p className="cs-highlight-text">{item}</p>
                    </div>
                  </Fade>
                ))}
              </div>

              {/* Domain tags */}
              {domainTags.length > 0 && (
                <Fade reducedMotion={reducedMotion}>
                  <div className="cs-domain-tags">
                    {domainTags.map((tag) => (
                      <span key={tag} className="cs-domain-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Fade>
              )}
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ━━━ EVALUATION FRAMEWORKS ━━━ */}
      {project.evaluation && project.evaluation.length > 0 && (
        <section className="cs-section cs-section--bordered" aria-labelledby="cs-eval-heading">
          <Container>
            <AnimatedSection reducedMotion={reducedMotion}>
              <Fade reducedMotion={reducedMotion}>
                <h2 id="cs-eval-heading" className="cs-section-heading">
                  Evaluation
                </h2>
                <p className="cs-body cs-body--narrow cs-eval-note">
                  Individual framework scores — documented as part of the agent design process.
                </p>
              </Fade>
              <Fade reducedMotion={reducedMotion}>
                <div className="cs-eval-grid">
                  {project.evaluation.map((ev) => (
                    <div key={ev.framework} className="cs-eval-item">
                      <p className="cs-eval-framework">{ev.framework}</p>
                      <p className="cs-eval-score">{ev.score}</p>
                    </div>
                  ))}
                </div>
              </Fade>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ━━━ ROADMAP ━━━ */}
      {project.roadmap && (
        <section className="cs-section" aria-labelledby="cs-roadmap-heading">
          <Container>
            <AnimatedSection reducedMotion={reducedMotion}>
              <Fade reducedMotion={reducedMotion}>
                <h2 id="cs-roadmap-heading" className="cs-section-heading">
                  Roadmap
                </h2>
                <p className="cs-body cs-body--wide">{project.roadmap.summary}</p>
              </Fade>
              <Fade reducedMotion={reducedMotion}>
                <div className="cs-roadmap-stats">
                  {project.roadmap.phases && (
                    <div className="cs-roadmap-stat">
                      <p className="cs-roadmap-stat-value">{project.roadmap.phases}</p>
                      <p className="cs-roadmap-stat-label">Phases</p>
                    </div>
                  )}
                  {project.roadmap.epics && (
                    <div className="cs-roadmap-stat">
                      <p className="cs-roadmap-stat-value">{project.roadmap.epics}</p>
                      <p className="cs-roadmap-stat-label">Epics</p>
                    </div>
                  )}
                  {project.roadmap.stories && (
                    <div className="cs-roadmap-stat">
                      <p className="cs-roadmap-stat-value">{project.roadmap.stories}</p>
                      <p className="cs-roadmap-stat-label">User Stories</p>
                    </div>
                  )}
                </div>
              </Fade>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ━━━ DEVELOPMENT APPROACH ━━━ */}
      {project.developmentApproach && (
        <section className="cs-section cs-section--bordered" aria-labelledby="cs-dev-heading">
          <Container>
            <AnimatedSection reducedMotion={reducedMotion}>
              <Fade reducedMotion={reducedMotion}>
                <h2 id="cs-dev-heading" className="cs-section-heading">
                  Development Approach
                </h2>
                <p className="cs-body cs-body--wide">{project.developmentApproach}</p>
              </Fade>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ━━━ NAVIGATION ━━━ */}
      <nav className="cs-nav" aria-label="Case study navigation">
        <Container>
          <div className="cs-nav-inner">
            {prev ? (
              <Link href={`/work/${prev.slug}`} className="cs-nav-link cs-nav-link--prev">
                <ChevronLeft size={16} aria-hidden="true" />
                <div>
                  <span className="cs-nav-dir">Previous</span>
                  <span className="cs-nav-title">{prev.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link href="/work" className="cs-nav-center">
              All Work
            </Link>

            {next ? (
              <Link href={`/work/${next.slug}`} className="cs-nav-link cs-nav-link--next">
                <div>
                  <span className="cs-nav-dir">Next</span>
                  <span className="cs-nav-title">{next.title}</span>
                </div>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </nav>
    </article>
  )
}
