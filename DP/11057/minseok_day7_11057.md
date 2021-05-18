# Problem 11057

## 다이나믹 프로그래밍

### 문제 링크
<https://www.acmicpc.net/problem/11057>

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


let arr = Array.from(Array(1001), () => Array(1001).fill(0));

rl.on('line', function(line) {
    const input = parseInt(line);
    for(let i = 1; i <= 10; i++) {
        arr[1][i] = 1;
    }
    for(let i = 2; i <= input; i++) {
        for(let j = 1; j <= 10; j++) {
            for(let k = 1; k <= j; k++) {
                arr[i][j] += arr[i-1][k]%10007;
                arr[i][j] %= 10007
            }
        }
    }
    let result = 0;
    for(let i = 0; i<=10; i++) {
        result += arr[input][i];
    }
    console.log(result%10007);
    rl.close();
}).on('close', function() {
    process.exit();
})