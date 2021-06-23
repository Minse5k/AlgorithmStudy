function solution(land) {
    const n = land.length;
    const m = 4;
    let dp = Array.from(Array(n), () => new Array(m).fill(0));
    dp[0] = land[0];
    
    for(let i = 1; i < n; i++) {
        for(let j = 0; j < m; j++) {
            let max = -1;
            
            for(let k = 0; k < m; k++) {
                if(k === j) continue;
                const before = dp[i - 1][k];
                const now = land[i][j];
                if(max < now + before) max = now + before;
            }
            dp[i][j] = max;
        }
    }
    return Math.max(...dp[n - 1]);
}