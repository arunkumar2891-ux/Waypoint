'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { useReducedMotion } from '@/lib/hooks'
import { careerTimeline } from '@/content/profile'

/* ─── Animation ─── */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

/* ─── Extract a short year label from the period string ─── */

function yearLabel(period: string): string {
  const match = period.match(/\b(\d{4})\b/)
  return match ? match[1] : ''
}

/* ─── Stage component ─── */

function TimelineStage({
  position,
  index,
  total,
  reducedMotion,
}: {
  position: (typeof careerTimeline)[number]
  index: number
  total: number
  reducedMotion: boolean
}) {
  const isLast = index === total - 1
  const isEven = index % 2 === 0
  const Wrapper = reducedMotion ? 'div' : motion.div

  return (
    <Wrapper
      {...(!reducedMotion ? { variants: fadeUp } : {})}
      className="cev-stage"
    >
      {/* Timeline spine — marker + connector */}
      <div className="cev-spine" aria-hidden="true">
        <span
          className={`cev-marker ${position.current ? 'cev-marker--active' : ''}`}
        />
        {!isLast && <span className="cev-connector" />}
      </div>

      {/* Content card */}
      <div
        className={`cev-content ${isEven ? 'cev-content--left' : 'cev-content--right'}`}
      >
        {/* Period */}
        <time className="cev-period" dateTime={yearLabel(position.period)}>
          {position.period}
        </time>

        {/* Company + title */}
        <h3 className="cev-company">{position.company}</h3>
        <p className="cev-title">{position.title}</p>
        {position.location && (
          <p className="cev-location">{position.location}</p>
        )}

        {/* Description */}
        <p className="cev-desc">{position.description}</p>
      </div>
    </Wrapper>
  )
}

/* ─── Exported section ─── */

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const MotionWrap = reducedMotion ? 'div' : motion.div

  /* Reverse so oldest is first (bottom-up chronology displayed top-down) */
  const positions = [...careerTimeline].reverse()

  return (
    <Section id="career" className="bg-surface-subtle border-y border-border">
      <Container>
        <div ref={sectionRef}>
          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <p className="text-caption mb-4 text-muted tracking-widest">
              Career Evolution
            </p>
            <h2 className="text-heading-1 text-foreground">
              From Integration to Autonomous Systems
            </h2>
            <p className="text-body-lg mt-4 text-muted">
              A decade of progression through enterprise integration, cloud
              architecture, platform engineering, and AI-augmented development.
            </p>
          </div>

          {/* Timeline */}
          <MotionWrap
            {...(!reducedMotion
              ? {
                  variants: stagger,
                  initial: 'hidden',
                  animate: isInView ? 'visible' : 'hidden',
                }
              : {})}
            className="cev-timeline"
            role="list"
            aria-label="Career timeline"
          >
            {positions.map((position, i) => (
              <div
                key={`${position.company}-${position.period}`}
                role="listitem"
              >
                <TimelineStage
                  position={position}
                  index={i}
                  total={positions.length}
                  reducedMotion={reducedMotion}
                />
              </div>
            ))}
          </MotionWrap>
        </div>
      </Container>
    </Section>
  )
}
