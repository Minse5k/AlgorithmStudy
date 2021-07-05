# 9663 N-Queen

# 문제

[9663번: N-Queen](https://www.acmicpc.net/problem/9663)

# 나의 풀이

```jsx
const fs = require("fs");
const n = parseInt(fs.readFileSync("/dev/stdin"));

const board = Array.from(Array(n), () => new Array(n).fill(false));
let answer = 0;

function checkQueen(row, middle) {
  let left = middle;
  let right = middle;

  while (row < n) {
    if (left >= 0) {
      board[row][left--] = true;
    }
    if (right < n) {
      board[row][right++] = true;
    }
    board[row][middle] = true;
    row++;
  }
}

function unCheckQueen(row, middle) {
  let left = middle;
  let right = middle;

  while (row < n) {
    if (left >= 0) {
      board[row][left--] = false;
    }
    if (right < n) {
      board[row][right++] = false;
    }
    board[row][middle] = false;
    row++;
  }
}

function dfs(row) {
  if (row === n - 1) {
    const rest = board[row].filter((value) => value === false).length;
    answer += rest;
    return;
  }

  for (let i = 0; i < n; i++) {
    if (board[row][i]) continue;
    checkQueen(row, i);
    dfs(row + 1, i);
    unCheckQueen(row, i);
  }
  return;
}

dfs(0, 0);

console.log(answer);
```

## 설명

1. 체스판에서 퀸이 공격하는 경로를 알기 위해 NxN 행렬을 모두 `false`로 초기화 시킨다.
2. dfs함수에 row의 위치를 넣어 만약 row값이 `N-1`값이라면 현재 column들을 확인하고 `false의 개수`를 answer에 더 해준 후 리턴 해준다.
3. `for문`으로 `row의 column`들을 다 확인을 한다.
4. 확인 할 때 방문이 되어 있다면 방문하지 않는다.
5. 확인이 안됐다면 현재 위치에서 공격 가능한 경로들을 모두 `true`로 바꿔준다.
6. 이후 `row + 1` 연산 후 `dfs 함수`를 실행한다.
7. dfs가 끝나면 다시 방문했던 곳을 방문을 `초기화` 시켜준다.

# 고친 후 나의 풀이

```jsx
const fs = require("fs");
const n = parseInt(fs.readFileSync("/dev/stdin"));

const board = Array.from(Array(n), () => new Array(n).fill(0));
let answer = 0;

function checkQueen(row, middle) {
  let left = middle;
  let right = middle;

  while (row < n) {
    if (left >= 0) {
      board[row][left--]++;
    }
    if (right < n) {
      board[row][right++]++;
    }
    board[row][middle]++;
    row++;
  }
}

function unCheckQueen(row, middle) {
  let left = middle;
  let right = middle;

  while (row < n) {
    if (left >= 0) {
      board[row][left--]--;
    }
    if (right < n) {
      board[row][right++]--;
    }
    board[row][middle]--;
    row++;
  }
}

function dfs(row) {
  if (row === n - 1) {
    const rest = board[row].filter((value) => value === 0).length;
    answer += rest;
    return;
  }

  for (let i = 0; i < n; i++) {
    if (board[row][i] > 0) continue;
    checkQueen(row, i);
    dfs(row + 1, i);
    unCheckQueen(row, i);
  }
  return;
}

dfs(0, 0);

console.log(answer);
```

처음 풀었을 때의 알고리즘과 비슷하지만 공격경로 처리방법을 다르게 했다.

방문을 해제할 때 `TRUE or FALSE`값 만 존재해서 시작 부분(상단 부분)의 공격경로와 하단 부분의 공격경로가 겹치고 하단 부분의 방문을 해제하면 시작 부분(상단 부분)의 공격경로가 같이 해제되어 알고리즘이 제대로 작동하지 않는 현상을 발견했다.

문제가 되는 부분을 해결하기 위해 많은 고민을 했지만 생각이 도저히 떠오르지 않았다. 왜냐하면 방문의 문제라고 인식을 못 하고 알고리즘의 문제인가를 3시간 동안 고민했기 때문이다. 그래서 여러 백트래킹에 관련한 블로그와 영상을 찾아보니 내가 짠 코드와 다른 점을 알게 됐다. 방문을 했을 때 `TRUE or FALSE가 아닌 count 하여 방문 기록을 확인` 한 것이다. 이후 방문을 count하는 방식을 생각하며 코드를 고쳐보니 다행히도 문제를 풀 수 있었다.

> [https://www.youtube.com/watch?v=EpACkG--Wpg](https://www.youtube.com/watch?v=EpACkG--Wpg)  
> [https://idea-sketch.tistory.com/29](https://idea-sketch.tistory.com/29)
