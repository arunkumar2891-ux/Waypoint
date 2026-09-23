'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { SceneProps } from '@/lib/types'

/* ──────────────────────────────────────────────────────────
   Documented Quote Journey Tracker Agent pipeline:

   Layer 1 — Data / Event Input:
     Portal → Pub/Sub → Chronosphere

   Layer 2 — AI Diagnostics:
     Agent Studio → RAG Engine (Gemini 3.5 + Gemini 2.5)

   Layer 3 — Output / Operations:
     Structured JSON → Slack DM
     JIRA (failure branch only)

   Only documented components. No invented services.

   LAYOUT — Three-column horizontal architecture:
     LEFT (Input)  →  CENTER (AI)  →  RIGHT (Output)
     Uses the full wide container.
   ────────────────────────────────────────────────────────── */

/* ─── Types ─── */

interface PipeNode {
  id: string
  label: string
  /** Desktop [x, y, z] — 3-column horizontal layout */
  desktop: [number, number, number]
  /** Mobile [x, y, z] — vertical stacked layout */
  mobile: [number, number, number]
  primary?: boolean
  accent?: boolean
  secondary?: boolean
  /** Label anchor: 'below' (default) or 'right' or 'left' */
  labelAnchor?: 'below' | 'right' | 'left'
  driftPhase: number
}

interface PipeEdge {
  from: string
  to: string
  failure?: boolean
}

/* ─── Three-column layout ───
   Desktop camera at [0, 0, 5] fov 45 → visible area ≈ ±3.5 x, ±2 y
   Left column x ≈ -2.5   (Input)
   Center column x ≈ 0    (AI)
   Right column x ≈ 2.5   (Output)
─── */

const NODES: PipeNode[] = [
  /* ── Left Column: Data / Event Input ── */
  {
    id: 'portal', label: 'Portal', primary: true,
    desktop: [-2.5, 0.9, 0],   mobile: [0, 2.4, 0],
    driftPhase: 0,
  },
  {
    id: 'pubsub', label: 'Pub/Sub',
    desktop: [-2.5, 0.0, 0],   mobile: [0, 1.8, 0],
    driftPhase: 0.8,
  },
  {
    id: 'chrono', label: 'Chronosphere',
    desktop: [-2.5, -0.9, 0],  mobile: [0, 1.2, 0],
    driftPhase: 1.6,
  },

  /* ── Center Column: AI Diagnostics ── */
  {
    id: 'agent', label: 'Agent Studio', primary: true, accent: true,
    desktop: [0, 0.8, 0],      mobile: [0, 0.5, 0],
    driftPhase: 2.4,
  },
  {
    id: 'rag', label: 'RAG Engine', accent: true,
    desktop: [0, -0.1, 0],     mobile: [0, -0.15, 0],
    driftPhase: 3.0,
  },
  {
    id: 'gemini35', label: 'Gemini 3.5', secondary: true,
    desktop: [-0.7, -0.9, 0],  mobile: [-0.55, -0.75, 0],
    labelAnchor: 'below',
    driftPhase: 3.4,
  },
  {
    id: 'gemini25', label: 'Gemini 2.5', secondary: true,
    desktop: [0.7, -0.9, 0],   mobile: [0.55, -0.75, 0],
    labelAnchor: 'below',
    driftPhase: 3.8,
  },

  /* ── Right Column: Output / Operations ── */
  {
    id: 'json', label: 'Structured JSON',
    desktop: [2.5, 0.45, 0],   mobile: [0, -1.4, 0],
    driftPhase: 4.2,
  },
  {
    id: 'slack', label: 'Slack DM', primary: true,
    desktop: [2.5, -0.45, 0],  mobile: [0, -2.0, 0],
    driftPhase: 4.8,
  },

  /* ── JIRA: failure branch off Agent Studio ── */
  {
    id: 'jira', label: 'JIRA', secondary: true,
    desktop: [1.2, 1.3, 0],    mobile: [0.7, 0.5, 0],
    labelAnchor: 'right',
    driftPhase: 5.2,
  },
]

const EDGES: PipeEdge[] = [
  /* Input chain */
  { from: 'portal',  to: 'pubsub' },
  { from: 'pubsub',  to: 'chrono' },
  /* Input → AI bridge */
  { from: 'chrono',  to: 'agent' },
  /* AI chain */
  { from: 'agent',   to: 'rag' },
  { from: 'rag',     to: 'gemini35' },
  { from: 'rag',     to: 'gemini25' },
  /* AI → Output bridge */
  { from: 'rag',     to: 'json' },
  /* Output chain */
  { from: 'json',    to: 'slack' },
  /* Failure branch */
  { from: 'agent',   to: 'jira', failure: true },
]

