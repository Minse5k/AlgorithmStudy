# Problem 15988

## DP

### 문제 링크
<https://www.acmicpc.net/problem/15988>

### solved
1. 점화식을 사용하였다.

### 주의할점
1. 입력받는 횟수가 `1,000,000`회 이다.
2. 여러번 새로 입력 받으면 메모리가 초과되므로 기존에 입력 받은 값을 기억하고 다시 입력받지 않게 해주었다.

### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let arr = [];
arr[0] = 1;
arr[1] = 1;
arr[2] = 2;
let flag = 0;
let count = -1; // 몇 회 입력 받을건지
let answerArray = []; // 정답 넣을 배열
rl.on('line', function(line) {
    if(count === -1) {
        count = parseInt(line);
    } else {
        const input = parseInt(line);
        if(flag === 0) {
            for(let i = 3; i <= input; i++) {
                arr[i] = (arr[i-1] + arr[i-2] + arr[i-3])%1000000009;
            }
            flag = input;
            answerArray.push(arr[input]);
        } else if( input > flag) {
            for(let i = flag+1; i <= input; i++) {
                arr[i] = (arr[i-1] + arr[i-2] + arr[i-3])%1000000009;
            }
            flag = input;
            answerArray.push(arr[input]);
        } else {
            answerArray.push(arr[input]);
        }
        count--;
        if(count === 0) {
            rl.close();
        }
    }
}).on('close', function() {
    console.log(answerArray.join('\n'));
    process.exit();
})