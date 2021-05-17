# Problem 1463

## DP

### 문제 링크
<https://www.acmicpc.net/problem/1463>

### solved
1. `-1`, `%2`, `%3`을 해주었을 때 최솟값에 `+1`을 해준다.
2. `%2`나 `%3`의 나머지가 0이 아닌 경우 최솟값이 되지 않게하기 위해 `arr[0] = 99999`를 해주었다.

### 주의할점

### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let n = 0;
rl.on('line', function(line) {
    n = parseInt(line);
    rl.close();
}).on('close', function() {
    let arr = new Array(parseInt(n)).fill(0);
    arr[0] = 999999;
    arr[1] = 0;
    arr[2] = 1;
    arr[3] = 1;
    for(let i = 4; i <= n; i ++) {
        let a = i-1;
        let b = 0;
        let c = 0;
        if(i%2 === 0) {
            b = i/2;
        }
        if(i%3 === 0) {
            c = i/3;
        }
        let x = Math.min(arr[a],arr[b],arr[c]);
        arr[i] = x+1;
    }
    console.log(arr[n]);
    process.exit();
})