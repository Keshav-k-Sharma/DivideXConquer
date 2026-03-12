'use client'

const phaseColors = { divide: '#00c8ff', conquer: '#a855f7', combine: '#00ff9f' }

function Matrix({ data, label, activeRow, activeCol, activeK, isA, isB }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-mono text-xs text-muted">{label}</span>
      <div className="border border-border rounded-lg overflow-hidden">
        {data.map((row, i) => (
          <div key={i} className="flex">
            {row.map((val, j) => {
              let bg = '#0f1117'
              if (isA && i === activeRow && j === activeK) bg = '#00c8ff30'
              if (isB && i === activeK && j === activeCol) bg = '#ff6b3530'
              return (
                <div key={j} className="w-12 h-12 flex items-center justify-center font-mono text-sm border border-border transition-all"
                  style={{ background: bg }}>
                  {val}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MatrixMultiViz({ step }) {
  if (!step) return null
  const { A, B, C, activeRow, activeCol, activeK, phase, message } = step

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs px-3 py-1 rounded-full border uppercase tracking-widest"
          style={{ color: phaseColors[phase], borderColor: phaseColors[phase] + '60', background: phaseColors[phase] + '15' }}>
          {phase}
        </span>
        <span className="text-sm text-muted">{message}</span>
      </div>

      <div className="flex items-center justify-center gap-8 flex-wrap">
        <Matrix data={A} label="Matrix A" activeRow={activeRow} activeK={activeK} isA />
        <span className="font-display text-2xl text-muted">×</span>
        <Matrix data={B} label="Matrix B" activeCol={activeCol} activeK={activeK} isB />
        <span className="font-display text-2xl text-muted">=</span>
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-muted">Result C</span>
          <div className="border border-border rounded-lg overflow-hidden">
            {C.map((row, i) => (
              <div key={i} className="flex">
                {row.map((val, j) => {
                  let bg = '#0f1117'
                  if (i === activeRow && j === activeCol) bg = '#00ff9f30'
                  return (
                    <div key={j} className="w-12 h-12 flex items-center justify-center font-mono text-sm border border-border transition-all"
                      style={{ background: bg }}>
                      {val || ''}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}