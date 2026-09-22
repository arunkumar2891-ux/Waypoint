'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { SceneProps } from '@/lib/types'

/* ──────────────────────────────────────────────────────────
   Documented Multi-Agent Pipeline Review architecture:

   Root LlmAgent
     → SequentialAgent
       → ParallelAgent (6 concurrent)
         ├─ Naming (9 rules)
         ├─ Best Practices (6 rules)
         ├─ Error Handling (5 rules)
         ├─ Performance (8 rules)
         ├─ Review Conditions (8 critical + 18 warning)
         └─ Security (1 rule)
       → Consolidator LlmAgent
     → Structured JSON

   Only documented agents. No invented components.

   LAYOUT — vertical spine with wide horizontal fan-out:
     Camera [0, 0, 5] fov 45 → visible ≈ ±3.5 x, ±2 y
     Top spine: Root → Sequential → Parallel
     Fan-out: 6 agents spread across full visible width
     Bottom spine: Consolidator → JSON
   ────────────────────────────────────────────────────────── */

/* ─── Types ─── */

interface OrcNode {
  id: string
  label: string
  sub?: string
  desktop: [number, number, number]
  mobile: [number, number, number]
  role: 'orchestrator' | 'agent' | 'output'
  accent?: boolean
  driftPhase: number
}

interface OrcEdge {
  from: string
  to: string
}

/* ─── Documented agent data ─── */

const AGENTS: { id: string; label: string; rules: string }[] = [
  { id: 'naming',   label: 'Naming',         rules: '9 rules' },
  { id: 'best',     label: 'Best Practices',  rules: '6 rules' },
  { id: 'error',    label: 'Error Handling',   rules: '5 rules' },
  { id: 'perf',     label: 'Performance',      rules: '8 rules' },
  { id: 'review',   label: 'Review Cond.',     rules: '8c + 18w' },
  { id: 'security', label: 'Security',         rules: '1 rule' },
]

/* Desktop fan: 6 agents evenly across visible width */
const FAN_X_DESKTOP = [-2.8, -1.68, -0.56, 0.56, 1.68, 2.8]
/* Mobile: 2×3 grid arrangement */
const FAN_MOBILE: [number, number][] = [
  [-0.6, 0.35], [0, 0.35], [0.6, 0.35],
  [-0.6, -0.35], [0, -0.35], [0.6, -0.35],
]

/* ─── Desktop Y positions (spine) ─── */
const D_ROOT    = 1.55
const D_SEQ     = 0.95
const D_PAR     = 0.35
const D_AGENTS  = -0.55
const D_CONSOL  = -1.2
const D_JSON    = -1.7

/* ─── Mobile Y positions ─── */
const M_ROOT    = 2.3
const M_SEQ     = 1.7
const M_PAR     = 1.15
const M_AGENTS  = 0.0   /* center of 2×3 grid */
const M_CONSOL  = -1.0
const M_JSON    = -1.55

const NODES: OrcNode[] = [
  {
    id: 'root', label: 'Root Agent', role: 'orchestrator', accent: true,
    desktop: [0, D_ROOT, 0], mobile: [0, M_ROOT, 0],
    driftPhase: 0,
  },
  {
    id: 'seq', label: 'Sequential', role: 'orchestrator',
    desktop: [0, D_SEQ, 0], mobile: [0, M_SEQ, 0],
    driftPhase: 0.6,
  },
  {
    id: 'par', label: 'Parallel', role: 'orchestrator', accent: true,
    desktop: [0, D_PAR, 0], mobile: [0, M_PAR, 0],
    driftPhase: 1.2,
  },
  ...AGENTS.map((a, i): OrcNode => ({
    id: a.id, label: a.label, sub: a.rules, role: 'agent',
    desktop: [FAN_X_DESKTOP[i], D_AGENTS, 0],
    mobile: [FAN_MOBILE[i][0], M_AGENTS + FAN_MOBILE[i][1], 0],
    driftPhase: 2.0 + i * 0.3,
  })),
  {
    id: 'consol', label: 'Consolidator', role: 'orchestrator', accent: true,
    desktop: [0, D_CONSOL, 0], mobile: [0, M_CONSOL, 0],
    driftPhase: 4.0,
  },
  {
    id: 'json', label: 'JSON Output', role: 'output',
    desktop: [0, D_JSON, 0], mobile: [0, M_JSON, 0],
    driftPhase: 4.5,
  },
]

