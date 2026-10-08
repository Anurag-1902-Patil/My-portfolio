import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export interface SystemNode {
  id: string
  label: string
  sub: string
  position: [number, number, number]
  accent?: boolean
}

const NODES: SystemNode[] = [
  { id: 'frontend', label: 'FRONTEND', sub: 'REACT / NEXT.JS', position: [-2.6, 0.7, 0.4] },
  { id: 'api', label: 'API', sub: 'REST / FASTAPI', position: [-0.9, -0.45, 0.9] },
  { id: 'backend', label: 'BACKEND', sub: 'NODE / PYTHON', position: [0.85, 0.55, -0.3] },
  { id: 'ai', label: 'RAG / AI', sub: 'VECTOR SEARCH · LLM', position: [2.5, -0.55, 0.7], accent: true },
  { id: 'db', label: 'DATABASE', sub: 'POSTGRESQL', position: [0.7, -1.35, -0.9] },
]

const EDGES: [string, string][] = [
  ['frontend', 'api'],
  ['api', 'backend'],
  ['backend', 'ai'],
  ['backend', 'db'],
  ['ai', 'db'],
]

interface Props {
  quality: 'high' | 'normal' | 'low'
}

/**
 * Stylized full-stack + AI system graph.
 * Frontend → API → Backend → RAG/AI → Database, with subtle data flow.
 * Ambient drift + pointer parallax; hover highlights a node and its links.
 */
export default function SystemGraph({ quality }: Props) {
  return (
    <Canvas
      dpr={quality === 'high' ? [1, 2] : 1}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: quality !== 'low', alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 6]} intensity={1.15} />
      <directionalLight position={[-5, -3, 4]} intensity={0.35} />
      <Scene quality={quality} />
    </Canvas>
  )
}

function Scene({ quality }: Props) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    // ambient drift
    group.current.position.y = Math.sin(t * 0.45) * 0.07
    // pointer parallax, eased
    pointer.current.x = (state.pointer.x * Math.PI) / 14
    pointer.current.y = (state.pointer.y * Math.PI) / 16
    const g = group.current.rotation
    g.y = THREE.MathUtils.damp(g.y, pointer.current.x + 0.08, 2.4, delta)
    g.x = THREE.MathUtils.damp(g.x, -pointer.current.y - 0.04, 2.4, delta)
  })

  const nodeById = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])), [])

  const linkedTo = useMemo(() => {
    const map: Record<string, Set<string>> = {}
    for (const [a, b] of EDGES) {
      ;(map[a] ??= new Set()).add(b)
      ;(map[b] ??= new Set()).add(a)
    }
    return map
  }, [])

  return (
    <group ref={group} rotation={[0, 0.08, 0]}>
      {EDGES.map(([a, b]) => (
        <Edge
          key={`${a}-${b}`}
          from={nodeById[a].position}
          to={nodeById[b].position}
          highlighted={hovered !== null && (a === hovered || b === hovered)}
          animated={quality !== 'low'}
        />
      ))}
      {NODES.map((node, i) => (
        <NodeMesh
          key={node.id}
          node={node}
          index={i}
          hovered={hovered === node.id}
          dimmed={hovered !== null && hovered !== node.id && !linkedTo[hovered]?.has(node.id)}
          onHover={(id) => setHovered(id)}
          quality={quality}
        />
      ))}
    </group>
  )
}

function Edge({
  from,
  to,
  highlighted,
  animated,
}: {
  from: [number, number, number]
  to: [number, number, number]
  highlighted: boolean
  animated: boolean
}) {
  const lineRef = useRef<THREE.Line>(null)
  const geometry = useMemo(() => {
    const start = new THREE.Vector3(...from)
    const end = new THREE.Vector3(...to)
    const mid = start.clone().lerp(end, 0.5)
    mid.z += 0.35 // gentle arc toward viewer
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(32))
  }, [from, to])

  const material = useMemo(
    () =>
      new THREE.LineDashedMaterial({
        color: highlighted ? '#f2682a' : '#8a8073',
        dashSize: 0.09,
        gapSize: 0.07,
        transparent: true,
        opacity: highlighted ? 0.95 : 0.4,
      }),
    [highlighted],
  )

  useFrame((_, delta) => {
    if (animated && lineRef.current) {
      const mat = lineRef.current.material as THREE.LineDashedMaterial
      mat.scale = (mat.scale + delta * 0.9) % 1 // flowing dashes
    }
  })

  return (
    <primitive
      object={useMemo(() => {
        const line = new THREE.Line(geometry, material)
        line.computeLineDistances()
        return line
      }, [geometry, material])}
      ref={lineRef}
    />
  )
}

function NodeMesh({
  node,
  index,
  hovered,
  dimmed,
  onHover,
  quality,
}: {
  node: SystemNode
  index: number
  hovered: boolean
  dimmed: boolean
  onHover: (id: string | null) => void
  quality: 'high' | 'normal' | 'low'
}) {
  const mesh = useRef<THREE.Group>(null)
  const scale = useRef(1)

  useFrame((state, delta) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    mesh.current.position.y = node.position[1] + Math.sin(t * 0.8 + index * 1.7) * 0.06
    const target = hovered ? 1.14 : 1
    scale.current = THREE.MathUtils.damp(scale.current, target, 8, delta)
    mesh.current.scale.setScalar(scale.current)
  })

  const isAccent = node.accent
  const baseColor = isAccent ? '#f2682a' : '#efe9dd'
  const emissive = isAccent ? '#b33c0e' : '#000000'

  return (
    <group
      ref={mesh}
      position={node.position}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(node.id)
      }}
      onPointerOut={() => onHover(null)}
    >
      <RoundedBox args={[1.15, 0.72, 0.32]} radius={0.06} smoothness={quality === 'low' ? 2 : 4}>
        <meshStandardMaterial
          color={hovered ? (isAccent ? '#ff7c3f' : '#fffdf6') : baseColor}
          emissive={emissive}
          emissiveIntensity={hovered && isAccent ? 0.55 : isAccent ? 0.28 : 0}
          roughness={0.55}
          metalness={0.08}
          transparent
          opacity={dimmed ? 0.45 : 1}
        />
      </RoundedBox>
      {/* node outline — brutalist ink edge */}
      <RoundedBox args={[1.19, 0.76, 0.34]} radius={0.065} smoothness={2}>
        <meshBasicMaterial color="#221d18" wireframe transparent opacity={dimmed ? 0.12 : 0.28} />
      </RoundedBox>
      {hovered && (
        <Html center distanceFactor={9} position={[0, 0.85, 0]} zIndexRange={[20, 0]}>
          <div className="pointer-events-none select-none whitespace-nowrap rounded-lg border-2 border-ink bg-paper-raised px-3 py-1.5 text-center shadow-[3px_3px_0_0_hsl(var(--ink))]">
            <div className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-foreground">
              {node.label}
            </div>
            <div className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-taupe">{node.sub}</div>
          </div>
        </Html>
      )}
    </group>
  )
}
