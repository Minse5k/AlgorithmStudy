function createGraph(n, road) {
    return road.reduce((graph, value) => {
        const [start, end, roadTime] = value;
        
        graph[start].push([end, roadTime]);
        graph[end].push([start, roadTime]);
        return graph;
    }, new Array(n+1).fill(null).map((v) => []));
}

function getShortestDist(nodeArray, K, N) {
    const distance = new Array(N + 1).fill(0);
    const queue = [1];
    
    while(queue.length > 0) {
        const nowNode = queue.shift();

        for(const next of nodeArray[nowNode]) {
            const [nextNode, nextK] = next;
            
            if(distance[nextNode] !== 0 && distance[nextNode] <= distance[nowNode] + nextK) continue;
            distance[nextNode] = distance[nowNode] + nextK;
            queue.push(nextNode);
        }
    }
    
    return distance;
}

function solution(N, road, K) {
    const nodeArray = createGraph(N, road);
    const shortestDistance = getShortestDist(nodeArray, K, N);
    
    let count = 0;
    for(let i = 2; i < N + 1; i++) {
        if(shortestDistance[i] <= K) count++;
    }
    return count + 1;
}
