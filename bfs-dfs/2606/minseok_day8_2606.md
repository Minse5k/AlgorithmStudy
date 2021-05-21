# Problem 2606

## dfs, bfs

### 문제 링크
<https://www.acmicpc.net/problem/2606>

### solved
1. dfs를 이용하여 연결된 컴퓨터가 무엇인지 찾는다.

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

let count = -1;
let flag = 0;
let n, m = 0;
let input = [];
let graph = [];
let visited = [];
rl.on('line', function(line) {
    if(flag === 0) {
        flag = 1;
        n = parseInt(line);
        return;
    } else if(count === -1) {
        count = parseInt(line);
        m = parseInt(line);
        return;
    }
    input.push(line);
    count--;
    if(count === 0) { rl.close(); }
}).on('close', function() {
    graph = Array(n+1).fill(null).map((v) => []);
    for(let i = 0; i < m; i++) {
        const [a, b] = input.shift().split(' ').map((v) => parseInt(v));
        graph[a].push(b);
        graph[b].push(a);
    }
    visited = Array(n+1).fill(false);
    dfs(1);
    console.log(result.length-1);
    process.exit();
})
let result = [];
function dfs(v) {
    if(visited[v]) { return; }
    visited[v] = true;
    result.push(v);
    graph[v].forEach((value) => {
        if(!visited[value]) {
            dfs(value);
        }
    })
}