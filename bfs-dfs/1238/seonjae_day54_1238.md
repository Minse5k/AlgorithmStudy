# 1238 파티

# 문제

[1238번: 파티](https://www.acmicpc.net/problem/1238)

# 나의 풀이

```jsx
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");
const [N, M, party] = inputs
  .shift()
  .split(" ")
  .map((value) => parseInt(value));

const graphs = Array.from(Array(N + 1), () => []);
const answer = new Array(N + 1).fill(0);

for (const input of inputs) {
  const [start, end, cost] = input.split(" ").map((value) => parseInt(value));
  graphs[start].push([end, cost]);
}

for (let i = 1; i < N + 1; i++) {
  const distance = new Array(N + 1).fill(Infinity);
  const visited = new Array(N + 1).fill(false);
  distance[i] = 0;

  for (let j = 0; j < N; j++) {
    const [nowCost, nowIndex] = distance.reduce(
      (pre, cur, index) => {
        if (visited[index]) return pre;
        if (pre[0] > cur) return [cur, index];
        return pre;
      },
      [Infinity, 0]
    );

    visited[nowIndex] = true;

    graphs[nowIndex].forEach((next) => {
      const [nextIndex, nextCost] = next;
      if (distance[nextIndex] > nowCost + nextCost) {
        distance[nextIndex] = nowCost + nextCost;
      }
    });
  }

  if (i === party) {
    distance.forEach((value, index) => {
      if (index !== 0) answer[index] += value;
    });
  } else {
    answer[i] += distance[party];
  }
}

answer.shift();
const max = answer.reduce((pre, cur) => {
  if (pre > cur) return pre;
  return cur;
}, 0);

console.log(max);
```

# 고친 나의 풀이

```jsx
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M, party] = inputs
  .shift()
  .split(" ")
  .map((value) => parseInt(value));

const graphs = Array.from(Array(N + 1), () => []);
const answer = new Array(N + 1).fill(0);

for (const input of inputs) {
  const [start, end, cost] = input.split(" ").map((value) => parseInt(value));
  graphs[start].push([end, cost]);
}

const dijkstra = (start, end) => {
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  const queue = [];
  distance[start] = 0;
  queue.push([start, 0]);

  while (queue.length > 0) {
    const [now, nowCost] = queue.shift();
    for (const [next, nextCost] of graphs[now]) {
      if (distance[next] > nowCost + nextCost) {
        distance[next] = nowCost + nextCost;
        queue.push([next, distance[next]]);
      }
    }
  }
  if (start === end) return [...distance];
  return distance[end];
};

for (let i = 1; i < N + 1; i++) {
  if (i !== party) {
    const now = dijkstra(i, party);
    answer[i] += now;
    continue;
  }

  const tmp = dijkstra(i, party);
  for (let j = 1; j < tmp.length; j++) {
    answer[j] += tmp[j];
  }
}

const max = answer.reduce((pre, cur) => {
  if (pre > cur) return pre;
  return cur;
}, 0);

console.log(max);
```

단방향 그래프를 공부하기 위해 간선에 cost가 있는 이 문제를 고르게 됐다. 문제를 읽고 가장 먼저 떠올랐던 생각은 `다익스트라 알고리즘을` 최대한 사용하는 것을 생각하게 됐다. 왜냐하면 도착지점은 한 곳이고 출발지점은 여러 곳이기 때문이었다.

각 출발지점에서 도착지점까지 N-1번의 다익스트라 탐색을 하고 도착지점에서 모든 지점까지 다익스트라를 1번해서 총 N번을 하게 됐다. 그리고 크기가 N+1인 answer 배열을 0으로 초기화하고 만들어 출발지점에서 도착지점까지 얻은 값을 더해주고  도착지점에서 출발지점까지 모두 answer에 더해주어 가장 큰값을 출력하게 했다.

예전 문제라서 trim()을 안붙여줘서 9%에서 런타임에러가 나왔다. 그렇지 않았으면 호다닥 2시간동안 풀고 맞는거 였는데 백준 플랫폼에 대해 다시 알게 되고, 다익스트라 알고리즘을 알고, 단방향 그래프를 풀 수 있게? 되었다.

> [https://zereight.tistory.com/750](https://zereight.tistory.com/750)