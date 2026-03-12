'use client'

const phaseColors = {
  divide: '#00c8ff',
  conquer: '#a855f7',
  combine: '#00ff9f',
}

export default function MergeSortViz({ step }) {
  if (!step) return null

  const { array, left, right, mid, comparing = [], sorted = [], phase, message } = step
  const maxVal = Math.max(...array)

  return (
    <div className="w-full">

      {/* Phase Badge */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="font-mono text-xs px-3 py-1 rounded-full border uppercase tracking-widest"
          style={{ color: phaseColors[phase], borderColor: phaseColors[phase] + '60', background: phaseColors[phase] + '15' }}
        >
          {phase}
        </span>
        <span className="text-sm text-muted">{message}</span>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-1 h-48 mb-6">
        {array.map((val, i) => {
          let color = '#1e2235'

          if (sorted.includes(i)) color = '#00ff9f'
          else if (comparing.includes(i)) color = '#a855f7'
          else if (i >= left && i <= right) {
            if (i <= mid) color = '#00c8ff'
            else color = '#ff6b35'
          }

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-muted font-mono">{val}</span>
              <div
                className="w-full rounded-t transition-all duration-300"
                style={{
                  height: `${(val / maxVal) * 160}px`,
                  background: color,
                  boxShadow: comparing.includes(i) ? `0 0 12px ${color}` : 'none',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs font-mono">
        {[
          { color: '#00c8ff', label: 'Left half' },
          { color: '#ff6b35', label: 'Right half' },
          { color: '#a855f7', label: 'Comparing' },
          { color: '#00ff9f', label: 'Sorted' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ background: color }} />
            <span className="text-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}