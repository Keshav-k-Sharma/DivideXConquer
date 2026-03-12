'use client'

const phaseColors = { divide: '#00c8ff', conquer: '#a855f7', combine: '#00ff9f' }

function MatrixBox({ data, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-mono text-xs text-muted">{label}</span>
      <div className="border border-border rounded-lg overflow-hidden">
        {data.map((row, i) => (
          <div key={i} className="flex">
            {row.map((val, j) => (
              <div key={j} className="w-10 h-10 flex items-center justify-center font-mono text-sm border border-border bg-surface">{val}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StrassenViz({ step }) {
  if (!step) return null
  const { A, B, products, activeM, phase, message, result } = step

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs px-3 py-1 rounded-full border uppercase tracking-widest"
          style={{ color: phaseColors[phase], borderColor: phaseColors[phase] + '60', background: phaseColors[phase] + '15' }}>
          {phase}
        </span>
        <span className="text-sm text-muted">{message}</span>
      </div>

      <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
        <MatrixBox data={A} label="A" />
        <span className="text-muted text-xl">×</span>
        <MatrixBox data={B} label="B" />
        {result && <>
          <span className="text-muted text-xl">=</span>
          <MatrixBox data={result} label="C" />
        </>}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {['M1','M2','M3','M4','M5','M6','M7'].map((name, i) => {
          const p = products.find(p => p.name === name)
          const isActive = activeM === i
          return (
            <div key={name} className="rounded-lg border p-2 text-center transition-all"
              style={{ borderColor: isActive ? '#a855f7' : '#1e2235', background: isActive ? '#a855f720' : '#0f1117' }}>
              <div className="font-mono text-xs text-muted">{name}</div>
              {p ? <div className="font-mono text-sm text-accent">{p.value}</div>
                : <div className="font-mono text-sm text-muted">—</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}