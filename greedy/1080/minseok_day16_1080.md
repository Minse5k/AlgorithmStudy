# Problem 1080

## 그리디

### 문제 링크
<https://www.acmicpc.net/problem/1080>

### solved


### 주의할점

### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout   
})

let n = 0, m = 0;
let arrayA = [];
let arrayB = [];
let count = -1;
rl.on('line', function(line) {
    if(count === -1) {
        [n, m] = line.split(' ').map((v) => parseInt(v));
        count = 2*n;
        return;
    }
    if(count > n) {
        arrayA.push(line.split('').map((v) => parseInt(v)));
    } else {
        arrayB.push(line.split('').map((v) => parseInt(v)));
    }
    count--;
    if(count === 0) {
        rl.close();
    }
}).on('close', function(){
    let cnt = 0;
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(arrayA[i][j] === arrayB[i][j]) {
                continue;
            } else {
                if(i+3 <= n && j+3 <= m) {
                    arrayA = changeNum(i, j, arrayA);
                    cnt++;
                }
            }
        }
    }
    if(checkArray(arrayA, arrayB)) {
        console.log(cnt);
    } else {
        console.log(-1);
    }
    process.exit();
})

function changeNum(a, b, arr) {
    for(let i = a; i < a + 3; i++) {
        for(let j = b; j < b + 3; j++) {
            if(arr[i][j] === 1) {
                arr[i][j] = 0;
            } else {
                arr[i][j] = 1;
            }
        }
    }
    return arr;
}

function checkArray(arrA, arrB) {
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(arrayA[i][j] !== arrayB[i][j]) {
                return false;
            }
        }
    }
    return true;
}