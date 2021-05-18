# Problem 1309

## 다이나믹 프로그래밍

### 문제 링크
<https://www.acmicpc.net/problem/9012>

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


let arr = [];
rl.on('line', function(line) {
    const input = parseInt(line);
    arr[0] = 0;
    arr[1] = 3;
    arr[2] = 7;
    for(let i = 3; i <= input; i++) {
        arr[i] = (arr[i-1] * 2 + arr[i-2])%9901;
    }
    console.log(arr[input]);
    rl.close();
}).on('close', function() {
    process.exit();
})