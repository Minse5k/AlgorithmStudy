const fs = require("fs");
const input = parseInt(fs.readFileSync("/dev/stdin").toString());
//초기값 설정 / 각 인덱스 [i][0]는 사자가있는경우 [i][1]은 사자가없는경우
const dp = new Array(100001).fill(null).map((v) => [0, 0]);
function solution(n) {
  dp[1][0] = 2;
  dp[1][1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i][0] = (dp[i - 1][0] + 2 * dp[i - 1][1]) % 9901;
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][1]) % 9901;
  }
  return (dp[n][0] + dp[n][1]) % 9901;
}

console.log(solution(input));
