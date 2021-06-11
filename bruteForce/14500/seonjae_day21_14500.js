const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = inputs
  .shift()
  .split(" ")
  .map((v) => parseInt(v));
const board = [];

function setBoard() {
  for (let i = 0; i < n; i++) {
    const add = inputs[i].split(" ").map((v) => parseInt(v));
    board.push(add);
  }
}

solution();

function solution() {
  setBoard();
  let max = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i + 1 < n && j + 2 < m) {
        const Two_Tree = tetromino1(i, j);
        max = max > Two_Tree ? max : Two_Tree;
      }
      if (i + 2 < n && j + 1 < m) {
        const Tree_Two = tetromino2(i, j);
        max = max > Tree_Two ? max : Tree_Two;
      }
      if (i + 1 < n && j + 1 < m) {
        const Two_Two = tetromino3(i, j);
        max = max > Two_Two ? max : Two_Two;
      }
      if (i + 3 < n) {
        const Four_One = tetromino4(i, j);
        max = max > Four_One ? max : Four_One;
      }
      if (j + 3 < m) {
        const One_Four = tetromino5(i, j);
        max = max > One_Four ? max : One_Four;
      }
    }
  }
  console.log(max);
}

//2X3
function tetromino1(x, y) {
  //ㄱ
  const tmp1 =
    board[x][y] + board[x][y + 1] + board[x][y + 2] + board[x + 1][y + 2];
  //ㄱ대칭
  const tmp2 =
    board[x + 1][y] + board[x][y] + board[x][y + 1] + board[x][y + 2];
  //ㄴ
  const tmp3 =
    board[x][y] + board[x + 1][y] + board[x + 1][y + 1] + board[x + 1][y + 2];
  //ㄴ대칭
  const tmp4 =
    board[x + 1][y] +
    board[x + 1][y + 1] +
    board[x + 1][y + 2] +
    board[x][y + 2];
  //ㄹ
  const tmp5 =
    board[x][y] + board[x][y + 1] + board[x + 1][y + 1] + board[x + 1][y + 2];
  //ㄹ대칭
  const tmp6 =
    board[x + 1][y] + board[x + 1][y + 1] + board[x][y + 1] + board[x][y + 2];
  //ㅜ
  const tmp7 =
    board[x][y] + board[x][y + 1] + board[x][y + 2] + board[x + 1][y + 1];
  //ㅗ
  const tmp8 =
    board[x + 1][y] +
    board[x + 1][y + 1] +
    board[x + 1][y + 2] +
    board[x][y + 1];
  return Math.max(tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8);
}
//3X2
function tetromino2(x, y) {
  //ㅏ
  const tmp1 =
    board[x][y] + board[x + 1][y] + board[x + 2][y] + board[x + 1][y + 1];
  //ㅓ
  const tmp2 =
    board[x][y + 1] +
    board[x + 1][y + 1] +
    board[x + 2][y + 1] +
    board[x + 1][y];
  //ㄴㄱ
  const tmp3 =
    board[x][y] + board[x + 1][y] + board[x + 1][y + 1] + board[x + 2][y + 1];
  //ㄴㄱ대칭
  const tmp4 =
    board[x][y + 1] + board[x + 1][y + 1] + board[x + 1][y] + board[x + 2][y];
  //ㄴ
  const tmp5 =
    board[x][y] + board[x + 1][y] + board[x + 2][y] + board[x + 2][y + 1];
  //ㄴ대칭
  const tmp6 =
    board[x][y + 1] +
    board[x + 1][y + 1] +
    board[x + 2][y + 1] +
    board[x + 2][y];
  //ㄱ
  const tmp7 =
    board[x][y] + board[x][y + 1] + board[x + 1][y + 1] + board[x + 2][y + 1];
  //ㄱ대칭
  const tmp8 =
    board[x][y + 1] + board[x][y] + board[x + 1][y] + board[x + 2][y];
  return Math.max(tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8);
}
//2X2
function tetromino3(x, y) {
  return board[x][y] + board[x + 1][y] + board[x][y + 1] + board[x + 1][y + 1];
}
//4X1
function tetromino4(x, y) {
  return board[x][y] + board[x + 1][y] + board[x + 2][y] + board[x + 3][y];
}
//1X4
function tetromino5(x, y) {
  return board[x][y] + board[x][y + 1] + board[x][y + 2] + board[x][y + 3];
}