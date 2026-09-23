'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { SceneProps } from '@/lib/types'

/* ─── Six documented capability domains ─── */

interface DomainNode {
  id: string
  label: string
  shortLabel: string
  base: [number, number, number]
  anchor?: boolean
  accent?: boolean
  driftPhase: number
}

interface DomainEdge {
  from: string
  to: string
}

const NODES: DomainNode[] = [
  { id: 'integration', label: 'Integration & Architecture', shortLabel: 'Integration',  base: [-1.5,  0.0,   0],    anchor: true,  driftPhase: 0 },
  { id: 'cloud',       label: 'Cloud & Platform',          shortLabel: 'Cloud',         base: [-0.55, 1.1,  -0.08], driftPhase: 1.0 },
  { id: 'data',        label: 'Data & Analytics',          shortLabel: 'Data',          base: [ 0.55, 1.1,   0.06], driftPhase: 2.0 },
  { id: 'genai',       label: 'GenAI / AI Engineering',    shortLabel: 'GenAI',         base: [ 1.5,  0.0,   0],    accent: true, driftPhase: 3.0 },
  { id: 'fullstack',   label: 'Full-Stack Engineering',    shortLabel: 'Full-Stack',    base: [ 0.55, -1.1,  0.06], driftPhase: 4.0 },
  { id: 'devops',      label: 'DevOps & Observability',    shortLabel: 'DevOps',        base: [-0.55, -1.1, -0.08], driftPhase: 5.0 },
]

const EDGES: DomainEdge[] = [
  { from: 'integration', to: 'cloud' },
  { from: 'integration', to: 'devops' },
  { from: 'integration', to: 'data' },
  { from: 'cloud',       to: 'data' },
  { from: 'cloud',       to: 'genai' },
  { from: 'data',        to: 'genai' },
  { from: 'genai',       to: 'fullstack' },
  { from: 'devops',      to: 'fullstack' },
]

/* ─── Constants ─── */

const DRIFT_SPEED = 0.1
const DRIFT_AMP   = 0.02
const NODE_RADIUS = 0.05

/* ─── Connection line ─── */

function EdgeLine({ startPos, endPos, highlight, dimmed }: {
  startPos: THREE.Vector3
  endPos: THREE.Vector3
  highlight: boolean
  dimmed: boolean
}) {
  const lineRef = useRef<THREE.Line>(null)
  const targetColor = useRef(new THREE.Color('#404040'))

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
      color: '#404040',
      transparent: true,
      opacity: 0.2,
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
      targetOpacity = 0.5
      targetColor.current.set('#2A2A2A')
    } else if (dimmed) {
      targetOpacity = 0.05
      targetColor.current.set('#525252')
    } else {
      targetOpacity = 0.2
      targetColor.current.set('#404040')
    }

    mat.opacity += (targetOpacity - mat.opacity) * 0.07
    mat.color.lerp(targetColor.current, 0.07)
  })

  return <primitive ref={lineRef} object={lineObj} />
}

/* ─── Domain node ─── */

function DomainNodeMesh({ pos, node, hovered, dimmed, onHover, onUnhover, mobile }: {
  pos: THREE.Vector3
  node: DomainNode
  hovered: boolean
  dimmed: boolean
  onHover: () => void
  onUnhover: () => void
  mobile: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame(() => {
    if (!meshRef.current || !matRef.current) return

    const targetScale = hovered ? 1.2 : 1
    const s = meshRef.current.scale.x
    meshRef.current.scale.setScalar(s + (targetScale - s) * 0.07)

    let targetEmissive: number
    if (hovered) {
      targetEmissive = 0.5
    } else if (dimmed) {
      targetEmissive = 0.01
    } else if (node.accent) {
      targetEmissive = 0.15
    } else if (node.anchor) {
      targetEmissive = 0.12
    } else {
      targetEmissive = 0.05
    }
    matRef.current.emissiveIntensity +=
      (targetEmissive - matRef.current.emissiveIntensity) * 0.07

    if (ringRef.current && ringMatRef.current) {
      let ringTarget: number
      if (hovered) {
        ringTarget = 0.3
      } else if (dimmed) {
        ringTarget = 0
      } else if (node.anchor || node.accent) {
        ringTarget = 0.1
      } else {
        ringTarget = 0
      }
      ringMatRef.current.opacity += (ringTarget - ringMatRef.current.opacity) * 0.07
    }
  })

  return (
    <group position={pos}>
      {/* Ring for anchor/accent */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[NODE_RADIUS * 1.5, NODE_RADIUS * 1.75, 24]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color="#F2C94C"
          transparent
          opacity={(node.anchor || node.accent) ? 0.1 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover() }}
        onPointerOut={onUnhover}
      >
        <sphereGeometry args={[NODE_RADIUS, 20, 20]} />
        <meshStandardMaterial
          ref={matRef}
          color="#1A1A1A"
          emissive="#F2C94C"
          emissiveIntensity={node.anchor || node.accent ? 0.12 : 0.05}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      <Html
        center
        distanceFactor={mobile ? 6 : 5}
        position={[0, -(NODE_RADIUS + 0.14), 0]}
        style={{ pointerEvents: 'none' }}
      >
        <span
          className={`cap-3d-label ${hovered ? 'cap-3d-label--active' : ''} ${dimmed ? 'cap-3d-label--dimmed' : ''}`}
        >
          {node.shortLabel}
        </span>
      </Html>
    </group>
  )
}

/* ─── Scene graph ─── */

function ConstellationGraph({ reducedMotion, mobile }: SceneProps) {
  const clock = useRef(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const scale = mobile ? 0.65 : 1

  const livePositions = useMemo(() => {
    return NODES.map((n) =>
      new THREE.Vector3(n.base[0] * scale, n.base[1] * scale, n.base[2] * scale)
    )
  }, [scale])

  const posMap = useMemo(() => {
    const map = new Map<string, THREE.Vector3>()
    NODES.forEach((n, i) => map.set(n.id, livePositions[i]))
    return map
  }, [livePositions])

  useFrame((_, delta) => {
    if (reducedMotion) return
    clock.current += delta

    NODES.forEach((node, i) => {
      const t = clock.current * DRIFT_SPEED + node.driftPhase
      livePositions[i].x = node.base[0] * scale + Math.sin(t * 0.9) * DRIFT_AMP
      livePositions[i].y = node.base[1] * scale + Math.cos(t * 0.7) * DRIFT_AMP * 0.8
      livePositions[i].z = node.base[2] * scale + Math.sin(t * 1.1 + 1) * DRIFT_AMP * 0.5
    })
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
    <group>
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
        const isConnected = connectedIds.has(node.id)
        const isDimmed = !!hoveredId && !isConnected
        return (
          <DomainNodeMesh
            key={node.id}
            pos={livePositions[i]}
            node={node}
            hovered={hoveredId === node.id || (!!hoveredId && isConnected && hoveredId !== node.id)}
            dimmed={isDimmed}
            onHover={() => handleHover(node.id)}
            onUnhover={handleUnhover}
            mobile={mobile ?? false}
          />
        )
      })}
    </group>
  )
}

/* ─── Exported scene ─── */

export default function SkillsConstellation({ reducedMotion = false, mobile = false }: SceneProps) {
  return <ConstellationGraph reducedMotion={reducedMotion} mobile={mobile} />
}
