# Problem 15591

## 그래프

### 문제 링크
<https://www.acmicpc.net/problem/15591>

### solved

### 주의할점

### code
```javascript
'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let N = 0, Q = 0;
let input = [];
let quest = [];
let count = -1;
rl.on('line', function(line) {
    if(count === -1) {
        [N, Q] = line.split(' ').map((v) => parseInt(v));
        count = (N-1)+Q;
        return;
    }
    if(count > Q) {
        input.push(line.split(' ').map((v) => parseInt(v)));
    } else {
        quest.push(line.split(' ').map((v) => parseInt(v)));
    }
    count--;
    if(count===0) {
        rl.close();
    }
}).on('close', function() {
    const graph = createGraph();
    for(let i = 0; i < Q; i++) {
        const [k, start] = quest.shift(' ');
        getRecommendedVideosCount(graph, start, k);
    }
    process.exit(); 
})

function createGraph() {
    const arr = [];
    for(let i = 1; i <= N; i++) {
        arr[i] = [];
    }
    for(let i = 0; i < N - 1; i++) {
        const [from, to, k] = input.shift(' ');
        arr[from].push([to, k]);
        arr[to].push([from, k]);
    }
    return arr;
}
function getRecommendedVideosCount(graph, start, k) {
    let count = 0;
    const queue = [];
    const visited = new Array(N+1).fill(false);
    queue.push(start);
    visited[start] = true;
    while(queue.length > 0) {
        const tmp = queue.shift();
        for(let i = 0; i < graph[tmp].length; i++) {
            const next = graph[tmp][i][0];
            if(visited[next]) continue;
            const ki = graph[tmp][i][1];
            if(ki >= k) {
                visited[next] = true;
                count++;
                queue.push(next);
            }

        }
    }
    console.log(count);
}