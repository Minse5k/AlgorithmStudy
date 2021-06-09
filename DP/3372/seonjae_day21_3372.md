# 3372 보드점프

### 나의 풀이

```javascript
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split(" ");
const n = parseInt(inputs.shift());
const board = [];
const visited = new Array(n).fill(null).map((v) => new Array(n).fill(false));

function solution(inputs) {
  for (let i = 0; i < n; i++) {
    const add = inputs[i].split(" ").map((v) => parseInt(v));
    board.push(add);
  }
  visited[0][0] = true;
  const count = dfs(0, 0);

  return count;
}

function dfs(r, c) {
  let count = 0;
  if (r === n - 1 && c === n - 1) {
    return 1;
  } else if (board[r][c] === 0) {
    return 0;
  }
  //오른쪽 아래 순서
  for (let i = 0; i < 2; i++) {
    const nr = r + i * board[r][c];
    const nc = c + (1 - i) * board[r][c];
    //범위를 벗어나면 탐색 X
    if (0 <= nr && nr < n && 0 <= nc && nc < n) {
      // 탐색안했다면 탐색
      if (!visited[nr][nc]) {
        visited[nr][nc] = true;
        count += dfs(nr, nc);
        visited[nr][nc] = false;
      }
    }
  }

  return count;
}

console.log(solution(inputs));
```
1. 경로탐색을 dfs를 활용해서 풀었다.
2. dfs조건은 현재 탐색할 곳이 마지막인덱스(n-1)라면 1을 리턴 현재자신이 board배열에서 값이 0이라면 0리턴
3. dfs값을 count에 누적해서 더해줌
4. solution함수에서 dfs 값을 설정해주고 count를 리턴함

###

```javascript
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split(" ");
const n = parseInt(inputs.shift());
const dp = new Array(n).fill(null).map((v) => new Array(n).fill(0));
const board = [];

function solution(inputs) {
  for (let i = 0; i < n; i++) {
    const add = inputs[i].split(" ").map((v) => parseInt(v));
    board.push(add);
  }
  dp[0][0] = 1;
  //오른쪽 아래 순서 이동
  const dr = [0, 1];
  const dc = [1, 0];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === n - 1 && j === n - 1) continue;
      const tmp = board[i][j];

      for (let k = 0; k < 2; k++) {
        const nr = i + dr[k] * tmp;
        const nc = j + dc[k] * tmp;
        if (nr < n && nc < n) {
          dp[nr][nc] += dp[i][j];
        }
      }
    }
  }

  console.log(dp[n - 1][n - 1]);
}

solution(inputs);
```