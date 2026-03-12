export function generateStrassenSteps(A, B) {
  const steps = []

  const [[a, b], [c, d]] = A
  const [[e, f], [g, h]] = B

  const products = [
    { name: 'M1', formula: '(a+d)(e+h)', value: (a + d) * (e + h) },
    { name: 'M2', formula: '(c+d)e', value: (c + d) * e },
    { name: 'M3', formula: 'a(f-h)', value: a * (f - h) },
    { name: 'M4', formula: 'd(g-e)', value: d * (g - e) },
    { name: 'M5', formula: '(a+b)h', value: (a + b) * h },
    { name: 'M6', formula: '(c-a)(e+f)', value: (c - a) * (e + f) },
    { name: 'M7', formula: '(b-d)(g+h)', value: (b - d) * (g + h) },
  ]

  steps.push({ A, B, phase: 'divide', activeM: null, products: [],
    message: 'Strassen: split into 7 multiplications instead of 8', result: null })

  products.forEach((p, i) => {
    steps.push({ A, B, phase: 'conquer', activeM: i, products: products.slice(0, i + 1),
      message: `Computing ${p.name} = ${p.formula} = ${p.value}`, result: null })
  })

  const M = products.map(p => p.value)
  const C = [
    [M[0] + M[3] - M[4] + M[6], M[2] + M[4]],
    [M[1] + M[3], M[0] - M[1] + M[2] + M[5]],
  ]

  steps.push({ A, B, phase: 'combine', activeM: null, products,
    message: 'Combine M values to get result matrix C', result: C })

  return steps
}

export const DEFAULT_A = [[1, 2], [3, 4]]
export const DEFAULT_B = [[5, 6], [7, 8]]