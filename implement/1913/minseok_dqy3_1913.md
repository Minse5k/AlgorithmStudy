# Problem 1913

## 구현

### 문제 링크
<https://www.acmicpc.net/problem/1913>

### solved
1. 방향은 반드시 `↑` `→` `↓` `←` 순으로 이루어진다.
2. 방향은 반드시 1, 1, 2, 2, 3, 3, 4, 4, 5, 5 ... 회 씩 이루어진다.
3. 방향은 flag를 통해 4의 나머지값을 이용해 회전시켜준다.
4. 한 방향을 이동할 횟수는 `arr2`에 따로 저장하여 풀이하였다.

### 주의할점
1. `n*n`회 만큼 넣었을 때 종료되도록 한다.

### code
```javascript
'use strict';

let arr = [];   // 달팽이 경로
let arr2 = [];  // 방향 규칙 저장

function makeSnail(n, m) { // n : NxN배열의 크기 m : 찾을 수 
    let x = (n-1)/2; // 중앙좌표값
    let y = (n-1)/2; // 중앙좌표값
    let cnt = 0; // arr2 배열의 idx값 증가
    let flag = 0; // 방향을 결정할 변수
    let count = 1; // 25번 입력을 하게 할 변수
    let idx, idy; // m의 좌표를 저장할 변수
    arr[x][y] = 1;
    while(1) {
        for(let i =0; i < arr2[cnt]; i++) {
            if(count >= n*n) {
                continue;
            }
            count++;
            if(flag%4==0) {
                x = x-1;
            }
            if(flag%4==1) {
                y = y+1;
            }
            if(flag%4==2) {
                x = x+1;
            }
            if(flag%4==3) {
                y = y-1;
            }
            arr[x][y] = count;
            if(count === m) {
                idx = x;
                idy = y;
            }
        }
        if(count === n*n) {
            break;
        }
        cnt++;
        flag++;
    }
    console.log(arr.join('\n').replace(/,/gi,' '));
    console.log(idx+1, idy+1);
}


const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})
const input = [];
rl.on('line', function(line){
    input.push(parseInt(line));
    if(input.length === 2) {
        rl.close();
    }
}).on('close', function(){
    arr = Array.from(Array(input[0]), () => Array(input[0]).fill(0));
    let count = 1;
    for(let i = 0; i < input[0]*input[0]-1; i++) {
        arr2[i] = count;
        if(i!== 0 && i%2 != 0) {
            count++;
        }
    }
    makeSnail(input[0], input[1]);
    process.exit();
})