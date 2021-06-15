function solution(N, roads, K) {
  const { town, visited } = getTool(N, roads);

  const answer = dfs(1, town, visited, K);

  return answer.size;
}

function getTool(N, roads) {
  const town = roads.reduce(
    (graph, road) => {
      const [start, end, time] = road;
      graph[start].push([end, time]);
      graph[end].push([start, time]);

      return graph;
    },
    new Array(N + 1).fill(null).map((v) => [])
  );
  const visited = new Array(N + 1).fill(false);
  return { town, visited };
}

function dfs(start, town, visited, K) {
  const results = new Set();
  results.add(start);
  visited[start] = true;
  for (const next of town[start]) {
    const [node, time] = next;
    if (visited[node]) continue;
    if (K < time) continue;
    visited[node] = true;
    const possible = dfs(node, town, visited, K - time);
    [...possible].forEach((result) => {
      results.add(result);
    });
    visited[node] = false;
  }

  return results;
}
