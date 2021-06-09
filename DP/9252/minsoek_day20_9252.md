# Problem 9252

## LCS

### 문제 링크
<https://www.acmicpc.net/problem/9252>

### solved
1. `LCS` 알고리즘을 사용하였다.

### 주의할점

### code
```javascript
'use strict';

const { linkSync } = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let count = 1;
const input = [];
rl.on('line', function(line) {
    input.push(line.split(''));
    if(count === 0) rl.close();
    count--;
}).on('close', function() {
    let longArr = [];
    let shortArr = [];
    if(input[0].length >= input[1].length) {
        longArr = input[0];
        shortArr = input[1];
    } else {
        longArr = input[1];
        shortArr = input[0];
    }
    const n = shortArr.length;
    const m = longArr.length;
    const LCS = createLCS(n, m, shortArr, longArr);    
    if(check === 1) {
        getLongestCommonSubstring(n, m, longArr, LCS);
    } else {
        console.log(0);
    }
    process.exit();
})
let check = 0;
function createLCS(n, m, short, long) {
    const arr = Array.from(Array(n + 1), () => new Array(m + 1).fill(0));
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(short[i] === long[j]) {
                arr[i + 1][j + 1] = arr[i][j] + 1;
                check = 1;
            } else {
                arr[i + 1][j + 1] = Math.max(arr[i][j + 1], arr[i + 1][j]);
            }
        }
    }
    return arr;
}

function getLongestCommonSubstring(n, m, long, LCS) {
    let max = LCS[n][m];
    let answer = "";
    //console.log(tmp);
    let j = m;
    for(let i = n ; i > 0; i--) {
        if(LCS[i][j] === 0) continue;
        while(j > 0) {
            if(LCS[i][j] === LCS[i-1][j] && LCS[i][j] === LCS[i][j-1]) {
                j--;
            }
            if(LCS[i][j] !== LCS[i-1][j] && LCS[i][j] === LCS[i][j-1]) {
                j--;
            }
            if(LCS[i][j] === LCS[i-1][j] && LCS[i][j] !== LCS[i][j-1]) {
                i--;
            }
            if(LCS[i][j] !== LCS[i-1][j] && LCS[i][j] !== LCS[i][j-1]) {
                answer = long[j-1] + answer;
                j--;
                break;
            }
        }
    }
    console.log(LCS[n][m]);
    if(answer.length) console.log(answer);
}