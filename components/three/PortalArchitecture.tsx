'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { SceneProps } from '@/lib/types'

/* ──────────────────────────────────────────────────────────
   Documented Automations Portal architecture — four tiers:
     1. Portal / UI   (React, TypeScript)
     2. API / Services (Express, Node.js)
     3. Data & AI      (BigQuery, Pub/Sub, Vertex AI / Gemini)
     4. Platform & Ops (Kubernetes, Vault, Datadog, JIRA, Slack)

   Only technologies explicitly documented in content/work.ts
   and the Master ATS Resume are represented.
   ────────────────────────────────────────────────────────── */

/* ─── Tier definitions ─── */

type TierKey = 'portal' | 'api' | 'data-ai' | 'platform' | 'ops'

interface ArchNode {
  id: string
  label: string
  tier: TierKey
  base: [number, number, number]
  primary?: boolean
  driftPhase: number
}

interface ArchEdge {
  from: string
  to: string
}

/* Tier visual Y positions — stacked top-to-bottom */
const TIER_Y = { portal: 1.3, api: 0.75, 'data-ai': 0.00, platform: -0.75, ops: -1.5 } as const

const NODES: ArchNode[] = [
  /* Tier 1 — Portal / UI */
  { id: 'portal', label: 'Portal / UI',     tier: 'portal',   base: [0, TIER_Y.portal, 0], primary: true, driftPhase: 0 },

  /* Tier 2 — API / Services */
  { id: 'api',    label: 'API / Services',   tier: 'api',      base: [0, TIER_Y.api, 0],    primary: true, driftPhase: 1.2 },

  /* Tier 3 — Data & AI */
  { id: 'bq',     label: 'BigQuery',         tier: 'data-ai',  base: [-0.85, TIER_Y['data-ai'], 0],         driftPhase: 2.0 },
  { id: 'pubsub', label: 'Pub/Sub',          tier: 'data-ai',  base: [0, TIER_Y['data-ai'], 0],             driftPhase: 2.6 },
  { id: 'vertai', label: 'Vertex AI',        tier: 'data-ai',  base: [0.85, TIER_Y['data-ai'], 0],          driftPhase: 3.2 },

  /* Tier 4 — Platform */
  { id: 'k8s',    label: 'Kubernetes',       tier: 'platform',  base: [-1.05, TIER_Y.platform, 0],           driftPhase: 3.8 },
  { id: 'vault',  label: 'Vault',            tier: 'platform',  base: [-0.35, TIER_Y.platform, 0],           driftPhase: 4.4 },
  { id: 'snaplogic',  label: 'Snaplogic',    tier: 'platform',  base: [0.35, TIER_Y.platform, 0],           driftPhase: 5.0 },
  { id: 'dd',     label: 'Datadog',          tier: 'platform',  base: [1.05, TIER_Y.platform, 0],            driftPhase: 5.6 },
  
  /* Tier 5 — Ops */
  { id: 'jira',   label: 'JIRA / Slack',     tier: 'ops',  base: [0, TIER_Y.ops, 0],            driftPhase: 6.2 },
]

/* Structural grouping edges — documented relationships only:
   - Portal communicates with API (React→Express)
   - API integrates BigQuery, Pub/Sub, Vertex AI, JIRA, Slack
   - Deployed on Kubernetes with Vault secrets & Datadog APM */
const EDGES: ArchEdge[] = [
  { from: 'portal', to: 'api' },
  { from: 'api',    to: 'bq' },
  { from: 'api',    to: 'pubsub' },
  { from: 'pubsub',    to: 'snaplogic' },
  { from: 'snaplogic',    to: 'jira' },
  { from: 'api',    to: 'vertai' },
  { from: 'api',    to: 'jira' },
  { from: 'k8s',    to: 'vault' },
  { from: 'k8s',    to: 'dd' },
  { from: 'dd',    to: 'vault' },
]

/* ─── Constants ─── */
const DRIFT_SPEED = 0.08
const DRIFT_AMP   = 0.012
const NODE_RADIUS = 0.04

