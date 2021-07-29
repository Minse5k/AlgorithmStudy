const fs = require("fs");
const inputs = fs.readFileSync("input").toString().split("\r\n");
const [N, M] = inputs[0].split(" ").map((value) => parseInt(value));
const graph = Array.from({ length: N + 1 }, () => []);
const [v1, v2] = inputs[M + 1].split(" ").map((value) => parseInt(value));

for (let i = 1; i <= M; i++) {
  const [from, to, cost] = inputs[i].split(" ").map((value) => parseInt(value));
  graph[from].push([to, cost]);
  graph[to].push([from, cost]);
}

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

const djikstra = (start) => {
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  const priorityQ = new MinHeap();
  distance[start] = 0;
  priorityQ.input({ node: start, cost: 0 });

  while (priorityQ.size > 0) {
    const { node: now, cost: nowCost } = priorityQ.pull();

    for (const [next, nextCost] of graph[now]) {
      if (distance[next] <= nowCost + nextCost) continue;
      distance[next] = nowCost + nextCost;
      priorityQ.input({ node: next, cost: distance[next] });
    }
  }
  if (start === v1) {
    return [distance[1], distance[v2], distance[N]];
  }
  return [distance[1], distance[v1], distance[N]];
};

const [start_v1, v1_v2, v1_end] = djikstra(v1);
const [start_v2, v2_v1, v2_end] = djikstra(v2);

const sumV1 = start_v1 + v1_v2 + v2_end;
const sumV2 = start_v2 + v2_v1 + v1_end;

const answer = sumV1 > sumV2 ? sumV2 : sumV1;

if (answer === Infinity) {
  console.log(-1);
} else {
  console.log(answer);
}
