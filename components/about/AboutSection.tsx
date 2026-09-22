'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { useReducedMotion } from '@/lib/hooks'
import { profile } from '@/content/profile'

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
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
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

/* ─── Exported section ─── */

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const MotionWrap = reducedMotion ? 'div' : motion.div

  return (
    <Section id="about">
      <Container>
        <div ref={sectionRef}>
          <MotionWrap
            {...(!reducedMotion
              ? {
                  variants: stagger,
                  initial: 'hidden',
                  animate: isInView ? 'visible' : 'hidden',
                }
              : {})}
          >
            {/* Eyebrow + heading */}
            <Fade reducedMotion={reducedMotion}>
              <p className="text-caption mb-4 text-muted tracking-widest">
                About
              </p>
            </Fade>

            <Fade reducedMotion={reducedMotion}>
              <h2 className="abt-heading">
                Enterprise Systems Meet Modern Engineering
              </h2>
            </Fade>

            {/* Lead paragraph — grounded in profile.summary */}
            <Fade reducedMotion={reducedMotion}>
              <p className="abt-lead">
                {profile.summary}
              </p>
            </Fade>

            <hr className="abt-rule" />

            {/* Two-column narrative */}
            <div className="abt-columns">
              <Fade reducedMotion={reducedMotion} className="abt-col">
                <h3 className="abt-col-heading">Enterprise Systems</h3>
                <p className="abt-col-body">
                  Nine years of integration architecture across SnapLogic and
                  Dell Boomi — designing pipeline frameworks, event-driven
                  patterns, and data migration strategies for enterprise
                  platforms. Cloud and platform engineering on Google Cloud
                  Platform: BigQuery, Kubernetes, Pub/Sub, Vault, and
                  observability with Datadog and Chronosphere.
                </p>
                <p className="abt-col-body">
                  Current work at Palo Alto Networks includes architecture
                  standardization, internal platform engineering, and building
                  production systems that serve the SnapLogic Center of
                  Excellence.
                </p>
              </Fade>

              <Fade reducedMotion={reducedMotion} className="abt-col">
                <h3 className="abt-col-heading">Products &amp; AI</h3>
                <p className="abt-col-body">
                  AI-augmented full-stack development using Vertex AI, Gemini,
                  and RAG — from conversational agents and pipeline analysis
                  tools within enterprise systems to autonomous workflows in
                  independent products. Forward Deployment Engineering:
                  translating real-world problems into working software, from
                  concept to production.
                </p>
                <p className="abt-col-body">
                  Personal projects — CareerPilot AI, Cric-Scorer, Pic-Reel,
                  IPL 2026 Prediction, PlanItX — demonstrate end-to-end product
                  delivery: identifying problems, building with React and
                  TypeScript, deploying to production, and iterating with real
                  users.
                </p>
              </Fade>
            </div>

            <hr className="abt-rule" />

            {/* Closing connector */}
            <Fade reducedMotion={reducedMotion}>
              <p className="abt-close">
                Enterprise systems experience — architecture patterns, production
                reliability, scale — informs the product and AI work. Product
                experimentation — rapid delivery, user feedback, end-to-end
                ownership — informs how enterprise systems are designed and
                delivered.
              </p>
            </Fade>
          </MotionWrap>
        </div>
      </Container>
    </Section>
  )
}
