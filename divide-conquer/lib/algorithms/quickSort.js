export function generateQuickSortSteps(array) {
  const steps = []
  const arr = [...array]

  function quickSort(arr, low, high) {
    if (low >= high) return
    const pivotIdx = partition(arr, low, high)
    quickSort(arr, low, pivotIdx - 1)
    quickSort(arr, pivotIdx + 1, high)
  }

  function partition(arr, low, high) {
    const pivot = arr[high]
    let i = low - 1

    steps.push({
      array: [...arr],
      pivot: high,
      low, high,
      phase: 'divide',
      message: `Pivot selected: ${pivot} at index ${high}`,
    })

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        pivot: high,
        comparing: [i + 1, j],
        low, high,
        phase: 'conquer',
        message: `Comparing ${arr[j]} with pivot ${pivot}`,
      })

      if (arr[j] <= pivot) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        steps.push({
          array: [...arr],
          pivot: high,
          swapped: [i, j],
          low, high,
          phase: 'conquer',
          message: `Swapped ${arr[j]} and ${arr[i]}`,
        })
      }
    }

    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    steps.push({
      array: [...arr],
      pivot: i + 1,
      sorted: [i + 1],
      low, high,
      phase: 'combine',
      message: `Pivot ${pivot} placed at correct position ${i + 1}`,
    })

    return i + 1
  }

  quickSort(arr, 0, arr.length - 1)
  return steps
}