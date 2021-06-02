# Problem 1541

## 그리디

### 문제 링크
<https://www.acmicpc.net/problem/1541>

### solved
1. `-`를 기준으로 나눈 후 나눈 묶음을 모두 더해준다.
2. 묶음을 모두 빼준다.

### 주의할점

### code
```javascript
'use strict';

const { readlink } = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let input = "";
rl.on('line', function(line) {
    input = line;
    rl.close();
}).on('close', function() {
    const arr = input.split('-');
    let array = [];
    arr.forEach((v) => {
        array.push(v.split('+').map((v) => parseInt(v)).reduce((pre, cur) => pre+cur));
    })
    let sum = 0;
    array.forEach((v) => {
        sum = array.reduce((pre,cur) => pre-cur);
    })
    console.log(sum);
    process.exit();
})