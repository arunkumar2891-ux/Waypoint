'use client'

import { lazy, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container, ButtonLink } from '@/components/ui'
import { WebGLFallback } from '@/components/three'
import { SceneContainer } from '@/components/three/primitives/SceneContainer'
import { profile } from '@/content/profile'
import { useReducedMotion, useMobile } from '@/lib/hooks'
import { MapPin, ArrowRight } from 'lucide-react'

const HeroNetwork = lazy(() => import('@/components/three/HeroNetwork'))

/* ─── Premium motion personality ─── */

const EASE = [0.25, 0.1, 0.25, 1] as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

const photoReveal = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay: 0.15 },
  },
}

const vizFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: 0.4 },
  },
}

export function HeroSection() {
  const reducedMotion = useReducedMotion()
  const mobile = useMobile()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' })

  const M = reducedMotion ? 'div' : motion.div

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Introduction"
    >
      <Container className="relative z-10 py-20 md:py-28 lg:py-32">
        <div ref={sectionRef} className="hero-intro">

          {/* ─── Left column: identity ─── */}
          <M
            className="hero-intro__text"
            {...(!reducedMotion ? {
              variants: stagger,
              initial: 'hidden',
              animate: isInView ? 'visible' : 'hidden',
            } : {})}
          >
            <M {...(!reducedMotion ? { variants: fadeUp } : {})}>
              <p className="text-caption mb-4 text-muted tracking-widest">
                Portfolio
              </p>
            </M>

            <M {...(!reducedMotion ? { variants: fadeUp } : {})}>
              <h1 className="text-display mb-5">
                {profile.name}
              </h1>
            </M>

            <M {...(!reducedMotion ? { variants: fadeUp } : {})}>
              <p className="text-body-lg text-muted mb-3 leading-relaxed">
                {profile.title}
              </p>
            </M>

            <M {...(!reducedMotion ? { variants: fadeUp } : {})}>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-10">
                <MapPin size={14} aria-hidden="true" />
                {profile.location}
              </p>
            </M>

            <M {...(!reducedMotion ? { variants: fadeUp } : {})}>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/work" variant="primary">
                  View Work
                  <ArrowRight size={16} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Get in Touch
                </ButtonLink>
              </div>
            </M>
          </M>

          {/* ─── Right column: photo ─── */}
          <M
            className="hero-intro__photo-wrap"
            {...(!reducedMotion ? {
              variants: photoReveal,
              initial: 'hidden',
              animate: isInView ? 'visible' : 'hidden',
            } : {})}
          >
            <div className="hero-intro__photo-frame">
              <Image
                src="/arun-v2.png"
                alt="Arunkumar JS"
                width={400}
                height={400}
                priority
                className="hero-intro__photo"
              />
              {/* Architectural accent — yellow corner mark */}
              <span className="hero-intro__photo-accent" aria-hidden="true" />
            </div>
          </M>

        </div>

        {/* ─── Architecture visualization (full width below) ─── */}
        <M
          className="hero-viz-wrapper"
          aria-hidden="true"
          {...(!reducedMotion ? {
            variants: vizFadeIn,
            initial: 'hidden',
            animate: isInView ? 'visible' : 'hidden',
          } : {})}
        >
          <SceneContainer
            height="h-[280px] md:h-[360px] lg:h-[420px]"
            fallback={
              <WebGLFallback sceneName="Architecture Network" />
            }
          >
            <HeroNetwork reducedMotion={reducedMotion} mobile={mobile} />
          </SceneContainer>
        </M>
      </Container>

      {/* Subtle bottom border to separate hero from metrics */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  )
}
