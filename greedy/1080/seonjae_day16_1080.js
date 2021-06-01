const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n,m] = input.shift().split(' ').map(v=> parseInt(v));
const arrA = input.slice(0, n);
const arrB = input.slice(n);
//같은곳은 true 다른곳은 false
const inputArr = new Array(n).fill(null).map((v, i) =>
  new Array(m).fill(null).map((w, j) => {
    if (arrA[i][j] === arrB[i][j]) return true;
    return false;
  })
);

function solution(n, m, inputArr) {
  //연산 불가능 할때
  if (n < 3 || m < 3) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (!inputArr[i][j]) return -1;
      }
    }
    return 0;
  }

  let count = 0;
  for (let i = 0; i < n - 2; i++) {
    for (let j = 0; j < m - 2; j++) {
      if (!inputArr[i][j]) {
        inputArr = flipArr(i, j, inputArr);
        count++;
      }
    }
  }
  if (checkArr(n, m, inputArr)) return count;
  return -1;
}
//뒤집기 함수
function flipArr(i, j, inputArr) {
  inputArr[i][j] = !inputArr[i][j];
  inputArr[i][j + 1] = !inputArr[i][j + 1];
  inputArr[i][j + 2] = !inputArr[i][j + 2];
  inputArr[i + 1][j] = !inputArr[i + 1][j];
  inputArr[i + 1][j + 1] = !inputArr[i + 1][j + 1];
  inputArr[i + 1][j + 2] = !inputArr[i + 1][j + 2];
  inputArr[i + 2][j] = !inputArr[i + 2][j];
  inputArr[i + 2][j + 1] = !inputArr[i + 2][j + 1];
  inputArr[i + 2][j + 2] = !inputArr[i + 2][j + 2];
  return inputArr;
}
//이상없으면 true 반환 있으면 false반환
function checkArr(n, m, inputArr) {
  for (let i = n - 2; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!inputArr[i][j]) return false;
    }
  }
  for (let i = 0; i < n - 2; i++) {
    for (let j = m - 2; j < m; j++) {
      if (!inputArr[i][j]) return false;
    }
  }
  return true;
}

console.log(solution(n, m, inputArr));
