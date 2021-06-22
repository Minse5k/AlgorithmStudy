function maxSquare(board) {
    const n = board.length;
    const m = board[0].length;
    
    const visited = Array.from(Array(n), () => new Array(m).fill(0));
    
    let max = 0;
    
    for(let j = 0; j < m; j++) {
        if(board[0][j] === 1) {
            visited[0][j] = 1;
            max = 1;
        }
    }
    
    for(let i = 0; i < n; i++) {
        if(board[i][0] === 1) {
            visited[i][0] = 1
            max = 1;
        }
    }
    
    for(let i = 1; i < n; i++) {
        for(let j = 1; j < m; j++) {
            if(board[i][j] === 0) continue;
            
            if(visited[i - 1][j] === 1 && visited[i - 1][j - 1] === 1 && visited[i][j - 1] === 1) {
                visited[i][j] = 2;
            }
            const min = Math.min(visited[i - 1][j], visited[i - 1][j - 1], visited[i][j - 1]);
            
            visited[i][j] = min + 1;
            if(max < visited[i][j]) max = visited[i][j];
        }
    }
    return max;
}

function solution(board)
{
    const max = maxSquare(board);
    return max*max;
}