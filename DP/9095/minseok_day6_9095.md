# Problem 9095

## DP

### 문제 링크
<https://www.acmicpc.net/problem/9095>

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

let count = -1; // 몇회 입력 받을지
let answerArr = []; // 정답을 넣을 배열
rl.on('line', function(line) {
    if(count === -1) {
        count = parseInt(line);
        return;
    }
    const input = parseInt(line);
    let arr = new Array(input+1);
    arr[0] = 1;
    arr[1] = 1;
    arr[2] = 2;
    for(let i = 3; i <= input; i++) {
        arr[i] = arr[i-1] + arr[i-2] + arr[i-3];
    }
    answerArr.push(arr[input]);
    count--;
    if(count === 0) {
        rl.close();
    }
}).on('close', function() {
    console.log(answerArr.join('\n'));
    process.exit();
})