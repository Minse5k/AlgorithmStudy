# Problem 11729

## 재귀

### 문제 링크
<https://www.acmicpc.net/problem/11729>

### solved
1. `start`, `goal`, `assist` 세 칸(1, 2, 3)이 존재한다.
2. 블럭이 `n-1`개 일 때 `n`번째 블럭을 먼저 `goal` 지점으로 옮기기 위해 `n-1`개의 블럭을 보두 assist로 옮겨준다.
3. `n`번째 블럭을 `goal` 지점으로 옮겼다면 나머지 `n-1`개의 블럭을 `goal`지점으로 옮겨준다.

### 주의할점
1. 재귀함수는 되도록이면 함수 첫 부분에 종료문이 나오도록 한다.

```javascript
'use strict';

let count = 0;
let arr = [];
function printHanoi(n, start, goal) {
    count++;
    arr.push(String(start+' '+goal));
}

function moveHanoi(n, start, goal, assist) {
    if(n === 1) {
        printHanoi(n, start, goal);
        return;
    }
    else {
        moveHanoi(n-1, start, assist, goal);
        printHanoi(n, start, goal);
        moveHanoi(n-1, assist, goal, start);
    }
}


const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

rl.on('line', function(line){
    const n = parseInt(line);
    moveHanoi(n, 1, 3, 2);
    rl.close();
}).on('close', function(){
    console.log(count);
    console.log(arr.join('\n'));
    process.exit();
})