function solution(m, n, array) {
  const board = getBoard(n, array);
  const answer = playGame(m, n, board);

  return answer;
}

function getBoard(n, array) {
  return array.reduce(
    (board, arr) => {
      for (let i = 0; i < n; i++) {
        board[i].unshift(arr[i]);
      }
      return board;
    },
    new Array(n).fill(null).map((value) => [])
  );
}

function deleteBoard(deleteList, i, j) {
  deleteList[i][j] = true;
  deleteList[i][j + 1] = true;
  deleteList[i + 1][j] = true;
  deleteList[i + 1][j + 1] = true;

  return deleteList;
}

function playGame(m, n, board) {
  while (true) {
    let isEnd = true;
    let deleteList = new Array(board.length)
      .fill(null)
      .map((value, index) => new Array(board[index].length).fill(false));

    for (let i = 0; i < board.length - 1; i++) {
      for (let j = 0; j < board[i].length - 1; j++) {
        if (board[i][j] !== board[i][j + 1]) continue;
        if (j + 1 > board[i + 1].length) continue;
        if (
          board[i][j] !== board[i + 1][j] ||
          board[i][j] !== board[i + 1][j + 1]
        )
          continue;
        isEnd = false;
        deleteList = deleteBoard(deleteList, i, j);
      }
    }

    board = board.reduce((nextBoard, line, i) => {
      const add = line.reduce((preLine, block, j) => {
        if (deleteList[i][j]) return [...preLine];
        return [...preLine, block];
      }, []);

      return [...nextBoard, add];
    }, []);

    if (isEnd) break;
  }

  let count = 0;
  board.forEach((element) => {
    count += element.length;
  });

  return m * n - count;
}
