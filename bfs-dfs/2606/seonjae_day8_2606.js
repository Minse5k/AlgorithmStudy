const fs = require("fs");
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input.shift());
const m = parseInt(input.shift());
const graph = new Array(n + 1).fill(null).map((v) => []);
for (let i = 0; i < m; i++) {
  const [a, b] = input[i].split(" ").map((v) => parseInt(v));
  graph[a].push(b);
  graph[b].push(a);
}

function solution(graph) {
  const visited = new Array(graph.length + 1).fill(false);
  let count = 0;
  const dfs = (v) => {
    if (visited[v]) return;
    visited[v] = true;
    count++;
    graph[v].forEach((vertex) => {
      if (!visited[vertex]) {
        dfs(vertex);
      }
    });
  };
  dfs(1);
  //자기 자신은 뺌
  return count - 1;
}

console.log(solution(graph));
