function solution(rows, columns, queries) {
    var answer = [];
    const board = getBoard(rows, columns);
  
    queries.reduce((preBoard, query) => {
      return rotate(preBoard, query);
    }, board);
    return answer;
  }
  
  function getBoard(rows, columns) {
    const board = new Array(rows)
      .fill(1)
      .map((value, index) => value * (index + 1));
  
    return board.reduce((pre, row) => {
      const add = new Array(columns)
        .fill(columns - 1)
        .map((value, index) => row + value * (row - 1) + index);
      return [...pre, add];
    }, []);
  }
  
  function rotate(board, query) {
    const [startRow, startColumn, endRow, endColumn] = query;
    //->
    const LEFT = board[startRow - 1][endColumn - 1];
    if (startColumn + 1 && endColumn) {
      for (let i = endColumn - 1; i > startColumn - 1; i--) {
        board[startRow - 1][i] = board[startRow - 1][i - 1];
      }
    }
    //_
    const DOWN = board[endRow - 2][endColumn - 1];
    if (startRow + 1 && endRow) {
      for (let i = endRow - 2; i > startRow; i--) {
        board[i][endColumn - 1] = board[i - 1][endColumn - 1];
      }
    }
    board[startRow][endColumn - 1] = LEFT;
    //<-
    const RIGHT = board[endRow - 1][startColumn - 1];
    if (startColumn + 1 && endColumn) {
      for (let i = startColumn - 1; i < endColumn - 1; i++) {
        board[endRow - 1][i] = board[endRow - 1][i + 1];
      }
    }
    board[endRow - 1][endColumn - 1] = DOWN;
    //^
    if (startRow + 1 && endRow) {
      for (let i = startRow - 1; i < endRow - 1; i++) {
        board[i][startColumn - 1] = board[i + 1][startColumn - 1];
      }
    }
    board[endRow - 2][startColumn - 1] = RIGHT;
    console.log(board);
    return board;
  }