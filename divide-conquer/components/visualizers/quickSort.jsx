'use client'

const phaseColors = {
  divide: '#00c8ff',
  conquer: '#a855f7',
  combine: '#00ff9f',
}

export default function QuickSortViz({ step }) {
  if (!step) return null
  const { array, pivot, comparing = [], swapped = [], sorted = [], phase, message, low, high } = step
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
          if (sorted.includes(i)) color = '#00ff9f'
          else if (i === pivot) color = '#ffd700'
          else if (swapped.includes(i)) color = '#ff6b35'
          else if (comparing.includes(i)) color = '#a855f7'
          else if (i >= low && i <= high) color = '#00c8ff'

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-muted font-mono">{val}</span>
              <div className="w-full rounded-t transition-all duration-300"
                style={{ height: `${(val / maxVal) * 160}px`, background: color,
                  boxShadow: i === pivot ? `0 0 12px ${color}` : 'none' }} />
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-4 text-xs font-mono">
        {[
          { color: '#ffd700', label: 'Pivot' },
          { color: '#00c8ff', label: 'Active range' },
          { color: '#a855f7', label: 'Comparing' },
          { color: '#ff6b35', label: 'Swapped' },
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