const PRIMARY_PATH = ['portal', 'pubsub', 'chrono', 'agent', 'rag', 'json', 'slack']

/* ─── Constants ─── */
const DRIFT_SPEED = 0.07
const DRIFT_AMP   = 0.006
const NODE_RADIUS = 0.06
const NODE_RADIUS_SM = 0.045
const PULSE_SPEED = 0.28
const PULSE_INTERVAL = 7

/* ─── Edge line ─── */

function EdgeLine({ startPos, endPos, highlight, dimmed, failure }: {
  startPos: THREE.Vector3
  endPos: THREE.Vector3
  highlight: boolean
  dimmed: boolean
  failure?: boolean
}) {
  const lineRef = useRef<THREE.Line>(null)
  const targetColor = useRef(new THREE.Color('#404040'))

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute([
      startPos.x, startPos.y, startPos.z,
      endPos.x, endPos.y, endPos.z,
    ], 3))
    const mat = new THREE.LineBasicMaterial({
      color: failure ? '#525252' : '#404040',
      transparent: true,
      opacity: failure ? 0.2 : 0.4,
    })
    return new THREE.Line(geo, mat)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame(() => {
    if (!lineRef.current) return
    const posAttr = lineRef.current.geometry.attributes.position as THREE.BufferAttribute
    posAttr.setXYZ(0, startPos.x, startPos.y, startPos.z)
    posAttr.setXYZ(1, endPos.x, endPos.y, endPos.z)
    posAttr.needsUpdate = true

    const mat = lineRef.current.material as THREE.LineBasicMaterial
    let targetOpacity: number
    if (highlight) {
      targetOpacity = failure ? 0.4 : 0.7
      targetColor.current.set(failure ? '#404040' : '#2A2A2A')
    } else if (dimmed) {
      targetOpacity = 0.08
      targetColor.current.set('#525252')
    } else {
      targetOpacity = failure ? 0.2 : 0.4
      targetColor.current.set(failure ? '#525252' : '#404040')
    }
    mat.opacity += (targetOpacity - mat.opacity) * 0.08
    mat.color.lerp(targetColor.current, 0.08)
  })

  return <primitive ref={lineRef} object={lineObj} />
}

/* ─── Pipeline node ─── */

function PipeNodeMesh({ pos, node, hovered, connected, dimmed, onHover, onUnhover, mobile }: {
  pos: THREE.Vector3
  node: PipeNode
  hovered: boolean
  connected: boolean
  dimmed: boolean
  onHover: () => void
  onUnhover: () => void
  mobile: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame(() => {
    if (!meshRef.current || !matRef.current) return
    const targetScale = hovered ? 1.3 : 1
    const s = meshRef.current.scale.x
    meshRef.current.scale.setScalar(s + (targetScale - s) * 0.08)

    let targetEmissive: number
    if (hovered) targetEmissive = 0.5
    else if (connected) targetEmissive = 0.25
    else if (dimmed) targetEmissive = 0.01
    else if (node.accent) targetEmissive = 0.15
    else if (node.primary) targetEmissive = 0.1
    else if (node.secondary) targetEmissive = 0.04
    else targetEmissive = 0.06

    matRef.current.emissiveIntensity += (targetEmissive - matRef.current.emissiveIntensity) * 0.08
  })

  const radius = node.secondary ? NODE_RADIUS_SM : NODE_RADIUS
  const anchor = node.labelAnchor ?? 'below'

  const labelPos: [number, number, number] = anchor === 'right'
    ? [radius + 0.12, 0, 0]
    : anchor === 'left'
      ? [-(radius + 0.12), 0, 0]
      : [0, -(radius + 0.1), 0]

  return (
    <group position={pos}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover() }}
        onPointerOut={onUnhover}
      >
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial
          ref={matRef}
          color="#1A1A1A"
          emissive={node.accent ? '#F2C94C' : '#2A2A2A'}
          emissiveIntensity={node.accent ? 0.15 : 0.06}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      <Html
        center
        distanceFactor={mobile ? 8.5 : 5.5}
        position={labelPos}
        style={{ pointerEvents: 'none' }}
      >
        <span
          className={`pipe-3d-label${node.primary ? ' pipe-3d-label--primary' : ''}${node.accent ? ' pipe-3d-label--accent' : ''}${node.secondary ? ' pipe-3d-label--secondary' : ''}${hovered ? ' pipe-3d-label--active' : ''}${dimmed ? ' pipe-3d-label--dimmed' : ''}`}
        >
          {node.label}
        </span>
      </Html>
    </group>
  )
}

/* ─── Pulse along primary path ─── */

