export function generateMinMaxSteps(array) {
  const steps = []
  const arr = [...array]

  function minMax(arr, left, right) {
    if (left === right) {
      steps.push({
        array: arr,
        left, right,
        active: [left],
        phase: 'divide',
        message: `Single element ${arr[left]} — both min and max`,
        currentMin: arr[left],
        currentMax: arr[left],
      })
      return { min: arr[left], max: arr[left] }
    }

    if (right - left === 1) {
      const mn = Math.min(arr[left], arr[right])
      const mx = Math.max(arr[left], arr[right])
      steps.push({
        array: arr,
        left, right,
        comparing: [left, right],
        phase: 'conquer',
        message: `Comparing ${arr[left]} and ${arr[right]} — min: ${mn}, max: ${mx}`,
        currentMin: mn,
        currentMax: mx,
      })
      return { min: mn, max: mx }
    }

    const mid = Math.floor((left + right) / 2)
    steps.push({
      array: arr,
      left, right, mid,
      phase: 'divide',
      message: `Dividing from ${left} to ${right} at mid ${mid}`,
      currentMin: null,
      currentMax: null,
    })

    const leftResult = minMax(arr, left, mid)
    const rightResult = minMax(arr, mid + 1, right)

    const finalMin = Math.min(leftResult.min, rightResult.min)
    const finalMax = Math.max(leftResult.max, rightResult.max)

    steps.push({
      array: arr,
      left, right, mid,
      phase: 'combine',
      message: `Combined — min: ${finalMin}, max: ${finalMax}`,
      currentMin: finalMin,
      currentMax: finalMax,
    })

    return { min: finalMin, max: finalMax }
  }

  minMax(arr, 0, arr.length - 1)
  return steps
}