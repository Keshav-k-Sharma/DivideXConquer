function dist(p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

export function generateClosestPairSteps(points) {
  const steps = []
  const pts = [...points].sort((a, b) => a.x - b.x)

  function closestPair(pts) {
    if (pts.length <= 3) {
      let minD = Infinity, best = [pts[0], pts[1]]
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const d = dist(pts[i], pts[j])
          steps.push({
            points: pts,
            comparing: [pts[i], pts[j]],
            phase: 'conquer',
            message: `Checking distance between (${pts[i].x},${pts[i].y}) and (${pts[j].x},${pts[j].y}) = ${d.toFixed(2)}`,
            currentDist: d,
          })
          if (d < minD) { minD = d; best = [pts[i], pts[j]] }
        }
      return { d: minD, pair: best }
    }

    const mid = Math.floor(pts.length / 2)
    const midPoint = pts[mid]

    steps.push({
      points: pts,
      midPoint,
      leftPoints: pts.slice(0, mid),
      rightPoints: pts.slice(mid),
      phase: 'divide',
      message: `Dividing ${pts.length} points at x = ${midPoint.x}`,
      currentDist: null,
    })

    const leftResult = closestPair(pts.slice(0, mid))
    const rightResult = closestPair(pts.slice(mid))

    const d = Math.min(leftResult.d, rightResult.d)
    const best = leftResult.d < rightResult.d ? leftResult : rightResult

    const strip = pts.filter(p => Math.abs(p.x - midPoint.x) < d)

    steps.push({
      points: pts,
      strip,
      bestPair: best.pair,
      phase: 'combine',
      message: `Best distance so far: ${d.toFixed(2)}. Checking strip of ${strip.length} points.`,
      currentDist: d,
    })

    return best
  }

  closestPair(pts)
  return steps
}

export function generateRandomPoints(n = 10) {
  return Array.from({ length: n }, (_, i) => ({
    x: Math.floor(Math.random() * 500) + 20,
    y: Math.floor(Math.random() * 300) + 20,
    id: i,
  }))
}