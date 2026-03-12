'use client'

const phaseColors = { divide: '#00c8ff', conquer: '#a855f7', combine: '#00ff9f' }

export default function ClosestPairViz({ step }) {
  if (!step) return null
  const { points, comparing = [], strip = [], bestPair, midPoint, leftPoints = [], rightPoints = [], phase, message, currentDist } = step

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs px-3 py-1 rounded-full border uppercase tracking-widest"
          style={{ color: phaseColors[phase], borderColor: phaseColors[phase] + '60', background: phaseColors[phase] + '15' }}>
          {phase}
        </span>
        <span className="text-sm text-muted">{message}</span>
      </div>

      <svg width="100%" viewBox="0 0 540 340" className="bg-bg rounded-xl border border-border mb-4">
        {midPoint && (
          <line x1={midPoint.x} y1={0} x2={midPoint.x} y2={340}
            stroke="#00c8ff" strokeWidth={1} strokeDasharray="4,4" opacity={0.5} />
        )}

        {bestPair && (
          <line x1={bestPair[0].x} y1={bestPair[0].y} x2={bestPair[1].x} y2={bestPair[1].y}
            stroke="#00ff9f" strokeWidth={2} opacity={0.8} />
        )}

        {comparing.length === 2 && (
          <line x1={comparing[0].x} y1={comparing[0].y} x2={comparing[1].x} y2={comparing[1].y}
            stroke="#a855f7" strokeWidth={2} opacity={0.8} />
        )}

        {points.map((p, i) => {
          let fill = '#4a5568'
          if (bestPair?.includes(p)) fill = '#00ff9f'
          else if (comparing.includes(p)) fill = '#a855f7'
          else if (strip.includes(p)) fill = '#ffd700'
          else if (leftPoints.includes(p)) fill = '#00c8ff'
          else if (rightPoints.includes(p)) fill = '#ff6b35'

          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={6} fill={fill} />
              <text x={p.x + 8} y={p.y - 6} fill="#4a5568" fontSize={10} fontFamily="monospace">
                ({p.x},{p.y})
              </text>
            </g>
          )
        })}
      </svg>

      {currentDist !== null && (
        <div className="bg-bg border border-border rounded-lg p-3 text-center">
          <div className="text-muted text-xs font-mono mb-1">CURRENT MIN DISTANCE</div>
          <div className="font-display text-2xl font-bold text-accent">{currentDist?.toFixed(2)}</div>
        </div>
      )}
    </div>
  )
}