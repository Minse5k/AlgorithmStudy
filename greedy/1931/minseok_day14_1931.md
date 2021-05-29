# Problem 1931

## 그리디 알고리즘, 정렬

### 문제 링크
<https://www.acmicpc.net/problem/1931>

### solved
1. 시간순 정렬을 해주었다.

### 주의할점

### code
```javascript
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})


let n = 0, count = -1;
let input = [];
rl.on('line', function(line) {
    if(count === -1) {
        n = parseInt(line);
        count = n;
        return;
    }
    count--;
    input.push(line.split(' ').map((v) => parseInt(v)));
    if(count === 0) {
        rl.close();
    }
}).once('close', function() {
    input.sort((a,b) => {
        if(a[1] === b[1]) {
            return a[0] - b[0];
        } else {
            return a[1] - b[1];
        }
    });// 끝나는 시간 순으로 정렬, 만약 끝나는 시간이 같으면 시작 시간이 작은순
    let tmp = input[0][1]; // 처음 끝나는 자리
    let cnt = 1;
    for(let i = 1; i < n; i++) {
        if(input[i][0] >= tmp) {
            tmp = input[i][1];
            cnt++;
        }
    }
    console.log(cnt);
    process.exit();
})
```