const partition = (arr, low, high) => {
  let idx = low - 1
  const pivot = arr[high]

  for (let i = low; i < high; i++) {
    if (arr[i] < pivot) {
      idx++
      let overriden = arr[idx]
      arr[idx] = arr[i]
      arr[i] = overriden
    }
  }

  idx++
  arr[high] = arr[idx]
  arr[idx] = pivot

  return idx
}

const qs = (arr, low, high) => {
  if (low >= high) {
    return
  }
  let pivotIdx = partition(arr, low, high)

  qs(arr, low, pivotIdx - 1)
  qs(arr, pivotIdx + 1, high)
}

const quicksort = (arr) => {
  qs(arr, 0, arr.length - 1)
  return arr
}

console.log(quicksort([9, 8, 7, 6, 5, 4, 3, 2, 1]))
console.log(quicksort([3, 7, 4, 9, 2, 0]))
