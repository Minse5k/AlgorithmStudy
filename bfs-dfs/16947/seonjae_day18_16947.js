const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(inputs.shift());
const graph = new Array(n + 1).fill(null).map((v) => []);
inputs.forEach((input) => {
  const [a, b] = input.split(" ").map((v) => parseInt(v));
  graph[a].push(b);
  graph[b].push(a);
});
// 0 : 방문하지 않음 / 1 : 방문, 사이클 X / 2 : 방문, 사이클 O
const visited = new Array(n + 1).fill(0);
// -1 : 사이클을 못 찾음 / -2 : 사이클을 찾음 but, 사이클에 포함 X / 1 ~ n : 사이클을 찾음, 사이클에 포함 O
function dfs(now, pre) {
  //종료조건
  if (visited[now] === 1) return now;
  //방문
  visited[now] = 1;
  for (let i = 0; i < graph[now].length; i++) {
    const next = graph[now][i];
    if (next !== pre) {
      const result = dfs(next, now);
      if (result === -2) return -2;
      if (result > 0) {
        visited[now] = 2;
        if (now === result) return -2;
        else return result;
      }
    }
  }
  return -1;
}

function solution() {
  const answer = new Array(n + 1).fill(0);
  dfs(1, -1);
  const queue = [];
  for (let i = 1; i <= n; i++) {
    if (visited[i] === 2) {
      //사이클에 포함된경우
      queue.push(i);
    } else {
      //사이클에 포함안된경우
      answer[i] = -1;
    }
  }

  while (queue.length > 0) {
    const tmp = queue.shift();
    for (let i = 0; i < graph[tmp].length; i++) {
      const next = graph[tmp][i];
      if (answer[next] === -1) {
        queue.push(next);
        answer[next] = answer[tmp] + 1;
      }
    }
  }
  return answer.slice(1).join(" ");
}

console.log(solution());

solution();
