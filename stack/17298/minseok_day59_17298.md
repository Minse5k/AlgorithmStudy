---
title : "백준 17298 오큰수(javascript)"
---
# Problem 17298

# [오큰수](https://www.acmicpc.net/problem/17298)

## 자료 구조, 스택

### 문제

크기가 N인 수열 A = A1, A2, ..., AN이 있다. 수열의 각 원소 Ai에 대해서 오큰수 NGE(i)를 구하려고 한다. Ai의 오큰수는 오른쪽에 있으면서 Ai보다 큰 수 중에서 가장 왼쪽에 있는 수를 의미한다. 그러한 수가 없는 경우에 오큰수는 -1이다.

예를 들어, A = [3, 5, 2, 7]인 경우 NGE(1) = 5, NGE(2) = 7, NGE(3) = 7, NGE(4) = -1이다. A = [9, 5, 4, 8]인 경우에는 NGE(1) = -1, NGE(2) = 8, NGE(3) = 8, NGE(4) = -1이다.

### 입력

첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000,000)이 주어진다. 둘째 줄에 수열 A의 원소 A1, A2, ..., AN (1 ≤ Ai ≤ 1,000,000)이 주어진다.

### 출력

총 N개의 수 NGE(1), NGE(2), ..., NGE(N)을 공백으로 구분해 출력한다.

### 예제 입력 1
```
4
3 5 2 7
```
### 예제 출력 1
```
5 7 7 -1
```
### 예제 입력 2
```
4
9 5 4 8
```
### 예제 출력 2
```
-1 8 8 -1
```
---
### solve
- `stack`을 사용하여 풀이했다.
- 예제 1을 예로 풀이해보겠다.
- result는 -1로 초기화한다, stack 배열을 선언한다.
- 3 5 2 7
    - 처음 3을 확인한다. 스택에 아무것도 없으므로 3의 인덱스값을 스택에 넣어준다. 
        - stack = [0], result = [-1, -1, -1, -1]
    - 5를 확인한다. input[stack[stack.length - 1] = 0] = 3 보다 크므로 result[stack.pop = 0] = 5; 를 해준다. 
        - stack = [] ,result = [5, -1, -1 ,-1]
    - stack이 비었으므로 stack에 5의 인덱스 값을 넣어준다. 
        - stack = [1] ,result = [5, -1, -1 ,-1]
    - 2를 확인한다. 스택의 끝 값 input[stack[stack.length - 1] = 1] = 5보다 작다. stack에 2의 인덱스 값을 넣어준다. 
        - stack = [1, 2], result = [5, -1, -1, -1]
    - 7을 확인한다. 스택의 끝 값 input[stack[stack.length - 1] = 2] = 2보다 크다. result[stack.pop = 2] = 7을 해준다. 
        - stack = [1], result = [5, -1, 7, -1]
    - input[stack[stack.length - 1] = 1] = 5보다 크다. result[stack.pop = 1] = 7을 해준다. 
        - stack = [], result = [5, 7, 7, -1]
    - stack이 비었으므로 stack에 7의 인덱스 값을 넣어준다. 
        - stack = [4], result = [5, 7, 7, -1]

###  code
```javascript
'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let count = 2, n = 0;
let input = [];
rl.on('line', function (line) {
    count--;
    if (count === 1) {
        n = parseInt(line);
    }
    if (count === 0) {
        input = (line.split(' ').map((v) => parseInt(v)));
        rl.close();
    }

}).on('close', function () {
    const result = new Array(n).fill(-1);
    const stack = [];

    for (let i = 0; i < input.length; i++) {
        while (stack.length > 0 && input[stack[stack.length - 1]] < input[i]) {
            result[stack.pop()] = input[i];
        }
        stack.push(i);
    }

    console.log(result.join(' '));
    process.exit();
})
```