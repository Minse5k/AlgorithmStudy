# Problem 1316

## 구현, 문자열

### 문제 링크
<https://www.acmicpc.net/problem/1316>

### solved
1. 배열의 처음부터 탐색하며 다른 문자일경우 `flag`라는 변수에 `1`로 체크해준다.
2. 변수 `flag`가 `1`인 경우 더 이상 그 문자가 나오지 않아야 그룹 단어이다.
3. `flag`가 `1`인데 뒤에 그 문자가 나온다면 `false`를 반환해준다.
4. `false`가 아닐경우 `countAnswer` 변수에 `1`을 더 해주고 최종적으로 `countAnswer`를 출력한다.

### 주의할점

### code
```javascript
'use strict';

function checkGroup(string) {
    const arr = string.split('');
    for(let i = 0; i < arr.length - 1; i++) {
        let flag = 0;
        for(let j = i + 1; j < arr.length; j++) {
            if(flag === 0) {
                if(arr[i] != arr[j]) {
                    flag = 1;
                }
            }
            else {
                if(arr[i] === arr[j]) {
                    return false;
                }
            }
        }
    }
    return true;
}

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let count = 0;
let countAnswer = 0;
rl.on('line', function(line) {
    if(!isNaN(line)){
        count = parseInt(line);
        return;
    }
    if(checkGroup(line)) {
        countAnswer++;
    }
    count--;
    if(count === 0) { rl.close(); }
}).on('close', function(){
    console.log(countAnswer);
    process.exit();
})
