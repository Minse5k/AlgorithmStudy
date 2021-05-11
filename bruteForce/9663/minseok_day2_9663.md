# Problem 9663

## 브루트포스 알고리즘, 백트래킹

### 문제 링크
<https://www.acmicpc.net/problem/9663>

### solved
1. 재귀함수를 이용한다.
2. 퀸 체스말은 상,하,좌,우,대각선을 모두 잡을 수 있다.
3. nxn의 체스판에서 n개의 퀸이 존재하기 한 열에 하나의 퀸만 존재 할 수 있다는 점을 이용했다.
4. 대각선은 행과열의 합, 차가 같을 때를 이용하였다.

### 주의할점

### 오답 code
1. 구현을 하였으나 퀸이 놓이면 안 되는 배열이 재귀되지 않아 정확한 값이 출력되지 않음을 발견(주말에 고쳐볼 예정)
```javascript
'use strict';

let count = 0;
let arr = [];

function resetArray(arr, n) {
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            arr[i][j] = 0;
        }
    }
}

function checkAttack(row, column, n) {
    for(let i = row+1; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(j === column || (column-row === j-i) || (column+row === j+i)) {
                arr[i][j] = 1;
            }
        }
    }
    console.log(arr);
}

function checkChess(row, column, n) {
    let nextRow = row+1;
    checkAttack(row, column, n);
    if(nextRow >= n) {
        return;
    }
    for(let j = 0; j < n; j++) {
        //j!==column && (Math.abs(column-row) !== Math.abs(j-nextRow)) && 
        if(arr[nextRow][j] === 0) {
        //    console.log('_row :', nextRow,'j :', j);
            if(nextRow === n-1) {
                count++;
                console.log('count :', count);
            }
            checkChess(nextRow, j, n);
        }
    }
}

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

rl.on('line', function(line){
    const n = parseInt(line);
    arr = Array.from(Array(n), () => new Array(n).fill(0));

    for(let j = 0; j < 1; j++) { // 첫번째 열, j는 행
        //resetArray(arr,n);
        checkChess(0, j, n); // 
    }
    rl.close();
})
.on('close', function(){
    console.log(count);
    process.exit();
}) //line, row
