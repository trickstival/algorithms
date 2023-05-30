const array = [5, 3, 9, 5, 2, 7, 9]

function bubble (arr) {
  for (let boundary = arr.length; boundary > 1; boundary--) {
    for (let i = 0; i < boundary; i++) {
      if (arr[i] > arr[i + 1]) {
        let val = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = val
      }
    }
  }
}

const arr2 = [5, 7, 8, 4, 3, 8, 2, 1]
function bubbleAlternative (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let val = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = val
      }
    }
  }
}

// bubble(array)
// console.log(array)

bubbleAlternative(arr2)
console.log(arr2)
