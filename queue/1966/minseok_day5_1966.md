# Problem 1966

## 큐, 자료 구조, 시뮬레이션, 구현

### 문제 링크
<https://www.acmicpc.net/problem/1966>

### solved
1. 프린터큐에경우 원형큐와 비슷하게 풀이하였다.
2. 중요도순으로 정렬 후 원형큐 순환을 통해 같은 값이 나오는 위치가 몇번째인지 찾아주었다.

### 주의할점
1. 중요도가 같은 숫자로 입력됐을 때 틀리지 않게 주의

### code
```javascript
'use strict';
let answer = [];

function printQue(n, m, arr) {
    let i = 0;
    let tmp = 0;
    let count = 0;
    const Array = arr.map((value) => value).sort((a,b) => (b-a));
    while(1) {
        if(Array[i] == arr[tmp%n]) {
            count++;
            i++;
            if(tmp%n == m) {
                break;
            }
        }
        tmp++;
    }
    answer.push(count);
}

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let count = -1;
let input = [];
let arr = [];


rl.on('line', function(line) {
    if(count === -1) {
        count = parseInt(line)*2;
    }
    else {
        if(count % 2 === 0) {
            input = line.split(' ');
        } else {
            arr = line.split(' ');
            printQue(input[0], input[1], arr);
        }
        count--;
    }
    if(count === 0) {
        rl.close();
    }
}).on('close', function() {
    console.log(answer.join('\n'));
    process.exit();
})