'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { SceneProps } from '@/lib/types'

/* ──────────────────────────────────────────────────────────
   Documented Pic-Reel / FrameFlow pipeline:

   Photo Upload → Drag-and-Drop Reordering → Configurable Settings
     → Client-Side MP4 Encoding (FFmpeg WASM) → Download

   Key architectural detail: 100% client-side.
   Photos never leave the browser.

   WASM loading: local split binary (4 chunks) → unpkg CDN → jsdelivr CDN

   Progress phases: uploading → preparing → rendering → encoding → finalizing

   Encoding: FFmpeg concat demuxer, force_original_aspect_ratio, black padding

   Only documented pipeline steps. No invented infrastructure.

   LAYOUT — horizontal pipeline with browser boundary:
     All processing happens client-side.
     The "browser boundary" is the key architectural insight.
   ────────────────────────────────────────────────────────── */

interface PipeNode {
  id: string
  label: string
  sub?: string
  desktop: [number, number, number]
  mobile: [number, number, number]
  accent?: boolean
  primary?: boolean
  boundary?: boolean
  driftPhase: number
}

interface PipeEdge {
  from: string
  to: string
}

/* ─── Layout: horizontal left-to-right flow ─── */

const NODES: PipeNode[] = [
  {
    id: 'upload', label: 'Photo Upload', primary: true,
    desktop: [-2.8, 0.5, 0],   mobile: [0, 2.0, 0],
    driftPhase: 0,
  },
  {
    id: 'reorder', label: 'Reorder', sub: 'drag & drop',
    desktop: [-1.4, 0.5, 0],   mobile: [0, 1.4, 0],
    driftPhase: 0.7,
  },
  {
    id: 'settings', label: 'Settings', sub: 'FPS / res / codec',
    desktop: [0, 0.5, 0],      mobile: [0, 0.8, 0],
    driftPhase: 1.4,
  },
  {
    id: 'wasm', label: 'FFmpeg WASM', accent: true, primary: true, sub: 'client-side',
    desktop: [0, -0.5, 0],     mobile: [0, 0.0, 0],
    driftPhase: 2.1,
  },
  {
    id: 'encode', label: 'MP4 Encode', accent: true, sub: 'concat demuxer',
    desktop: [1.4, -0.5, 0],   mobile: [0, -0.7, 0],
    driftPhase: 2.8,
  },
  {
    id: 'download', label: 'Download', primary: true,
    desktop: [2.8, -0.5, 0],   mobile: [0, -1.4, 0],
    driftPhase: 3.5,
  },
  /* WASM loader sources */
  {
    id: 'local', label: 'Local Binary', sub: '4 chunks',
    desktop: [-1.4, -1.3, 0],  mobile: [-0.55, -1.3, 0],
    driftPhase: 4.0,
  },
  {
    id: 'cdn', label: 'CDN Fallback', sub: 'unpkg / jsdelivr',
    desktop: [0, -1.3, 0],     mobile: [0.55, -1.3, 0],
    driftPhase: 4.5,
  },
]

const EDGES: PipeEdge[] = [
  { from: 'upload',   to: 'reorder' },
  { from: 'reorder',  to: 'settings' },
  { from: 'settings', to: 'wasm' },
  { from: 'wasm',     to: 'encode' },
  { from: 'encode',   to: 'download' },
  /* WASM sources feed into FFmpeg */
  { from: 'local',    to: 'wasm' },
  { from: 'cdn',      to: 'wasm' },
]

const PRIMARY_PATH = ['upload', 'reorder', 'settings', 'wasm', 'encode', 'download']

/* ─── Constants ─── */
const DRIFT_SPEED = 0.06
const DRIFT_AMP   = 0.005
const PULSE_SPEED = 0.25
const PULSE_INTERVAL = 8

/* ─── Browser boundary line ─── */

function BrowserBoundary({ mobile }: { mobile: boolean }) {
  const lineRef = useRef<THREE.Line>(null)

  const lineObj = useMemo(() => {
    const y = mobile ? 2.5 : 1.1
    const x = mobile ? 1.0 : 3.3
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute([
      -x, y, 0,
      x, y, 0,
    ], 3))
    const mat = new THREE.LineDashedMaterial({
      color: '#F2C94C',
      transparent: true,
      opacity: 0.15,
      dashSize: 0.08,
      gapSize: 0.06,
    })
    const line = new THREE.Line(geo, mat)
    line.computeLineDistances()
    return line
  }, [mobile])

  return (
    <group>
      <primitive ref={lineRef} object={lineObj} />
      <Html
        center
        distanceFactor={mobile ? 9 : 5.5}
        position={mobile ? [0, 2.6, 0] : [-2.2, 1.18, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <span className="proj-3d-label proj-3d-label--boundary">
          browser boundary — photos never leave
        </span>
      </Html>
    </group>
  )
}

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
    geo.setAttribute('position', new THREE.Float32BufferAttribute([
      startPos.x, startPos.y, startPos.z,
      endPos.x, endPos.y, endPos.z,
    ], 3))
    const mat = new THREE.LineBasicMaterial({
      color: '#404040',
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
      tOpacity = 0.7
      targetColor.current.set('#2A2A2A')
    } else if (dimmed) {
      tOpacity = 0.06
      targetColor.current.set('#525252')
    } else {
      tOpacity = 0.4
      targetColor.current.set('#404040')
    }
    mat.opacity += (tOpacity - mat.opacity) * 0.08
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

  const radius = (node.sub && !node.accent) ? 0.045 : 0.055

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
        distanceFactor={mobile ? 9 : 5.5}
        position={[0, -(radius + 0.12), 0]}
        style={{ pointerEvents: 'none' }}
      >
        <span
          className={`proj-3d-label${node.primary ? ' proj-3d-label--primary' : ''}${node.accent ? ' proj-3d-label--accent' : ''}${hovered ? ' proj-3d-label--active' : ''}${dimmed ? ' proj-3d-label--dimmed' : ''}`}
        >
          {node.label}
          {node.sub && <span className="proj-3d-label__sub">{node.sub}</span>}
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
      <meshBasicMaterial color="#F2C94C" transparent opacity={0} />
    </mesh>
  )
}

/* ─── Scene root ─── */

function MediaPipelineGraph({ reducedMotion, mobile }: SceneProps) {
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
      <BrowserBoundary mobile={isMobile} />

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
        <FlowPulse positions={primaryPositions} active={pulseActive} />
      )}
    </group>
  )
}

export default function MediaPipeline({ reducedMotion = false, mobile = false }: SceneProps) {
  return <MediaPipelineGraph reducedMotion={reducedMotion} mobile={mobile} />
}
