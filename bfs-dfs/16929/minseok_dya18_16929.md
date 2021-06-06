# Problem 16929

## dfs, bfs

### 문제 링크
<https://www.acmicpc.net/problem/16929>

### solved
1. dfs를 이용하여 깊이 우선 탐색을 한다.
2. 순환하는지 확인하돼 바로 직전으로 돌아가는 경우를 주의한다.

### 주의할점


### code
```javascript
"use strict";
const { R_OK } = require("constants");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = -1;
let n, m;
let graph = [];
let visited = [];
rl.on("line", function (line) {
    if (count === -1) {
        [n, m] = line.split(" ").map((v) => parseInt(v));
        count = n;
        return;
    }
    graph.push(line.split(""));
    count--;
    if (count === 0) rl.close();
}).on("close", function () {
    visited = Array.from(new Array(n), () => new Array(m).fill(false));
    solution(n, m);
    process.exit();
});

function solution(n, m) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (!visited[i][j]) {
                visited[i][j] = true;
                //순환하는지 확인
                if (dfs(i, j, graph[i][j], [i, j])) {
                    console.log("Yes");
                    return;
                }
            }
        }
    }
    console.log("No");
    return;
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
function dfs(x, y, color, pre) {
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        //직전에 왔던곳으로 가면 안됨
        if (pre[0] === nx && pre[1] === ny) continue;
        if (0 <= nx && nx < n && 0 <= ny && ny < m) {
            //색이 같은가
            if (graph[nx][ny] === color) {
                //이미 방문했던곳(싸이클)
                if (visited[nx][ny]) return true;
                visited[nx][ny] = true;
                if (dfs(nx, ny, color, [x, y])) return true;
            }
        }
    }
    return false;
}
