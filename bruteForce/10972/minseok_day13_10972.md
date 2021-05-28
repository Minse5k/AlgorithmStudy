# Problem 10972

## 브루트포스

### 문제 링크
<https://www.acmicpc.net/problem/10972>

### solved
1. 규칙을 찾아 풀이하였다.
#### 규칙 
1. `arr[n] < arr[n-1]` 인 순간을 찾는다.  
2. 찾았으면 `arr[0], arr[1], ... ,arr[n-1]` 과 `arr[n], ..., arr[끝]`인 그룹으로 나눈다.
3. 이때 뒷 그룹 뒤에서부터 `arr[n-1]`보다 큰 숫자를 찾는다.
4. 그 수와 arr[n-1]을 swap한 후 arr[n-1] 자리를 뒤로 reverse 해준다. 

### 주의할점


### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let count = 1;
let n = 0;
const input = [];
let array = [];
rl.on('line', function(line) {
    if(count === 1) {
        n = parseInt(line);
    } else {
        input.push(line.split(' ').map((v) => parseInt(v)));
        rl.close();
    }
    count--;
}).on('close', function() {
    array = input[0];
    nextPermutation(n, array);
    //array = array.slice(0, 2).concat(array.slice(2, array.length).reverse());
    //console.log(array);
})

function nextPermutation(n, arr) {
    let flag = 0; // 순서를 뒤집을게 있는지 없는지 판단 0 : 더이상 사전순 나열 할 수 없다.
    for(let i = n-1; i > 0; i--) {
        if(flag === 0 && arr[i] > arr[i-1]) {
            flag = 1; // 한번이라도 나열했을때
            let flag2 = 0; // 뒷그룹과 비교해서 본인보다 큰게 있나 없나 비교
            for(let j = n-1; j >= i; j--) {
                if(flag2 === 0 && arr[j] > arr[i-1]) { 
                    let tmp = arr[i-1];
                    arr[i-1] = arr[j];
                    arr[j] = tmp;
                    arr = arr.slice(0, i).concat(arr.slice(i,arr.length).reverse());
                    flag2 = 1;
                }
            }
            if(flag2 === 0) {
                let tmp = arr[i-1];
                arr[i-1] = arr[i];
                arr[i] = tmp;
                arr = arr.slice(0, i).concat(arr.slice(i,arr.length).reverse());
            }
        }
    }
    if(flag === 0) {
        console.log(-1);
    } else {
        console.log(arr.join(' '));
    }
}
```
