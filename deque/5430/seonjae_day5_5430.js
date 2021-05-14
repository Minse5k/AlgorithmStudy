const fs = require("fs");
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const T = parseInt(input.shift());

for (let i = 0; i < T; i++) {
  //각 테스트케이스마다 변수 정리
  const funcP = input.shift();
  const n = parseInt(input.shift());
  const tmp = input.shift();
  let pointer = 0;
  let arr =tmp.slice(1, tmp.length - 1).length !== 0 ? tmp.slice(1, tmp.length - 1).split(",") : [];
  arr = cmd(funcP, pointer, arr);
  console.log(arr);
}

function cmd(funcP, pointer, arr) {
  for (let i = 0; i < funcP.length; i++) {
    if (funcP[i] === "D") {
      //삭제
      if (arr.length === 0) {
        return "error";
      } else {
        if (pointer === 0) {
          //순서대로
          arr.shift();
        } else {
          //뒤집어진 상태
          arr.pop();
          pointer = arr.length === 0 ? 0 : arr.length - 1;
        }
      }
    } else {
      //뒤집기
      if (pointer === 0) {
        pointer = arr.length === 0 ? 0 : arr.length - 1;
      } else {
        pointer = 0;
      }
    }
  }
  if (pointer === 0) {
    arr = "[" + arr.join(",") + "]";
  } else {
    arr = "[" + arr.reverse().join(",") + "]";
  }
  return arr;
}
