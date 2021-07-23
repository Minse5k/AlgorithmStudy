---
title : "백준 12100 2048(Easy)(javascript)"
---
# Problem 12100

# [2048(Easy)](https://www.acmicpc.net/problem/12100)

## 구현, 브루트포스 알고리즘, 시뮬레이션, 백트래킹

### 문제

이 게임에서 한 번의 이동은 보드 위에 있는 전체 블록을 상하좌우 네 방향 중 하나로 이동시키는 것이다. 이때, 같은 값을 갖는 두 블록이 충돌하면 두 블록은 하나로 합쳐지게 된다. 한 번의 이동에서 이미 합쳐진 블록은 또 다른 블록과 다시 합쳐질 수 없다. (실제 게임에서는 이동을 한 번 할 때마다 블록이 추가되지만, 이 문제에서 블록이 추가되는 경우는 없다)
예제 1)
```
0 0 2 0
0 0 0 0
2 0 0 0
0 0 0 0
```
블럭을 위로 이동
```
2 0 2 0
0 0 0 0
0 0 0 0
0 0 0 0
```
블럭을 왼쪽으로 이동
```
4 0 0 0
0 0 0 0
0 0 0 0
0 0 0 0
```
예제 2)
```
4 2 0 0
0 0 0 0
0 0 0 0
2 0 0 0
```
블럭 오른쪽으로 이동
```
0 0 4 2
0 0 0 0
0 0 0 0
0 0 0 2
```
블럭 위로 이동
```
0 0 4 4
0 0 0 0
0 0 0 0
0 0 0 0
```
블럭 오른쪽으로 이동
```
0 0 0 8
0 0 0 0
0 0 0 0
0 0 0 0
```
예제 3)
```
2 0 2 8
0 0 2 2
0 0 0 0
0 0 0 0
```
블럭 왼쪽으로 이동
```
4 8 0 0
4 0 0 0
0 0 0 0
0 0 0 0
```
예제4)
```
2  4  16 8
8  4  0  0
16 8  2  0
2  8  2  0
```
블록 위로 이동
```
2  8  16 8
8  16 4  0
16 0  0  0
0  0  0  0
```
예제5)
```
2 4 8 2
2 4 0 0
2 0 0 0
2 0 2 0
```
블럭 위로 이동
```
4 8 8 2
4 0 2 0
0 0 0 0
0 0 0 0
```
예제6)
```
2 0 0 0
2 2 0 0
2 0 0 0
0 0 0 0
```
블럭 위로 이동
```
4 2 0 0
2 0 0 0
0 0 0 0
0 0 0 0
```
이 문제에서 다루는 2048 게임은 보드의 크기가 N×N 이다. 보드의 크기와 보드판의 블록 상태가 주어졌을 때, 최대 5번 이동해서 만들 수 있는 가장 큰 블록의 값을 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 보드의 크기 N (1 ≤ N ≤ 20)이 주어진다. 둘째 줄부터 N개의 줄에는 게임판의 초기 상태가 주어진다. 0은 빈 칸을 나타내며, 이외의 값은 모두 블록을 나타낸다. 블록에 쓰여 있는 수는 2보다 크거나 같고, 1024보다 작거나 같은 2의 제곱꼴이다. 블록은 적어도 하나 주어진다.

### 출력

최대 5번 이동시켜서 얻을 수 있는 가장 큰 블록을 출력한다.

### 예제 입력 1
```
3
2 2 2
4 4 4
8 8 8
```
### 예제 출력 1
```
16
```
---
### solve
- dfs를 이용하였다.(moveBlock 함수) 
    - 총 5번 움직이기때문에 5부터 시작하여 cnt를 1씩 줄여줌으로써 모든 경우의수를 5번 이행한다.
    - 이 때 각 케이스별로 같은 블록 상태로 수행해야 하기 때문에 복사를 해주었다.
    - javascript는 n차원 배열에서 복사를 할 때 각 행별로 복사를 해줘야한다.
