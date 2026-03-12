function cross(O, A, B) {
  return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x)
}

export function generateConvexHullSteps(points) {
  const steps = []
  const pts = [...points].sort((a, b) => a.x - b.x || a.y - b.y)

  steps.push({ points: pts, hull: [], phase: 'divide',
    message: `Sorted ${pts.length} points by x-coordinate` })

  const lower = []
  for (let i = 0; i < pts.length; i++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pts[i]) <= 0) {
      lower.pop()
    }
    lower.push(pts[i])
    steps.push({ points: pts, hull: [...lower], phase: 'conquer',
      message: `Building lower hull — added (${pts[i].x}, ${pts[i].y})` })
  }

  const upper = []
  for (let i = pts.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pts[i]) <= 0) {
      upper.pop()
    }
    upper.push(pts[i])
    steps.push({ points: pts, hull: [...lower, ...upper], phase: 'conquer',
      message: `Building upper hull — added (${pts[i].x}, ${pts[i].y})` })
  }

  const hull = [...lower, ...upper]
  steps.push({ points: pts, hull, phase: 'combine',
    message: `Convex hull complete with ${hull.length} points` })

  return steps
}

export function generateRandomPoints(n = 12) {
  return Array.from({ length: n }, (_, i) => ({
    x: Math.floor(Math.random() * 480) + 30,
    y: Math.floor(Math.random() * 280) + 30,
    id: i,
  }))
}