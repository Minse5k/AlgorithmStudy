const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input.shift());
const arr = input.shift().split(" ").map((v) => parseInt(v));

function solution(n, arr) {
  const dp = new Array(n).fill(0);
  dp[0] = arr[0];
  let max = dp[0];
  for (let i = 1; i < n; i++) {
    const tmp = dp[i - 1] + arr[i];
    if (arr[i] > 0 && dp[i - 1] > 0) {
      dp[i] = dp[i - 1] + arr[i];
    } else if (arr[i] > 0 && dp[i - 1] < 0) {
      dp[i] = arr[i];
    } else if (arr[i] < 0 && tmp >= 0) {
      dp[i] = tmp;
    } else {
      dp[i] = arr[i];
    }
    max = max > dp[i] ? max : dp[i];
  }
  console.log(dp);
  return max;
}
console.log(solution(n, arr));
// 제거하는 조건을 구현하기가 어려워 연속합만 구현..

// 제거하는 조건 추가
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input.shift());
const arr = input.shift().split(' ').map((v) => parseInt(v));

function solution(n, arr) {
  //이중배열선언 0인덱스는 아무것도 안뺀것, 1은 하나만 뺀것
  const dp = new Array(n).fill(0).map((v) => new Array(2).fill(0));

  dp[0][0] = arr[0];
  dp[0][1] = arr[0];
  let max = dp[0][0];
  for (let i = 1; i < n; i++) {
    if (dp[i - 1][0] >= 0) {
      if (arr[i] > 0) {
        //연속된 합이 양수이고 현재값이 양수 일때
        dp[i][0] = dp[i - 1][0] + arr[i];
      } else {
        //연속된 합이 양수이고 현재값이 음수일 때
        dp[i][0] = dp[i - 1][0] + arr[i] >= 0 ? dp[i - 1][0] + arr[i] : arr[i];
      }
    } else {
      //연속된 합이 음수일 때 자기 자신으로 초기화
      dp[i][0] = arr[i];
    }
    max = max > dp[i][0] ? max : dp[i][0];
    //i번째에서 1개를 뺀것은 i번째에서 뺀것과 i번째 전에서 뺏것중 최대값을 가져옴
    dp[i][1] = dp[i-1][0] > dp[i-1][1] +arr[i] ? dp[i-1][0] : dp[i-1][1] +arr[i];
    max = max > dp[i][1] ? max : dp[i][1];
  }

  return max;
}
console.log(solution(n, arr));

