'use client'

const phaseColors = { divide: '#00c8ff', conquer: '#a855f7', combine: '#00ff9f' }

export default function ConvexHullViz({ step }) {
  if (!step) return null
  const { points, hull, phase, message } = step
  const hullSet = new Set(hull.map(p => `${p.x},${p.y}`))

  const hullPath = hull.length > 1
    ? hull.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'
    : ''

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs px-3 py-1 rounded-full border uppercase tracking-widest"
          style={{ color: phaseColors[phase], borderColor: phaseColors[phase] + '60', background: phaseColors[phase] + '15' }}>
          {phase}
        </span>
        <span className="text-sm text-muted">{message}</span>
      </div>

      <svg width="100%" viewBox="0 0 540 340" className="bg-bg rounded-xl border border-border">
        {hullPath && (
          <path d={hullPath} fill="#00ff9f10" stroke="#00ff9f" strokeWidth={2} strokeLinejoin="round" />
        )}
        {points.map((p, i) => {
          const onHull = hullSet.has(`${p.x},${p.y}`)
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={onHull ? 7 : 5}
                fill={onHull ? '#00ff9f' : '#4a5568'}
                style={{ filter: onHull ? 'drop-shadow(0 0 6px #00ff9f)' : 'none' }} />
              <text x={p.x + 8} y={p.y - 6} fill="#4a5568" fontSize={9} fontFamily="monospace">
                ({p.x},{p.y})
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}