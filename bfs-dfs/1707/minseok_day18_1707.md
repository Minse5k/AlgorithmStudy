# Problem 1707

## dfs, bfs

### 문제 링크
<https://www.acmicpc.net/problem/1707>

### solved
1. `bfs`를 이용하였다.
2. 두 그룹을 `1`, `2`로 나누어 주었다.
3. 만약 `1`인 그룹인 수가 `2`가 되려하면 `NO`

### 주의할점
1. 이유는 모르겠지만 `dfs`를 사용하였을 때 stack 메모리가 초과됐다.

### code
```javascript
"use strict";
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let c = -1;
const graphInfo = []; // 그래프 정보
const nodeInfo = []; // 노드와 간선 갯수 정보
let graph = [];
let visited = [];
let n = 0,
    m = 0;
rl.on("line", function (line) {
    if (c === -1) {
        c = parseInt(line);
        return;
    }
    if (m === 0) {
        c--;
        nodeInfo.push(line.split(" ").map((v) => parseInt(v)));
        [n, m] = line.split(" ").map((v) => parseInt(v));
        //console.log(n, m);
        return;
    }
    graphInfo.push(line.split(" ").map((v) => parseInt(v)));
    m--;
    if (m === 0 && c === 0) {
        rl.close();
    }
}).on("close", function () {
    let sum = 0;
    for (let i = 0; i < nodeInfo.length; i++) {
        graph = [];
        const [n, m] = nodeInfo[i]; // 정점의 개수, 간선의 개수
        visited = new Array(n + 1).fill(0);
        for (let j = 1; j <= n; j++) {
            graph[j] = [];
        }
        for (let j = sum; j < m + sum; j++) {
            const [from, to] = graphInfo[j];
            graph[from].push(to);
            graph[to].push(from);
        }
        for (let j = 1; j <= n; j++) {
            if (!visited[j]) {
                visited[j] = 1;
                dfs(j);
            }
        }
        let flag = false;
        for(let j = 1; j <= n; j++) {
            for(let k = 0; k < graph[j].length; k++) {
                if(flag) {
                    continue;
                }
                if(visited[j] === visited[graph[j][k]]) {
                    console.log("NO");
                    flag = true;
                }
            }
        }
        if(!flag) {
            console.log("YES");
        }
        sum += nodeInfo[i][1];
    }
    process.exit();
});

function dfs(x) {
    const queue = [];
    queue.push(x);

    while (queue.length > 0) {
        const cur = queue.shift();
        for (let i = 0; i < graph[cur].length; i++) {
            const next = graph[cur][i];
            if (!visited[next]) {
                if (visited[cur] === 1) {
                    visited[next] = 2;
                } else if (visited[cur] === 2) {
                    visited[next] = 1;
                }
                queue.push(next);
            } else if (visited[cur] > 0) {
                if (visited[cur] === visited[next]) {
                    return;
                }
            }
        }
    }
}
