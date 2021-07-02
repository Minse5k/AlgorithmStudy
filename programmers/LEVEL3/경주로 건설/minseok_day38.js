function searchMinimumCost(board, n) {
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    const queue = [[0, 0, 0, 0]];
    const visited = Array.from(Array(n), () => new Array(n).fill(0));
    
    while(queue.length > 0) {
        const [nowX, nowY, nowCost, nowDir] = queue.shift();
        
        for(let i = 0; i < 4; i++) {
            const nextX = nowX + dx[i];
            const nextY = nowY + dy[i];
            
            if(nextX >= n || nextY >= n || nextX < 0 || nextY < 0 || board[nextX][nextY] === 1) continue;
            
            const nextDir = i < 2 ? 0 : 1;
            const nextCost = nowDir === nextDir || (nowX === 0 && nowY === 0) ? 100 : 600;
            
            if(visited[nextX][nextY] === 0 || visited[nextX][nextY] >= nowCost + nextCost) {
                visited[nextX][nextY] = nowCost + nextCost;
                queue.push([nextX, nextY, nowCost + nextCost, nextDir]);
            }
        }
    }
    
    return visited[n - 1][n - 1];
}

function solution(board) {
    return searchMinimumCost(board, board.length);
}