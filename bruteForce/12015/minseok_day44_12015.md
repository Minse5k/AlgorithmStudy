---
title : "백준 12015 가장 긴 증가하는 부분 수열(javascript)"
---
# Problem 12015


# [가장 긴 증가하는 부분 수열](https://www.acmicpc.net/problem/12015)

## 이분 탐색

### 문제

수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.

예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {10, 20, 10, 30, 20, 50} 이고, 길이는 4이다.

### 입력

첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000,000)이 주어진다.

둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (1 ≤ Ai ≤ 1,000,000)

### 예제 입력 1
```
6
10 20 10 30 20 50
```
### 예제 출력 1
```
4
```
---
### solve
- `LIS 알고리즘`을 사용하였다.
- 4, 7, 10, 3, 1, 8, 7, 2, 5, 7을 예로 들겠다.
    - for문을 통해 1번만 훑는다.
    - 4, result : [4]
    - 7, result의 Top값 : 4, Top값 보다 크므로 push, result : [4, **7**]
    - 10, result의 Top값 : 7, Top값 보다 크므로 push, result : [4, 7, **10**]
    - 3, result의 Top값 : 10, Top값 보다 작으므로 이진탐색을 통해 본인이 들어가야 할 위치 탐색 후 삽입, result : [**3**, 7, 10]
    - 1, result의 Top값 : 10, Top값 보다 작음, result : [**1**, 7, 10]
    - 3, result의 Top값 : 10, Top값 보다 작음, result : [1, **3**, 10]
    - 8, result의 Top값 : 10, Top값 보다 작음, result : [1, 3, **8**]
    - 7, result의 Top값 : 8, Top값 보다 작음, result : [1, 3, **7**]
    - 2, result의 Top값 : 7, Top값 보다 작음, result : [1, **2**, 7]
    - 5, result의 Top값 : 7, Top값 보다 작음, result : [1, 2, **5**]
    - 7, result의 Top값 : 5, Top값 보다 큼, result : [1, 2, 5, **7**]
###  code

```javascript
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function binarySearch(result, input, i) {
    let left = 0;
    let right = result.length - 1;

    while (left < right) {
        const mid = parseInt((left + right) / 2);
        if (result[mid] < input[1][i]) {
            left = mid + 1;
        } else if (result[mid] > input[1][i]) {
            right = mid;
        } else {
            return mid;
        }
    }
    return right;
}
const input = [];
let count = 2;

rl.on("line", function (line) {
    input.push(line.split(" ").map((v) => parseInt(v)));
    count--;
    if (count === 0) rl.close();
}).on("close", function () {
    const n = input[0];
    const result = [input[1][0]];

    for (let i = 1; i < n; i++) {
        if (result[result.length - 1] < input[1][i]) {
            result.push(input[1][i]);
            continue;
        }

        const idx = binarySearch(result, input, i);
        result[idx] = input[1][i];
    }
    
    console.log(result.length);
    process.exit();
});
```