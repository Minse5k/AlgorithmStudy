# Problem 10870

## 다이나믹 프로그래밍, 수학

### 문제 링크
<https://www.acmicpc.net/problem/10870>

### solved
1. 재귀함수를 이용하였다.

### 주의할점
1. `y`값이 변하므로 `tmp`같은 중간 다리 변수 하나를 선언해야 한다.

### code
```javascript
'use strict';

function Pibonachi(n, x, y) {
    if(n === 0) {
        console.log(x);
        return;
    }
    let tmp = y;
    y = x+y;
    x = tmp;
    n--;
    Pibonachi(n, x, y);
}

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})


rl.on('line', function(line) {
    const input = parseInt(line);
    Pibonachi(input, 0, 1);
    rl.close();
}).on('close', function(){
    process.exit();
})