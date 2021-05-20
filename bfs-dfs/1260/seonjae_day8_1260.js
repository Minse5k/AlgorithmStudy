const fs = require("fs");
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, m, v] = input.shift().split(" ").map((v) => parseInt(v));
//그래프 생성
let graph = new Array(n + 1).fill(null).map((v) => []);
for (let i = 0; i < m; i++) {
  const [a, b] = input.shift().split(" ").map((v) => parseInt(v));
  graph[a].push(b);
  graph[b].push(a);
}
graph = graph.map(v=> v.sort((a, b) => a-b))
//방문기록
let visited = new Array(n + 1).fill(false);
//dfs 결과
const result = [];
dfs(v);
console.log(result.join(" "));
//방문초기화
visited = visited.fill(false);
console.log(bfs(v));

//dfs
function dfs(v) {
  if (visited[v]) return;
  visited[v] = true;
  result.push(v);
  graph[v].forEach((node) => {
    if (!visited[node]) {
      dfs(node);
    }
  });
}
//bfs
function bfs(v) {
  const answer = [];
  const queue = [v];

  while (queue.length > 0) {
    const check = queue.shift();
    visited[check] = true;
    answer.push(check);
    graph[check].forEach((next) => {
      if (!visited[next]) {
        queue.push(next);
        visited[next] = true;
      }
    });
  }
  return answer.join(" ");
}
