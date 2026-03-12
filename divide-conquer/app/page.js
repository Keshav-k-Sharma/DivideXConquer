import Link from 'next/link'

const algorithms = [
  {
    name: 'Merge Sort',
    slug: 'merge-sort',
    complexity: 'O(n log n)',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    color: '#00ff9f',
    desc: 'Divide array in half, sort each half, merge them back together.',
  },
  {
    name: 'Quick Sort',
    slug: 'quick-sort',
    complexity: 'O(n log n)',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    color: '#00c8ff',
    desc: 'Pick a pivot, partition around it, recursively sort each side.',
  },
  {
    name: 'Min & Max Finding',
    slug: 'min-max',
    complexity: 'O(n)',
    recurrence: 'T(n) = 2T(n/2) + O(1)',
    color: '#a855f7',
    desc: 'Find min and max simultaneously by splitting the array.',
  },
  {
    name: 'Largest Subarray Sum',
    slug: 'largest-subarray',
    complexity: 'O(n log n)',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    color: '#ff6b35',
    desc: 'Find the subarray with the maximum sum using divide and conquer.',
  },
  {
    name: 'Closest Pair of Points',
    slug: 'closest-pair',
    complexity: 'O(n log n)',
    recurrence: 'T(n) = 2T(n/2) + O(n log n)',
    color: '#ffd700',
    desc: 'Find the two closest points in a plane efficiently.',
  },
  {
    name: 'Matrix Multiplication',
    slug: 'matrix-multiplication',
    complexity: 'O(n³)',
    recurrence: 'T(n) = 8T(n/2) + O(n²)',
    color: '#00ff9f',
    desc: 'Multiply matrices by dividing into submatrices recursively.',
  },
  {
    name: "Strassen's Algorithm",
    slug: 'strassen',
    complexity: 'O(n^2.81)',
    recurrence: 'T(n) = 7T(n/2) + O(n²)',
    color: '#00c8ff',
    desc: 'Faster matrix multiplication using only 7 recursive multiplications.',
  },
  {
    name: 'Convex Hull',
    slug: 'convex-hull',
    complexity: 'O(n log n)',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    color: '#a855f7',
    desc: 'Find the smallest convex polygon containing all given points.',
  },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="mb-16 text-center">
        <h1 className="font-display text-5xl font-extrabold mb-4">
          Divide <span className="text-accent text-glow">&</span> Conquer
        </h1>
        <p className="text-muted font-mono text-sm">
          Step-by-step algorithm visualizations with time complexity analysis
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo) => (
          <Link key={algo.slug} href={`/algorithms/${algo.slug}`}>
            <div className="group cursor-pointer rounded-xl border border-border bg-surface p-6 hover:border-opacity-80 transition-all duration-300 hover:-translate-y-1"
              style={{ '--hover-color': algo.color }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-mono text-xs px-2 py-1 rounded-full border"
                  style={{ color: algo.color, borderColor: algo.color + '40', background: algo.color + '10' }}
                >
                  {algo.complexity}
                </span>
                <span className="text-muted text-xs">→</span>
              </div>

              {/* Name */}
              <h2 className="font-display font-bold text-lg mb-2 group-hover:text-white transition-colors"
                style={{ color: algo.color }}>
                {algo.name}
              </h2>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed mb-4">
                {algo.desc}
              </p>

              {/* Recurrence */}
              <div className="font-mono text-xs text-muted border-t border-border pt-3">
                {algo.recurrence}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}