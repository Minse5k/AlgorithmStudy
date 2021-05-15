# Problem 5430

## 구현, 자료 구조, 문자열, 파싱, 덱

### 문제 링크
<https://www.acmicpc.net/problem/5430>

### solved
1. `R`이 홀수로 입력된경우만 뒤집어주었다.
2. `D`는 `R`이 홀수면 `pop` 짝수면 `shift()`를 사용했다.


### 주의할점
1. `R`이 입력될 때 마다 `.revers()` 함수를 사용하면 시간을 많이 잡아먹어 시간초과가 뜨므로 주의
2. `shift()`같은 경우는 시간을 많이 잡아먹으므로 `D`를 오로지 `shift()`로만 풀면 시간초과가 뜨므로 주의

- 현재 50%에서 틀렸습니다.가 발생하고있다. 반례를 계속해서 찾아 고칠 예정이다.

### code
```javascript
'use strict';

let answer = [];

function AC(input, num, arr) {
    let count1 = 0;
    for(let i = 0; i < input.length; i++) {
        if(input[i] === 'R') {
            count1++;
        }
        if(input[i] === 'D') {
            if(arr.length < 1) {
                answer.push('error');
                return;
            }
            if(count1%2 === 1) {
                arr.pop();
            }
            else {
                arr.shift();
            }
        }
    }
    if(count1%2 === 1) {
        arr.reverse();
    }
    const str = '[' + arr.join(',') + ']';
    answer.push(str);
}

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let count = -1;
let input = [];
let num = 0;
let arr = [];
let Array = [];
rl.on('line', function(line) {
    if(count === -1) {
        count = parseInt(line)*3;
        return;
    }
    if(count%3 === 0) {
        input = line.split('');
    }
    if(count%3 === 2) {
        num = parseInt(line);
    }
    if(count%3 === 1) {
        if(line.length >2) {
            arr = line.substr(1,line.length-2).split(',');
            AC(input, num, arr);
        }
        else {
            if(line.length === 2) {
                answer.push('[]');
            }
            else {
                answer.push('error');
            }
        }
        input.length = 0;
        num = 0;
        Array.length = 0;
        arr.length = 0;
    }
    count--;
    if(count === 0) {
        rl.close();
    }
}).on('close', function() {
    console.log(answer.join('\n'));
    process.exit();
})