function createGraph(n, edge) {
    return edge.reduce(
        (graph, value) => {
        const [start, end] = value;
        
        graph[start].push(end);
        graph[end].push(start);
        return graph;
    }, new Array(n + 1).fill(null).map((v) => []));
}

function findMaxEdgeCount(distance) {
    const maxNum = Math.max(...distance);
    return distance.reduce(
        (count, value) => {
        if(value === maxNum) count++;
        
            return count;
    }, 0);
}

function bfs(start, nodeArray, distance) {
    const queue = [];

    queue.push(start);
    distance[start] = 1;
    
    while(queue.length > 0) {
        const pre = queue.shift();
        
        for(const next of nodeArray[pre]) {
            if(distance[next] !== 0) continue;
            
            distance[next] = distance[pre] + 1;
            queue.push(next);
        }
    }
    
    return distance;
}

function solution(n, edge) {
    
    const nodeArray = createGraph(n, edge);
    const distance = new Array(n + 1).fill(0);
    
    const distanceArray = bfs(1, nodeArray, distance);   
    
    return findMaxEdgeCount(distanceArray);
}