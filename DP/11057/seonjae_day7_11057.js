const fs = require("fs");
const input = parseInt(fs.readFileSync("/dev/stdin").toString());
//초기값 설정 / 각 인덱스 [n][i] n번째에서 마지막 0~9일때 개수
const dp = new Array(100001).fill(null).map((v) => new Array(10).fill(0));

function solution(n) {
  //초기값설정
  for (let i = 0; i < 10; i++) {
    dp[1][i] = 1;
  }
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k <= j; k++) {
        dp[i][j] += dp[i - 1][k];
      }
      dp[i][j] = dp[i][j] % 10007;
    }
  }
  const answer = dp[n].reduce((pre, cur) => {
    return pre + cur;
  }, 0);
  return answer % 10007;
}
console.log(solution(input));
