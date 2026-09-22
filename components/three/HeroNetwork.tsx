'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { SceneProps } from '@/lib/types'

/* ─── Network topology ───
   Layout forms an architectural hexagonal network:

            Cloud ────── Data
           /                 \
   Integration ── APIs ────── AI
           \                 /
            Platform ────────
*/

interface NetNode {
  id: string
  label: string
  base: [number, number, number]
  primary?: boolean
  driftPhase: number
}

interface NetEdge {
  from: string
  to: string
  weight: number
}

const NODES: NetNode[] = [
  { id: 'integration', label: 'Integration', base: [-1.6,  0.0,  0],    primary: true,  driftPhase: 0 },
  { id: 'apis',        label: 'APIs',        base: [ 0.0,  0.0,  0.15], primary: false, driftPhase: 1.2 },
  { id: 'cloud',       label: 'Cloud',       base: [-0.8,  1.15, -0.1], primary: false, driftPhase: 2.4 },
  { id: 'data',        label: 'Data',        base: [ 0.8,  1.15,  0.05],primary: false, driftPhase: 3.6 },
  { id: 'ai',          label: 'AI',          base: [ 1.6,  0.0,  0],    primary: true,  driftPhase: 4.8 },
  { id: 'platform',    label: 'Platform',    base: [ 0.0, -1.15, -0.1], primary: false, driftPhase: 0.6 },
]

const EDGES: NetEdge[] = [
  { from: 'integration', to: 'apis',      weight: 2 },
  { from: 'integration', to: 'cloud',     weight: 1 },
  { from: 'integration', to: 'platform',  weight: 1 },
  { from: 'apis',        to: 'cloud',     weight: 1 },
  { from: 'apis',        to: 'ai',        weight: 2 },
  { from: 'cloud',       to: 'data',      weight: 2 },
  { from: 'data',        to: 'ai',        weight: 2 },
  { from: 'platform',    to: 'ai',        weight: 1 },
]

/* ─── Constants ─── */

const DRIFT_SPEED    = 0.12
const DRIFT_AMP      = 0.03
const NODE_RADIUS    = 0.05
const PRIMARY_RADIUS = 0.065
const PULSE_SPEED    = 0.35
const PULSE_INTERVAL = 6

/* ─── Animated connection line ─── */

function EdgeLine({ startPos, endPos, weight, highlight, dimmed }: {
  startPos: THREE.Vector3
  endPos: THREE.Vector3
  weight: number
  highlight: boolean
  dimmed: boolean
}) {
  const lineRef = useRef<THREE.Line>(null)

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute([
        startPos.x, startPos.y, startPos.z,
        endPos.x, endPos.y, endPos.z,
      ], 3)
    )
    const mat = new THREE.LineBasicMaterial({
      color: '#a3a3a3',
      transparent: true,
      opacity: weight === 2 ? 0.25 : 0.14,
    })
    return new THREE.Line(geo, mat)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame(() => {
    if (!lineRef.current) return
    const positions = lineRef.current.geometry.attributes.position as THREE.BufferAttribute
    positions.setXYZ(0, startPos.x, startPos.y, startPos.z)
    positions.setXYZ(1, endPos.x, endPos.y, endPos.z)
    positions.needsUpdate = true

    const mat = lineRef.current.material as THREE.LineBasicMaterial
    const baseOpacity = weight === 2 ? 0.25 : 0.14
    let targetOpacity: number
    let targetColor: string

    if (highlight) {
      targetOpacity = weight === 2 ? 0.55 : 0.4
      targetColor = '#737373'
    } else if (dimmed) {
      targetOpacity = 0.06
      targetColor = '#d4d4d4'
    } else {
      targetOpacity = baseOpacity
      targetColor = '#a3a3a3'
    }

    mat.opacity += (targetOpacity - mat.opacity) * 0.07
    mat.color.lerp(new THREE.Color(targetColor), 0.07)
  })

  return <primitive ref={lineRef} object={lineObj} />
}

/* ─── Travelling pulse ─── */

