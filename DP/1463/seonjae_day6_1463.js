const fs = require("fs");
const input = parseInt(fs.readFileSync("/dev/stdin").toString().trim());

const dp = new Array(100001).fill(0);

function answer(n, dp) {
  dp[2] = 1;
  dp[3] = 1;

  for (let i = 4; i <= n; i++) {
    // -1
    dp[i] = dp[i - 1] + 1;
    // 나누기 3
    if (i % 3 === 0) {
      dp[i] = dp[i] > dp[i / 3] + 1 ? dp[i / 3] + 1 : dp[i];
    }
    // 나누기 2
    if (i % 2 === 0) {
      dp[i] = dp[i] > dp[i / 2] + 1 ? dp[i / 2] + 1 : dp[i];
    }
  }
  return dp[n];
}

console.log(answer(input, dp));
