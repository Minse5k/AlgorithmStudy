# Problem 2309

## 브루트포스 알고리즘

### 문제 링크
<https://www.acmicpc.net/problem/2309>

### solved
1. 우선 9명의 난쟁이 키를 모두 `total`에 더해주었다.
2. 2중 for문을 통해 i와 j로 두명의 난쟁이의 키를 빼주었다.
3. 두명의 난쟁이를 뺏을때 키의 합이 100이 된 경우를 `arr`배열에 넣어주었다.(진짜 난쟁이)
4. 오름차순 정렬 후 출력

### 주의할점
1. i와 j가 같은 난쟁이를 가리키지 않게 주의

### code
```javascript
'use strict';

function findeNum(array) {
    let arr = [];
    const total = array.reduce((prev,curr) => prev + curr);
    for(let i=0; i<8; i++) {
        for(let j = i+1; j<9; j++) {
            if(total-array[i]-array[j] === 100) {
                arr = array.filter((_element, idx) => idx !== i && idx !== j);
                break;
            }
        }
    }
    const sortedArray = arr.map((map) => map).sort((a,b) => a-b);
    sortedArray.forEach((element) => console.log(element));
}

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})
let input = [];
let count = 9;
rl.on('line', function(line) {
    input.push(parseInt(line));
    count --;
    if (count === 0) { rl.close(); }
}).on('close', function(){
    findeNum(input);
    process.exit();
})
