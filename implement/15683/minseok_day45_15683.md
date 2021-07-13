---
title : "백준 15683 가장 긴 증가하는 부분 수열(javascript)"
---
# Problem 15683


# [감시](https://www.acmicpc.net/problem/15683)

## 구현, 브루트포스 알고리즘, 시뮬레이션

### 문제

스타트링크의 사무실은 1×1크기의 정사각형으로 나누어져 있는 N×M 크기의 직사각형으로 나타낼 수 있다. 사무실에는 총 K개의 CCTV가 설치되어져 있는데, CCTV는 5가지 종류가 있다. 각 CCTV가 감시할 수 있는 방법은 다음과 같다.
→	←	↑	↓
```
 →    ←→      ↑→      ←↑→    ←↑↓→
1번	  2번	  3번	  4번	  5번
```
1번 CCTV는 한 쪽 방향만 감시할 수 있다. 2번과 3번은 두 방향을 감시할 수 있는데, 2번은 감시하는 방향이 서로 반대방향이어야 하고, 3번은 직각 방향이어야 한다. 4번은 세 방향, 5번은 네 방향을 감시할 수 있다.

CCTV는 감시할 수 있는 방향에 있는 칸 전체를 감시할 수 있다. 사무실에는 벽이 있는데, CCTV는 벽을 통과할 수 없다. CCTV가 감시할 수 없는 영역은 사각지대라고 한다.

CCTV는 회전시킬 수 있는데, 회전은 항상 90도 방향으로 해야 하며, 감시하려고 하는 방향이 가로 또는 세로 방향이어야 한다.
```
0 0 0 0 0 0
0 0 0 0 0 0
0 0 1 0 6 0
0 0 0 0 0 0
```
지도에서 0은 빈 칸, 6은 벽, 1~5는 CCTV의 번호이다. 위의 예시에서 1번의 방향에 따라 감시할 수 있는 영역을 '#'로 나타내면 아래와 같다.
```
0 0 0 0 0 0
0 0 0 0 0 0
0 0 1 # 6 0
0 0 0 0 0 0
→
```
```
0 0 0 0 0 0
0 0 0 0 0 0
# # 1 0 6 0
0 0 0 0 0 0
←
```
```
0 0 # 0 0 0
0 0 # 0 0 0
0 0 1 0 6 0
0 0 0 0 0 0
↑
```
```
0 0 0 0 0 0
0 0 0 0 0 0
0 0 1 0 6 0
0 0 # 0 0 0
↓
```
CCTV는 벽을 통과할 수 없기 때문에, 1번이 → 방향을 감시하고 있을 때는 6의 오른쪽에 있는 칸을 감시할 수 없다.
```
0 0 0 0 0 0
0 2 0 0 0 0
0 0 0 0 6 0
0 6 0 0 2 0
0 0 0 0 0 0
0 0 0 0 0 5
```
위의 예시에서 감시할 수 있는 방향을 알아보면 아래와 같다.
```
0 0 0 0 0 #
# 2 # # # #
0 0 0 0 6 #
0 6 # # 2 #
0 0 0 0 0 #
# # # # # 5
왼쪽 상단 2: ↔, 오른쪽 하단 2: ↔
```
```
0 0 0 0 0 #
# 2 # # # #
0 0 0 0 6 #
0 6 0 0 2 #
0 0 0 0 # #
# # # # # 5
왼쪽 상단 2: ↔, 오른쪽 하단 2: ↕	
```
```
0 # 0 0 0 #
0 2 0 0 0 #
0 # 0 0 6 #
0 6 # # 2 #
0 0 0 0 0 #
# # # # # 5
왼쪽 상단 2: ↕, 오른쪽 하단 2: ↔	
```
```
0 # 0 0 0 #
0 2 0 0 0 #
0 # 0 0 6 #
0 6 0 0 2 #
0 0 0 0 # #
# # # # # 5
왼쪽 상단 2: ↕, 오른쪽 하단 2: ↕
```
CCTV는 CCTV를 통과할 수 있다. 아래 예시를 보자.
```
0 0 2 0 3
0 6 0 0 0
0 0 6 6 0
0 0 0 0 0
```
위와 같은 경우에 2의 방향이 ↕ 3의 방향이 ←와 ↓인 경우 감시받는 영역은 다음과 같다.
```
# # 2 # 3
0 6 # 0 #
0 0 6 6 #
0 0 0 0 #
```
사무실의 크기와 상태, 그리고 CCTV의 정보가 주어졌을 때, CCTV의 방향을 적절히 정해서, 사각 지대의 최소 크기를 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 사무실의 세로 크기 N과 가로 크기 M이 주어진다. (1 ≤ N, M ≤ 8)

