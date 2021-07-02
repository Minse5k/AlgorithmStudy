//상하좌우
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function solution(board) {
  //상하좌우 0123
  //x,y,방향,요금
  const n = board.length;
  board[0][0] = new Array(4).fill(0);
  const visited = Array.from(Array(n), () => Array.from(Array(n), () => false));
  visited[0][0] = true;
  const queue = [
    [0, 0, 1],
    [0, 0, 3],
  ];

  while (queue.length > 0) {
    let end = queue.length;
    while (end-- > 0) {
      const [x, y, dict] = queue.shift();
      visited[x][y] = true;
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (0 <= nx && nx < n && 0 <= ny && ny < n) {
          if (visited[nx][ny] || board[nx][ny] === 1) continue;
          if (board[nx][ny] === 0) board[nx][ny] = new Array(4).fill(0);

          if (dict === i) {
            board[nx][ny][dict] = board[x][y][dict] + 100;
          } else {
            if (board[nx][ny][i] === 0) {
              board[nx][ny][i] = board[x][y][dict] + 600;
            } else {
              board[nx][ny][i] = Math.min(
                board[nx][ny][i],
                board[x][y][dict] + 600
              );
            }
          }

          queue.push([nx, ny, i]);
        }
      }
    }
  }

  // console.log(board)
  let min = 0;
  for (let i = 0; i < 4; i++) {
    if (board[n - 1][n - 1][i] !== 0) {
      if (min === 0) min = board[n - 1][n - 1][i];
      else {
        min = Math.min(min, board[n - 1][n - 1][i]);
      }
    }
  }

  return min;
}

//

function solution(board) {
  //상하좌우 0123
  //x,y,방향,요금
  const n = board.length;
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const pay = Array.from(Array(n), () => Array.from(Array(n), () => 0));
  const queue = [
    [0, 0, 1],
    [0, 0, 3],
  ];

  while (queue.length > 0) {
    let end = queue.length;
    while (end-- > 0) {
      const [x, y, direction] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (0 <= nx && nx < n && 0 <= ny && ny < n) {
          if (board[nx][ny] === 1) continue;
          let tmp;
          if (direction !== i) {
            tmp = pay[x][y] + 600;
          } else {
            tmp = pay[x][y] + 100;
          }
          if (pay[nx][ny] === 0) {
            pay[nx][ny] = tmp;
            queue.push([nx, ny, i]);
            continue;
          }
          if (pay[nx][ny] > tmp) {
            pay[nx][ny] = tmp;
            queue.push([nx, ny, i]);
          }
        }
      }
    }
  }

  return pay[n - 1][n - 1];
}

//54점
function solution(board) {
  //상하좌우 0123
  //x,y,방향,요금
  const n = board.length;
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const pay = Array.from(Array(n), () =>
    Array.from(Array(n), () => new Array(4).fill(0))
  );
  const queue = [
    [0, 0, 1],
    [0, 0, 3],
  ];

  while (queue.length > 0) {
    let end = queue.length;
    while (end-- > 0) {
      const [x, y, direction] = queue.shift();
      const px = x - dx[direction];
      const py = y - dy[direction];
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (px === nx && py === ny) continue; //뒤로가기 금지
        if (nx === 0 && ny === 0) continue; //원점으로 돌아가기 금지
        if (0 <= nx && nx < n && 0 <= ny && ny < n) {
          if (board[nx][ny] === 1) continue; //벽가기 금지
          let tmp;
          if (direction !== i) {
            tmp = pay[x][y][direction] + 600;
          } else {
            tmp = pay[x][y][direction] + 100;
          }

          if (pay[nx][ny][i] === 0) {
            pay[nx][ny][i] = tmp;
            queue.push([nx, ny, i]);
          } else if (pay[nx][ny][i] > tmp) {
            pay[nx][ny][i] = tmp;
            queue.push([nx, ny, i]);
          }
        }
      }
    }
  }

  const answer = pay[n - 1][n - 1].reduce((pre, cur) => {
    if (pre === 0) return cur;
    return Math.min(pre, cur);
  }, 0);

  return answer;
}