const EDGES: OrcEdge[] = [
  { from: 'root', to: 'seq' },
  { from: 'seq',  to: 'par' },
  ...AGENTS.map((a) => ({ from: 'par', to: a.id })),
  ...AGENTS.map((a) => ({ from: a.id, to: 'consol' })),
  { from: 'consol', to: 'json' },
]

const SPINE_PATH = ['root', 'seq', 'par']
const CONVERGE_PATH = ['consol', 'json']

/* ─── Constants ─── */
const DRIFT_SPEED = 0.06
const DRIFT_AMP   = 0.005
const PULSE_SPEED = 0.35
const PULSE_INTERVAL = 8

/* ─── Edge line ─── */

function EdgeLine({ startPos, endPos, highlight, dimmed }: {
  startPos: THREE.Vector3
  endPos: THREE.Vector3
  highlight: boolean
  dimmed: boolean
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
      color: '#a3a3a3',
      transparent: true,
      opacity: 0.4,
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
      tOpacity = 0.75
      targetColor.current.set('#525252')
    } else if (dimmed) {
      tOpacity = 0.06
      targetColor.current.set('#d4d4d4')
    } else {
      tOpacity = 0.4
      targetColor.current.set('#a3a3a3')
    }
    mat.opacity += (tOpacity - mat.opacity) * 0.08
    mat.color.lerp(targetColor.current, 0.08)
  })

  return <primitive ref={lineRef} object={lineObj} />
}

/* ─── Node mesh ─── */

function OrcNodeMesh({ pos, node, hovered, connected, dimmed, onHover, onUnhover, mobile }: {
  pos: THREE.Vector3
  node: OrcNode
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
    else if (node.role === 'orchestrator') targetEmissive = 0.1
    else if (node.role === 'agent') targetEmissive = 0.06
    else targetEmissive = 0.04

    matRef.current.emissiveIntensity += (targetEmissive - matRef.current.emissiveIntensity) * 0.08
  })

  const isAgent = node.role === 'agent'
  const radius = isAgent ? 0.048 : 0.065

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
          className={`orc-3d-label${node.role === 'orchestrator' ? ' orc-3d-label--orch' : ''}${node.accent ? ' orc-3d-label--accent' : ''}${isAgent ? ' orc-3d-label--agent' : ''}${node.role === 'output' ? ' orc-3d-label--output' : ''}${hovered ? ' orc-3d-label--active' : ''}${dimmed ? ' orc-3d-label--dimmed' : ''}`}
        >
          {node.label}
          {node.sub && <span className="orc-3d-label__sub">{node.sub}</span>}
        </span>
      </Html>
    </group>
  )
}

/* ─── Orchestration pulse ───
   Phase 1: single pulse travels root → seq → par
   Phase 2: all 6 agents flash simultaneously (parallel execution)
   Phase 3: pulse travels consol → json
─── */

