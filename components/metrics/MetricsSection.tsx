'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { useReducedMotion } from '@/lib/hooks'

/* ─── Impact metric data ─── */

interface ImpactMetric {
  value: string
  label: string
  project: string
  emphasis: 'primary' | 'secondary'
  before?: string
  after?: string
}

const PRIMARY_METRICS: ImpactMetric[] = [
  {
    value: '66%',
    label: 'Snap Reduction',
    project: 'FW_Flex Pipeline Redesign',
    emphasis: 'primary',
    before: '278 snaps',
    after: '94 snaps',
  },
  {
    value: '4–10×',
    label: 'Query Performance',
    project: 'PC → CC Migration',
    emphasis: 'primary',
    before: '2–5s latency',
    after: '<500ms',
  },
  {
    value: '99.95%',
    label: 'Platform Uptime',
    project: 'SnapLogic Automations Portal',
    emphasis: 'primary',
  },
]

const SECONDARY_METRICS: ImpactMetric[] = [
  {
    value: '10–80×',
    label: 'Cost Reduction',
    project: 'BigQuery Migration',
    emphasis: 'secondary',
  },
  {
    value: '~40% → <5%',
    label: 'Corpus Inconsistency',
    project: 'RAG Corpus Optimization',
    emphasis: 'secondary',
    before: '~40% variance',
    after: '<5% inconsistency',
  },
  {
    value: '<60 min',
    label: 'Incident Resolution',
    project: 'Critical Incident Response',
    emphasis: 'secondary',
  },
  {
    value: '100+',
    label: 'Platform Users',
    project: 'Automations Portal',
    emphasis: 'secondary',
  },
]

/* ─── Animation config ─── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

/* ─── Primary metric card ─── */

function PrimaryMetric({ metric, reducedMotion }: { metric: ImpactMetric; reducedMotion: boolean }) {
  const Wrapper = reducedMotion ? 'div' : motion.div

  return (
    <Wrapper
      {...(!reducedMotion ? { variants: itemVariants } : {})}
      className="group"
    >
      <div className="impact-metric impact-metric--primary">
        <p className="impact-value impact-value--lg">{metric.value}</p>
        <p className="impact-label">{metric.label}</p>
        <p className="impact-project">{metric.project}</p>

        {metric.before && metric.after && (
          <div className="impact-transform">
            <span className="sr-only">From </span>
            <span className="impact-transform-from">{metric.before}</span>
            <span className="impact-transform-arrow" aria-hidden="true">→</span>
            <span className="sr-only"> to </span>
            <span className="impact-transform-to">{metric.after}</span>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

/* ─── Secondary metric card ─── */

function SecondaryMetric({ metric, reducedMotion }: { metric: ImpactMetric; reducedMotion: boolean }) {
  const Wrapper = reducedMotion ? 'div' : motion.div

  return (
    <Wrapper
      {...(!reducedMotion ? { variants: itemVariants } : {})}
    >
      <div className="impact-metric impact-metric--secondary">
        <p className="impact-value impact-value--md">{metric.value}</p>
        <p className="impact-label">{metric.label}</p>
        <p className="impact-project">{metric.project}</p>

        {metric.before && metric.after && (
          <div className="impact-transform impact-transform--compact">
            <span className="sr-only">From </span>
            <span className="impact-transform-from">{metric.before}</span>
            <span className="impact-transform-arrow" aria-hidden="true">→</span>
            <span className="sr-only"> to </span>
            <span className="impact-transform-to">{metric.after}</span>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

/* ─── Exported section ─── */

export function MetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  const MotionContainer = reducedMotion ? 'div' : motion.div

  return (
    <Section id="impact" className="border-b border-border">
      <Container>
        <div ref={sectionRef}>
          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <p className="text-caption mb-4 text-muted tracking-widest">Impact</p>
            <h2 className="text-heading-1 text-foreground">Measurable Results</h2>
            <p className="text-body-lg mt-4 text-muted">
              Verified engineering impact from enterprise initiatives — infrastructure
              reduction, performance optimization, and platform delivery at Palo Alto Networks.
            </p>
          </div>

          {/* ─── Primary metrics row ─── */}
          <MotionContainer
            {...(!reducedMotion ? {
              variants: containerVariants,
              initial: 'hidden',
              animate: isInView ? 'visible' : 'hidden',
            } : {})}
            className="impact-grid-primary"
          >
            {PRIMARY_METRICS.map((metric) => (
              <PrimaryMetric
                key={metric.label}
                metric={metric}
                reducedMotion={reducedMotion}
              />
            ))}
          </MotionContainer>

          {/* Structural divider */}
          <div className="impact-divider" />

          {/* ─── Secondary metrics row ─── */}
          <MotionContainer
            {...(!reducedMotion ? {
              variants: containerVariants,
              initial: 'hidden',
              animate: isInView ? 'visible' : 'hidden',
            } : {})}
            className="impact-grid-secondary"
          >
            {SECONDARY_METRICS.map((metric) => (
              <SecondaryMetric
                key={metric.label}
                metric={metric}
                reducedMotion={reducedMotion}
              />
            ))}
          </MotionContainer>
        </div>
      </Container>
    </Section>
  )
}
