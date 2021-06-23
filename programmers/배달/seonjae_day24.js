function solution(n, roads, k) {
  const graph = getGraph(n, roads);
  const shortesDistance = getShortesDist(n, graph);

  const count = getCount(shortesDistance, n, k);
  return count;
}

function getGraph(n, roads) {
  return roads.reduce(
    (graph, road) => {
      const [from, to, time] = road;
      graph[from].push([to, time]);
      graph[to].push([from, time]);
      return graph;
    },
    Array.from(Array(n + 1), () => [])
  );
}

function getShortesDist(n, graph) {
  const distance = new Array(n + 1).fill(0);
  const queue = [1];
   
  // let point = 0;
  //     while(queue.length > point){
  //         const end = queue.length;
  //         while(end > point){
  //             const nowNode = queue[point++];

  //             for(const next of graph[nowNode]){
  //                 const [nextNode, time] = next;
  //                 if(distance[nextNode] !== 0 && distance[nextNode] <= distance[nowNode] + time)
  //                     continue;
  //                 distance[nextNode] = distance[nowNode] + time;
  //                 queue.push(nextNode);

  //             }
  //         }
  //     }
  while (queue.length > 0) {
    const nowNode = queue.shift();

    for (const next of graph[nowNode]) {
      const [nextNode, time] = next;
      if (
        distance[nextNode] !== 0 &&
        distance[nextNode] <= distance[nowNode] + time
      )
        continue;
      distance[nextNode] = distance[nowNode] + time;
      queue.push(nextNode);
    }
  }

  return distance;
}

function getCount(distance, n, k) {
  let count = 0;
  for (let i = 2; i < n + 1; i++) {
    if (distance[i] <= k) count++;
  }
  return count + 1;
}