둘째 줄부터 N개의 줄에는 사무실 각 칸의 정보가 주어진다. 0은 빈 칸, 6은 벽, 1~5는 CCTV를 나타내고, 문제에서 설명한 CCTV의 종류이다. 

CCTV의 최대 개수는 8개를 넘지 않는다.

### 출력

첫째 줄에 사무실의 세로 크기 N과 가로 크기 M이 주어진다. (1 ≤ N, M ≤ 8)

둘째 줄부터 N개의 줄에는 사무실 각 칸의 정보가 주어진다. 0은 빈 칸, 6은 벽, 1~5는 CCTV를 나타내고, 문제에서 설명한 CCTV의 종류이다. 

CCTV의 최대 개수는 8개를 넘지 않는다.

### 예제 입력 1
```
4 6
0 0 0 0 0 0
0 0 0 0 0 0
0 0 1 0 6 0
0 0 0 0 0 0
```
### 예제 출력 1
```
20
```
### 예제 입력 2
```
6 6
0 0 0 0 0 0
0 2 0 0 0 0
0 0 0 0 6 0
0 6 0 0 2 0
0 0 0 0 0 0
0 0 0 0 0 5
```
### 예제 출력 2
```
15
```
### 예제 입력 3
```
6 6
1 0 0 0 0 0
0 1 0 0 0 0
0 0 1 0 0 0
0 0 0 1 0 0
0 0 0 0 1 0
0 0 0 0 0 1
```
### 예제 출력 3
```
6
```
### 예제 입력 4
```
6 6
1 0 0 0 0 0
0 1 0 0 0 0
0 0 1 5 0 0
0 0 5 1 0 0
0 0 0 0 1 0
0 0 0 0 0 1
```
### 예제 출력 4
```
2
```
### 예제 입력 5
```
1 7
0 1 2 3 4 5 6
```
### 예제 출력 5
```
0
```
### 예제 입력 6
```
3 7
4 0 0 0 0 0 0
0 0 0 2 0 0 0
0 0 0 0 0 0 4
```
### 예제 출력 6
```
0
```
---
### solve
- cctv 번호 및 좌표를 배열로 만들어 따로 저장해주었다.
- 재귀를 이용하였다.
- cctv 번호를 토대로 문제에서 바라는 방향을 모두 확인해준다.
- cctv를 모두 확인하면 최솟값과 비교하여 최솟값을 정해준다.
---
- js는 2차원 배열을 복사할때 각 행별로 복사해줘야하는점을 주의한다.


###  code