- push함수는 left, right, up, down으로 나뉘어져있다.
    - arr이라는 배열을 선언해 0을 제외한 숫자를 순차적으로 넣어준다.(이 때 각 방향별로 신경써서 넣어줘야한다.)
        - left와 right로 비교하겠다.
        - left는 2 2 0 4 8 인 경우 arr = [2, 2, 4, 8]
        - right는 2 2 0 4 8 인 경우 arr = [8, 4, 2, 2]가 되게 해주었다.
    - 후에 arr을 getAccumulatedArray 함수를 통해서 합치거나 당겨준다.
        - getAccumulatedArray 구현
        - arr을 순회하며 arr[i] = arr[i + 1]인 경우 result는 arr[i] * 2를 push하고, arr[i + 1]은 당겨진 블럭이므로 0으로 바꿔준다.
        - arr[i] != arr[i + 1]인 경우는 result에 arr[i]를 넣어준다.
        - 이 때 arr[i] = 0인 경우는 넘어간다.
        - 끝까지 순회 후 마지막 자리가 0이 아닌 경우 result에 push해준다.(for문을 길이 - 1까지 돌기 때문이다. arr[i]를 arr[i + 1]과 비교하기 위해서.)
    - 이 과정을 하고 나면 left result = [4, 4, 8], right result = [8, 4, 4]가 된다.
    - result를 순차적으로 배열에 다시 넣어준다.
    - 위과정을 반복한다.
- 위 과정을 재귀로 반복한다.

###  code

```javascript
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let n = 0,
    count = -1;
let input = [];

function getAccumulatedArray(arr) {
    const result = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === 0) continue;

        if (arr[i] === arr[i + 1]) {
            result.push(arr[i] * 2);
            arr[i + 1] = 0;
        } else {
            result.push(arr[i]);
        }
    }
    if (arr[arr.length - 1] !== 0) result.push(arr[arr.length - 1]);
    
    return result;
}

function pushLeft(array) {
    for (let i = 0; i < n; i++) {
        const arr = [];

        for (let j = 0; j < n; j++) {
            if (array[i][j] !== 0) {
                arr.push(array[i][j]);
                array[i][j] = 0;
            }
        }
        if (arr.length > 0) {
            const result = getAccumulatedArray(arr);

            for (let j = 0; j < result.length; j++) {
                array[i][j] = result[j];
            }
        }
    }
    return array;
}

function pushRight(array) {
    for (let i = 0; i < n; i++) {
        const arr = [];

        for (let j = n - 1; j >= 0; j--) {
            if (array[i][j] !== 0) {
                arr.push(array[i][j]);
                array[i][j] = 0;
            }
        }
        if (arr.length > 0) {
            const result = getAccumulatedArray(arr);

            for (let j = 0; j < result.length; j++) {
                array[i][n - 1 - j] = result[j];
            }
        }
    }
    return array;
}

function pushUp(array) {
    for (let j = 0; j < n; j++) {
        const arr = [];

        for (let i = 0; i < n; i++) {
            if (array[i][j] !== 0) {
                arr.push(array[i][j]);
                array[i][j] = 0;
            }
        }
        if (arr.length > 0) {
            const result = getAccumulatedArray(arr);

            for (let i = 0; i < result.length; i++) {
                array[i][j] = result[i];
            }
        }
    }
    return array;
}

function pushDown(array) {
    for (let j = 0; j < n; j++) {
        const arr = [];

        for (let i = n - 1; i >= 0; i--) {
            if (array[i][j] !== 0) {
                arr.push(array[i][j]);
                array[i][j] = 0;
            }
        }
        if (arr.length > 0) {
            const result = getAccumulatedArray(arr);

            for (let i = 0; i < result.length; i++) {
                array[n - 1 - i][j] = result[i];
            }
        }
    }
    return array;
}

function copyArray(array) {
    let arr = [];

    array.forEach((v) => {
        arr.push([...v]);
    });
    return arr;
}
let max = 0;

function moveBlock(array, cnt) {
    if (cnt === 0) {
        array.forEach((v) => {
            max = Math.max(max, ...v);
        })
        return;
    }
    let arr = copyArray(array);;
    arr = pushLeft(arr);
    moveBlock(arr, cnt - 1);
    arr = copyArray(array);
    arr = pushRight(arr);
    moveBlock(arr, cnt - 1);
    arr = copyArray(array);
    arr = pushUp(arr);
    moveBlock(arr, cnt - 1);
    arr = copyArray(array);
    arr = pushDown(arr);
    moveBlock(arr, cnt - 1);
}

rl.on('line', function (line) {
    if (count === -1) {
        n = parseInt(line);
        count = n;
        return;
    }
    count--;
    input.push(line.split(' ').map((v) => parseInt(v)));
    if (count === 0) rl.close();
}).on('close', function () {
    moveBlock(input, 5);
    console.log(max);
});
```