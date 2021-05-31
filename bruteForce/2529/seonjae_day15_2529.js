const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const k = parseInt(input[0]);
const num = new Array(10).fill(0).map((v, index) => index);
const operation = input[1].split(" ");
//문제 풀이함수
function solution(k, num, operation) {
  let min = "";
  let max = "";
  for (let i = 0; i < 10; i++) {
    const numArr = [...num.slice(0, i), ...num.slice(i + 1)];
    const tmp = getPermutation(k, numArr, operation, i);
    if (min === "") {
      if (tmp.length !== 0 && tmp[0] !== "") {
        min = tmp[0];
      }
    }
    if (tmp.length !== 0 && tmp[tmp.length - 1] !== "") {
      max = tmp[tmp.length - 1];
    }
  }
  return max + "\n" + min;
}
//순열 함수
function getPermutation(k, num, operation, last) {
  const results = [];
  if (k === 0) return [[last]];

  num.forEach((fixed, index) => {
    const rest = [...num.slice(0, index), ...num.slice(index + 1)];
    const op = operation[0];
    const restOp = operation.slice(1);
    if (op === ">") {
      if (last > fixed) {
        const permutations = getPermutation(k - 1, rest, restOp, fixed);
        const attached = permutations.map((permutation) => [
          last,
          ...permutation,
        ]);
        results.push(...attached);
      }
    } else {
      if (last < fixed) {
        const permutations = getPermutation(k - 1, rest, restOp, fixed);
        const attached = permutations.map((permutation) => [
          last,
          ...permutation,
        ]);
        results.push(...attached);
      }
    }
  });
  return results.map((v) => v.join(""));
}

console.log(solution(k, num, operation));
