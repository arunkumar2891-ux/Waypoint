'use client'

import { lazy, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { useReducedMotion, useMobile } from '@/lib/hooks'
import { skillCategories } from '@/content/profile'
import { SceneContainer } from '@/components/three/primitives/SceneContainer'
import { WebGLFallback } from '@/components/three'

const SkillsConstellation = lazy(() => import('@/components/three/SkillsConstellation'))

/* ─── Capability domain metadata ───
   Maps each content/profile.ts category to an expanded domain label,
   a one-line description sourced from the resume, and evidence links
   (project names only — not clickable, just contextual). */

interface CapabilityDomain {
  /** Key matching skillCategories[].name */
  key: string
  /** Display heading */
  label: string
  /** Concise description — derived from resume competencies */
  description: string
  /** Project/work evidence — names only, sourced from resume */
  evidence: string[]
}

const DOMAINS: CapabilityDomain[] = [
  {
    key: 'Integration',
    label: 'Integration & Architecture',
    description:
      'Enterprise integration architecture, iPaaS pipeline design, event-driven patterns, and API-first system design.',
    evidence: [
      'FW_Flex Pipeline Redesign',
      'Automations Portal',
      'PC → CC Migration',
    ],
  },
  {
    key: 'Cloud',
    label: 'Cloud & Platform',
    description:
      'Google Cloud Platform services, Kubernetes orchestration, secrets management, and multi-environment deployment.',
    evidence: [
      'Automations Portal',
      'PC → CC Migration',
      'Quote Journey Tracker Agent',
      'Multi-Agent Pipeline Review',
    ],
  },
  {
    key: 'Data',
    label: 'Data & Analytics',
    description:
      'BigQuery schema design, query optimization, data modeling, and migration architecture for enterprise data pipelines.',
    evidence: [
      'PC → CC Migration',
      'Automations Portal',
    ],
  },
  {
    key: 'GenAI',
    label: 'GenAI / AI Engineering',
    description:
      'Vertex AI and Gemini integration, RAG corpus optimization, AI agent development, and prompt engineering.',
    evidence: [
      'Automations Portal',
      'RAG Corpus Optimization',
      'Quote Journey Tracker Agent',
      'Multi-Agent Pipeline Review',
      'CareerPilot AI',
    ],
  },
  {
    key: 'Full Stack',
    label: 'Full-Stack Engineering',
    description:
      'React and TypeScript frontends, Node.js backends, real-time interfaces, and end-to-end application delivery.',
    evidence: [
      'Automations Portal',
      'CareerPilot AI',
      'Pic-Reel',
      'Cric-Scorer',
      'PlanItX',
    ],
  },
  {
    key: 'DevOps',
    label: 'DevOps & Observability',
    description:
      'Container orchestration, CI/CD pipelines, monitoring and alerting, and infrastructure-as-code.',
    evidence: [
      'Automations Portal',
      'Critical Incident Response',
    ],
  },
]

/* ─── Animation ─── */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

/* ─── Domain row ─── */

function DomainRow({
  domain,
  skills,
  reducedMotion,
}: {
  domain: CapabilityDomain
  skills: string[]
  reducedMotion: boolean
}) {
  const Wrapper = reducedMotion ? 'div' : motion.div

  return (
    <Wrapper
      {...(!reducedMotion ? { variants: fadeUp } : {})}
      className="cap-domain group"
    >
      <div className="cap-domain-inner">
        {/* Left: heading + description */}
        <div className="cap-domain-head">
          <h3 className="cap-domain-label">{domain.label}</h3>
          <p className="cap-domain-desc">{domain.description}</p>
        </div>

        {/* Right: technologies + evidence */}
        <div className="cap-domain-body">
          <p className="cap-tech-list">
            {skills.map((skill, i) => (
              <span key={skill}>
                <span className="cap-tech">{skill}</span>
                {i < skills.length - 1 && (
                  <span className="cap-tech-sep" aria-hidden="true"> · </span>
                )}
              </span>
            ))}
          </p>

          {domain.evidence.length > 0 && (
            <p className="cap-evidence">
              {domain.evidence.map((name, i) => (
                <span key={name}>
                  <span className="cap-evidence-name">{name}</span>
                  {i < domain.evidence.length - 1 && (
                    <span className="cap-evidence-sep" aria-hidden="true"> · </span>
                  )}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

/* ─── Exported section ─── */

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const mobile = useMobile()
  const MotionWrap = reducedMotion ? 'div' : motion.div

  return (
    <Section id="capabilities" className="bg-surface-subtle border-y border-border">
      <Container>
        <div ref={sectionRef}>
          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <p className="text-caption mb-4 text-muted tracking-widest">
              Capabilities
            </p>
            <h2 className="text-heading-1 text-foreground">
              Engineering Across the Stack
            </h2>
            <p className="text-body-lg mt-4 text-muted">
              Integration architecture, cloud platforms, data engineering,
              generative AI, and full-stack product delivery — built across
              10+ years of enterprise and independent work.
            </p>
          </div>

          {/* Relationship constellation — decorative */}
          <div className="cap-viz" aria-hidden="true">
            <SceneContainer
              height="h-[260px] md:h-[320px]"
              fallback={
                <WebGLFallback sceneName="Capability Constellation" />
              }
            >
              <SkillsConstellation reducedMotion={reducedMotion} mobile={mobile} />
            </SceneContainer>
          </div>

          {/* HTML domain rows — authoritative content */}
          <MotionWrap
            {...(!reducedMotion
              ? {
                  variants: stagger,
                  initial: 'hidden',
                  animate: isInView ? 'visible' : 'hidden',
                }
              : {})}
            className="cap-grid"
          >
            {DOMAINS.map((domain) => {
              const cat = skillCategories.find((c) => c.name === domain.key)
              if (!cat) return null
              return (
                <DomainRow
                  key={domain.key}
                  domain={domain}
                  skills={cat.skills}
                  reducedMotion={reducedMotion}
                />
              )
            })}
          </MotionWrap>
        </div>
      </Container>
    </Section>
  )
}
