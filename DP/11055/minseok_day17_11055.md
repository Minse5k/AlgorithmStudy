# Problem 11055

## DP

### 문제 링크
<https://www.acmicpc.net/problem/11055>

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
let cnt = 1;
let n = 0;
const input = [];
rl.on('line', function(line) {
    if(cnt === 1) {
        n = parseInt(line);
    } else {
        input.push(line.split(' ').map((v) => parseInt(v)));
        rl.close();
    }
    cnt--;
}).on('close', function() {
    let arr = new Array(1001).fill(0);
    input[0].unshift(0);
    let max = 0;
    for(let i = 0; i <= n; i++) {
        for(let j = i+1; j <= n; j++) {
            if(input[0][i] < input[0][j]) {
                if(arr[input[0][j]] < arr[input[0][i]] + input[0][j]) {
                    arr[input[0][j]] = arr[input[0][i]] + input[0][j];
                    if(max < arr[input[0][j]]) {
                        max = arr[input[0][j]];
                    }
                }
            }
        }
    }
    console.log(max);
    process.exit();
})