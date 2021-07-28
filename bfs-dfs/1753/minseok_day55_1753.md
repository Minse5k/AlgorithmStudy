---
title : "백준 1753 최단경로(javascript)"
---
# Problem 1753

# [최단경로](https://www.acmicpc.net/problem/1753)

## 그래프 이론, 다익스트라

### 문제

방향그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오. 단, 모든 간선의 가중치는 10 이하의 자연수이다.

### 입력

첫째 줄에 정점의 개수 V와 간선의 개수 E가 주어진다. (1≤V≤20,000, 1≤E≤300,000) 모든 정점에는 1부터 V까지 번호가 매겨져 있다고 가정한다. 둘째 줄에는 시작 정점의 번호 K(1≤K≤V)가 주어진다. 셋째 줄부터 E개의 줄에 걸쳐 각 간선을 나타내는 세 개의 정수 (u, v, w)가 순서대로 주어진다. 이는 u에서 v로 가는 가중치 w인 간선이 존재한다는 뜻이다. u와 v는 서로 다르며 w는 10 이하의 자연수이다. 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.

### 출력

첫째 줄부터 V개의 줄에 걸쳐, i번째 줄에 i번 정점으로의 최단 경로의 경로값을 출력한다. 시작점 자신은 0으로 출력하고, 경로가 존재하지 않는 경우에는 INF를 출력하면 된다.

### 예제 입력 1
```
5 6
1
5 1 1
1 2 2
1 3 3
2 3 4
2 4 5
3 4 6
```
### 예제 출력 1
```
0
2
3
7
INF
```
---
### solve
- 우선순위큐의 최소힙 정렬과 다익스트라 알고리즘을 사용하였다.

###  code
```javascript
'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class MinHeap {
    constructor() {
        this.nodes = [];
    }

    insert(value) {
        this.nodes.push(value);
        this.bubbleUp();
    }

    bubbleUp(index = this.nodes.length - 1) {
        if (index < 1) return;

        const currentNode = this.nodes[index];
        const parentIndex = Math.floor((index - 1) / 2);
        const parentNode = this.nodes[parentIndex];
        if (parentNode.cost <= currentNode.cost) return;

        this.nodes[index] = parentNode;
        this.nodes[parentIndex] = currentNode;
        index = parentIndex;
        this.bubbleUp(index);
    }

    extract() {
        const min = this.nodes[0];
        if (this.nodes.length === 1) {
            this.nodes.pop();
            return min;
        };
        this.nodes[0] = this.nodes.pop()
        this.trickleDown();
        return min;
    }

    trickleDown(index = 0) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        const length = this.nodes.length;
        let minimum = index;

        if (!this.nodes[rightChildIndex] && !this.nodes[leftChildIndex]) return;
        if (!this.nodes[rightChildIndex]) {
            if (this.nodes[leftChildIndex].cost < this.nodes[minimum].cost) {
                minimum = leftChildIndex;
            }
            return;
        }

        if (this.nodes[leftChildIndex].cost > this.nodes[rightChildIndex].cost) {
            if (rightChildIndex <= length && this.nodes[rightChildIndex].cost < this.nodes[minimum].cost) {
                minimum = rightChildIndex;
            }
        } else {
            if (leftChildIndex <= length && this.nodes[leftChildIndex].cost < this.nodes[minimum].cost) {
                minimum = leftChildIndex;
            }
        }

        if (minimum !== index) {
            let t = this.nodes[minimum];
            this.nodes[minimum] = this.nodes[index];
            this.nodes[index] = t;
            this.trickleDown(minimum);
        }
    }
}

let count = -2;
let v = 0,
    e = 0,
    k = 0;
const input = [];

function dijkstra(graph) {
    let distance = new Array(v + 1).fill(Infinity);
    const queue = [];
    distance[k] = 0;
    const minHeap = new MinHeap();
    minHeap.insert({
        vertex: k,
        cost: 0
    })
    while (minHeap.nodes.length) {
        const now = minHeap.extract();
        const start = now.vertex;
        const cost = now.cost;

        if (graph[start] === undefined) continue;
        if (distance[start] < cost) continue;
        for (let i = 0; i < graph[start].length; i++) {
            const nt = graph[start][i];
            const next = nt.vertex;
            const nextCost = nt.cost;
            if (distance[next] > cost + nextCost) {
                distance[next] = cost + nextCost;
                minHeap.insert({
                    vertex: next,
                    cost: distance[next]
                });
            }
        }
    }

    return distance;
}

rl.on('line', function (line) {
    if (count === -2) {
        [v, e] = line.split(' ').map((v) => parseInt(v));
        count = -1;
        return;
    }
    if (count === -1) {
        k = parseInt(line);
        count = e;
        return;
    }
    input.push(line.split(' ').map((v) => parseInt(v)));
    count--;
    if (count === 0) rl.close();
}).on('close', function () {
    const graph = Array.from(Array(v + 1), () => new Array());

    input.forEach((value) => {
        const [start, end, cst] = value;
        graph[start].push({
            vertex: end,
            cost: cst
        });
    });

    const result = dijkstra(graph);
    const answer = [];
    // 출력 조건에 맞게 바꿔주기
    for(let i = 1; i <= v; i++) {
        if(result[i] === Infinity) answer.push('INF');
        else answer.push(result[i]);
    }
    console.log(answer.join('\n'));
    process.exit();
});
```