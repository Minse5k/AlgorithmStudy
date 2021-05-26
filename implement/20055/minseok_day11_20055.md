# Problem 20055

## 구현

### 문제 링크
<https://www.acmicpc.net/problem/20055>

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


function conveyMove(rob, dur) {
    let tmp = dur[2*n-1];
    for(let i = 2 * n - 1; i > 0; i--) {
        dur[i] = dur[i-1];
        rob[i] = rob[i-1];
    }
    dur[0] = tmp;
    rob[0] = false;
}
function robotMove(rob, dur) {
    if(rob[n-1] === true) { rob[n-1] = false; } // n번째칸 로봇 있을 시 하차

    for(let i = n - 2; i > 0; i--) {
        if(rob[i] === true && dur[i+1] > 0 && rob[i+1] === false) {
            rob[i+1] = true;
            rob[i] = false;
            dur[i+1] -= 1;
            if(dur[i+1] === 0) { cnt++; }
        }
    }
    if(rob[n-1] === true) { rob[n-1] = false; } // n번째칸 로봇 있을 시 하차
}
function update(rob, dur) {
    if(dur[0] > 0 && rob[0] === false) {
        dur[0] -= 1;
        rob[0] = true;
        if(dur[0] === 0) { cnt++; }
    }
}

let n, k = 0;
let count = 2;
const input = [];
let cnt = 0; // 내구도가 0인게 몇개인지 세준다.
rl.on('line', function(line) {
    if(count === 2) {
        [n, k] = line.split(' ').map((v) => parseInt(v));
    } else if( count === 1) {
        input.push(line.split(' ').map((v) => parseInt(v)));
    }
    count--;
    if(count === 0) {
        rl.close();
    }
}).on('close', function() {
    const robot = new Array(2*n).fill(false);
    const durability = new Array(2*n);
    for(let i = 0; i < 2*n; i++) {
        durability[i] = input[0][i];
        if(durability[i] === 0) { cnt++; }
    }
    let c = 0; // 몇단계 진행했는가
    while(cnt < k) {
        conveyMove(robot, durability);
        robotMove(robot, durability);
        update(robot, durability);
        c++;
        //console.log(cnt);
    }
    console.log(c);
    process.exit();
})
