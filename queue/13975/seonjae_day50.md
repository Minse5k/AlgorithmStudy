# 13975 파일 합치기 3

## 문제

[13975번: 파일 합치기 3](https://www.acmicpc.net/problem/13975)

## 나의 풀이

```jsx
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");

class Heap {
  constructor() {
    this.heap = [];
  }
  get size() {
    return this.heap.length;
  }
}

class MinHeap extends Heap {
  input(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp(currentIndex = this.size - 1) {
    if (currentIndex < 1) return;

    const currentNode = this.heap[currentIndex];
    const parentIndex = Math.floor((currentIndex - 1) / 2);
    const parentNode = this.heap[parentIndex];

    if (parentNode <= currentNode) return;

    [this.heap[currentIndex], this.heap[parentIndex]] = [
      parentNode,
      currentNode,
    ];
    this.bubbleUp(parentIndex);
  }

  pull() {
    const min = this.heap[0];
    if (this.size === 1) {
      return this.heap.pop();
    }
    this.heap[0] = this.heap.pop();

    this.bubbleDown();
    return min;
  }

  bubbleDown(currentIndex = 0) {
    const leftIndex = currentIndex * 2 + 1;
    const rightIndex = currentIndex * 2 + 2;
    const length = this.size;
    let parentIndex = currentIndex;

    if (leftIndex <= length && this.heap[leftIndex] < this.heap[parentIndex]) {
      parentIndex = leftIndex;
    }
    if (
      rightIndex <= length &&
      this.heap[rightIndex] < this.heap[parentIndex]
    ) {
      parentIndex = rightIndex;
    }
    if (parentIndex !== currentIndex) {
      [this.heap[parentIndex], this.heap[currentIndex]] = [
        this.heap[currentIndex],
        this.heap[parentIndex],
      ];
      this.bubbleDown(parentIndex);
    }
  }
}

const T = parseInt(input.shift());
let answer = "";

for (let i = 0; i < T; i++) {
  const arr = input[i * 2 + 1].split(" ");
  const priority = arr.reduce((min, num) => {
    min.input(parseInt(num));
    return min;
  }, new MinHeap());
  let sum = 0;
  while (priority.size > 1) {
    const prev = priority.pull();
    const next = priority.pull();
    sum += prev + next;
    priority.input(prev + next);
  }
  answer += sum + "\n";
}

console.log(answer);
```

## 설명

나는 이 문제를 보고 풀이방법을 생각을 못했는데 풀었던 문제 중 카드뒤집기와 비슷하다고 생각하게 됐다. 그래서 풀이방법을 적어보기로 했다.

1. 최소힙으로 모든 파일을 저장한다.
2. 길이가 1이 될 때 까지 힙에서 두번 뺀 값을 더해서 sum에 더해주고 다시 힙에 넣어주면 된다.

말로 하면 되게 쉽지만 그림으로도 그려봤다.

![풀이방법](https://github.com/Minse5k/AlgorithmStudy/tree/main/queue/7662/seonjae_solution.jpg)
