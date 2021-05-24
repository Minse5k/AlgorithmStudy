# Problem 1697

## dfs, bfs

### 문제 링크
<https://www.acmicpc.net/problem/1697>

### solved
1. `bfs`를 이용하였다.
2. `queue`를 이용하였다.

### 주의할점


### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})


let n, m = 0;
rl.on('line', function(line) {
    [n, m] = line.split(' ').map((v) => parseInt(v));
    rl.close();
}).on('close', function() {
    let visited = new Array(100001).fill(false);
    let queue = [[n,0]];
    while(queue.length) {
        const [post, cnt] = queue.shift();
        if(visited[post]) {
            continue;
        }

        visited[post] = true;
        if(post === m) {
            console.log(cnt);
            break;
        }

        if(post * 2 <= 100000) {
            queue.push([post * 2, cnt + 1]);
        }
        if(post + 1 <= 100000) {
            queue.push([post + 1, cnt + 1]);
        }
        if(post - 1 >= 0) {
            queue.push([post - 1, cnt + 1]);
        }
    }
    process.exit();
})