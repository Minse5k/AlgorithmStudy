# Problem 11047

## 그리디 알고리즘

### 문제 링크
<https://www.acmicpc.net/problem/11047>

### solved
1. 비싼 동전순으로 계산

### 주의할점

### code
```javascript
'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})
let n = 0, money = 0, count = -1;
const input = [];
let countCoin = 0;
rl.on('line', function(line) {
    if(count === -1) {
        let array = line.split(' ').map((v) => parseInt(v));
        [n, money] = array;
        count = n;
        return;
    }
    count--;
    input.push(parseInt(line));
    if(count === 0) {
        rl.close();
    }
}).on('close', function() {
    for(let i = n - 1; i >= 0; i--) {
        if(money === 0) {
            continue;
        }
        if(money - input[i] >= 0) {
            while(money - input[i] >= 0) {
                //console.log('money :', money, 'coin : ', input[i]);
                money -= input[i];
                countCoin++;
            }
        }
    }
    console.log(countCoin);
    process.exit();
})
```