/* ─── Edge line ─── */

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
      opacity: 0.18,
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
      targetOpacity = 0.45
      targetColor.current.set('#2A2A2A')
    } else if (dimmed) {
      targetOpacity = 0.04
      targetColor.current.set('#525252')
    } else {
      targetOpacity = 0.18
      targetColor.current.set('#404040')
    }
    mat.opacity += (targetOpacity - mat.opacity) * 0.07
    mat.color.lerp(targetColor.current, 0.07)
  })

  return <primitive ref={lineRef} object={lineObj} />
}

/* ─── Architecture node ─── */

function ArchNodeMesh({ pos, node, hovered, connected, dimmed, onHover, onUnhover, mobile }: {
  pos: THREE.Vector3
  node: ArchNode
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

    const targetScale = hovered ? 1.25 : 1
    const s = meshRef.current.scale.x
    meshRef.current.scale.setScalar(s + (targetScale - s) * 0.07)

    let targetEmissive: number
    if (hovered) {
      targetEmissive = 0.5
    } else if (connected) {
      targetEmissive = 0.25
    } else if (dimmed) {
      targetEmissive = 0.01
    } else if (node.primary) {
      targetEmissive = 0.12
    } else {
      targetEmissive = 0.06
    }
    matRef.current.emissiveIntensity +=
      (targetEmissive - matRef.current.emissiveIntensity) * 0.07
  })

  const labelY = node.tier === 'portal' ? NODE_RADIUS + 0.12 : -(NODE_RADIUS + 0.12)

  return (
    <group position={pos}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover() }}
        onPointerOut={onUnhover}
      >
        <sphereGeometry args={[NODE_RADIUS, 16, 16]} />
        <meshStandardMaterial
          ref={matRef}
          color="#1A1A1A"
          emissive="#F2C94C"
          emissiveIntensity={node.primary ? 0.12 : 0.06}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      <Html
        center
        distanceFactor={mobile ? 7 : 5.5}
        position={[0, labelY, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <span
          className={`arch-3d-label${node.primary ? ' arch-3d-label--primary' : ''}${hovered ? ' arch-3d-label--active' : ''}${dimmed ? ' arch-3d-label--dimmed' : ''}`}
        >
          {node.label}
        </span>
      </Html>
    </group>
  )
}

/* ─── Tier separator lines ─── */

function TierLine({ y, width }: { y: number; width: number }) {
  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute([
        -width / 2, y, 0,
        width / 2, y, 0,
      ], 3)
    )
    const mat = new THREE.LineBasicMaterial({
      color: '#525252',
      transparent: true,
      opacity: 0.15,
    })
    return new THREE.Line(geo, mat)
  }, [y, width])

  return <primitive object={lineObj} />
}

/* ─── Scene graph ─── */

function ArchitectureGraph({ reducedMotion, mobile }: SceneProps) {
  const clock = useRef(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const scale = mobile ? 0.72 : 1

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
      livePositions[i].y = node.base[1] * scale + Math.cos(t * 0.7) * DRIFT_AMP * 0.7
      livePositions[i].z = node.base[2] * scale + Math.sin(t * 1.1 + 1) * DRIFT_AMP * 0.3
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
    const touches = connectedIds.has(from) && connectedIds.has(to)
    return { highlight: touches, dimmed: !touches }
  }, [hoveredId, connectedIds])

  /* Tier separator Y coords — midpoints between tiers */
  const tierSeps = [
    (TIER_Y.portal + TIER_Y.api) / 2,
    (TIER_Y.api + TIER_Y['data-ai']) / 2,
    (TIER_Y['data-ai'] + TIER_Y.platform) / 2,
  ]

  return (
    <group>
      {/* Tier separator lines */}
      {tierSeps.map((y) => (
        <TierLine key={`tier-${y}`} y={y * scale} width={2.8 * scale} />
      ))}

      {/* Edges */}
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

      {/* Nodes */}
      {NODES.map((node, i) => {
        const isHovered = hoveredId === node.id
        const isConnected = !isHovered && connectedIds.has(node.id)
        const isDimmed = !!hoveredId && !connectedIds.has(node.id)
        return (
          <ArchNodeMesh
            key={node.id}
            pos={livePositions[i]}
            node={node}
            hovered={isHovered}
            connected={isConnected}
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

export default function PortalArchitecture({ reducedMotion = false, mobile = false }: SceneProps) {
  return <ArchitectureGraph reducedMotion={reducedMotion} mobile={mobile} />
}
