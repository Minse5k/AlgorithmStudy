---
title : "백준 1956 운동(javascript)"
---
# Problem 1956

# [운동](https://www.acmicpc.net/problem/1956)

## 그래프 이론, 플로이드-와샬

### 문제

V개의 마을와 E개의 도로로 구성되어 있는 도시가 있다. 도로는 마을과 마을 사이에 놓여 있으며, 일방 통행 도로이다. 마을에는 편의상 1번부터 V번까지 번호가 매겨져 있다고 하자.

당신은 도로를 따라 운동을 하기 위한 경로를 찾으려고 한다. 운동을 한 후에는 다시 시작점으로 돌아오는 것이 좋기 때문에, 우리는 사이클을 찾기를 원한다. 단, 당신은 운동을 매우 귀찮아하므로, 사이클을 이루는 도로의 길이의 합이 최소가 되도록 찾으려고 한다.

도로의 정보가 주어졌을 때, 도로의 길이의 합이 가장 작은 사이클을 찾는 프로그램을 작성하시오. 두 마을을 왕복하는 경우도 사이클에 포함됨에 주의한다.

### 입력

첫째 줄에 V와 E가 빈칸을 사이에 두고 주어진다. (2 ≤ V ≤ 400, 0 ≤ E ≤ V(V-1)) 다음 E개의 줄에는 각각 세 개의 정수 a, b, c가 주어진다. a번 마을에서 b번 마을로 가는 거리가 c인 도로가 있다는 의미이다. (a → b임에 주의) 거리는 10,000 이하의 자연수이다. (a, b) 쌍이 같은 도로가 여러 번 주어지지 않는다.

### 출력

첫째 줄에 최소 사이클의 도로 길이의 합을 출력한다. 운동 경로를 찾는 것이 불가능한 경우에는 -1을 출력한다.

### 예제 입력 1
```
3 4
1 2 1
3 2 1
1 3 5
2 3 2
```
### 예제 출력 1
```
3
```
---
### solve
- 우선순위큐의 최소힙 정렬과 다익스트라 알고리즘을 사용하였다.
- 1 to another, another to 1의 그래프를 2개 만들어 각각의 합에서 최솟값을 구해줬다.
- 다익스트라 알고리즘은 특수 알고리즘으로 공부해보는 것을 추천한다.

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
        this.nodes = []
    }

    insert(value) {
        this.nodes.push(value)
        this.bubbleUp()
    }

    bubbleUp(index = this.nodes.length - 1) {
        if (index < 1) return;

        const currentNode = this.nodes[index]
        const parentIndex = Math.floor((index - 1) / 2)
        const parentNode = this.nodes[parentIndex]
        if (parentNode.cost <= currentNode.cost) return;

        this.nodes[index] = parentNode
        this.nodes[parentIndex] = currentNode
        index = parentIndex
        this.bubbleUp(index)
    }

    extract() {
        const min = this.nodes[0]
        if (this.nodes.length === 1) {
            this.nodes.pop();
            return min;
        };
        this.nodes[0] = this.nodes.pop()
        this.trickleDown();
        return min
    }

    trickleDown(index = 0) {
        const leftChildIndex = 2 * index + 1
        const rightChildIndex = 2 * index + 2
        const length = this.nodes.length
        let minimum = index

        if (!this.nodes[rightChildIndex] && !this.nodes[leftChildIndex]) return;
        if (!this.nodes[rightChildIndex]) {
            if (this.nodes[leftChildIndex].cost < this.nodes[minimum].cost) {
                minimum = leftChildIndex;
            }
            return;
        }

        if (this.nodes[leftChildIndex].cost > this.nodes[rightChildIndex].cost) {
            if (rightChildIndex <= length && this.nodes[rightChildIndex].cost < this.nodes[minimum].cost) {
                minimum = rightChildIndex
            }
        } else {
            if (leftChildIndex <= length && this.nodes[leftChildIndex].cost < this.nodes[minimum].cost) {
                minimum = leftChildIndex
            }
        }

        if (minimum !== index) {
            let t = this.nodes[minimum]
            this.nodes[minimum] = this.nodes[index]
            this.nodes[index] = t
            this.trickleDown(minimum)
        }
    }
}

let count = -1;
let v = 0,
    e = 0;
const input = [];

function dijkstra(graph, start) {
    let distance = new Array(v + 1).fill(Infinity);
    distance[start] = 0;
    const minHeap = new MinHeap();
    minHeap.insert({
        vertex: start,
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
        [v, e] = line.split(' ').map((v) => parseInt(v));
        count = e;
        return;
    }
    input.push(line.split(' ').map((v) => parseInt(v)));
    count--;
    if (count === 0) rl.close();
}).on('close', function () {
    const goGraph = Array.from(Array(v + 1), () => new Array());
    const backGraph = Array.from(Array(v + 1), () => new Array());
    input.forEach((value) => {
        const [start, end, cst] = value;
        goGraph[start].push({
            vertex: end,
            cost: cst
        });
        backGraph[end].push({
            vertex: start,
            cost: cst
        });
    });
    let min = Infinity;
    for(let i = 1; i <= v; i++) {
        const result1 = dijkstra(goGraph, i);
        const result2 = dijkstra(backGraph, i);
        for(let i = 0; i < v; i++) {
            if(result1[i] + result2[i] !== Infinity && result1[i] + result2[i] !== 0) {
                if(min > result1[i] + result2[i]) {
                    min = result1[i] + result2[i];
                }
            }
        }
    }
    if(min === Infinity) console.log(-1);
    else console.log(min);
});
```