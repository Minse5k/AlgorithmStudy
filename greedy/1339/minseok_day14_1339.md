# Problem 1339

## 그리디, 브루트포스 알고리즘

### 문제 링크
<https://www.acmicpc.net/problem/1339>

### solved
1. 단어별로 각 자리수에 몇번 나타나는지 저장하는 배열을 사용

### 주의할점

### code
```javascript
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let count = -1, n = 0;
const input = [];
let charArray = Array.from(Array (26), () => new Array(2).fill(0)); // 단어를 순서대로 저장 할 배열
rl.on('line', function(line) {
    if(count === -1) {
        n = parseInt(line);
        count = n;
        return;
    }
    count--;
    input.push(line.split(''));
    if(count === 0) {
        rl.close();
    }
}).on('close', function() {
    for(let i = 0; i < 26; i++) {
        charArray[i][0] = String.fromCharCode(65+i);
    }
    digitWeight();
    changeNum(input);
    process.exit();
})

function digitWeight() { // 자리수 계산
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < input[i].length; j++) {
            let num = input[i].length - j - 1; // 자리수 - 1 ex) 셋째자리수이면 num = 2
            num = Math.pow(10, num);
            let n = input[i][j].charCodeAt() - 65;
            charArray[n][1] += num;
        }
    }
    charArray.sort((a,b) => b[1] - a[1]);
    //console.log(charArray);
}
function changeNum(arr) {
    let num = 9;
    for(let i = 0; i < charArray.length; i++) {
        for(let j = 0; j < n; j++) {
            for(let k = 0; k < arr[j].length; k++) {
                if(arr[j][k] === charArray[i][0]) {
                    arr[j][k] = num;
                }
            }
        }
        num--;
    }
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
        let number = arr[i].join('');
        sum += parseInt(number);
    }
    console.log(sum);
}