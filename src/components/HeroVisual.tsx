import { Suspense, lazy, useRef } from 'react'
import { useCapability } from '@/hooks/useCapability'

// 3D is code-split: the Canvas + three.js only load after first paint,
// and only on devices that can use them.
const SystemGraph = lazy(() => import('@/three/SystemGraph'))

/**
 * Capability-based hero visual:
 *  high/normal → full or optimized 3D system graph
 *  low         → 2.5D diagram with gentle pointer parallax
 *  static      → flat diagram (reduced motion / no WebGL)
 * The page never depends on the visual — it is decorative context.
 */
export function HeroVisual() {
  const capability = useCapability()

  if (capability === 'static') return <StaticDiagram interactive={false} />
  if (capability === 'low') return <StaticDiagram interactive />

  return (
    <div className="h-full w-full" aria-hidden="true">
      <Suspense fallback={<StaticDiagram interactive={false} />}>
        <SystemGraph quality={capability} />
      </Suspense>
    </div>
  )
}

const DIAGRAM_NODES = [
  { label: 'FRONTEND', sub: 'REACT', x: 8, y: 12, accent: false },
  { label: 'API', sub: 'FASTAPI', x: 42, y: 48, accent: false },
  { label: 'BACKEND', sub: 'NODE / PY', x: 68, y: 10, accent: false },
  { label: 'RAG / AI', sub: 'VECTOR SEARCH', x: 72, y: 66, accent: true },
  { label: 'DATABASE', sub: 'POSTGRESQL', x: 30, y: 78, accent: false },
]

const DIAGRAM_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 4],
]

/** 2.5D / static SVG version of the system graph — the graceful fallback. */
export function StaticDiagram({ interactive }: { interactive: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || !ref.current) return
    if (document.documentElement.dataset.motion === 'reduced') return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`
  }

  const center = (n: (typeof DIAGRAM_NODES)[number]) => ({ cx: n.x + 10, cy: n.y + 7 })

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className="flex h-full w-full items-center justify-center transition-transform duration-300 ease-out"
      role="img"
      aria-label="Diagram of a full-stack AI system: frontend connects to API, API to backend, backend to RAG/AI and database"
    >
      <svg viewBox="0 0 100 92" className="max-h-full w-full max-w-md" aria-hidden="true">
        {DIAGRAM_EDGES.map(([a, b]) => {
          const p1 = center(DIAGRAM_NODES[a])
          const p2 = center(DIAGRAM_NODES[b])
          return (
            <line
              key={`${a}-${b}`}
              x1={p1.cx}
              y1={p1.cy}
              x2={p2.cx}
              y2={p2.cy}
              stroke="hsl(var(--taupe))"
              strokeWidth="0.45"
              strokeDasharray="1.6 1.4"
              opacity="0.65"
            />
          )
        })}
        {DIAGRAM_NODES.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x + 0.9}
              y={n.y + 0.9}
              width="20"
              height="13"
              rx="2"
              fill="hsl(var(--ink))"
              opacity="0.9"
            />
            <rect
              x={n.x}
              y={n.y}
              width="20"
              height="13"
              rx="2"
              fill={n.accent ? 'hsl(var(--primary))' : 'hsl(var(--paper-raised))'}
              stroke="hsl(var(--ink))"
              strokeWidth="0.55"
            />
            <text
              x={n.x + 10}
              y={n.y + 6.4}
              textAnchor="middle"
              fontSize="2.9"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="600"
              fill={n.accent ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'}
            >
              {n.label}
            </text>
            <text
              x={n.x + 10}
              y={n.y + 10.2}
              textAnchor="middle"
              fontSize="2"
              fontFamily="'JetBrains Mono', monospace"
              fill={n.accent ? 'hsl(var(--primary-foreground))' : 'hsl(var(--taupe))'}
            >
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
