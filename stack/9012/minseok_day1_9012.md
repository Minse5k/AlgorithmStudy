# Problem 9012

## 자료구조, 스택, 문자열

### 문제 링크
<https://www.acmicpc.net/problem/9012>

### solved
1. 스택을 이용하여 `(`인 경우 push `)`인 경우 pop을 해주었다.
2. 스택이 비어있는데 `(`가 들어온경우 즉, pop을 할 경우 `NO` 출력
3. 입력을 마친 후 `(`의 개수와 `)`의 개수가 같다면 `YES` 다르다면 `NO` 출력

### 주의할점
1. `(`의 개수와 `)`의 개수가 같지만, `())(()`와 같이 VPS가 아닌 경우를 주의.  (2번 방안을 통해 풀이)

### code
```javascript
'use strict';

function Stack(string) {
    const array = string.split('');
    let arr = [];
    let i = 0;
    while(1) {
        if(array[i] === '(') { arr.push(array[i]); }
        else {
            if(arr.length <1) {
                console.log("NO");
                return;
            }
            arr.pop();
        }
        i++;
        if(array.length == i) { break; }
    }
    if(arr.length === 0) { console.log("YES"); }
    else { console.log("NO"); }
}

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let count = -1;

rl.on('line', function (line) {
    // 몇개의 문장을 입력 받을것인지
    if(count === -1) {
        count = parseInt(line);
        return;
    }
    
    Stack(line);

    count--;
    // 다 받을 시 종료
    if (count === 0) {
        rl.close();
    }
}).on('close', function() {
    process.exit();
});
