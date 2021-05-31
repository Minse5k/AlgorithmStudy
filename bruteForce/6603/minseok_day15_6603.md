# Problem 6603

## 백트래킹, 재귀

### 문제 링크
<https://www.acmicpc.net/problem/6603>

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

let input = [];
let visited = [];
let array = [];
let n = 0;
rl.on('line', function(line) {
    if(parseInt(line) === 0) {
        rl.close();
    }
    input.push(line.split(' ').map((v) => parseInt(v)));
}).on('close', function() {
    for(let i = 0; i < input.length; i++) {
        array = input[i].slice(1, input[i].length);
        visited = new Array(input[i].length).fill(false);
        n = array.length;
        //console.log(array);
        //console.log(n);
        lotto(0);
        if(i < input.length - 1)    { console.log(''); }
    }
//    console.log(input);
    process.exit();
})
let arr = [];
function lotto(idx) {
    if(arr.length === 6) {
        console.log(arr.join(' '));
        return;
    } else {
        for(let i = idx; i < n; i++) {
            arr.push(array[i]);
            lotto(i+1);
            arr.pop();
        }
    }
}
```