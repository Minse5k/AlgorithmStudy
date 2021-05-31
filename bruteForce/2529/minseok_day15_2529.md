# Problem 2529

## 알고리즘

### 문제 링크
<https://www.acmicpc.net/problem/2529>

### solved
1. 

### 주의할점


### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    outpu : process.stdout
})
let n = 0;
const input = [];
const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const visited = new Array(10).fill(false);
rl.on('line', function(line) {
    if(n === 0) {
        n = parseInt(line);
        return;
    } else {
        input.push(line.split(' '));
        rl.close();
    }
}).on('close', function(){
    for(let i = 0; i <= 9; i++) {
        arr.push(i);
        visited[i] = true;
        dfs(i, 0);
        arr.length = 0;
        visited.fill(false);
    }
    console.log(answerArray[answerArray.length-1]);
    console.log(answerArray[0]);
    process.exit();
})

let arr = [];
let answerArray = [];
function dfs(value, cnt) {
    if(arr.length === n+1) {
        answerArray.push(arr.join(''));
 //       console.log(arr.join(''));
        return;
    } else {
        for(let i = 0; i <= 9; i++) {
            if(!visited[i]) {
                if(input[0][cnt] === '<') {
                    if(value >= i) { continue; }
                } else {
                    if(value <= i) { continue; }
                }
                visited[i] = true;
                arr.push(i);
                dfs(i, cnt + 1);
                visited[i] = false;
                arr.pop();
            }
        }
    }
}
```