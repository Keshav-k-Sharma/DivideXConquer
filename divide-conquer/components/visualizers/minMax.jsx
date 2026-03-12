'use client'

const phaseColors = { divide: '#00c8ff', conquer: '#a855f7', combine: '#00ff9f' }

export default function MinMaxViz({ step }) {
  if (!step) return null
  const { array, left, right, mid, comparing = [], active = [], phase, message, currentMin, currentMax } = step
  const maxVal = Math.max(...array)

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs px-3 py-1 rounded-full border uppercase tracking-widest"
          style={{ color: phaseColors[phase], borderColor: phaseColors[phase] + '60', background: phaseColors[phase] + '15' }}>
          {phase}
        </span>
        <span className="text-sm text-muted">{message}</span>
      </div>

      <div className="flex items-end gap-1 h-48 mb-6">
        {array.map((val, i) => {
          let color = '#1e2235'
          if (active.includes(i)) color = '#ffd700'
          else if (comparing.includes(i)) color = '#a855f7'
          else if (mid !== undefined && i >= left && i <= mid) color = '#00c8ff'
          else if (mid !== undefined && i > mid && i <= right) color = '#ff6b35'

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-muted font-mono">{val}</span>
              <div className="w-full rounded-t transition-all duration-300"
                style={{ height: `${(val / maxVal) * 160}px`, background: color }} />
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-bg border border-border rounded-lg p-3 text-center">
          <div className="text-muted text-xs font-mono mb-1">CURRENT MIN</div>
          <div className="font-display text-2xl font-bold text-cyan">{currentMin ?? '—'}</div>
        </div>
        <div className="bg-bg border border-border rounded-lg p-3 text-center">
          <div className="text-muted text-xs font-mono mb-1">CURRENT MAX</div>
          <div className="font-display text-2xl font-bold text-purple">{currentMax ?? '—'}</div>
        </div>
      </div>
    </div>
  )
}