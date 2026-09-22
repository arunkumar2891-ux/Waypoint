'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { SceneProps } from '@/lib/types'

/* ──────────────────────────────────────────────────────────
   Documented CareerPilot AI — 18-step daily execution flow:

   Scheduled Trigger (7 AM)
     → Google Docs Sync
     → LinkedIn Query
     → Apify Scraping
     → Polling / Parsing / Dedup
     → Job Persistence
     → Match Score Qualification (≥80)
     → Gemini ATS Enhancement
     → LaTeX Rendering
     → PDF Conversion
     → Cloud Storage Upload
     → Email Dispatch (Resend/Gmail)

   Supporting infrastructure:
     - Gemini 3.6 Flash (primary) + Groq (fallback)
     - 12 Supabase Edge Functions
     - 28-node stateful graph execution framework

   Only documented pipeline steps. No invented services.

   LAYOUT — 3-column horizontal flow:
     LEFT: Discovery (trigger → sync → scrape → parse)
     CENTER: Processing (qualify → enhance → render → convert)
     RIGHT: Delivery (upload → dispatch)
   ────────────────────────────────────────────────────────── */

interface FlowNode {
  id: string
  label: string
  desktop: [number, number, number]
  mobile: [number, number, number]
  phase: 'discovery' | 'processing' | 'delivery'
  primary?: boolean
  accent?: boolean
  driftPhase: number
}

interface FlowEdge {
  from: string
  to: string
  qualifier?: boolean
}

/* ─── Layout: 3-column horizontal, top-to-bottom within columns ─── */

const NODES: FlowNode[] = [
  /* LEFT — Discovery */
  {
    id: 'trigger', label: 'Scheduled Trigger', phase: 'discovery', primary: true,
    desktop: [-2.6, 1.1, 0],   mobile: [0, 2.3, 0],
    driftPhase: 0,
  },
  {
    id: 'sync', label: 'Docs Sync', phase: 'discovery',
    desktop: [-2.6, 0.3, 0],   mobile: [0, 1.75, 0],
    driftPhase: 0.5,
  },
  {
    id: 'scrape', label: 'Apify Scrape', phase: 'discovery',
    desktop: [-2.6, -0.5, 0],  mobile: [0, 1.2, 0],
    driftPhase: 1.0,
  },
  {
    id: 'parse', label: 'Parse / Dedup', phase: 'discovery',
    desktop: [-2.6, -1.3, 0],  mobile: [0, 0.65, 0],
    driftPhase: 1.5,
  },

  /* CENTER — Processing */
  {
    id: 'qualify', label: 'Match Score', phase: 'processing', accent: true,
    desktop: [0, 0.9, 0],      mobile: [0, 0.05, 0],
    driftPhase: 2.0,
  },
  {
    id: 'enhance', label: 'Gemini ATS', phase: 'processing', accent: true,
    desktop: [0, 0.1, 0],      mobile: [0, -0.5, 0],
    driftPhase: 2.5,
  },
  {
    id: 'latex', label: 'LaTeX Render', phase: 'processing',
    desktop: [0, -0.7, 0],     mobile: [0, -1.05, 0],
    driftPhase: 3.0,
  },
  {
    id: 'pdf', label: 'PDF Convert', phase: 'processing',
    desktop: [0, -1.3, 0],     mobile: [0, -1.6, 0],
    driftPhase: 3.5,
  },

  /* RIGHT — Delivery */
  {
    id: 'upload', label: 'Cloud Upload', phase: 'delivery',
    desktop: [2.6, 0.4, 0],    mobile: [0, -2.15, 0],
    driftPhase: 4.0,
  },
  {
    id: 'dispatch', label: 'Email Dispatch', phase: 'delivery', primary: true,
    desktop: [2.6, -0.4, 0],   mobile: [0, -2.7, 0],
    driftPhase: 4.5,
  },
]

const EDGES: FlowEdge[] = [
  /* Discovery chain */
  { from: 'trigger', to: 'sync' },
  { from: 'sync',    to: 'scrape' },
  { from: 'scrape',  to: 'parse' },
  /* Discovery → Processing bridge */
  { from: 'parse',   to: 'qualify', qualifier: true },
  /* Processing chain */
  { from: 'qualify',  to: 'enhance' },
  { from: 'enhance',  to: 'latex' },
  { from: 'latex',    to: 'pdf' },
  /* Processing → Delivery bridge */
  { from: 'pdf',     to: 'upload' },
  /* Delivery chain */
  { from: 'upload',  to: 'dispatch' },
]

