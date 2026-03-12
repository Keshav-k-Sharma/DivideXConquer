export function generateLargestSubarraySteps(array) {
  const steps = []
  const arr = [...array]

  function maxCrossingSum(arr, left, mid, right) {
    let leftSum = -Infinity, sum = 0, leftIdx = mid
    for (let i = mid; i >= left; i--) {
      sum += arr[i]
      if (sum > leftSum) { leftSum = sum; leftIdx = i }
    }

    let rightSum = -Infinity; sum = 0; let rightIdx = mid + 1
    for (let i = mid + 1; i <= right; i++) {
      sum += arr[i]
      if (sum > rightSum) { rightSum = sum; rightIdx = i }
    }

    steps.push({
      array: arr, left, right, mid,
      crossLeft: leftIdx, crossRight: rightIdx,
      phase: 'conquer',
      message: `Cross sum from ${leftIdx} to ${rightIdx} = ${leftSum + rightSum}`,
      value: leftSum + rightSum,
    })

    return { sum: leftSum + rightSum, left: leftIdx, right: rightIdx }
  }

  function maxSubarray(arr, left, right) {
    if (left === right) {
      steps.push({
        array: arr, left, right,
        active: [left],
        phase: 'divide',
        message: `Single element: ${arr[left]}`,
        value: arr[left],
      })
      return { sum: arr[left], left, right }
    }

    const mid = Math.floor((left + right) / 2)
    steps.push({
      array: arr, left, right, mid,
      phase: 'divide',
      message: `Dividing from ${left} to ${right} at mid ${mid}`,
      value: null,
    })

    const leftResult = maxSubarray(arr, left, mid)
    const rightResult = maxSubarray(arr, mid + 1, right)
    const crossResult = maxCrossingSum(arr, left, mid, right)

    const best = [leftResult, rightResult, crossResult].reduce((a, b) => a.sum > b.sum ? a : b)

    steps.push({
      array: arr, left, right, mid,
      highlight: Array.from({ length: best.right - best.left + 1 }, (_, i) => best.left + i),
      phase: 'combine',
      message: `Best subarray from ${best.left} to ${best.right} = ${best.sum}`,
      value: best.sum,
    })

    return best
  }

  maxSubarray(arr, 0, arr.length - 1)
  return steps
}