function TravelPulse({ startPos, endPos, active }: {
  startPos: THREE.Vector3
  endPos: THREE.Vector3
  active: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshBasicMaterial>(null)
  const progress = useRef(0)

  useFrame((_, delta) => {
    if (!meshRef.current || !matRef.current) return

    if (!active) {
      matRef.current.opacity = 0
      return
    }

    progress.current += delta * PULSE_SPEED
    if (progress.current > 1) progress.current = 0

    const t = progress.current
    meshRef.current.position.lerpVectors(startPos, endPos, t)

    const fade = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1
    matRef.current.opacity = fade * 0.4
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.014, 6, 6]} />
      <meshBasicMaterial ref={matRef} color="#2563eb" transparent opacity={0} />
    </mesh>
  )
}

/* ─── Single network node ─── */

function NetworkNode({ pos, node, hovered, dimmed, onHover, onUnhover }: {
  pos: THREE.Vector3
  node: NetNode
  hovered: boolean
  dimmed: boolean
  onHover: () => void
  onUnhover: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const sphereMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const baseRadius = node.primary ? PRIMARY_RADIUS : NODE_RADIUS
  const targetScale = hovered ? 1.2 : 1

  useFrame(() => {
    if (!meshRef.current || !sphereMatRef.current) return
    const s = meshRef.current.scale.x
    const next = s + (targetScale - s) * 0.07
    meshRef.current.scale.setScalar(next)

    let targetEmissive: number
    let targetRoughness: number

    if (hovered) {
      targetEmissive = 0.5
      targetRoughness = 0.5
    } else if (dimmed) {
      targetEmissive = 0.02
      targetRoughness = 0.9
    } else {
      targetEmissive = node.primary ? 0.18 : 0.06
      targetRoughness = 0.7
    }

    sphereMatRef.current.emissiveIntensity +=
      (targetEmissive - sphereMatRef.current.emissiveIntensity) * 0.07
    sphereMatRef.current.roughness +=
      (targetRoughness - sphereMatRef.current.roughness) * 0.07

    if (ringRef.current && ringMatRef.current) {
      let ringTarget: number
      if (hovered) {
        ringTarget = 0.35
      } else if (dimmed) {
        ringTarget = 0
      } else {
        ringTarget = node.primary ? 0.1 : 0
      }
      ringMatRef.current.opacity += (ringTarget - ringMatRef.current.opacity) * 0.07
      ringRef.current.scale.setScalar(next * 1.8)
    }
  })

  return (
    <group position={pos}>
      {/* Outer ring for primary emphasis */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[baseRadius * 1.4, baseRadius * 1.65, 32]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color="#2563eb"
          transparent
          opacity={node.primary ? 0.1 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Core sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover() }}
        onPointerOut={onUnhover}
      >
        <sphereGeometry args={[baseRadius, 24, 24]} />
        <meshStandardMaterial
          ref={sphereMatRef}
          color="#171717"
          emissive="#2563eb"
          emissiveIntensity={node.primary ? 0.18 : 0.06}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* HTML label — DOM-rendered, always crisp */}
      <Html
        center
        distanceFactor={5}
        position={[0, -(baseRadius + 0.16), 0]}
        style={{ pointerEvents: 'none' }}
      >
        <span
          className={`hero-node-label ${hovered ? 'hero-node-label--active' : ''} ${node.primary ? 'hero-node-label--primary' : ''} ${dimmed ? 'hero-node-label--dimmed' : ''}`}
        >
          {node.label}
        </span>
      </Html>
    </group>
  )
}

/* ─── Main scene graph ─── */

