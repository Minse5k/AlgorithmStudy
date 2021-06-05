const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const k = parseInt(inputs[0]);
let cur = 1;
for (let i = 0; i < k; i++) {
  const [v, e] = inputs[cur++].split(" ").map((i) => parseInt(i));
  const graph = new Array(v + 1).fill(null).map((i) => []);
  const visited = new Array(v + 1).fill(0);
  for (let j = 0; j < e; j++) {
    const [a, b] = inputs[cur++].split(" ").map((i) => parseInt(i));
    graph[a].push(b);
    graph[b].push(a);
  }

  const answer = bipartiteGraph(v, graph, visited) ? "YES" : "NO";
  console.log(answer);
}

function bipartiteGraph(v, graph, visited) {
  for (let i = 1; i <= v; i++) {
    //방문했다면 bfs 통과
    if (visited[i] > 0) {
      continue;
    }
    const queue = [i];
    visited[i] = 1;
    let point = 0;
    while (queue.length > point) {
      const end = queue.length;
      while (end > point) {
        const now = queue[point++];
        for (let j = 0; j < graph[now].length; j++) {
          const next = graph[now][j];
          //방문을 안했을 때
          if (visited[next] === 0) {
            if (visited[now] === 1) {
              visited[next] = 2;
            } else {
              visited[next] = 1;
            }
            queue.push(next);
          } else if (visited[now] > 0) {
            //방문이 된 상태라면 색이 같으면 return
            if (visited[next] === visited[now]) {
              return false;
            }
          }
        }
      }
    }
  }
  return true;
}
