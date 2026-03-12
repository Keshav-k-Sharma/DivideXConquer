export function generateMatrixSteps(A, B) {
  const steps = []
  const n = A.length
  const C = Array.from({ length: n }, () => Array(n).fill(0))

  steps.push({ A, B, C: C.map(r => [...r]), phase: 'divide', activeRow: null, activeCol: null, activeK: null,
    message: `Multiplying two ${n}×${n} matrices` })

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        steps.push({
          A, B, C: C.map(r => [...r]),
          phase: 'conquer',
          activeRow: i, activeCol: j, activeK: k,
          message: `C[${i}][${j}] += A[${i}][${k}] × B[${k}][${j}] = ${A[i][k]} × ${B[k][j]} = ${A[i][k] * B[k][j]}`,
        })
        C[i][j] += A[i][k] * B[k][j]
      }
      steps.push({
        A, B, C: C.map(r => [...r]),
        phase: 'combine',
        activeRow: i, activeCol: j, activeK: null,
        message: `C[${i}][${j}] = ${C[i][j]} (complete)`,
      })
    }
  }

  return steps
}

export const DEFAULT_A = [[1, 2], [3, 4]]
export const DEFAULT_B = [[5, 6], [7, 8]]