function PathPulse({ positions, active }: {
  positions: THREE.Vector3[]
  active: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const progress = useRef(0)

  useFrame((_, delta) => {
    if (!meshRef.current || !active) {
      if (meshRef.current) meshRef.current.visible = false
      return
    }
    meshRef.current.visible = true
    progress.current += delta * PULSE_SPEED

    if (progress.current >= positions.length - 1) {
      progress.current = 0
    }

    const segIdx = Math.floor(progress.current)
    const t = progress.current - segIdx
    const a = positions[segIdx]
    const b = positions[Math.min(segIdx + 1, positions.length - 1)]

    meshRef.current.position.lerpVectors(a, b, t)

    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    const fade = Math.sin(progress.current / (positions.length - 1) * Math.PI)
    mat.opacity = fade * 0.4
  })

  return (
    <mesh ref={meshRef} visible={false}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#F2C94C" transparent opacity={0} />
    </mesh>
  )
}

/* ─── Scene root ─── */

function PipelineGraph({ reducedMotion, mobile }: SceneProps) {
  const clock = useRef(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const pulseTimer = useRef(0)
  const [pulseActive, setPulseActive] = useState(false)

  const isMobile = mobile ?? false

  /* Scale up to fill wide container — camera at [0,0,5] fov 45 */
  const sceneScale = isMobile ? 1.1 : 1.35

  const livePositions = useMemo(() =>
    NODES.map((n) => {
      const b = isMobile ? n.mobile : n.desktop
      return new THREE.Vector3(b[0], b[1], b[2])
    }),
  [isMobile])

  const posMap = useMemo(() => {
    const map = new Map<string, THREE.Vector3>()
    NODES.forEach((n, i) => map.set(n.id, livePositions[i]))
    return map
  }, [livePositions])

  const primaryPositions = useMemo(() =>
    PRIMARY_PATH.map((id) => posMap.get(id)!),
  [posMap])

  useFrame((_, delta) => {
    if (reducedMotion) return
    clock.current += delta

    NODES.forEach((node, i) => {
      const b = isMobile ? node.mobile : node.desktop
      const t = clock.current * DRIFT_SPEED + node.driftPhase
      livePositions[i].x = b[0] + Math.sin(t * 0.9) * DRIFT_AMP
      livePositions[i].y = b[1] + Math.cos(t * 0.7) * DRIFT_AMP * 0.6
      livePositions[i].z = b[2] + Math.sin(t * 1.1 + 1) * DRIFT_AMP * 0.3
    })

    pulseTimer.current += delta
    if (pulseTimer.current >= PULSE_INTERVAL) {
      pulseTimer.current = 0
      if (!pulseActive) setPulseActive(true)
    }
  })

  const handleHover = useCallback((id: string) => setHoveredId(id), [])
  const handleUnhover = useCallback(() => setHoveredId(null), [])

  const connectedIds = useMemo(() => {
    if (!hoveredId) return new Set<string>()
    const set = new Set<string>()
    set.add(hoveredId)
    EDGES.forEach((e) => {
      if (e.from === hoveredId) set.add(e.to)
      if (e.to === hoveredId) set.add(e.from)
    })
    return set
  }, [hoveredId])

  const getEdgeState = useCallback((from: string, to: string) => {
    if (!hoveredId) return { highlight: false, dimmed: false }
    const touches = connectedIds.has(from) && connectedIds.has(to)
    return { highlight: touches, dimmed: !touches }
  }, [hoveredId, connectedIds])

  return (
    <group scale={sceneScale}>
      {EDGES.map((edge) => {
        const start = posMap.get(edge.from)!
        const end = posMap.get(edge.to)!
        const { highlight, dimmed } = getEdgeState(edge.from, edge.to)
        return (
          <EdgeLine
            key={`e-${edge.from}-${edge.to}`}
            startPos={start}
            endPos={end}
            highlight={highlight}
            dimmed={dimmed}
            failure={edge.failure}
          />
        )
      })}

      {NODES.map((node, i) => {
        const isHovered = hoveredId === node.id
        const isConnected = !isHovered && connectedIds.has(node.id)
        const isDimmed = !!hoveredId && !connectedIds.has(node.id)
        return (
          <PipeNodeMesh
            key={node.id}
            pos={livePositions[i]}
            node={node}
            hovered={isHovered}
            connected={isConnected}
            dimmed={isDimmed}
            onHover={() => handleHover(node.id)}
            onUnhover={handleUnhover}
            mobile={isMobile}
          />
        )
      })}

      {!reducedMotion && (
        <PathPulse positions={primaryPositions} active={pulseActive} />
      )}
    </group>
  )
}

export default function DiagnosticPipeline({ reducedMotion = false, mobile = false }: SceneProps) {
  return <PipelineGraph reducedMotion={reducedMotion} mobile={mobile} />
}
