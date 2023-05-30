const heap = []
const MinHeap = {
  parent: (idx) => Math.floor((idx - 1) / 2),
  children: (idx) => [2 * idx + 1, 2 * idx + 2],

  bubbleUp: (idx) => {
    if (idx === 0) {
      return
    }

    const num = heap[idx]
    const parentIdx = MinHeap.parent(idx)

    if (num < heap[parentIdx]) {
      heap[idx] = heap[parentIdx]
      heap[parentIdx] = num
      MinHeap.bubbleUp(parentIdx)
    }
  },
  bubbleDown: (i) => {
    const [ia, ib] = MinHeap.children(i)

    const childA = heap[ia] || Infinity
    const childB = heap[ib] || Infinity

    if (childB < childA && childB < heap[i]) {
      heap[ib] = heap[i]
      heap[i] = childB
      MinHeap.bubbleDown(ib)
    } else if(childA < heap[i]) {
      heap[ia] = heap[i]
      heap[i] = childA
      MinHeap.bubbleDown(ia)
    }
  },
  add: (num) => {
    heap.push(num)
    let idx = heap.length - 1
    MinHeap.bubbleUp(idx)
  },
  pop: () => {
    const last = heap.pop()
    const first = heap[0]
    heap[0] = last
    MinHeap.bubbleDown(0)

    return first
  }
}


for (let i = 4; i < 10; i++) {
  MinHeap.add(i)
}

MinHeap.add(2)
MinHeap.add(1)

console.log(heap)

MinHeap.pop()
console.log(heap)
MinHeap.pop()
console.log(heap)
MinHeap.pop()
console.log(heap)
MinHeap.pop()
console.log(heap)
