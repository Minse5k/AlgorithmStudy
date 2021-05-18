const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const T = parseInt(input.shift());
//배열 초기값 설정
const dp = [0, 1, 2, 4];

function solution(n) {
  //이미 저장되어있다면 출력
  if (dp.length > n) {
    return dp[n];
  } else {
    //그렇지 않은 경우 계산 후 배열에 넣기 재사용하기위함
    for (let i = dp.length; i <= n; i++) {
      const nextDP = dp[i - 1] + dp[i - 2] + dp[i - 3];
      dp.push(nextDP % 1000000009);
    }
  }
  return dp[n];
}

for (let i = 0; i < T; i++) {
  const n = parseInt(input[i]);
  console.log(solution(n));
}
