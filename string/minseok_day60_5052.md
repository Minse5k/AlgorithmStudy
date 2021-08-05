---
title : "백준 5052 전화번호 목록(javascript)"
---
# Problem 5052

# [전화번호 목록](https://www.acmicpc.net/problem/5052)

## 자료 구조, 문자열, 정렬, 트리, 트라이

### 문제

전화번호 목록이 주어진다. 이때, 이 목록이 일관성이 있는지 없는지를 구하는 프로그램을 작성하시오.

전화번호 목록이 일관성을 유지하려면, 한 번호가 다른 번호의 접두어인 경우가 없어야 한다.

예를 들어, 전화번호 목록이 아래와 같은 경우를 생각해보자

- 긴급전화: 911
- 상근: 97 625 999
- 선영: 91 12 54 26

이 경우에 선영이에게 전화를 걸 수 있는 방법이 없다. 전화기를 들고 선영이 번호의 처음 세 자리를 누르는 순간 바로 긴급전화가 걸리기 때문이다. 따라서, 이 목록은 일관성이 없는 목록이다. 

### 입력

첫째 줄에 테스트 케이스의 개수 t가 주어진다. (1 ≤ t ≤ 50) 각 테스트 케이스의 첫째 줄에는 전화번호의 수 n이 주어진다. (1 ≤ n ≤ 10000) 다음 n개의 줄에는 목록에 포함되어 있는 전화번호가 하나씩 주어진다. 전화번호의 길이는 길어야 10자리이며, 목록에 있는 두 전화번호가 같은 경우는 없다.

### 출력

각 테스트 케이스에 대해서, 일관성 있는 목록인 경우에는 YES, 아닌 경우에는 NO를 출력한다.

### 예제 입력 1
```
2
3
911
97625999
91125426
5
113
12340
123440
12345
98346
```
### 예제 출력 1
```
NO
YES
```
---
### solve
- 숫자를 정렬한다.
    - js에서 숫자를 문자열로 정렬한 경우
    - 31, 111, 222, 444
        - 111, 222, 31, 444로 정렬됨.
- 정렬한 숫자가 그 다음 숫자의 접두어인지 확인함. 

###  code
```javascript
'use readline';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function checkHasCallNumber() {
    input.sort();
    for (let i = 0; i < n - 1; i++) {
        if (input[i + 1].length > input[i].length) {
            if (input[i + 1].indexOf(input[i]) === 0) {
                return false;
            }
        }
    }
    return true;
}
let cnt = -1;
let count = -1;
let n = 0;
let input = [];
const result = [];
rl.on('line', function (line) {
    if (cnt === -1) {
        cnt = parseInt(line);
        return;
    } else if (count === -1) {
        count = parseInt(line);
        n = count;
        cnt--;
        return;
    }
    input.push(line);
    count--;
    if (count === 0) {
        if(checkHasCallNumber()) result.push('YES');
        else result.push('NO');
        input = [];
        count = -1;
        if (cnt === 0) rl.close();
    }
}).on('close', function () {
    console.log(result.join('\n'));
    process.exit();
});
```