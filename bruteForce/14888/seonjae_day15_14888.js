const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input.shift());
const num = input.shift().split(" ").map((v) => parseInt(v));
const operation = input.shift().split(" ").map((v) => parseInt(v));
//연산자 생성 0:+ / 1:- / 2:* / 3:/

//계산 해주는 함수
function getResult(num, opPermutaion) {
  return num.reduce((pre, cur, index) => {
    switch (opPermutaion[index - 1]) {
      case 0:
        return pre + cur;
      case 1:
        return pre - cur;
      case 2:
        return pre * cur;
      case 3:
        if (pre > 0) {
          return Math.floor(pre / cur);
        }
        return -Math.floor(Math.abs(pre) / Math.abs(cur));
    }
  });
}

//순열 구하는 함수
function getPermutaion(k, arr) {
  const results = [];
  if (k === 1) return [arr.filter((v, index) => (v > 0 ? index : false))];

  arr.forEach((fixed, index) => {
    if (fixed !== 0) {
      const rest = [
        ...arr.slice(0, index),
        arr[index] - 1,
        ...arr.slice(index + 1),
      ];
      const permutations = getPermutaion(k - 1, rest);
      const attached = permutations.map((permutation) => [
        index,
        ...permutation,
      ]);
      results.push(...attached);
    }
  });
  return results;
}

function solution(num, n, operation) {
  const opPermutaions = getPermutaion(n, operation);
  let max;
  let min;
  opPermutaions.forEach((opPermutaion) => {
    const tmp = getResult(num, opPermutaion);
    if (max === undefined && min === undefined) {
      max = tmp;
      min = tmp;
    } else {
      if (tmp > max) {
        max = tmp;
      }
      if (min > tmp) {
        min = tmp;
      }
    }
  });
  return [max, min];
}

const [max, min] = solution(num, n, operation);
console.log(max + "\n" + min);
