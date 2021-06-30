function solution(n) {
  const board = getBoard(n);
  const position = {
    row: 0,
    column: 0,
  };

  let snail = 1;
  while (n > 0) {
    //아래로
    for (let i = 0; i < n; i++) {
      board[position.row + i][position.column] = snail++;
    }
    position.row += n-- - 1;
    position.column += 1;
    //오른쪽으로
    for (let i = 0; i < n; i++) {
      board[position.row][position.column + i] = snail++;
    }
    position.column += n-- - 2;
    position.row -= 1;
    //대각선위로
    for (let i = 0; i < n; i++) {
      board[position.row - i][position.column - i] = snail++;
    }
    position.row -= n - 2;
    position.column -= n-- - 1;
  }
  return board.flat();
}

function getBoard(n) {
  const board = [];
  for (let i = 1; i <= n; i++) {
    const tmp = new Array(i).fill(false);
    board.push(tmp);
  }
  return board;
}
