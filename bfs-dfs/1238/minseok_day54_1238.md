---
title : "백준 1238 파티(javascript)"
---
# Problem 12100

# [파티](https://www.acmicpc.net/problem/1238)

## 그래프 이론, 다익스트라

### 문제

N개의 숫자로 구분된 각각의 마을에 한 명의 학생이 살고 있다.

어느 날 이 N명의 학생이 X (1 ≤ X ≤ N)번 마을에 모여서 파티를 벌이기로 했다. 이 마을 사이에는 총 M개의 단방향 도로들이 있고 i번째 길을 지나는데 Ti(1 ≤ Ti ≤ 100)의 시간을 소비한다.

각각의 학생들은 파티에 참석하기 위해 걸어가서 다시 그들의 마을로 돌아와야 한다. 하지만 이 학생들은 워낙 게을러서 최단 시간에 오고 가기를 원한다.

이 도로들은 단방향이기 때문에 아마 그들이 오고 가는 길이 다를지도 모른다. N명의 학생들 중 오고 가는데 가장 많은 시간을 소비하는 학생은 누구일지 구하여라.

### 입력

첫째 줄에 N(1 ≤ N ≤ 1,000), M(1 ≤ M ≤ 10,000), X가 공백으로 구분되어 입력된다. 두 번째 줄부터 M+1번째 줄까지 i번째 도로의 시작점, 끝점, 그리고 이 도로를 지나는데 필요한 소요시간 Ti가 들어온다. 시작점과 끝점이 같은 도로는 없으며, 시작점과 한 도시 A에서 다른 도시 B로 가는 도로의 개수는 최대 1개이다.

모든 학생들은 집에서 X에 갈수 있고, X에서 집으로 돌아올 수 있는 데이터만 입력으로 주어진다.

### 출력

첫 번째 줄에 N명의 학생들 중 오고 가는데 가장 오래 걸리는 학생의 소요시간을 출력한다.

### 예제 입력 1
```
4 8 2
1 2 4
1 3 2
1 4 7
2 1 1
2 3 5
3 1 2
3 4 4
4 2 3
```
### 예제 출력 1
```
10
```
---
### solve
- 단방향 그래프이므로 다익스트라로 구현하였다.
- 각 번호에서 x번호로 가는경우, x번호에서 각 번호로 오는경우의 합의 최댓값을 구하는 문제이다.
    - 이것을 해결하기위해 x to 1, 2, 3, 4의 그래프 하나와, 1, 2, 3, 4 to x 그래프를 뒤집은 그래프를 만들어주었다.
    - 뒤집은 그래프를 만듬으로써 x to 1, 2, 3, 4로 둘 다 계산 할 수 있다.
    - 여기선 이제 bfs를 통해 값의 최솟값을 계산해주었다.

###  code

```javascript
"use strict";
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let n = 0, m = 0, x = 0;
let count = -1;
const input = [];

function dijkstra(graph) {
    const queue = [];
    const distance = new Array(n + 1).fill(Infinity);
    
    queue.push([x, 0]);
    distance[x] = 0;
    while (queue.length > 0) {
        const [start, cost] = queue.shift();
        for (let i = 0; i < graph[start].length; i++) {
            const [v, c] = graph[start][i];
            if (distance[v] > cost + c) {
                distance[v] = cost + c;
                queue.push([v, distance[v]]);
            }
        }
    }
    return distance;
}

rl.on("line", function (line) {
    if (count === -1) {
        [n, m, x] = line.split(" ").map((v) => parseInt(v));
        count = m;
        return;
    }
    count--;
    input.push(line.split(" ").map((v) => parseInt(v)));
    if (count === 0) rl.close();
}).on("close", function () {
    const goGraph = Array.from(Array(n + 1), () => new Array());
    const backGraph = Array.from(Array(n + 1), () => new Array());
    
    for (let i = 0; i < m; i++) {
        const [start, end, cost] = input[i];
        goGraph[start].push([end, cost]);
        backGraph[end].push([start, cost]);
    }

    const backDistance = dijkstra(backGraph);
    const goDistnace = dijkstra(goGraph);
    
    let max = 0;
    for (let i = 1; i <= n; i++) {
        const sum = backDistance[i] + goDistnace[i];
        max = Math.max(max, sum);
    }
    console.log(max);
});
```