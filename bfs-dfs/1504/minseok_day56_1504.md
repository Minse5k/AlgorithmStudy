---
title : "백준 1504 최단경로(javascript)"
---
# Problem 1504

# [최단경로](https://www.acmicpc.net/problem/1504)

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
- 양방향 그래프의 다익스트라 문제였다.
- 1부터 N까지 v1, v2를 반드시 거쳐 갈 수 있는 경우의 수 (v1 = 1, v2 = N일 수 있음을 주의)
    - 1 > v1 > v2 > N
    - 1 > v2 > v1 > N
    - v1(=1) > v2 > N
    - 1 > v1 > v2(=N)
    - v1(=1) > v2(=N)
- 위 경우의수를 각각 계산하여 최솟값을 출력한다.

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

let count = -1;
let n = 0,
    e = 0;
const input = [];

function dijkstra(graph, k) {
    let distance = new Array(n + 1).fill(Infinity);
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
    if (count === -1) {
        [n, e] = line.split(' ').map((v) => parseInt(v));
        count = e + 1;
        return;
    }
    count--;
    input.push(line.split(' ').map((v) => parseInt(v)));
    if (count === 0) rl.close();
}).on('close', function () {
    const graph = Array.from(Array(n + 1), () => new Array());
    const [v1, v2] = input.pop();
    input.forEach((value) => {
        const [start, end, cst] = value;
        graph[start].push({
            vertex: end,
            cost: cst
        });
        graph[end].push({
            vertex: start,
            cost: cst
        });
    });

    const result = dijkstra(graph, 1);
    const result1 = dijkstra(graph, v1);
    const result2 = dijkstra(graph, v2);

    let sum1 = Infinity, sum2 = Infinity;

    if(v1 === 1 && v2 !== n) {
        sum1 = result[v2] + result2[n];
    }else if(v1 !== 1 && v2 === n) {
        sum1 = result[v1]  + result1[n];
    }else if(v1 === 1 && v2 === n) {
        sum1 = result[n];
    }else if(v1 !== 1 && v2 !== n) {
        sum1 = result[v1] + result1[v2] + result2[n];
        sum2 = result[v2] + result2[v1] + result1[n];
    }

    const answer = Math.min(sum1, sum2);
    
    answer === Infinity ? console.log(-1) : console.log(answer);
    process.exit();
});
```