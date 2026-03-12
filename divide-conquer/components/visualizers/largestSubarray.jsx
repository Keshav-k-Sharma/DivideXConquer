'use client'

const phaseColors = { divide: '#00c8ff', conquer: '#a855f7', combine: '#00ff9f' }

export default function LargestSubarrayViz({ step }) {
  if (!step) return null
  const { array, left, right, mid, highlight = [], active = [], crossLeft, crossRight, phase, message, value } = step
  const maxVal = Math.max(...array.map(Math.abs))

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
          if (highlight.includes(i)) color = '#00ff9f'
          else if (active.includes(i)) color = '#ffd700'
          else if (crossLeft !== undefined && i >= crossLeft && i <= crossRight) color = '#a855f7'
          else if (mid !== undefined && i >= left && i <= mid) color = '#00c8ff'
          else if (mid !== undefined && i > mid && i <= right) color = '#ff6b35'

          const height = Math.max((Math.abs(val) / maxVal) * 140, 4)

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-muted font-mono">{val}</span>
              <div className="w-full rounded-t transition-all duration-300"
                style={{ height: `${height}px`, background: color }} />
            </div>
          )
        })}
      </div>

      {value !== null && (
        <div className="bg-bg border border-border rounded-lg p-3 text-center">
          <div className="text-muted text-xs font-mono mb-1">CURRENT BEST SUM</div>
          <div className="font-display text-2xl font-bold text-accent">{value}</div>
        </div>
      )}
    </div>
  )
}