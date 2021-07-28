# 1753 최단경로

# 문제

[1753번: 최단경로](https://www.acmicpc.net/problem/1753)

# 나의 풀이

```jsx
"use strict";
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

    if (parentNode.cost <= currentNode.cost) return;
    
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

    if (
      leftIndex < length &&
      this.heap[leftIndex].cost < this.heap[parentIndex].cost
    ) {
      parentIndex = leftIndex;
    }
    if (
      rightIndex < length &&
      this.heap[rightIndex].cost < this.heap[parentIndex].cost
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

let N, M, start, graph;

rl.on("line", function (line) {
  if (M === undefined) {
    [N, M] = line.split(" ").map((v) => parseInt(v));
    graph = Array.from(Array(N + 1), () => []);
    return;
  }
  if (start === undefined) {
    start = parseInt(line);
    return;
  }

  M--;
  const [from, to, cost] = line.split(" ").map((v) => parseInt(v));
  graph[from].push([to, cost]);

  if (M === 0) rl.close();
}).on("close", function () {
  const distance = Array.from({ length: N + 1 }, () => "INF");
  const privateQ = new MinHeap();
  privateQ.input({ node: start, cost: 0 });

  distance[start] = 0;

  while (privateQ.size > 0) {
    const { node: now, cost: nowCost } = privateQ.pull();
    
    if (nowCost > distance[now]) continue;

    for (const [next, nextCost] of graph[now]) {
      if (distance[next] <= nowCost + nextCost) continue;
      distance[next] = nowCost + nextCost;
      privateQ.input({ node: next, cost: distance[next] });
    }
  }

  distance.shift();
  const answer = distance.join("\n");

  console.log(answer);
});
```

1. graph에 입력한 대로 { 노드값, 거리 값 }을 넣어준다.
2. 처음 시작할 때는 privateQ(우선순위 큐)에 { 시작점, 0 } 을 넣어준다.
3. privateQ의 크기가 0이 될 때까지 while문을 실행하며 매 시행시 privateQ의 최상단 값을 빼낸다.
4. nowCost(현재 값)이 distance[now](현재 위치의 값) 보다 크다면 최단거리가 안되므로 넘어가준다.
5. 만약 그렇지 않다면 now위치에서 연결된 노드를 탐색한다.
6. 탐색할 때 distance[next](다음 최소 cost)값보다 nowCost + nextCost 값이 작다면 distance[next]값을 바꿔주고 privateQ에 넣어준다.
7. while문이 종료되고 나면 출력을 해야되기 때문에  distance의 처음 값 필요없기 때문에 제거해준다.  

이 문제의 지문 중 시작점에서 다른 모든 정점으로의 최단 경로라는 지문을 읽고 최단거리 문제이면서 모든 지점에 대한 값을 구하는 문제라고 생각했기에 다익스트라로 접근했다.

처음 코드를 작성하고 시간초과, 메모리초과, 런타임에러 등 많은 에러를 보면서 javascript의  입출력 방식이나 다른메서드 때문에 이런 오류가 난다고 생각했다. 그래서 입출력방식은 파일을 불러오는게 아니라 readline으로 바꿔보고, shift() 배열 메서드를 사용하는것이 아니라 point라는 변수를 두고 가르키는 인덱스만 바꿔보고 했지만 똑같은 에러가 발생했다.

그제서야 나의 알고리즘이 잘못된 것을 알았다. 다익스트라 알고리즘에서 현재 위치에서 가장 최솟값을 탐색하는 것을 생각은 했지만 이미 많은 에러들을 겪고 멘탈이 너덜너덜해져 다른 사람의 코드를 봤다. 다른 사람의 코드는 최소힙 + 다익스트라 알고리즘을 사용하는 것을 보고 내가 놓쳤던 부분이 queue에 넣을 때 최소값을 넣어주고 4번째 단계가 필요하다는 것을 알게 되었다.

> [https://velog.io/@diddnjs02/코딩테스트백준-최단경로1753](https://velog.io/@diddnjs02/%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%EB%B0%B1%EC%A4%80-%EC%B5%9C%EB%8B%A8%EA%B2%BD%EB%A1%9C1753)