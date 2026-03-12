'use client'
import { useState, useEffect, useRef } from 'react'
import { generateClosestPairSteps, generateRandomPoints } from '../../../lib/algorithms/closestPair'
import ClosestPairViz from '../../../components/visualizers/closestPair'

export default function ClosestPairPage() {
  const [steps, setSteps] = useState([])
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [points, setPoints] = useState([])
  const intervalRef = useRef(null)

  const regenerate = () => {
    const pts = generateRandomPoints(10)
    setPoints(pts)
    setSteps(generateClosestPairSteps(pts))
    setCurrent(0); setPlaying(false)
  }

  useEffect(() => { regenerate() }, [])

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrent(prev => {
          if (prev >= steps.length - 1) { setPlaying(false); return prev }
          return prev + 1
        })
      }, 900)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing, steps])

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <a href="/" className="text-muted text-sm font-mono hover:text-accent mb-4 block">← back</a>
        <h1 className="font-display text-4xl font-extrabold text-yellow mb-2">Closest Pair of Points</h1>
        <p className="text-muted text-sm">Find the two closest points in a plane efficiently.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Recurrence', value: 'T(n) = 2T(n/2) + O(n log n)' },
          { label: 'Time Complexity', value: 'O(n log n)' },
          { label: 'Space Complexity', value: 'O(n)' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface border border-border rounded-xl p-4">
            <div className="text-muted text-xs mb-1">{label}</div>
            <div className="font-mono text-yellow text-sm">{value}</div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 mb-6">
        <ClosestPairViz step={steps[current]} />
      </div>

      <div className="font-mono text-xs text-muted text-center mb-4">Step {current + 1} of {steps.length}</div>

      <div className="flex items-center justify-center gap-4">
        <button onClick={regenerate} className="px-4 py-2 rounded-lg border border-border text-muted hover:text-text transition-all font-mono text-sm">↻ New Points</button>
        <button onClick={() => setCurrent(0)} className="px-4 py-2 rounded-lg border border-border text-muted hover:text-text transition-all font-mono text-sm">⟨⟨ Reset</button>
        <button onClick={() => setCurrent(p => Math.max(0, p - 1))} className="px-4 py-2 rounded-lg border border-border text-muted hover:text-text transition-all font-mono text-sm">⟨ Prev</button>
        <button onClick={() => setPlaying(p => !p)} className="px-6 py-2 rounded-lg font-mono text-sm font-bold transition-all"
          style={{ background: playing ? '#ff6b3520' : '#ffd70020', color: playing ? '#ff6b35' : '#ffd700', border: `1px solid ${playing ? '#ff6b35' : '#ffd700'}` }}>
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={() => setCurrent(p => Math.min(steps.length - 1, p + 1))} className="px-4 py-2 rounded-lg border border-border text-muted hover:text-text transition-all font-mono text-sm">Next ⟩</button>
      </div>
    </div>
  )
}