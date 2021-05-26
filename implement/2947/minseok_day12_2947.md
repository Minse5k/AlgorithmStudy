# Problem 2947

## 구현

### 문제 링크
<https://www.acmicpc.net/problem/2947>

### solved
1. 

### 주의할점


### code
```javascript
'use strict';

const { parse } = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})


let input = [];
rl.on('line', function(line) {
    input.push(line.split(' ').map((v) => parseInt(v)));
    rl.close();
}).on('close', function() {
    let arr = input[0];
    while(1) {
        let flag = 1;
        for(let i = 0; i < 4; i++) {
            if(arr[i] > arr[i+1]) {
                let tmp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = tmp;
                flag = 0;
                console.log(arr.join(' '));
            }
        }
//        console.log(arr);
        if(flag === 1) {
            break;
        }
    }
})