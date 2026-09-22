'use client'

import { lazy, Suspense } from 'react'
import { useReducedMotion, useMobile } from '@/lib/hooks'
import { SceneContainer } from '@/components/three/primitives/SceneContainer'
import { WebGLFallback } from '@/components/three'

const CareerPilotWorkflow = lazy(() => import('@/components/three/CareerPilotWorkflow'))
const MediaPipeline = lazy(() => import('@/components/three/MediaPipeline'))

const VISUALIZATIONS: Record<string, {
  Component: React.LazyExoticComponent<React.ComponentType<{ reducedMotion?: boolean; mobile?: boolean }>>
  sceneName: string
  height: string
}> = {
  'careerpilot-ai': {
    Component: CareerPilotWorkflow,
    sceneName: 'Autonomous Workflow',
    height: 'h-[420px] md:h-[480px]',
  },
  'pic-reel': {
    Component: MediaPipeline,
    sceneName: 'Media Pipeline',
    height: 'h-[380px] md:h-[440px]',
  },
}

interface ProjectVisualizationProps {
  slug: string
}

export function ProjectVisualization({ slug }: ProjectVisualizationProps) {
  const reducedMotion = useReducedMotion()
  const mobile = useMobile()

  const viz = VISUALIZATIONS[slug]
  if (!viz) return null

  const { Component, sceneName, height } = viz

  return (
    <div className="proj-arch-visual" aria-hidden="true">
      <Suspense fallback={<WebGLFallback sceneName={sceneName} />}>
        <SceneContainer
          height={height}
          fallback={<WebGLFallback sceneName={sceneName} />}
        >
          <Component reducedMotion={reducedMotion} mobile={mobile} />
        </SceneContainer>
      </Suspense>
    </div>
  )
}
