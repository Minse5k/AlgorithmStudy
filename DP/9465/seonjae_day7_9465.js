const fs = require("fs");
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const T = parseInt(input.shift());

for (let i = 0; i < T; i++) {
  const n = parseInt(input.shift());
  //위,아래 스티커 배열
  const up = input.shift().split(" ").map((v) => parseInt(v));
  const down = input.shift().split(" ").map((v) => parseInt(v));
  //초기값설정 [i][0] i번째 위스티커선택 [i][1] i번째 아래스티커선택 [i][2] i번째 스티커선택X
  const dp = new Array(n).fill(null).map((v) => new Array(3).fill(0));
  dp[0][0] = up[0];
  dp[0][1] = down[0];
  for (let i = 1; i < n; i++) {
    //up스티커
    dp[i][0] = Math.max(dp[i - 1][1] + up[i], dp[i - 1][2] + up[i]);
    //down스티커
    dp[i][1] = Math.max(dp[i - 1][0] + down[i], dp[i - 1][2] + down[i]);
    //스티커 X
    dp[i][2] = Math.max(dp[i - 1][0], dp[i - 1][1]);
  }
  console.log(Math.max(dp[n-1][0], dp[n-1][1], dp[n-1][2])) ;
}
