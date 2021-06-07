const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, q] = inputs.shift().split(" ").map((v) => parseInt(v));
const graph = new Array(n + 1).fill(null).map((v) => []);
const USADO = new Array(n + 1).fill(null).map((v) => new Array(n + 1).fill(null));

for (let i = 0; i < n - 1; i++) {
  const [x, y, r] = inputs[i].split(" ").map((v) => parseInt(v));
  graph[x].push(y);
  graph[y].push(x);
  USADO[x][y] = r;
  USADO[y][x] = r;
}

for (let i = 1; i <= n; i++) {
  bfs(i);
}

for (let i = n - 1; i < n + q - 1; i++) {
  const [k, v] = inputs[i].split(" ").map((v) => parseInt(v));
  let count = 0;
  for (let j = 1; j < n + 1; j++) {
    if (USADO[v][j] >= k) count++;
  }
  console.log(count);
}

function bfs(from) {
  const visited = new Array(n + 1).fill(false);
  const queue = [from];
  visited[from] = true;
  let point = 0;
  while (queue.length > point) {
    const end = queue.length;
    while (end > point) {
      const now = queue[point++];
      for (let i = 0; i < graph[now].length; i++) {
        const next = graph[now][i];
        if (visited[next]) continue;
        visited[next] = true;
        queue.push(next);
        if (from === now) continue;
        USADO[from][next] = Math.min(USADO[from][now], USADO[now][next]);
      }
    }
  }
}
