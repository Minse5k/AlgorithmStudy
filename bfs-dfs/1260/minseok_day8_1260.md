# Problem 1260

## dfs, bfs

### 문제 링크
<https://www.acmicpc.net/problem/1260>

### solved
1. `dfs`는 `스택`을 이용한 `재귀`
2. `bfs`는 `큐`를 이용하여 풀었다.

### 주의할점


### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let count = -1;
let n, m, v = 0;
let input = [];
let graph = [];
let visited = [];
let result = [];
rl.on('line', function(line) {
    if(count === -1) {
        input.push(line);
        [n, m, v] = input.shift().split(' ').map((v) => parseInt(v));
        count = m;
        input.length = 0;
        return;
    }
    count--;
    input.push(line);
    if(count === 0) { rl.close(); }
}).on('close', function(){ 
    graph = Array.from(Array(n + 1), () => Array());
    //let graph = new Array(n + 1).fill(null).map((v) => []);
    for(let i =0; i < m; i++) {
        const [a, b] = input.shift().split(' ').map((v) => parseInt(v));
        graph[a].push(b);
        graph[b].push(a);
    }
    graph = graph.map(v=> v.sort((a, b) => a-b))
    visited = new Array(n+1).fill(false);
    dfs(v);
    console.log(result.join(' '));
    visited.fill(false);
    bfs(v);
})

function dfs(v) {
    if(visited[v]) { return; }
    visited[v] = true;
    result.push(v);
    for(let i = 0; i < graph[v].length; i++) {
        if(!visited[graph[v][i]]) {
            dfs(graph[v][i]);
        }
    }
    /*
    graph[v].forEach((node) => {
        if (!visited[node]) {
          dfs(node);
        }
    });
    */
}

function bfs(v) {
    let answer = [];
    const queue = [v];
    while (queue.length > 0) {
        const check = queue.shift();
        visited[check] = true;
        answer.push(check);
        graph[check].forEach((value) => {
            if(!visited[value]) {
                queue.push(value);
                visited[value] = true;
            }
        });
    }
    return console.log(answer.join(' '));
}
