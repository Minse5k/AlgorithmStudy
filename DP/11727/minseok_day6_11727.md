# Problem 118727

## DP

### 문제 링크
<https://www.acmicpc.net/problem/11727>

### solved
1. 점화식을 사용하였다.

### 주의할점

### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})


rl.on('line', function(line) {
    const input = parseInt(line);
    let arr = new Array(input+1);
    arr[0] = 1;
    arr[1] = 1;
    for(let i = 2; i <= input; i++) {
        arr[i] = (arr[i-1] + arr[i-2] + arr[i-2])%10007;
    }
    console.log(arr[input]);
    rl.close();
}).on('close', function(){
    process.exit();
})