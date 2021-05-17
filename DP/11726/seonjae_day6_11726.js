const fs = require("fs");
const input = parseInt(fs.readFileSync("/dev/stdin").toString().trim());
//피보나치 수열과 유사
function solution(n) {
  const dp = new Array(1001).fill(0);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    //나머지 주의!!
    dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
  }
  return dp[n];
}

console.log(solution(input));
