const fs = require("fs");
const inputs = fs.readFileSync("input").toString().split("\r\n");
const [N, M] = inputs[0].split(" ").map((value) => parseInt(value));
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [from, to, cost] = inputs[i].split(" ").map((value) => parseInt(value));
  graph[from].push([to, cost]);
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

let min = Infinity;

const dijkstra = (start) => {
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  const priorityQ = new MinHeap();
  priorityQ.input({ node: start, cost: 0 });

  while (priorityQ.size > 0) {
    const { node: now, cost: nowCost } = priorityQ.pull();

    if (distance[now] < nowCost) continue;

    for (const [next, nextCost] of graph[now]) {
      if (distance[next] > nowCost + nextCost) {
        distance[next] = nowCost + nextCost;
        priorityQ.input({ node: next, cost: distance[next] });
      }
    }
  }

  min = min > distance[start] ? distance[start] : min;
};

for (let i = 1; i <= N; i++) dijkstra(i);

if (min === Infinity) console.log(-1);
else console.log(min);