```javascript
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
//cctv 번호, 좌표를 기억하는 배열을 만드는 함수
function getCctvArray(arr, n, m){
    const array = [];

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(0 < arr[i][j] && arr[i][j] < 6) {
                array.push([arr[i][j], i, j])
            }
        }
    }
    return array;
}
//왼쪽을 감시하는 경우 감시 가능지역을 9로 설정
function left(map, x, y) {
    for(let i = y - 1; i >= 0; i--) {
        if(map[x][i] === 6) break;
        map[x][i] = 9;
    }
}
//오른쪽을 감시하는 경우 감시 가능지역을 9로 설정
function right(map, x, y, m) {
    for(let i = y + 1; i < m; i++) {
        if(map[x][i] === 6) break;
        map[x][i] = 9;
    }
}
//위쪽을 감시하는 경우 감시 가능지역을 9로 설정
function up(map, x, y) {
    for(let i = x - 1; i >= 0; i--) {
        if(map[i][y] === 6) break;
        map[i][y] = 9;
    }
}
//아래쪽을 감시하는 경우 감시 가능지역을 9로 설정
function down(map, x, y, n) {
    for(let i = x + 1; i < n; i++) {
        if(map[i][y] === 6) break;
        map[i][y] = 9;
    }
}
//기본 map을 변하지 않게 하기 위해 복사
function copyMap(arr, n) {
    let array = new Array(n);
    for(let i = 0; i < n; i++) {
        array[i] = [...arr[i]];
    }
    return array;
}
//현재 사각지대가 몇개인지 반환해주는 함수
function getBlindSpotCnt(arr) {
    return arr.reduce((count, cur) => {
        return count += cur.reduce((cnt, cur2) => {
            if(cur2 === 0) cnt++;
            return cnt;
        }, 0);
    }, 0);
}
let min = 999999;
//dfs를 통해 확인
function dfs(arr, cnt, cctvArray, n, m) {
    //모든 cctv를 확인했을 때
    if(cnt === cctvArray.length) {
        const num = getBlindSpotCnt(arr);
        min = Math.min(num, min);
        return;
    }
    let map = [];
    const [cctvNum, x, y] = cctvArray[cnt];
    switch(cctvNum) {
        case 1:
            map = copyMap(arr, n);
            left(map, x, y);
            dfs(map, cnt + 1, cctvArray, n, m);

            map = copyMap(arr, n);
            right(map, x, y, m);
            dfs(map, cnt + 1, cctvArray, n, m);
    
            map = copyMap(arr, n);
            up(map, x, y);
            dfs(map, cnt + 1, cctvArray, n, m);

            map = copyMap(arr, n);
            down(map, x, y, n);
            dfs(map, cnt + 1, cctvArray, n, m);
            break;
        case 2:
            map = copyMap(arr, n);
            left(map, x, y);
            right(map, x, y, m);
            dfs(map, cnt + 1, cctvArray, n, m);

            map = copyMap(arr, n);
            up(map, x, y);
            down(map, x, y, n);
            dfs(map, cnt + 1, cctvArray, n, m);
            break;
        case 3:
            map = copyMap(arr, n);
            left(map, x, y);
            up(map, x, y);
            dfs(map, cnt + 1, cctvArray, n, m);

            map = copyMap(arr, n);
            up(map, x, y);
            right(map, x, y, m);
            dfs(map, cnt + 1, cctvArray, n, m);

            map = copyMap(arr, n);
            right(map, x, y, m);
            down(map, x, y, n);
            dfs(map, cnt + 1, cctvArray, n, m);

            map = copyMap(arr, n);
            down(map, x, y, n);
            left(map, x, y);
            dfs(map, cnt + 1, cctvArray, n, m);
            break;
        case 4:
            map = copyMap(arr, n);
            left(map, x, y);
            up(map, x, y);
            right(map, x, y, m);
            dfs(map, cnt + 1, cctvArray, n, m);

            map = copyMap(arr, n);
            left(map, x, y);
            up(map, x, y);
            down(map, x, y, n);
            dfs(map, cnt + 1, cctvArray, n, m);

            map = copyMap(arr, n);
            left(map, x, y);
            right(map, x, y, m);
            down(map, x, y, n);
            dfs(map, cnt + 1, cctvArray, n, m);

            map = copyMap(arr, n);
            up(map, x, y);
            right(map, x, y, m);
            down(map, x, y, n);
            dfs(map, cnt + 1, cctvArray, n, m);
            break;
        case 5:
            map = copyMap(arr, n);
            left(map, x, y);
            up(map, x, y);
            right(map, x, y, m);
            down(map, x, y, n);
            dfs(map, cnt + 1, cctvArray, n, m);
            break;
    }
}

const input = [];
let count = -1;
rl.on('line', function(line) {
    if(count === -1) {
        input.push(line.split(' ').map((v) => parseInt(v)));
        count = input[0][0];
        return;
    }
    input.push(line.split(' ').map((v) => parseInt(v)));
    count--;
    if(count === 0) rl.close();
}).on('close', function() {
    const [n, m] = input.shift();
    const cctvArray = getCctvArray(input, n, m);
    
    dfs(input, 0, cctvArray, n, m);
    console.log(min);
    process.exit();
})
```