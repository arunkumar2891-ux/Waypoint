'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, Section } from '@/components/ui'
import { useReducedMotion } from '@/lib/hooks'
import { profile } from '@/content/profile'
import { ArrowRight, Mail, ExternalLink, GitFork, MapPin } from 'lucide-react'

/* ─── Animation ─── */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
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

/* ─── Social links from profile ─── */

const secondaryLinks = [
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    icon: ExternalLink,
  },
  {
    label: 'GitHub',
    href: profile.github,
    icon: GitFork,
  },
]

/* ─── Exported section ─── */

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const MotionWrap = reducedMotion ? 'div' : motion.div

  return (
    <Section className="cta-section" id="contact">
      <Container>
        {/* Architectural grid motif — CSS only */}
        <div className="cta-grid-motif" aria-hidden="true">
          <span /><span /><span /><span />
        </div>

        <div ref={sectionRef} className="cta-inner">
          <MotionWrap
            {...(!reducedMotion
              ? {
                  variants: stagger,
                  initial: 'hidden',
                  animate: isInView ? 'visible' : 'hidden',
                }
              : {})}
          >
            {/* Eyebrow */}
            <Fade reducedMotion={reducedMotion}>
              <p className="cta-eyebrow">Contact</p>
            </Fade>

            {/* Headline */}
            <Fade reducedMotion={reducedMotion}>
              <h2 className="cta-headline">
                The Architecture Continues
              </h2>
            </Fade>

            {/* Supporting copy */}
            <Fade reducedMotion={reducedMotion}>
              <p className="cta-copy">
                Conversations about enterprise integration, platform
                architecture, GenAI engineering, or product development are
                welcome.
              </p>
            </Fade>

            {/* Primary CTA */}
            <Fade reducedMotion={reducedMotion} className="cta-primary-wrap">
              <a
                href={`mailto:${profile.email}`}
                className="cta-primary"
              >
                <Mail size={18} aria-hidden="true" />
                <span>{profile.email}</span>
                <ArrowRight size={16} className="cta-arrow" aria-hidden="true" />
              </a>
            </Fade>

            <hr className="cta-rule" />

            {/* Secondary links */}
            <Fade reducedMotion={reducedMotion}>
              <div className="cta-secondary">
                {secondaryLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-link"
                  >
                    <link.icon size={16} aria-hidden="true" />
                    {link.label}
                  </a>
                ))}
              </div>
            </Fade>

            {/* Metadata line */}
            <Fade reducedMotion={reducedMotion}>
              <p className="cta-meta">
                <MapPin size={13} aria-hidden="true" />
                <span>{profile.location}</span>
                <span className="cta-meta-sep" aria-hidden="true">·</span>
                <span>{profile.title}</span>
              </p>
            </Fade>
          </MotionWrap>
        </div>
      </Container>
    </Section>
  )
}
