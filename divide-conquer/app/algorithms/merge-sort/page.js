'use client'

import { useState, useEffect, useRef } from 'react'
import { generateMergeSortSteps } from '../../../lib/algorithms/mergeSort'
import MergeSortViz from '../../../components/visualizers/MergeSortViz'

const DEFAULT_ARRAY = [38, 27, 43, 3, 9, 82, 10]

export default function MergeSortPage() {
  const [steps, setSteps] = useState([])
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [inputVal, setInputVal] = useState(DEFAULT_ARRAY.join(', '))
  const intervalRef = useRef(null)

  useEffect(() => {
    const arr = inputVal.split(',').map(n => parseInt(n.trim())).filter(Boolean)
    setSteps(generateMergeSortSteps(arr))
    setCurrent(0)
    setPlaying(false)
  }, [inputVal])

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrent(prev => {
          if (prev >= steps.length - 1) {
            setPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 800)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing, steps])

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <a href="/" className="text-muted text-sm font-mono hover:text-accent mb-4 block">← back</a>
        <h1 className="font-display text-4xl font-extrabold text-accent mb-2">Merge Sort</h1>
        <p className="text-muted text-sm">Divide array in half, sort each half, merge them back together.</p>
      </div>

      {/* Complexity */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Recurrence', value: 'T(n) = 2T(n/2) + O(n)' },
          { label: 'Time Complexity', value: 'O(n log n)' },
          { label: 'Space Complexity', value: 'O(n)' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface border border-border rounded-xl p-4">
            <div className="text-muted text-xs mb-1">{label}</div>
            <div className="font-mono text-accent text-sm">{value}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-surface border border-border rounded-xl p-4 mb-6">
        <label className="text-muted text-xs font-mono block mb-2">INPUT ARRAY</label>
        <input
          className="w-full bg-bg border border-border rounded-lg px-4 py-2 font-mono text-sm text-text focus:outline-none focus:border-accent"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="e.g. 38, 27, 43, 3, 9"
        />
      </div>

      {/* Visualizer */}
      <div className="bg-surface border border-border rounded-xl p-6 mb-6">
        <MergeSortViz step={steps[current]} />
      </div>

      {/* Step Info */}
      <div className="font-mono text-xs text-muted text-center mb-4">
        Step {current + 1} of {steps.length}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrent(0)}
          className="px-4 py-2 rounded-lg border border-border text-muted hover:text-text hover:border-accent transition-all font-mono text-sm"
        >
          ⟨⟨ Reset
        </button>
        <button
          onClick={() => setCurrent(p => Math.max(0, p - 1))}
          className="px-4 py-2 rounded-lg border border-border text-muted hover:text-text hover:border-accent transition-all font-mono text-sm"
        >
          ⟨ Prev
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          className="px-6 py-2 rounded-lg font-mono text-sm font-bold transition-all"
          style={{ background: playing ? '#ff6b3520' : '#00ff9f20', color: playing ? '#ff6b35' : '#00ff9f', border: `1px solid ${playing ? '#ff6b35' : '#00ff9f'}` }}
        >
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={() => setCurrent(p => Math.min(steps.length - 1, p + 1))}
          className="px-4 py-2 rounded-lg border border-border text-muted hover:text-text hover:border-accent transition-all font-mono text-sm"
        >
          Next ⟩
        </button>
      </div>

    </div>
  )
}