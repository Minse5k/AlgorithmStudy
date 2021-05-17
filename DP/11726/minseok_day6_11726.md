# Problem 11726

## DP

### 문제 링크
<https://www.acmicpc.net/problem/11726>

### solved
1. 피보나치수열을 이용하여 풀었다.

### 주의할점

### code
```javascript
'use strict';

function Pibonachi(n, x, y) {
    if(n === 0) {
        console.log(x%10007);
        return;
    }
    let tmp = y;
    y = x+y;
    x = tmp;
    n--;
    Pibonachi(n, x%10007, y%10007);
}

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})


rl.on('line', function(line) {
    const input = parseInt(line);
    Pibonachi(input+1, 0, 1);
    rl.close();
}).on('close', function(){
    process.exit();
})