# 1937 욕심쟁이 판다

### 문제 링크
<https://www.acmicpc.net/problem/1937>  
<br />


### 나의접근
1. map(대나무수 배열)과 visited(방문확인)
2. map의 모든 인덱스를 완전탐색으로 각 인덱스마다 dfs를 사용해서 끝까지 탐색하면 max(Set객체)에 count를 푸시
3. 마지막에 max를 answer(Set객체를 정렬하기 위한 배열)에 할당 후 ansewr`[0]`(최대값)을 출력  
<br />

```javascript
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');
const n = parseInt(input.shift());
const map = input.map((v) => v.split(" ").map((i) => parseInt(i)));
const visited = new Array(n).fill(null).map((v) => new Array(n).fill(false));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function dfs(x, y, visited, count) {
  if (visited[x][y]){
    max.add(count);
    return;
  } 
  
  visited[x][y] = true;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
      if (map[nx][ny] > map[x][y]) {
        dfs(nx,ny,visited,count++);  
      }
    }
  }
}

const max = new Set();
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    dfs(i, j, visited, 1);
  }
}
const answer = [...max].sort((a,b)=> b-a);
console.log(answer[0]);

```
  
### 다른 풀이
1. visited(map과 같으면서 방문안하면 false 방문했으면 n)
2. dfs 함수 시작시 방문(DP완료)했으면 visited값 리턴
3. 안됐다면 visited에 1삽입후 4방향으로 탐색하기
4. 현재좌표값과 다음좌표값을 비교했을 때 현재좌표가 더 클 때 현재 값과 dfs(다음좌표)중 큰 값을 temp로 저장한다.
5. 4방향 탐색이 끝나면 현재좌표 방문에는 temp값을 더해준다.
6. 이중for문을 활용해서 answer에 visited(좌표)중 가장 큰값을 출력한다.  
<br />


### 고친 나의 풀이 
```javascript
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input.shift());
const map = input.map((v) => v.split(" ").map((i) => parseInt(i)));
const visited = new Array(n).fill(null).map((v) => new Array(n).fill(false));

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

function dfs(x, y) {
  if (visited[x][y] === false) {
    visited[x][y] = 1;

    let temp = 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (0 <= nx && nx < n && 0 <= ny && ny < n) {
        if (map[x][y] > map[nx][ny]) {
          temp = Math.max(temp, dfs(nx, ny));
        }
      }
    }
    visited[x][y] += temp;
  }
  return visited[x][y];
}

let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j] === false) {
      answer = Math.max(answer, dfs(i, j));
    }
  }
}
console.log(answer);
```  

### 돌아보며..
1. 출처의 사람과 같은 생각(현재좌표에서 dfs로 depth가 가장 큰값을 리턴)을 했지만 구현하는데 실패했다.
2. dp(현재좌표의 4방향에서 위에서 아래로 계산되는 과정)를 활용하는 방법을 터득함  
<br />

> **출처**  
>https://kscodebase.tistory.com/409