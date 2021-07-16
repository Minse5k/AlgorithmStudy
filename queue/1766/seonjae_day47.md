# 1766 문제집

# 문제

[1766번: 문제집](https://www.acmicpc.net/problem/1766)

## 나의 풀이

나는 이 문제를 처음 접하고 어떻게 풀지 고민했을 때 우선순위 큐와 메모제이션 기법을 활용하기로 생각했다. 하지만 우선순위 큐를 구현할 때 우선순위를 정하기가 어려워 몇 번째 숫자를 리턴하는 문제점이 발생했다.

 처음으로 시간복잡도를 생각해가며(나는 N * NlogN이라고 생각함 하지만 지금 작성하면서 틀렸다는 것을 알게됨) 접근해서 실력이 향상됐나 싶었지만 현실은 구현도 못하고 있었다.

## 고친 후 나의 풀이

```jsx
const fs = require("fs");
const [NM, ...problems] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = NM.split(" ").map((value) => parseInt(value));

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size = () => {
    return this.heap.length;
  };

  input = (node) => {
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

const graph = Array.from(Array(N + 1), () => []);
const inDegrees = new Array(N + 1).fill(0);

problems.forEach((problem) => {
  const [prev, next] = problem.split(" ").map((value) => parseInt(value));
  graph[prev].push(next);
  inDegrees[next] += 1;
});

const privateQueue = new MinHeap();

for (let i = 1; i <= N; i++) {
  if (inDegrees[i] === 0) privateQueue.input(i);
}

const result = [];

while (privateQueue.size()) {
  const prev = privateQueue.output();
  result.push(prev);
  graph[prev].forEach((next) => {
    inDegrees[next] -= 1;
    if (!inDegrees[next]) privateQueue.input(next);
  });
}

console.log(result.join(" "));
```

위상 정렬에 대해 공부하고 다른사람의 코드를 보며 내가 기존에 사용하는 힙코드에 적용해봤다. 위상정렬은 순서가 정해져 있는 작업을 할 때 사용하는 정렬 방법이다. 위상정렬은 사이클이 발생하지 않는 그래프에서만 적용 가능하다. 

내가 풀었던 방식은 heap정렬에서 모든것을 해결하려는 방면 이 풀이는 `진입차수(inDegrees)` 를 설정한 후 진입차수에 따라 우선순위큐에 넣어주어 해결하는 방식이었다.

graph: 먼저 풀면 좋은 문제 → 다음 문제를 저장하는 배열

inDegrees: 진입차수를 가진 배열

1. 우선순위큐를 정의한 후 첫 for문에서 진입차수가 0이면 우선순위큐에 추가해준다.
2. while문 시행 시 우선순위큐(가장 처음 방문할 곳)을 result에 넣어준다.
3. 2번에서 넣어준 수가 뽑혔기 때문에 함께 연결된 노드의 진입차수를 -1을 해주며 만약 해당 노드의 진입차수가 0이 된다면 우선순위큐에 넣어준다.
4. 2-3번 과정을 계속 거치면서 result는 모든 노드를 방문하게 되고 출력해주면된다. 

 

2번째 우선순위큐 문제를 접했으며, 위상정렬이라는 개념이 있어서 접근방법이 아예 달라서 풀지 못한 문제였다. 다음에 이런 케이스를 가진 문제를 풀어보고 다시 개념을 정리해야겠다.  

## 스터디 후

위상정렬에 대해 설명이 부족해서 다시 설명해야겠다.

위상정렬을 사용할 때는 연결된 노드가 0일 때 우선순위큐에 넣어줘야된다. 첫 번째 for문에서 inDegrees[i] === 0일 때 우선순위큐에 추가해주는 이유이다. 그리고 우선순위에서 가장 최소값부터 뽑으면서 뽑았던 노드가 graph에서 연결 된 것이 있는지 확인하고 연결을 끊어준다.(inDegrees - 1을 해주는 이유) 만약 inDegrees가 0이라면 우선순위 큐에 넣어주고 이 과정을 반복하다 우선순위큐가 없다면 종료한다.

나는 설명할 때 inDegrees를 설명하기가 어려워 고생했지만 이렇게 다시 말하면서 정리하니깐 더 이해가 되는 경험을 했다.

> [https://m.blog.naver.com/ndb796/221236874984](https://m.blog.naver.com/ndb796/221236874984)

> [https://gywlsp.github.io/boj/1766/](https://gywlsp.github.io/boj/1766/)