function OrchPulse({ posMap, active }: {
  posMap: Map<string, THREE.Vector3>
  active: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const flashMeshes = useRef<(THREE.Mesh | null)[]>(Array(6).fill(null))
  const phase = useRef<'spine' | 'fan' | 'converge'>('spine')
  const progress = useRef(0)
  const fanTimer = useRef(0)

  const spinePositions = useMemo(() =>
    SPINE_PATH.map((id) => posMap.get(id)!),
  [posMap])

  const convergePositions = useMemo(() =>
    CONVERGE_PATH.map((id) => posMap.get(id)!),
  [posMap])

  useFrame((_, delta) => {
    if (!active) {
      if (meshRef.current) meshRef.current.visible = false
      flashMeshes.current.forEach((m) => { if (m) m.visible = false })
      return
    }

    const pulse = meshRef.current
    if (!pulse) return

    if (phase.current === 'spine') {
      pulse.visible = true
      flashMeshes.current.forEach((m) => { if (m) m.visible = false })
      progress.current += delta * PULSE_SPEED

      if (progress.current >= spinePositions.length - 1) {
        phase.current = 'fan'
        progress.current = 0
        fanTimer.current = 0
        pulse.visible = false
        return
      }

      const segIdx = Math.floor(progress.current)
      const t = progress.current - segIdx
      const a = spinePositions[segIdx]
      const b = spinePositions[Math.min(segIdx + 1, spinePositions.length - 1)]
      pulse.position.lerpVectors(a, b, t);
      (pulse.material as THREE.MeshBasicMaterial).opacity = 0.35
    } else if (phase.current === 'fan') {
      pulse.visible = false
      fanTimer.current += delta

      flashMeshes.current.forEach((m) => {
        if (!m) return
        m.visible = true
        const fade = Math.max(0, 1 - fanTimer.current / 1.2)
        ;(m.material as THREE.MeshBasicMaterial).opacity = fade * 0.3
      })

      if (fanTimer.current > 1.2) {
        phase.current = 'converge'
        progress.current = 0
        flashMeshes.current.forEach((m) => { if (m) m.visible = false })
      }
    } else {
      pulse.visible = true
      progress.current += delta * PULSE_SPEED

      if (progress.current >= convergePositions.length - 1) {
        phase.current = 'spine'
        progress.current = 0
        pulse.visible = false
        return
      }

      const segIdx = Math.floor(progress.current)
      const t = progress.current - segIdx
      const a = convergePositions[segIdx]
      const b = convergePositions[Math.min(segIdx + 1, convergePositions.length - 1)]
      pulse.position.lerpVectors(a, b, t);
      (pulse.material as THREE.MeshBasicMaterial).opacity = 0.3
    }
  })

  return (
    <>
      <mesh ref={meshRef} visible={false}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0} />
      </mesh>
      {AGENTS.map((agent, i) => {
        const agentPos = posMap.get(agent.id)
        return (
          <mesh
            key={agent.id}
            ref={(el) => { flashMeshes.current[i] = el }}
            visible={false}
            position={agentPos ?? [0, 0, 0]}
          >
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color="#2563eb" transparent opacity={0} />
          </mesh>
        )
      })}
    </>
  )
}

/* ─── Scene root ─── */

function OrchestrationGraph({ reducedMotion, mobile }: SceneProps) {
  const clock = useRef(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const pulseTimer = useRef(0)
  const [pulseActive, setPulseActive] = useState(false)

  const isMobile = mobile ?? false

  /* Scale up to fill wide container — camera at [0,0,5] fov 45 */
  const sceneScale = isMobile ? 1.0 : 1.25

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

  const agentIdSet = useMemo(() => new Set(AGENTS.map((a) => a.id)), [])

  const connectedIds = useMemo(() => {
    if (!hoveredId) return new Set<string>()
    const set = new Set<string>()
    set.add(hoveredId)

    if (hoveredId === 'par') {
      agentIdSet.forEach((id) => set.add(id))
    } else if (hoveredId === 'consol') {
      agentIdSet.forEach((id) => set.add(id))
    } else if (agentIdSet.has(hoveredId)) {
      set.add('par')
      set.add('consol')
    } else {
      EDGES.forEach((e) => {
        if (e.from === hoveredId) set.add(e.to)
        if (e.to === hoveredId) set.add(e.from)
      })
    }
    return set
  }, [hoveredId, agentIdSet])

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
          />
        )
      })}

      {NODES.map((node, i) => {
        const isHovered = hoveredId === node.id
        const isConnected = !isHovered && connectedIds.has(node.id)
        const isDimmed = !!hoveredId && !connectedIds.has(node.id)
        return (
          <OrcNodeMesh
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
        <OrchPulse posMap={posMap} active={pulseActive} />
      )}
    </group>
  )
}

export default function AgentOrchestration({ reducedMotion = false, mobile = false }: SceneProps) {
  return <OrchestrationGraph reducedMotion={reducedMotion} mobile={mobile} />
}
