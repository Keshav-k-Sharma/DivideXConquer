'use client'
import { useState, useEffect, useRef } from 'react'
import { generateLargestSubarraySteps } from '../../../lib/algorithms/largestSubarray'
import LargestSubarrayViz from '../../../components/visualizers/largestSubarray'

const DEFAULT_ARRAY = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

export default function LargestSubarrayPage() {
  const [steps, setSteps] = useState([])
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [inputVal, setInputVal] = useState(DEFAULT_ARRAY.join(', '))
  const intervalRef = useRef(null)

  useEffect(() => {
    const arr = inputVal.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
    setSteps(generateLargestSubarraySteps(arr))
    setCurrent(0); setPlaying(false)
  }, [inputVal])

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrent(prev => {
          if (prev >= steps.length - 1) { setPlaying(false); return prev }
          return prev + 1
        })
      }, 800)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing, steps])

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <a href="/" className="text-muted text-sm font-mono hover:text-accent mb-4 block">← back</a>
        <h1 className="font-display text-4xl font-extrabold text-orange mb-2">Largest Subarray Sum</h1>
        <p className="text-muted text-sm">Find the subarray with the maximum sum using divide and conquer.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Recurrence', value: 'T(n) = 2T(n/2) + O(n)' },
          { label: 'Time Complexity', value: 'O(n log n)' },
          { label: 'Space Complexity', value: 'O(log n)' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface border border-border rounded-xl p-4">
            <div className="text-muted text-xs mb-1">{label}</div>
            <div className="font-mono text-orange text-sm">{value}</div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-4 mb-6">
        <label className="text-muted text-xs font-mono block mb-2">INPUT ARRAY (negatives allowed)</label>
        <input className="w-full bg-bg border border-border rounded-lg px-4 py-2 font-mono text-sm text-text focus:outline-none focus:border-orange"
          value={inputVal} onChange={e => setInputVal(e.target.value)} />
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 mb-6">
        <LargestSubarrayViz step={steps[current]} />
      </div>

      <div className="font-mono text-xs text-muted text-center mb-4">Step {current + 1} of {steps.length}</div>

      <div className="flex items-center justify-center gap-4">
        <button onClick={() => setCurrent(0)} className="px-4 py-2 rounded-lg border border-border text-muted hover:text-text transition-all font-mono text-sm">⟨⟨ Reset</button>
        <button onClick={() => setCurrent(p => Math.max(0, p - 1))} className="px-4 py-2 rounded-lg border border-border text-muted hover:text-text transition-all font-mono text-sm">⟨ Prev</button>
        <button onClick={() => setPlaying(p => !p)} className="px-6 py-2 rounded-lg font-mono text-sm font-bold transition-all"
          style={{ background: playing ? '#ff6b3520' : '#ff6b3520', color: playing ? '#ff6b35' : '#ff6b35', border: `1px solid #ff6b35` }}>
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={() => setCurrent(p => Math.min(steps.length - 1, p + 1))} className="px-4 py-2 rounded-lg border border-border text-muted hover:text-text transition-all font-mono text-sm">Next ⟩</button>
      </div>
    </div>
  )
}