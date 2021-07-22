---
title : "백준 9251 LCS(javascript)"
---
# Problem 9251

# [작업](https://www.acmicpc.net/problem/9251)

## DP

### 문제

LCS(Longest Common Subsequence, 최장 공통 부분 수열)문제는 두 수열이 주어졌을 때, 모두의 부분 수열이 되는 수열 중 가장 긴 것을 찾는 문제이다.

예를 들어, ACAYKP와 CAPCAK의 LCS는 ACAK가 된다.

### 입력

첫째 줄과 둘째 줄에 두 문자열이 주어진다. 문자열은 알파벳 대문자로만 이루어져 있으며, 최대 1000글자로 이루어져 있다.

### 출력

첫째 줄에 입력으로 주어진 두 문자열의 LCS의 길이를 출력한다.

### 예제 입력 1
```
ACAYKP
CAPCAK
```
### 예제 출력 1
```
4
```
---
### solve
- lcs 알고리즘을 이용하였다. [참고](https://velog.io/@emplam27/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-LCS-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Longest-Common-Substring%EC%99%80-Longest-Common-Subsequence)
---
###  code

```javascript
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

let count = 2;
const input = [];
rl.on('line', function(line) {
    input.push(line.split(''));    
    count--;
    if(count === 0) rl.close();
}).on('close', function() {
    const n = input[0].length;
    const m = input[1].length;
    const lcsArray = Array.from(Array(n + 1), () => new Array(m + 1).fill(0));
    for(let i = 0; i < n; i++) {
        const char = input[0][i];
        for(let j = 0; j < m; j++) {
            if(char === input[1][j]) {
                lcsArray[i + 1][j + 1] = lcsArray[i][j] + 1;
            } else {
                lcsArray[i + 1][j + 1] = Math.max(lcsArray[i][j + 1], lcsArray[i + 1][j]);
            }
        }
    }
    console.log(lcsArray[n][m]);
});
```