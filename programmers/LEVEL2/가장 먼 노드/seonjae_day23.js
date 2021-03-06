function solution(n, vertexs) {
  const graph = createGraph(n, vertexs);
  const answer = bfs(1, n, graph);

  return answer;
}

function createGraph(n, vertexs) {
  // 리팩토링전
  // const graph = new Array(n + 1).fill(null).map((node) => []);
  // vertexs.forEach((vertex) => {
  //   const [nodeA, nodeB] = vertex;
  //   graph[nodeA].push(nodeB);
  //   graph[nodeB].push(nodeA);
  // });
  // return graph;
  //forEach문보단 reduce로 구현해보기
  return vertexs.reduce(
    (graph, vertex) => {
      const [nodeA, nodeB] = vertex;
      graph[nodeA].push(nodeB);
      graph[nodeB].push(nodeA);
      return graph;
    },
    new Array(n + 1).fill(null).map((node) => [])
  );
}

function bfs(node, n, graph) {
  const visited = new Array(n + 1).fill(false);
  const queue = [node];
  let indexPoint = 0;
  let count = 0;

  visited[node] = true;

  while (queue.length > indexPoint) {
    const depsEndIndex = queue.length;
    count = queue.length - indexPoint;

    while (depsEndIndex > indexPoint) {
      const now = queue[indexPoint++];

      for (const next of graph[now]) {
        if (visited[next]) continue;

        visited[next] = true;
        queue.push(next);
      }
    }
  }
  return count;
}

//깊이에 따른 노드개수를 출력하기 위해 count++은 상관없는 변수이므로 삭제
