# 가장 큰 정사각형 찾기

## 결과: 효율성에서 틀림 총점 59점

```javascript
function solution(board) {
  let max = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (max > board.length - i || max > board[i].length - j) break;
      if (board[i][j] === 0) continue;

      const tmp = bfs([i, j], board);
      max = max > tmp ? max : tmp;
    }
  }
  return Math.pow(max, 2);
}

function bfs(start, board) {
  const visited = Array.from(Array(board.length), () =>
    Array.from(Array(board[0].length), () => false)
  );
  let count = 1;
  const queue = [start];
  const dx = [0, 1, 1];
  const dy = [1, 0, 1];
  let point = 0;
  while (queue.length > 0) {
    let end = queue.length;

    while (end > point) {
      const [x, y] = queue[point++];
      for (let i = 0; i < 3; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (0 <= nx && nx < board.length && 0 <= ny && ny < board[0].length) {
          if (board[nx][ny] === 0) return count;
          if (visited[nx][ny]) continue;
          visited[nx][ny] = true;
          queue.push([nx, ny]);
          continue;
        }
        return count;
      }
    }
    count++;
  }
}
```

## 리팩토링 후 코드

```javascript
function solution(board) {
  const row = board.length;
  const column = board[0].length;
  const isMaxLengthOne = row === 1 || column === 1;

  if (isMaxLengthOne) return getMaxBase({ board, row, column });

  let max = getMaxBase(board);
  max = researchSquare({ board, row, column, max });

  return max;
}

function getMaxBase({ board, row, column }) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (board[i][j] === 1) return 1;
    }
  }

  return 0;
}

function researchSquare({ board, row, column, max }) {
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < column; j++) {
      if (board[i][j] === 0) continue;

      board[i][j] =
        Math.min(board[i - 1][j - 1], board[i - 1][j], board[i][j - 1]) + 1;
      max = Math.max(max, board[i][j]);
    }
  }

  return Math.pow(max, 2);
}
```
