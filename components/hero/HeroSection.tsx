'use client'

import { lazy } from 'react'
import { Container, ButtonLink } from '@/components/ui'
import { WebGLFallback } from '@/components/three'
import { SceneContainer } from '@/components/three/primitives/SceneContainer'
import { profile } from '@/content/profile'
import { useReducedMotion, useMobile } from '@/lib/hooks'
import { MapPin, ArrowRight } from 'lucide-react'

const HeroNetwork = lazy(() => import('@/components/three/HeroNetwork'))

export function HeroSection() {
  const reducedMotion = useReducedMotion()
  const mobile = useMobile()

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Introduction"
    >
      <Container className="relative z-10 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

          {/* ─── Left column: identity ─── */}
          <div className="lg:col-span-5 xl:col-span-5">
            <p className="text-caption mb-4 text-muted tracking-widest">
              Portfolio
            </p>

            <h1 className="text-display mb-5">
              {profile.name}
            </h1>

            <p className="text-body-lg text-muted mb-3 leading-relaxed">
              {profile.title}
            </p>

            <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-10">
              <MapPin size={14} aria-hidden="true" />
              {profile.location}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/work" variant="primary">
                View Work
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in Touch
              </ButtonLink>
            </div>
          </div>

          {/* ─── Right column: architecture visualization ─── */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="hero-viz-wrapper" aria-hidden="true">
              <SceneContainer
                height="h-[320px] md:h-[420px] lg:h-[520px]"
                fallback={
                  <WebGLFallback sceneName="Architecture Network" />
                }
              >
                <HeroNetwork reducedMotion={reducedMotion} mobile={mobile} />
              </SceneContainer>
            </div>
          </div>

        </div>
      </Container>

      {/* Subtle bottom border to separate hero from metrics */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  )
}
