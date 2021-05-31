# Problem 14888

## 

### 문제 링크
<https://www.acmicpc.net/problem/14888>

### 틀림! 37% (반례 찾는중)

```javascript
'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const operator = [];
let visited = [];
let n = 0;
let count = 3;
let input = [];
rl.on('line', function(line) {
    if(count === 3) {
        n = parseInt(line);
    } else if(count === 2) {
        input.push(line.split(' ').map((v) => parseInt(v)));
    } else {
        input.push(line.split(' ').map((v) => parseInt(v)));
        rl.close();
    }
    count--;
}).on('close', function() {
    //console.log(n, input);
    for(let i = 0; i < 4; i++) {
        if(input[1][i] !== 0) {
            while(input[1][i] > 0) {
                if(i === 0) {
                    operator.push('+');
                } else if(i === 1) {
                    operator.push('-');
                } else if(i === 2) {
                    operator.push('*');
                } else {
                    operator.push('/');
                }
                input[1][i]--;
            }
        }
    }
    visited = Array(operator.length).fill(false);
    dfs();
    console.log(max);
    console.log(min);
    process.exit();
})

let arr = [];
let flag = 0;
let max = 0, min = 0;
function dfs() {
    if(arr.length === n - 1) {
        let tmp = calculation(arr);
        if(flag === 0) { // max, min값 이 없을때
            max = tmp;
            min = tmp;
            flag = 1;
        } else {
            if(max < tmp) {
                max = tmp;
            }
            if(min > tmp) {
                min = tmp;
            }
        }
    }
    for(let i = 0; i < n - 1; i++) {
        if(!visited[i]) {
            visited[i] = true;
            arr.push(operator[i]);
            dfs();
            visited[i] = false;
            arr.pop();
        }
    }
}

function calculation(array) {
    let sum = input[0][0];
    for(let i = 0; i < n - 1; i++) {
        if(array[i] === '+') {
            sum += input[0][i+1];
        }
        if(array[i] === '-') {
            sum -= input[0][i+1];
        }
        if(array[i] === '*') {
            sum *= input[0][i+1];
        }
        if(array[i] === '/') {
            sum = parseInt(sum / input[0][i+1]);
        }
    }
    return sum;
}