---
title : "백준 9935 문자열 폭발(javascript)"
---
# Problem 9935

# [문자열 폭발](https://www.acmicpc.net/problem/9935)

## 자료구조, 문자열, 스택

### 문제

상근이는 문자열에 폭발 문자열을 심어 놓았다. 폭발 문자열이 폭발하면 그 문자는 문자열에서 사라지며, 남은 문자열은 합쳐지게 된다.

폭발은 다음과 같은 과정으로 진행된다.

문자열이 폭발 문자열을 포함하고 있는 경우에, 모든 폭발 문자열이 폭발하게 된다. 남은 문자열을 순서대로 이어 붙여 새로운 문자열을 만든다.
새로 생긴 문자열에 폭발 문자열이 포함되어 있을 수도 있다.
폭발은 폭발 문자열이 문자열에 없을 때까지 계속된다.
상근이는 모든 폭발이 끝난 후에 어떤 문자열이 남는지 구해보려고 한다. 남아있는 문자가 없는 경우가 있다. 이때는 "FRULA"를 출력한다.

폭발 문자열은 같은 문자를 두 개 이상 포함하지 않는다.

### 입력

첫째 줄에 문자열이 주어진다. 문자열의 길이는 1보다 크거나 같고, 1,000,000보다 작거나 같다.

둘째 줄에 폭발 문자열이 주어진다. 길이는 1보다 크거나 같고, 36보다 작거나 같다.

두 문자열은 모두 알파벳 소문자와 대문자, 숫자 0, 1, ..., 9로만 이루어져 있다.

### 출력

첫째 줄에 모든 폭발이 끝난 후 남은 문자열을 출력한다.

### 예제 입력 1
```
mirkovC4nizCC44
C4
```
### 예제 출력 1
```
mirkovniz
```
### 예제 입력 2
```
12ab112ab2ab
12ab
```
### 예제 출력 2
```
FRULA
```
---
### solve
- 스택을 이용한 문자열 삭제 문제였다.
- CC44의 경우 가운데 C4 삭제 후 바깥 C4를 삭제해야하는 문제점 발생
    - 이를 해결하기 위해 스택을 2개 이용하였다.
    - stack1 : 문자열을 담고있는 스탥
    - stack2 : 폭발 문자열이 마지막으로 나온 인덱스를 갖고있는 스택

###  code
```javascript
'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const input = [];
const bomb = [];
let count = 2;
rl.on('line', function(line) {
    if(count === 2) {
        input.push(line.split(''));
        count--;
        return;
    } else if(count === 1) {
        bomb.push(line.split(''));
        rl.close();
    }
}).on('close', function() {
    let j = 0;
    const stack1 = [];
    const stack2 = [];
    for(let i = 0; i < input[0].length; i++) {
        if(input[0][i] === bomb[0][0]) {
            j = 1;
        } else if(input[0][i] === bomb[0][j]) {
            j++;
        } else {
            j = 0;
        }
        stack1.push(input[0][i]);
        stack2.push(j);
        if(j === bomb[0].length) {
            for(let k = 0; k < bomb[0].length; k++) {
                stack1.pop();
                stack2.pop();
            }
            stack2.length === 0 ? j = 0 : j = stack2[stack2.length - 1];
        }
    }
    stack1.length === 0 ? console.log("FRULA") : console.log(stack1.join(''));
});
```