---
title : "백준 2636 치즈(javascript)"
---
# Problem 2636

# [치즈](https://www.acmicpc.net/problem/2636)

## 구현, 그래프 이론, 그래프 탐색, 너비 우선 탐색, 시뮬레이션

### 문제

아래 <그림 1>과 같이 정사각형 칸들로 이루어진 사각형 모양의 판이 있고, 그 위에 얇은 치즈(회색으로 표시된 부분)가 놓여 있다. 판의 가장자리(<그림 1>에서 네모 칸에 X친 부분)에는 치즈가 놓여 있지 않으며 치즈에는 하나 이상의 구멍이 있을 수 있다.

이 치즈를 공기 중에 놓으면 녹게 되는데 공기와 접촉된 칸은 한 시간이 지나면 녹아 없어진다. 치즈의 구멍 속에는 공기가 없지만 구멍을 둘러싼 치즈가 녹아서 구멍이 열리면 구멍 속으로 공기가 들어가게 된다. <그림 1>의 경우, 치즈의 구멍을 둘러싼 치즈는 녹지 않고 ‘c’로 표시된 부분만 한 시간 후에 녹아 없어져서 <그림 2>와 같이 된다.
```
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 c c 0 0 0
0 c c c 0 0 0 c c 0 0 0
0 c 1 1 c c c 0 0 0 0 0
0 c 1 1 1 1 0 c c 0 0 0
0 c 1 1 1 0 0 1 c 0 0 0
0 0 c 1 0 0 0 1 c 0 0 0
0 0 c 1 1 1 1 1 c 0 0 0
0 0 c 1 1 1 1 1 c 0 0 0
0 0 c 1 1 1 1 1 c 0 0 0
0 0 c c c c c c c 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
```
<그림 1> 원래 치즈 모양

다시 한 시간 후에는 <그림 2>에서 ‘c’로 표시된 부분이 녹아 없어져서 <그림 3>과 같이 된다.

```
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 c c 0 0 0 0 0 0 0 0
0 0 c 1 c c 0 0 0 0 0 0
0 0 c 1 c 0 0 c 0 0 0 0
0 0 0 c 0 0 0 c 0 0 0 0
0 0 0 c c c c c 0 0 0 0
0 0 0 c 1 1 1 c 0 0 0 0
0 0 0 c c c c c 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
```

<그림 2> 한 시간 후의 치즈 모양

```
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 c 0 0 0 0 0 0 0 0
0 0 0 c 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 c c c 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
```

<그림 3> 두 시간 후의 치즈 모양

<그림 3>은 원래 치즈의 두 시간 후 모양을 나타내고 있으며, 남은 조각들은 한 시간이 더 지나면 모두 녹아 없어진다. 그러므로 처음 치즈가 모두 녹아 없어지는 데는 세 시간이 걸린다. <그림 3>과 같이 치즈가 녹는 과정에서 여러 조각으로 나누어 질 수도 있다.

입력으로 사각형 모양의 판의 크기와 한 조각의 치즈가 판 위에 주어졌을 때, 공기 중에서 치즈가 모두 녹아 없어지는 데 걸리는 시간과 모두 녹기 한 시간 전에 남아있는 치즈조각이 놓여 있는 칸의 개수를 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에는 사각형 모양 판의 세로와 가로의 길이가 양의 정수로 주어진다. 세로와 가로의 길이는 최대 100이다. 판의 각 가로줄의 모양이 윗 줄부터 차례로 둘째 줄부터 마지막 줄까지 주어진다. 치즈가 없는 칸은 0, 치즈가 있는 칸은 1로 주어지며 각 숫자 사이에는 빈칸이 하나씩 있다.

### 출력

첫째 줄에는 치즈가 모두 녹아서 없어지는 데 걸리는 시간을 출력하고, 둘째 줄에는 모두 녹기 한 시간 전에 남아있는 치즈조각이 놓여 있는 칸의 개수를 출력한다.

### 예제 입력 1
```
13 12
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 1 1 0 0 0
0 1 1 1 0 0 0 1 1 0 0 0
0 1 1 1 1 1 1 0 0 0 0 0
0 1 1 1 1 1 0 1 1 0 0 0
0 1 1 1 1 0 0 1 1 0 0 0
0 0 1 1 0 0 0 1 1 0 0 0
0 0 1 1 1 1 1 1 1 0 0 0
0 0 1 1 1 1 1 1 1 0 0 0
0 0 1 1 1 1 1 1 1 0 0 0
0 0 1 1 1 1 1 1 1 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
```
### 예제 출력 1
```
3
5
```
---
### solve
- bfs를 통해 구현하는 시뮬레이션 문제였다.
    - 1. 치즈를 녹인다.
        - bfs를 사용하였다.
        - visited를 통해 이미 방문한곳인지 확인해주었다.
        - 녹이는 치즈를 0으로 바꾸어준 후 그 치즈는 bfs에 넣어주면 안된다.(넣어줄 경우 모든 치즈가 0으로 바뀔 수 있음)
    - 2. 남은 치즈의 개수를 센다.
        - js 내장함수인 `filter`와 `reduce`를 통해 1의 개수를 세주었다.
    - 3. 시간을 1시간 늘린다.
    - 4. 남은 치즈의 개수가 0이면 종료.
- 반복문을 위의 방법으로 돌려준다.

###  code
```javascript
'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

let n = 0, m = 0;
let count = -1;
const map = [];

function cheezeCount(arr) {
    return arr.reduce((pre, cur) => pre += cur.filter((a) => a === 1).length, 0);
}

function checkMeltCheeze(arr) {
    const queue = [[0,0]];
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    const visited = Array.from(Array(n), () => new Array(m).fill(false));
    let meltCheezeCnt = 0;
    visited[0][0] = true;

    while(queue.length > 0) {
        const [startX, startY] = queue.shift();
        
        for(let i = 0; i < 4; i++) {
            const nextX = startX + dx[i];
            const nextY = startY + dy[i];
            
            if(0 <= nextX && nextX < n && 0 <= nextY && nextY < m) {
                if(!visited[nextX][nextY]) {
                    visited[nextX][nextY] = true;
                    //치즈 녹이는 경우
                    if(arr[startX][startY] === 0 && arr[nextX][nextY] === 1) {
                        arr[nextX][nextY] = 0;
                        meltCheezeCnt++;
                    } else {
                        queue.push([nextX, nextY]);
                    }
                }
            }
        }
    }
    return meltCheezeCnt;
}

rl.on('line', function(line) {
    if(count === -1) {
        [n, m] = line.split(' ').map((v) => parseInt(v));
        count = n;
        return;
    }
    map.push(line.split(' ').map((v) => parseInt(v)));
    count--;
    if(count === 0) rl.close();

}).on('close', function() {
    let cheezeCnt = cheezeCount(map);
    let time = 0;
    let cheeze = 0;
    
    while(cheezeCnt > 0) {
        cheeze = checkMeltCheeze(map);
        cheezeCnt = cheezeCount(map);
        time++;
    }
    
    console.log(time);
    console.log(cheeze);
    process.exit();
});
```