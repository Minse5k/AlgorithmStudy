const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input.shift());
const triangle = input.map((v) => v.split(" ").map((i) => parseInt(i)));
const dp = new Array(n).fill(null).map((v) => new Array(n).fill(0));
dp[0][0] = triangle[0][0];

function solution(n) {
  let max = 0;
  for (let i = 1; i < n; i++) {
    triangle[i].forEach((v, index) => {
      if (index === 0) {
        dp[i][index] = dp[i - 1][index] + v;
      } else {
        const a = dp[i - 1][index - 1] + v;
        const b = dp[i - 1][index] + v;
        dp[i][index] = Math.max(a, b);
      }
      max = dp[i][index] > max ? dp[i][index] : max;
    });
  }
  return max;
}

console.log(solution(n));
