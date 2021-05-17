const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const T = parseInt(input.shift());

const dp = new Array(11).fill(0);
function solution(n) {
  if (dp[n] === 0) {
    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 4;
    for (let i = 4; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    }
  }
  return dp[n];
}

for (let i = 0; i < T; i++) {
  console.log(solution(parseInt(input[i])));
}
