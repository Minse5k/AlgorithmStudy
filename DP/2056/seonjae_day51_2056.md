# 2056 제출

## 문제

[2056번: 작업](https://www.acmicpc.net/problem/2056)

## 나의 풀이

```jsx
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");
const N = input.length;
const indegrees = new Array(N).fill(0);
const times = new Array(N).fill(0);
const graph = Array.from(Array(N), () => []);
const dp = new Array(N).fill(0);
const queue = [];

for (let i = 1; i < N; i++) {
  const [time, count, ...rest] = input[i].split(" ");
  times[i] = dp[i] = parseInt(time);

  if (parseInt(count) > 0) {
    rest.forEach((value) => {
      const prev = parseInt(value);
      graph[i].push(prev);
      indegrees[prev]++;
    });
  }
}

for (let i = 1; i < N; i++) if (indegrees[i] === 0) queue.push(i);

let answer = 0;
while (queue.length > 0) {
  const now = queue.shift();

  for (let i = 0; i < graph[now].length; i++) {
    const next = graph[now][i];

    if (dp[next] < times[next] + dp[now]) {
      dp[next] = times[next] + dp[now];
    }

    indegrees[next]--;
    if (indegrees[next] === 0) {
      queue.push(next);
    }
  }
}

for (let i = 1; i < N; i++) {
  if (answer < dp[i]) answer = dp[i];
}

console.log(answer);
```

처음에 문제를 풀이할 때 bfs와 dp를 이용해서 풀면되겠구나 생각했다. 하지만 하지만 예제를 대입하면서 구현하는데 어려움을 많이 느꼈다. 어려움을 느끼고 문제접근이 잘못됐다 판단하여 곰곰히 생각하고 `이전에 진행했던 작업을 해야된다`는 지문을 읽고 `위상정렬`을 생각하게됐다. 그래서 최근에 풀었던 문제집을 생각하면서 풀어봤지만 실패했다.

원인은 나는 최소값을 내보내지 않았기 때문인거 같다. 바뀐 풀이도 틀렸기 때문에 나는 다른 사람의 코드를 참고했다. 나의 풀이와 이 풀이의 다른점은 시간도 따로 배열로 받았던 것이다. 배열을 따로 받으니 시간을 쌓는 과정이 훨씬 깔끔해 졌다.

![풀이방법](https://github.com/Minse5k/AlgorithmStudy/tree/main/DP/2056/seonjae_solved.png)

> [https://www.acmicpc.net/board/view/51698](https://it-earth.tistory.com/111)