const PRIMARY_PATH = ['trigger', 'sync', 'scrape', 'parse', 'qualify', 'enhance', 'latex', 'pdf', 'upload', 'dispatch']

/* ─── Constants ─── */
const DRIFT_SPEED = 0.06
const DRIFT_AMP   = 0.005
const PULSE_SPEED = 0.22
const PULSE_INTERVAL = 9

/* ─── Edge line ─── */

function EdgeLine({ startPos, endPos, highlight, dimmed, qualifier }: {
  startPos: THREE.Vector3
  endPos: THREE.Vector3
  highlight: boolean
  dimmed: boolean
  qualifier?: boolean
}) {
  const lineRef = useRef<THREE.Line>(null)
  const targetColor = useRef(new THREE.Color('#a3a3a3'))

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute([
      startPos.x, startPos.y, startPos.z,
      endPos.x, endPos.y, endPos.z,
    ], 3))
    const mat = new THREE.LineBasicMaterial({
      color: qualifier ? '#2563eb' : '#a3a3a3',
      transparent: true,
      opacity: qualifier ? 0.3 : 0.4,
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
    let tOpacity: number
    if (highlight) {
      tOpacity = qualifier ? 0.6 : 0.7
      targetColor.current.set(qualifier ? '#2563eb' : '#525252')
    } else if (dimmed) {
      tOpacity = 0.06
      targetColor.current.set('#d4d4d4')
    } else {
      tOpacity = qualifier ? 0.3 : 0.4
      targetColor.current.set(qualifier ? '#2563eb' : '#a3a3a3')
    }
    mat.opacity += (tOpacity - mat.opacity) * 0.08
    mat.color.lerp(targetColor.current, 0.08)
  })

  return <primitive ref={lineRef} object={lineObj} />
}

/* ─── Flow node ─── */

function FlowNodeMesh({ pos, node, hovered, connected, dimmed, onHover, onUnhover, mobile }: {
  pos: THREE.Vector3
  node: FlowNode
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
    const ts = hovered ? 1.3 : 1
    const s = meshRef.current.scale.x
    meshRef.current.scale.setScalar(s + (ts - s) * 0.08)

    let te: number
    if (hovered) te = 0.5
    else if (connected) te = 0.25
    else if (dimmed) te = 0.01
    else if (node.accent) te = 0.15
    else if (node.primary) te = 0.1
    else te = 0.06

    matRef.current.emissiveIntensity += (te - matRef.current.emissiveIntensity) * 0.08
  })

  const radius = 0.055

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
          color="#171717"
          emissive={node.accent ? '#2563eb' : '#525252'}
          emissiveIntensity={node.accent ? 0.15 : 0.06}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      <Html
        center
        distanceFactor={mobile ? 9 : 5.5}
        position={[0, -(radius + 0.12), 0]}
        style={{ pointerEvents: 'none' }}
      >
        <span
          className={`proj-3d-label${node.primary ? ' proj-3d-label--primary' : ''}${node.accent ? ' proj-3d-label--accent' : ''}${hovered ? ' proj-3d-label--active' : ''}${dimmed ? ' proj-3d-label--dimmed' : ''}`}
        >
          {node.label}
        </span>
      </Html>
    </group>
  )
}

/* ─── Pulse ─── */

function FlowPulse({ positions, active }: {
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
    mat.opacity = fade * 0.35
  })

  return (
    <mesh ref={meshRef} visible={false}>
      <sphereGeometry args={[0.028, 8, 8]} />
      <meshBasicMaterial color="#2563eb" transparent opacity={0} />
    </mesh>
  )
}

/* ─── Scene root ─── */

function WorkflowGraph({ reducedMotion, mobile }: SceneProps) {
  const clock = useRef(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const pulseTimer = useRef(0)
  const [pulseActive, setPulseActive] = useState(false)
  const isMobile = mobile ?? false

  /* Scale up to fill the wide container — camera at [0,0,5] fov 45 */
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
            qualifier={edge.qualifier}
          />
        )
      })}

      {NODES.map((node, i) => {
        const isHovered = hoveredId === node.id
        const isConnected = !isHovered && connectedIds.has(node.id)
        const isDimmed = !!hoveredId && !connectedIds.has(node.id)
        return (
          <FlowNodeMesh
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
        <FlowPulse positions={primaryPositions} active={pulseActive} />
      )}
    </group>
  )
}

export default function CareerPilotWorkflow({ reducedMotion = false, mobile = false }: SceneProps) {
  return <WorkflowGraph reducedMotion={reducedMotion} mobile={mobile} />
}
