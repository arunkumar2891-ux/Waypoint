'use client'

import { Suspense, useRef, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { useReducedMotion, useInView } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface SceneContainerProps {
  children: ReactNode
  className?: string
  fallback?: ReactNode
  height?: string
}

function DefaultFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-surface-subtle rounded-sm">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-border border-t-muted rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-muted">Loading visualization…</p>
      </div>
    </div>
  )
}

function ThreeFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#d4d4d4" transparent opacity={0.3} />
    </mesh>
  )
}

export function SceneContainer({
  children,
  className,
  fallback,
  height = 'h-[400px] md:h-[500px]',
}: SceneContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)
  const reducedMotion = useReducedMotion()

  return (
    <div
      ref={containerRef}
      className={cn('three-canvas-container relative w-full', height, className)}
    >
      {isInView ? (
        <Suspense fallback={fallback ?? <DefaultFallback />}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{
              antialias: !reducedMotion,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            style={{ background: 'transparent' }}
            frameloop={reducedMotion ? 'demand' : 'always'}
          >
            <ambientLight intensity={0.7} />
            <pointLight position={[5, 8, 5]} intensity={0.3} />
            <Suspense fallback={<ThreeFallback />}>
              {children}
            </Suspense>
          </Canvas>
        </Suspense>
      ) : (
        fallback ?? <DefaultFallback />
      )}
    </div>
  )
}
