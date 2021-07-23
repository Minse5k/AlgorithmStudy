# 12100 2048(Easy)

# 문제

[12100번: 2048 (Easy)](https://www.acmicpc.net/problem/12100)

# 나의 풀이

```jsx
const fs = require("fs");
const [n, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const MAXSIZE = parseInt(n);
const board = arr.map((line) =>
  line.split(" ").map((value) => parseInt(value))
);

const upMove = (board) => {
  //위로 이동
  for (let i = 0; i < MAXSIZE; i++) {
    const tmp = [];
    for (let j = 0; j < MAXSIZE; j++) tmp.push(board[j][i]);
    const removedZero = tmp.filter((value) => value !== 0);
    const onlyZero = tmp.filter((value) => value === 0);
    const res = removedZero.concat(onlyZero);
    for (let j = 0; j < MAXSIZE; j++) board[j][i] = res[j];
  }

  //합치기
  for (let i = 0; i < MAXSIZE; i++) {
    for (let j = 0; j < MAXSIZE - 1; j++) {
      if (board[j][i] !== board[j + 1][i]) continue;
      board[j][i] += board[j + 1][i];
      board[j + 1][i] = 0;
    }
  }

  //위로 이동
  for (let i = 0; i < MAXSIZE; i++) {
    const tmp = [];
    for (let j = 0; j < MAXSIZE; j++) tmp.push(board[j][i]);
    const removedZero = tmp.filter((value) => value !== 0);
    const onlyZero = tmp.filter((value) => value === 0);
    const res = removedZero.concat(onlyZero);
    for (let j = 0; j < MAXSIZE; j++) board[j][i] = res[j];
  }
};

const leftMove = (board) => {
  //좌로 이동
  for (let i = 0; i < MAXSIZE; i++) {
    const removedZero = board[i].filter((value) => value !== 0);
    const onlyZero = board[i].filter((value) => value === 0);
    board[i] = removedZero.concat(onlyZero);
  }
  //합치기
  for (let i = 0; i < MAXSIZE; i++) {
    for (let j = 0; j < MAXSIZE - 1; j++) {
      if (board[i][j] !== board[i][j + 1]) continue;
      board[i][j] += board[i][j + 1];
      board[i][j + 1] = 0;
    }
  }
  //좌로 이동
  for (let i = 0; i < MAXSIZE; i++) {
    const removedZero = board[i].filter((value) => value !== 0);
    const onlyZero = board[i].filter((value) => value === 0);
    board[i] = removedZero.concat(onlyZero);
  }
};

const downMove = (board) => {
  //아래 이동
  for (let i = 0; i < MAXSIZE; i++) {
    const tmp = [];
    for (let j = 0; j < MAXSIZE; j++) tmp.push(board[j][i]);
    const removedZero = tmp.filter((value) => value !== 0);
    const onlyZero = tmp.filter((value) => value === 0);
    const res = onlyZero.concat(removedZero);
    for (let j = 0; j < MAXSIZE; j++) board[j][i] = res[j];
  }
  //합치기
  for (let i = 0; i < MAXSIZE; i++) {
    for (let j = MAXSIZE - 1; j > 0; j--) {
      if (board[j][i] !== board[j - 1][i]) continue;
      board[j][i] += board[j - 1][i];
      board[j - 1][i] = 0;
    }
  }
  //아래 이동
  for (let i = 0; i < MAXSIZE; i++) {
    const tmp = [];
    for (let j = 0; j < MAXSIZE; j++) tmp.push(board[j][i]);
    const removedZero = tmp.filter((value) => value !== 0);
    const onlyZero = tmp.filter((value) => value === 0);
    const res = onlyZero.concat(removedZero);
    for (let j = 0; j < MAXSIZE; j++) board[j][i] = res[j];
  }
};

const rightMove = (board) => {
  //우로 이동
  for (let i = 0; i < MAXSIZE; i++) {
    const removedZero = board[i].filter((value) => value !== 0);
    const onlyZero = board[i].filter((value) => value === 0);
    board[i] = onlyZero.concat(removedZero);
  }
  //합치기
  for (let i = 0; i < MAXSIZE; i++) {
    for (let j = MAXSIZE - 1; j > 0; j--) {
      if (board[i][j] !== board[i][j - 1]) continue;
      board[i][j] += board[i][j - 1];
      board[i][j - 1] = 0;
    }
  }
  //우로 이동
  for (let i = 0; i < MAXSIZE; i++) {
    const removedZero = board[i].filter((value) => value !== 0);
    const onlyZero = board[i].filter((value) => value === 0);
    board[i] = onlyZero.concat(removedZero);
  }
};

let max = 0;

const dfs = (k, board) => {
  if (k === 0) {
    const count = board.reduce((pre, now) => {
      now.forEach((value) => {
        if (value > pre) pre = value;
      });
      return pre;
    }, 0);
    max = Math.max(max, count);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nextBoard = [];
    board.forEach((line) => {
      nextBoard.push([...line]);
    });
    switch (i) {
      case 0: {
        upMove(nextBoard);
        dfs(k - 1, [...nextBoard]);
        break;
      }
      case 1: {
        downMove(nextBoard);
        dfs(k - 1, [...nextBoard]);
        break;
      }
      case 2: {
        leftMove(nextBoard);
        dfs(k - 1, [...nextBoard]);
        break;
      }
      case 3: {
        rightMove(nextBoard);
        dfs(k - 1, [...nextBoard]);
        break;
      }
    }
  }
};

dfs(5, [...board]);

console.log(max);
```

1. dfs를 활용해 모든 경우의 수를 탐색한다.
2. 이동 할 때 미리 비어있는 부분은 채워주고 연산을 하고 다시 비어있는 부분을 채워준다.
3. k===0일 때 board를 전부 탐색해 그 중 가장큰값과 max값과 비교한다.

이 문제를 풀 때 연산과 밀어주기 함수를 만들어야겠다고 생각했다. 연산은 바로 옆에 있는 값과 같으면 현재 값에 더해주고 옆의 값은 0으로 초기화하는 것을 생각했다. 밀어주기는 현재 0값이면 뒤의 값과 바꾸는 것을 생각했다.

하지만 밀어주기를 내가 반례를 생각 못 하고 코드를 작성했기 때문에 여기서 시간이 많이 걸렸다. 만약 0 0 2 0 0이라면 0 2 0 0 0 이렇게 되기 때문이다. 그래서 filter 함수를 적절히 사용해서 풀었다. 이렇게 했는데도 로직이 잘못돼서 틀리게 되었다. 그 이유는 나는 더해주고 밀어주고를 사용했지만 정확한 답을 얻으려면 처음 밀어주고 더해주고 밀어줘야 되는 것이었다.

하지만 다음에도 틀리게 되었다. 이유는 board의 얕은 복사 때문이었다. 그래서 깊은 복사를 시켜주어 해결했다. 풀이 시간은 3시간이 걸렸지만 이러한 문제 상황이 없었다면 더 빨리 풀 수 있었다는 아쉬움도 남았다.