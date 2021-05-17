const fs = require("fs");
const input = parseInt(fs.readFileSync("/dev/stdin").toString().trim());

function solution(n) {
  const dp = new Array(1001).fill(0);
  dp[1] = 1;
  dp[2] = 3;

  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2] * 2) % 10007;
  }
  return dp[n];
}

console.log(solution(input));
