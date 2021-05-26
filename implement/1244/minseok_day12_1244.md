# Problem 1244

## 구현

### 문제 링크
<https://www.acmicpc.net/problem/1244>

### 틀렸습니다.
1. 아직 반례를 찾지 못했다.

### code
```javascript
'use strict';
const { SSL_OP_COOKIE_EXCHANGE } = require('constants');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

function actionBoy(n) {
    for(let i = n-1; i < switchNum; i+=n) {
        if(switchArray[i] === 1) {
            switchArray[i] = 0;
        } else {
            switchArray[i] = 1;
        }
    }
    //console.log('b :', switchArray);
}

function actionGirl(n) {
    let x = n -2;
    let y = n;
    let tmp = 0;
    while(x >= 0 || y < switchNum) {
        if(switchArray[x] === switchArray[y]) {
            tmp++;
        }
        if(tmp > 0) {
            if(switchArray[x] !== switchArray[y]) {
                x++;
                y--;
                break;
            }
        }
        x--;
        y++;
    }
    if(x<0) {x++;}
    if(y>=switchNum) {y--;}
    if(tmp === 0) {
        if(switchArray[n-1] === 1) {
            switchArray[n-1] = 0;
        } else{
            switchArray[n-1] = 1;
        }
    } else {
        for(let i = x; i <= y; i++) {
            if(switchArray[i] === 1) {
                switchArray[i] = 0;
            } else {
                switchArray[i] = 1;
            }
        }
    }
    //console.log('g :', switchArray);
}

let switchNum = 0;
let actionNum = 0;
let count1 = 3;
let count2 = 0;
let input = [];
let switchArray = [];
rl.on('line', function(line) {
    if(count1 === 3) {
        switchNum = parseInt(line);
    } else if(count1 === 2)    { 
        input.push(line.split(' ').map((v) => parseInt(v)));
    } else if(count1 === 1) {
        actionNum = parseInt(line);
        count2 = actionNum;
    } else {
        input.push(line.split(' ').map((v) => parseInt(v)));
        count2--;
        if(count2===0) {
            rl.close();
        }
    }
    count1--;
}).on('close', function() {
//    console.log(switchNum, input, actionNum);
    switchArray = input[0];
//    console.log(switchArray);
    for(let i = 0; i < actionNum; i++) {
        let [gender, num] = input[i+1];
        if(gender === 1) {
            actionBoy(num);
        } else {
            actionGirl(num);
        }
    }
    if(switchNum > 3) {
        while(switchArray.length > 20) {
            let arr = switchArray.slice(0,20);
            switchArray.splice(0, 20);
            console.log(arr.join(' '));
        }
        console.log(switchArray.join(' '));
    } else {
        console.log(switchArray.join(' '));
    }
    process.exit();
})