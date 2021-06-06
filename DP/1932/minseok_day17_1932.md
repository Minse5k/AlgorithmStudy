# Problem 1932

## DP

### 문제 링크
<https://www.acmicpc.net/problem/>

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

let count = -1, n = 0;
const input = [];
rl.on('line', function(line) {
    if(count === -1) {
        count = parseInt(line);
        n = count;
        return;
    } else {
        input.push(line.split(' ').map((v) => parseInt(v)));
        count --;
        if(count === 0) {
            rl.close();
        }
    }
}).on('close', function() {
    let max = input[0][0];
    for(let i = 1; i < n; i++) {
        for(let j = 0; j < input[i].length; j++) {
            if(j === 0) {
                input[i][j] += input[i-1][j];
            } else if(j === input[i].length-1) {
                input[i][j] += input[i-1][j-1];
            } else {
                input[i][j] += input[i-1][j+(input[i-1][j-1] > input[i-1][j] ? -1 : 0)]
            }
            if(max < input[i][j]) {
                max = input[i][j];
            }
        }
    }
    console.log(max);
    process.exit();
})