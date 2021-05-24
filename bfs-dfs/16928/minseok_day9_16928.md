# Problem 16928

## bfs

### 문제 링크
<https://www.acmicpc.net/problem/16928>

### solved
1. `bfs` 즉 `queue`를 이용하여 풀었다.

### 주의할점
1. 뱀을 이용하는게 빠를 수 있다.

### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const input = [];
let count = -1;
rl.on('line', function(line) {
    if(count === -1) {
        input.push(line);
        const [a, b] = line.split(' ').map((v) => parseInt(v));
        count = a+b;
        return;
    }
    input.push(line);
    count--;
    if(count === 0) {
        rl.close();
    }
}).on('close', function() {
    const [ladderCount, snakeCount] = input[0].split(' ').map((v) => parseInt(v));
    const ladder = [];
    const snake = [];
    for(let i = 1; i <= ladderCount; i++) {
        ladder.push(input[i].split(' ').map((v) => parseInt(v)));
    }
    for(let i = ladderCount + 1; i < input.length; i++) {
        snake.push(input[i].split(' ').map((v) => parseInt(v)));
    }
    const visited = new Array(101).fill(false);
    const queue = [[1,0]];
    while(queue.length) {
        const [start, cnt] = queue.shift();
        if(visited[start] === true) {
            continue;
        }
        //console.log(start, cnt);
        if(start === 100) {
            console.log(cnt);
            break;
        }
        visited[start] = true;
        for(let i = 1; i <= 6; i++) {
            if(start + i <= 100) {
                for(let j = 0; j < ladderCount; j++) {
                    const st = ladder[j][0];
                    const end = ladder[j][1];                    
                    if(start + i === st) {
                        visited[start+i] = true;
                        queue.push([end, cnt+1]);
                        continue;
                    }
                }
                for(let j = 0; j < snakeCount; j++) {
                    const end = snake[j][0];
                    const st = snake[j][1];
                    if(start + i === end) {
                        visited[start+i] = true;
                        queue.push([st, cnt+1]);
                        continue;
                    }
                }
                queue.push([start + i, cnt + 1]);
            }    
        }
    }
    process.exit();
})