function NetworkGraph({ reducedMotion, mobile }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const clock = useRef(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const scale = mobile ? 0.75 : 1

  const livePositions = useMemo(() => {
    const map = new Map<string, THREE.Vector3>()
    NODES.forEach((n) => {
      map.set(n.id, new THREE.Vector3(n.base[0] * scale, n.base[1] * scale, n.base[2] * scale))
    })
    return map
  }, [scale])

  const [pulseActive, setPulseActive] = useState<boolean[]>(() =>
    EDGES.map(() => false)
  )

  const pulseTimers = useRef(
    EDGES.map((_, i) => i * (PULSE_INTERVAL / EDGES.length))
  )

  const activePulseCount = useRef(0)

  useFrame((_, delta) => {
    if (reducedMotion) return
    clock.current += delta

    NODES.forEach((node) => {
      const pos = livePositions.get(node.id)!
      const t = clock.current * DRIFT_SPEED + node.driftPhase
      pos.x = node.base[0] * scale + Math.sin(t * 1.1) * DRIFT_AMP
      pos.y = node.base[1] * scale + Math.cos(t * 0.9) * DRIFT_AMP * 0.8
      pos.z = node.base[2] * scale + Math.sin(t * 0.7 + 1) * DRIFT_AMP * 0.5
    })

    let changed = false
    activePulseCount.current = 0
    const nextActive = [...pulseActive]

    pulseTimers.current.forEach((timer, i) => {
      pulseTimers.current[i] += delta

      if (nextActive[i]) {
        activePulseCount.current++
        if (pulseTimers.current[i] > 1 / PULSE_SPEED) {
          nextActive[i] = false
          pulseTimers.current[i] = 0
          changed = true
        }
      } else {
        if (pulseTimers.current[i] > PULSE_INTERVAL && activePulseCount.current < 2) {
          pulseTimers.current[i] = 0
          nextActive[i] = true
          activePulseCount.current++
          changed = true
        }
      }
    })

    if (changed) setPulseActive(nextActive)
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
    const isHighlighted = hoveredId === from || hoveredId === to
    return { highlight: isHighlighted, dimmed: !isHighlighted }
  }, [hoveredId])

  return (
    <group ref={groupRef}>
      {/* Connections */}
      {EDGES.map((edge) => {
        const startPos = livePositions.get(edge.from)!
        const endPos = livePositions.get(edge.to)!
        const { highlight, dimmed } = getEdgeState(edge.from, edge.to)
        return (
          <EdgeLine
            key={`e-${edge.from}-${edge.to}`}
            startPos={startPos}
            endPos={endPos}
            weight={edge.weight}
            highlight={highlight}
            dimmed={dimmed}
          />
        )
      })}

      {/* Travelling pulses — at most 2 active at a time */}
      {!reducedMotion && EDGES.map((edge, i) => {
        const startPos = livePositions.get(edge.from)!
        const endPos = livePositions.get(edge.to)!
        return (
          <TravelPulse
            key={`p-${edge.from}-${edge.to}`}
            startPos={startPos}
            endPos={endPos}
            active={pulseActive[i]}
          />
        )
      })}

      {/* Nodes */}
      {NODES.map((node) => {
        const pos = livePositions.get(node.id)!
        const nodeHovered = hoveredId === node.id
        const isConnected = connectedIds.has(node.id)
        const isDimmed = !!hoveredId && !isConnected
        return (
          <NetworkNode
            key={node.id}
            pos={pos}
            node={node}
            hovered={nodeHovered || (!!hoveredId && isConnected && !nodeHovered)}
            dimmed={isDimmed}
            onHover={() => handleHover(node.id)}
            onUnhover={handleUnhover}
          />
        )
      })}
    </group>
  )
}

/* ─── Camera rig — subtle pointer parallax ─── */

function Parallax({ reducedMotion, mobile }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame(() => {
    if (!groupRef.current || reducedMotion || mobile) return
    const targetY = pointer.x * 0.05
    const targetX = -pointer.y * 0.025
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04
  })

  return <group ref={groupRef} />
}

/* ─── Exported scene ─── */

export default function HeroNetwork({ reducedMotion = false, mobile = false }: SceneProps) {
  return (
    <>
      <Parallax reducedMotion={reducedMotion} mobile={mobile} />
      <NetworkGraph reducedMotion={reducedMotion} mobile={mobile} />
    </>
  )
}
