function solution(rows, columns, queries) {
  const board = getBoard(rows, columns);

  const answer = queries.reduce((ans, query) => {
    const min = rotate(board, query);
    ans.push(min);

    return ans;
  }, []);

  return answer;
}

function getBoard(rows, columns) {
  const board = Array.from(Array(rows), () => new Array(columns).fill(0));
  let num = 1;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      board[i][j] = num++;
    }
  }
  return board;
}

function rotate(board, query) {
  const [startRow, startColumn] = [query[0] - 1, query[1] - 1];
  const [endRow, endColumn] = [query[2] - 1, query[3] - 1];

  const tmp = board[startRow][startColumn];
  let min = tmp;

  for (let i = startRow; i < endRow; i++) {
    board[i][startColumn] = board[i + 1][startColumn];
    min = Math.min(min, board[i][startColumn]);
  }

  for (let i = startColumn; i < endColumn; i++) {
    board[endRow][i] = board[endRow][i + 1];
    min = Math.min(min, board[endRow][i]);
  }

  for (let i = endRow; i > startRow; i--) {
    board[i][endColumn] = board[i - 1][endColumn];
    min = Math.min(min, board[i][endColumn]);
  }

  for (let i = endColumn; i > startColumn + 1; i--) {
    board[startRow][i] = board[startRow][i - 1];
    min = Math.min(min, board[startRow][i]);
  }
  board[startRow][startColumn + 1] = tmp;

  return min;
}
