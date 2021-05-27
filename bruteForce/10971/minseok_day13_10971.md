# Problem 10971

## 백트래킹

### 문제 링크
<https://www.acmicpc.net/problem/10971>

### solved
1. 사전 정렬을 이용하였다.

### 주의할점
1. i > j로 이동하는 경우가 0일 때 예외처리에 주의

### code
```javascript
'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let n = 0;
let input = [];
let count = -1;
let array = [];
let visited = [];
let check = 0;
let min = 0;
rl.on('line', function(line) {
    if(count === -1) {
        count = parseInt(line);
        n = count;
    } else if(count >= 1) {
        input.push(line.split(' ').map((v) => parseInt(v)));
    } else {
        input.push(line.split(' ').map((v) => parseInt(v)));
        rl.close();
    }
    count--;
}).on('close', function() {
    visited = new Array(n).fill(false);
    dfs();
    console.log(min);
    process.exit();
})

function dfs() {
    if(array.length === n) {
        //console.log(array);
        let sum = 0;
        let flag = 0
        //console.log(array);
        if(check === 0) {
            for(let i = 0; i < n-1; i++) {
                if(input[array[i]][array[i+1]] === 0) {
                    flag = 1;
                }
                sum += input[array[i]][array[i+1]];
            }
            sum += input[array[n-1]][array[0]];
            if(input[array[n-1]][array[0]] === 0) {
                flag = 1;
            }
            if(flag === 0) {
                //console.log('sum :', sum);
                min = sum;
                check = 1;
            }
        } else {
            for(let i = 0; i < n-1; i++) {
                if(input[array[i]][array[i+1]] === 0) {
                    flag = 1;
                }
                sum += input[array[i]][array[i+1]];
            }
            sum += input[array[n-1]][array[0]];
            if(input[array[n-1]][array[0]] === 0) {
                flag = 1;
            }
            if(flag === 0) {
                if(min > sum) {
                    min = sum;
                }
            }
        }
        return;
    }
    for(let i = 0; i < n; i++) {
        if(!visited[i]) {
            visited[i] = true;
            array.push(i);
            dfs();
            visited[i] = false;
            array.pop();
        }
    }
}
```