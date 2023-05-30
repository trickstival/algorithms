const matrix = [
  [0, 2, 0, 3],
  [1, 0, 0, 0],
  [1, 0, 0, 2],
  [0, 1, 0, 0],
]

function retraceBackwards (searchLog) {
  let [curFrom, curTo] = searchLog[searchLog.length - 1]
  const pathFound = [[curFrom, curTo]]

  for (let i = searchLog.length - 2; i >= 0; i--) {
    const [from, to] = searchLog[i]
    if (to === curFrom) {
      pathFound.unshift([from, to])
      position = from
    }
  }

  return pathFound
}

function bfs (M, source, searchedItem) {
  const seen = Array(M.length).fill(false)

  seen[0] = true
  const queue = [source]
  const searchLog = []

  while(queue.length) {
    const node = queue.shift()

    if (node === searchedItem) {
      break
    }

    const adjecencies = M[node]

    for (let i = 0; i < adjecencies.length; i++) {
      if (seen[i]) {
        continue
      }

      if (adjecencies[i] !== 0) {
        queue.push(i)
        searchLog.push([node, i])
      }
    }
  };

  const pathFound = retraceBackwards(searchLog)

  return { pathFound, searchLog }
}

// { pathFound: [ [ 0, 3 ] ], searchLog: [ [ 0, 1 ], [ 0, 3 ] ] }
console.log(bfs(matrix, 0, 3))
