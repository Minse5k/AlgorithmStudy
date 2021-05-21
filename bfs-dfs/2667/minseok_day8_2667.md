# Problem 2667

## dfs, bfs

### 문제 링크
<https://www.acmicpc.net/problem/2667>

### solved
1. `dfs`를 이용하였다.

### 주의할점


### code
```javascript
'use strict';
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let n = 0;
let count = -1;
let graph = [];
let input = [];
rl.on('line', function(line) {
    if(count === -1) {
        count = parseInt(line);
        n = count;
        graph = Array(n).fill(null).map((v) => []);
        return;
    }
    input.push(line);
    graph[n-count] = input.shift().split('').map((v) => parseInt(v));
    count--;
    if(count === 0) { rl.close(); }
}).on('close', function() {
    //console.log(graph);
    let cnt = 0;
    let answerArray = [];
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(graph[i][j] === 1) {
                const num = dfs(i, j, 0);
                answerArray.push(parseInt(num));
                cnt++;
            }
        }
    }
    console.log(cnt);
    console.log(answerArray.sort((a, b) => (a-b)).join('\n'));
    process.exit();
})

function dfs(x, y, cnt) {
    if(graph[x][y] === 0) { return; }
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];
    graph[x][y] = 0;
    cnt++;
    //console.log('cnt : ' ,cnt);
    //console.log(graph);
    for(let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if(nx >= 0 && nx < n && ny >= 0 && ny < n) {
            if(graph[nx][ny] === 1) {
                cnt = dfs(nx, ny, cnt);
            }
        }
    }
    //console.log('cnt :', cnt);
    return cnt;
}