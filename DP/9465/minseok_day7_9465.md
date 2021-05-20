# Problem 9465

## 다이나믹 프로그래밍

### 문제 링크
<https://www.acmicpc.net/problem/9465>

### solved
1. 아직 해결하지 못했다.

### 주의할점


### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})


let arr = [];
let count = -1;
rl.on('line', function(line) {
    if(count === -1) {
        count = parseInt(line);
        return;
    }
    const input = parseInt(line);
    arr[0] = 0;
    arr[1] = 3;
    arr[2] = 7;
    for(let i = 3; i <= input; i++) {
        arr[i] = (arr[i-1] * 2 + arr[i-2])%9901;
    }
    count--;
    if(count === 0) {
        rl.close();
    }
}).on('close', function() {
    process.exit();
})