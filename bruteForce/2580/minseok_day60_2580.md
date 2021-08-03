---
title : "백준 2580 스도쿠(javascript)"
---
# Problem 2580

# [스도쿠](https://www.acmicpc.net/problem/2580)

## 백트래킹

### 문제

스도쿠는 18세기 스위스 수학자가 만든 '라틴 사각형'이랑 퍼즐에서 유래한 것으로 현재 많은 인기를 누리고 있다. 이 게임은 아래 그림과 같이 가로, 세로 각각 9개씩 총 81개의 작은 칸으로 이루어진 정사각형 판 위에서 이뤄지는데, 게임 시작 전 일부 칸에는 1부터 9까지의 숫자 중 하나가 쓰여 있다.

```
0 3 5 4 6 9 2 7 8
7 8 2 1 0 5 6 0 9
0 6 0 2 7 8 1 3 5
3 2 1 0 4 6 8 9 7
8 0 4 9 1 3 5 0 6
5 9 6 8 2 0 4 1 3
9 1 7 6 5 2 0 8 0
6 0 3 7 0 1 9 5 2
2 5 8 3 9 4 7 6 0
```

나머지 빈 칸을 채우는 방식은 다음과 같다.

1. 각각의 가로줄과 세로줄에는 1부터 9까지의 숫자가 한 번씩만 나타나야 한다.
2. 굵은 선으로 구분되어 있는 3x3 정사각형 안에도 1부터 9까지의 숫자가 한 번씩만 나타나야 한다.

위의 예의 경우, 첫째 줄에는 1을 제외한 나머지 2부터 9까지의 숫자들이 이미 나타나 있으므로 첫째 줄 빈칸에는 1이 들어가야 한다.

```
'1' 3 5 4 6 9 2 7 8
```

또한 위쪽 가운데 위치한 3x3 정사각형의 경우에는 3을 제외한 나머지 숫자들이 이미 쓰여있으므로 가운데 빈 칸에는 3이 들어가야 한다.

```
4 6 9
1 '3' 5
2 7 8
```

이와 같이 빈 칸을 차례로 채워 가면 다음과 같은 최종 결과를 얻을 수 있다.

```
1 3 5 4 6 9 2 7 8
7 8 2 1 3 5 6 4 9
4 6 9 2 7 8 1 3 5
3 2 1 5 4 6 8 9 7
8 7 4 9 1 3 5 2 6
5 9 6 8 2 7 4 1 3
9 1 7 6 5 2 3 8 4
6 4 3 7 8 1 9 5 2
2 5 8 3 9 4 7 6 1
```

게임 시작 전 스도쿠 판에 쓰여 있는 숫자들의 정보가 주어질 때 모든 빈 칸이 채워진 최종 모습을 출력하는 프로그램을 작성하시오.

### 입력

아홉 줄에 걸쳐 한 줄에 9개씩 게임 시작 전 스도쿠판 각 줄에 쓰여 있는 숫자가 한 칸씩 띄워서 차례로 주어진다. 스도쿠 판의 빈 칸의 경우에는 0이 주어진다. 스도쿠 판을 규칙대로 채울 수 없는 경우의 입력은 주어지지 않는다.

### 출력

모든 빈 칸이 채워진 스도쿠 판의 최종 모습을 아홉 줄에 걸쳐 한 줄에 9개씩 한 칸씩 띄워서 출력한다.

스도쿠 판을 채우는 방법이 여럿인 경우는 그 중 하나만을 출력한다.

### 예제 입력 1
```
0 3 5 4 6 9 2 7 8
7 8 2 1 0 5 6 0 9
0 6 0 2 7 8 1 3 5
3 2 1 0 4 6 8 9 7
8 0 4 9 1 3 5 0 6
5 9 6 8 2 0 4 1 3
9 1 7 6 5 2 0 8 0
6 0 3 7 0 1 9 5 2
2 5 8 3 9 4 7 6 0
```
### 예제 출력 1
```
1 3 5 4 6 9 2 7 8
7 8 2 1 3 5 6 4 9
4 6 9 2 7 8 1 3 5
3 2 1 5 4 6 8 9 7
8 7 4 9 1 3 5 2 6
5 9 6 8 2 7 4 1 3
9 1 7 6 5 2 3 8 4
6 4 3 7 8 1 9 5 2
2 5 8 3 9 4 7 6 1
```
---
### solve
- 우선 스도쿠 input 배열에 0이 있는지 확인한다.
- 0이 없으면 출력 후 종료한다.
- 0이 있다면 그 좌표를 x, y에 저장한다.
    - isValidPosition함수를 통해 스도쿠 조건에 1 ~ 9중에 적합한 숫자가 있는지 확인한다.
        - isValidPosition 함수
            1. 처음 가로, 세로에 그 숫자가 있으면 false를 return
            2. 3x3크기의 사각형에 그 숫자가 있다면 false를 return
            3. 위 1, 2 모두 해당하지 않으면 true를 return
    - 그 숫자를 input 배열에 넣은 후 재귀를 돌려준다.
    - 백트래킹으로 input 배열을 다시 0으로 초기화해준다. (돌다보면 위의 숫자가 아닐 수 있음)

###  code
```javascript
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

function printSudoku() {
    for(let i = 0; i < 9; i++) {
        console.log(input[i].join(' '));
    }
}

function isValidPosition(x, y, num) {
    for(let i = 0; i < 9; i++) {
        if(input[x][i] === num || input[i][y] === num) return false;
    }

    const areaLeftTopX = parseInt(x / 3) * 3;
    const areaLeftTopY = parseInt(y / 3) * 3;
    for(let i = areaLeftTopX; i < areaLeftTopX + 3; i++) {
        for(let j = areaLeftTopY; j < areaLeftTopY + 3; j++) {
            if(input[i][j] === num) return false;
        }
    }
    return true;
}

function playSudoku() {
    let x = -1, y = -1;
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(input[i][j] === 0) {
                x = i;
                y = j;
                break;
            }
        }
        if(x !== -1) break;
    }
    if(x === -1) {    
        printSudoku();
        process.exit();
    }
    for(let i = 1; i <= 9; i++) {
        if(isValidPosition(x, y, i)) {
            input[x][y] = i;
            playSudoku();
            input[x][y] = 0;
        }
    }
}
let count = 9;
const input = [];

rl.on('line', function(line) {
    input.push(line.split(' ').map((v) => parseInt(v)));
    count--;
    if(count === 0) rl.close();
}).on('close', function() {
    playSudoku();
    process.exit();
})
```