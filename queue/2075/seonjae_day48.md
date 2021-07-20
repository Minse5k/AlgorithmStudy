# 2075 N번째 큰 수

# 문제

[2075번: N번째 큰 수](https://www.acmicpc.net/problem/2075)

# 나의 풀이

```jsx
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size = () => {
    return this.heap.length;
  };

  input = (node) => {
    if (this.size() === N) {
      if (node > this.heap[0]) this.heap[0] = node;
      this.bubbleDown();
      return;
    }

    this.heap.push(node);
    this.bubbleUp();
  };

  bubbleUp = (current = this.size() - 1) => {
    if (current === 0) return;
    const parent = Math.floor((current - 1) / 2);
    if (this.heap[parent] <= this.heap[current]) return;

    [this.heap[current], this.heap[parent]] = [
      this.heap[parent],
      this.heap[current],
    ];
    this.bubbleUp(parent);
  };

  output = () => {
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  };

  bubbleDown = (current = 0) => {
    const left = current * 2 + 1;
    const right = current * 2 + 2;
    const length = this.size();
    let parent = current;

    if (left <= length && this.heap[left] < this.heap[parent]) {
      parent = left;
    }
    if (right <= length && this.heap[right] < this.heap[parent]) {
      parent = right;
    }
    if (parent !== current) {
      [this.heap[parent], this.heap[current]] = [
        this.heap[current],
        this.heap[parent],
      ];
      this.bubbleDown(parent);
    }
  };
}

const min = new MinHeap();
let start = false;
let N;
let count;

rl.on("line", function (line) {
  if (!start) {
    start = true;
    N = parseInt(line);
    count = N;
    return;
  }
  count--;

  const arr = line.split(" ").map((value) => parseInt(value));
  arr.forEach((num) => {
    min.input(num);
  });
  if (count === 0) rl.close();
  return;
}).on("close", function () {
  console.log(min.heap[0]);
  process.exit();
});
```

처음 문제를 접했을 때 `가장 큰 수중 N 번째`라는 지문을 읽고 `최대 힙으로 N 번 삭제`를 하면 정답이 나올 것이라 생각하고 문제를 접근했다. 내가 생각한 풀이 방법은 최대 힙의 `Leaf(말단노드)에서 가장 최솟값`과 `추가될 값을 비교`해서 삽입 연산을 하는 것이었다. 하지만 Leaf에서 `가장 작은 값을 찾더라도` `bubbleUp 연산`을 하기가 쉽지 않았기 때문에 최대힙 풀이를 포기하게 되었다. 그래서 최소힙 풀이법을 생각하게 되었다.

문제를 다시 천천히 읽어보니 `N 개씩 입력`받는 것을 알게 되었고 처음 시작할 때 `최소 힙의 노드가 모두 채워진다는` 것을 깨달았다. 트리의 노드(N 개)가 채워진 상태에서 비교하며 가장 작은 수를 출력하는 것을 생각하고 문제를 풀었다. 코드는 일반 최소 힙과 같지만 다른 점은 `힙의 길이에 따라 무조건 삽입과 조건 삽입`을 추가했다. 실행하면 N 개의 노드 중 가장 작은 값(정답)이 최상단 노드에 있는 것을 알게 됐다.

처음에는 메모리 초과로 문제 풀이에 실패했다. 그 이유는 내가 하는 방식이 아래와 같이 배열을 할당해서 풀이하는 방식이기 때문이다. 문제에서는 입력되고 바로 처리하는 것을 원했던 거 같아서 `나의풀이`처럼 풀었다.

```jsx
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(inputs.shift());
const arr = inputs.map((input) =>
  input.split(" ").map((value) => parseInt(value))
);
```

이번 문제를 풀면서 백준에서 JS를 활용하는 방법과 최소, 최대 힙을 언제 써야되는지 익히고, 메모리 관련, 시간복잡도에 대해 생각하는 좋은 경험이었다.
