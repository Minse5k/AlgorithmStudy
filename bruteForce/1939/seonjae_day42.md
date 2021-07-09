# 1939 중량제한

## 문제

[1939번: 중량제한](https://www.acmicpc.net/problem/1939)

## 나의 풀이

```jsx
const fs = require("fs");
const [nm, ...inputs]= fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = nm.split(" ").map((value) => parseInt(value));
const [start, end] = inputs.pop().split(" ").map((value) => parseInt(value));
const island = Array.from(Array(n + 1), () => new Array(n + 1).fill(0));
const visited = new Array(n + 1).fill(false);
let max = 0;

for (const input of inputs) {
  const [from, to, weight] = input.split(" ").map((value) => parseInt(value));
  if (island[from][to] > weight) continue;
  island[from][to] = weight;
  island[to][from] = weight;
  max = Math.max(weight, max);
}

const dfs = (node, nowMax) => {
  if (node === end) {
    max = max > nowMax ? max : nowMax;
    return;
  }

  for (let nextNode = 0; nextNode < island[node].length; nextNode++) {
    if (island[node][nextNode] === 0) continue;
    if (visited[nextNode]) continue;
    visited[nextNode] = true;
    const next = Math.min(nowMax, island[node][nextNode]);
    dfs(nextNode, next);
    visited[nextNode] = false;
  }
};

dfs(start, 0);
console.log(max);
```

## 설명

1. 인접행렬을 사용해서 여러 가지 경로 중 가장 큰 값을 저장한다.
2. 기저 조건: 현재 방문 노드가 end일 경우, 현재 가장 큰 값(nowMax)이 모든 경로에서 가장 큰 값(max)보다 클 경우  값을 바꿔준다.
3. 현재 노드에서 방문할 수 있는 모든 곳을 탐색한다.
4. 조건: 방문하지 않은 곳, 가중치가 0인 곳만 탐색 가능
5. 현재 방문한 곳의 가중치가 더 작은 쪽을 next에 저장해서 dfs를 호출해준다. 

## 고친 후 나의 풀이

```jsx
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = inputs[0].split(" ").map((value) => parseInt(value));
const [start, end] = inputs[m + 1].split(" ").map((value) => parseInt(value));
const island = new Array(n + 1).fill(null).map((value) => []);
let maxWeight = 0;

for (let i = 1; i <= m; i++) {
  const [from, to, weight] = inputs[i]
    .split(" ")
    .map((value) => parseInt(value));
  maxWeight = Math.max(weight, maxWeight);

  island[from].push([to, weight]);
  island[to].push([from, weight]);
}

const dfs = (node, mid, visited) => {
  if (node === end) return true;
  if (visited[node]) return false;
  visited[node] = true;

  for (let i = 0; i < island[node].length; i++) {
    const nextNode = island[node][i][0];
    const weight = island[node][i][1];
    if (weight < mid) continue;

    if (dfs(nextNode, mid, visited)) return true;
  }

  return false;
};

const solution = () => {
  let left = 1;
  let right = maxWeight;
  let answer = 0;
  const visited = new Array(n + 1).fill(false);
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    visited.fill(false);

    if (dfs(start, mid, visited)) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
};

console.log(solution());
```

`인접 리스트`를 바탕으로 `dfs와 이분 탐색`을 이용해 풀었다. 이분 탐색할 때 조건은 무게로 탐색하는 것이었다. 1부터 최대 무게까지 중간지점부터 탐색했다. 기저조건은 현재 노드가 방문했을 때와 도착지점에 도착했을 때 TRUE 값으로 리턴하고 그렇지 않고 모든 상황이 종료되면 FALSE 값을 리턴했다. 또한 for 문을 돌때 조건을 다음 무게가 mid보다 크거나 같아야 탐색할 수 있게 하므로 깊이를 줄여갔다.

계속 StackSizeExceeded 오류가 떠서 다른언어와 비교하면서 수정을 해봤지만 해결되지않았다. 그래서 뭐가 문제일까 정리하며 생각해보니 두가지로 나눠졌다.

1. JS자체의 스택오버플로우가 많지 않아서 그렇다.
2. 내가 다른언어에서 가져올 때 무언가 빠트렸다.

> [https://www.acmicpc.net/board/view/51698](https://www.acmicpc.net/board/view/58185)