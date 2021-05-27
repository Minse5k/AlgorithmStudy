# Problem 10819

## 브루트포스, 백트래킹

### 문제 링크
<https://www.acmicpc.net/problem/10819>

### solved
1. 사전 나열을 통해 모든 수를 계산해주어 최솟값을 추출하였다.

### 주의할점


### code
```javascript
'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let n = 0;
let array = [];
let input = [];
let arr = [];
let visited = new Array(9).fill(false);
let max = 0;
let count = 1;
rl.on('line', function(line) {
    if(count === 1) {
        n = parseInt(line);    
    } else {
        input.push(line.split(' ').map((v) => parseInt(v)));
        rl.close();
    }
    count--;
}).on('close', function() {
    arr = input[0];
    dfs();
    //console.log(arr[0], arr[1], arr[2], arr[3]);
    console.log(max);
    process.exit();
})

function dfs() {
    if(array.length === n) {
        //console.log(array);
        let sum = 0;
        for(let i = 0; i < n - 1; i++) {
            sum += Math.abs(array[i]-array[i+1]);
           // console.log('sum :', sum);
        }
        if(sum > max) {
            max = sum;
        }
        return;
    }
    for(let i = 0; i < n; i++) {
        if(!visited[i]) {
//            console.log('arr ;', arr[i]);
            visited[i] = true;
            array.push(arr[i]);
            dfs();
            visited[i] = false;
            array.pop();
        }
    }
}
```