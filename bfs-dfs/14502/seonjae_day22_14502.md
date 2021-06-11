# 14502 연구소

### 나의풀이

1. 완전탐색(조합을 사용해서) 벽이 3개씩 올수있는 경우의 배열을 모두 생성한다.
2. 1번을 통한 각 배열에서 바이러스를 찾아 bfs알고리즘을 통해 벽이아닌 비어있는공간에 바이러스로 바꿔준다.
3. 각 2번에서 나온 연구소의 0인 개수를 세준다.
4. 1~3번 과정을 반복해서 0인개수가 가장 큰 값을 리턴해준다.

```javascript
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const dx = [0, 1, -1, 0];
const dy = [1, 0, , 0, -1];
let max = 0;

function bfs(n, m, laboratorys) {
  const check = new Array(8).fill(null).map((v) => new Array(8).fill(0));
  const queue = [];
  //배열복사
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) check[i][j] = laboratorys[i][j];
  }
  //감염
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (check[i][j] === 2) {
        queue.push([i, j]);
        while (queue.length > 0) {
          const [fx, fy] = queue.shift();
          for (let k = 0; k < 4; k++) {
            const nx = fx + dx[k];
            const ny = fy + dy[k];
            if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
            if (check[nx][ny] === 1) continue;
            check[nx][ny] = 1;
            queue.push([nx, ny]);
          }
        }
      }
    }
  }
  //안전지대 확인
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!check[i][j]) count++;
    }
  }
  if (count > max) max = count;
}

function dfs(x, y, count, n, m, laboratorys) {
  if (count === 3) {
    bfs(n, m, laboratorys);
    return;
  }
  //벽설치하기
  for (let i = y; i < m; i++) {
    if (laboratorys[x][i] === 0) {
      laboratorys[x][i] = 1;
      dfs(x, i, count + 1, n, m, laboratorys);
      laboratorys[x][i] = 0;
    }
  }

  for (let i = x + 1; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (laboratorys[i][j] === 0) {
        laboratorys[i][j] = 1;
        dfs(i, j, count + 1, n, m, laboratorys);
        laboratorys[i][j] = 0;
      }
    }
  }
}

function solution(inputs) {
  const [nm, ...rooms] = inputs;
  const [MAX_ROW, MAX_COLUMN] = nm.split(" ").map((v) => parseInt(v));
  const laboratorys = rooms.reduce(
    (pre, laboratory) => [
      ...pre,
      laboratory.split(" ").map((v) => parseInt(v)),
    ],
    []
  );
  // console.log(MAX_ROW, MAX_COLUMN);
  dfs(0, 0, 0, MAX_ROW, MAX_COLUMN, laboratorys);
  console.log(max);
}

solution(inputs);
```
