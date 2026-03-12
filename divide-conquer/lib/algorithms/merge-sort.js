export function generateMergeSortSteps(array) {
  const steps = []
  const arr = [...array]

  function mergeSort(arr, left, right) {
    if (left >= right) return

    const mid = Math.floor((left + right) / 2)

    steps.push({
      array: [...arr],
      left, right, mid,
      phase: 'divide',
      message: `Dividing from index ${left} to ${right} at mid ${mid}`,
    })

    mergeSort(arr, left, mid)
    mergeSort(arr, mid + 1, right)
    merge(arr, left, mid, right)
  }

  function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        left, right, mid,
        comparing: [left + i, mid + 1 + j],
        phase: 'conquer',
        message: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
      })

      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++]
      } else {
        arr[k++] = rightArr[j++]
      }
    }

    while (i < leftArr.length) arr[k++] = leftArr[i++]
    while (j < rightArr.length) arr[k++] = rightArr[j++]

    steps.push({
      array: [...arr],
      left, right, mid,
      sorted: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      phase: 'combine',
      message: `Merged and sorted from index ${left} to ${right}`,
    })
  }

  mergeSort(arr, 0, arr.length - 1)
  return steps
}