# Problem 10866

## 자료구조, 덱

### 문제 링크
<https://www.acmicpc.net/problem/10866>

### solved
1. 덱은 스택과 큐를 합쳐놓은 자료구조로 앞 뒤 모두 삽입, 제거가 가능하다.
2. 뒤에서 일어나는 일은 `스택`과 같이 삽입은 `push` 삭제는 `pop`을 사용하였다.
3. 앞에서 일어나는 일은 `큐`와 같이 삽입은 `js`에 존재하는 `unshift` 삭제는 `shift`를 사용하였다.

### 주의할점
1. 출력을 매번 해주면 시간이 초과되는 현상을 발견하여 정답 배열을 만들어 한번에 출력해 주었다.

### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let arr = [];
let count = 0;
let answer = [];
rl.on('line', function(line) {
    if(!isNaN(line)) {
        count = parseInt(line);
    }
    const input = line.split(' ');
    switch(input[0]) {
        case 'push_back':
            arr.push(input[1]);
            break;
        case 'push_front':
            arr.unshift(input[1]);
            break;
        case 'pop_front':
            if(arr.length<1) {
                answer.push(-1);
            }
            else {
                answer.push(arr.shift());
            }
            break;
        case 'pop_back':
            if(arr.length<1) {
                answer.push(-1);
            }
            else {
                answer.push(arr.pop());
            }
            break;
        case 'size':
            answer.push(arr.length);
            break;
        case 'empty':
            if(arr.length<1) {
                answer.push(1);
            }
            else {
                answer.push(0);
            }
            break;
        case 'front':
            if(arr.length<1) {
                answer.push(-1);
            }
            else {
                answer.push(arr[0]);
            }
            break;
        case 'back':
            if(arr.length<1) {
                answer.push(-1);
            }
            else {
                answer.push(arr[arr.length-1]);
            }
            break;
    }
    if(count == 0) {
        rl.close();
    }
    count--;
}).on('close', function() {
    console.log(answer.join('\n'));
    process.exit();
})