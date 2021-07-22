# 9251 LCS

# 문제

[9251번: LCS](https://www.acmicpc.net/problem/9251)

# 나의 풀이

```jsx
const fs = require("fs");
const str = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((value) => value.split(""));
const [strA, strB] = str;

const dp = Array.from(Array(strB.length), () => new Array(strA.length).fill(0));

let checked = false;
for (let i = 0; i < strA.length; i++) {
  if (strA[i] === strB[0]) {
    checked = true;
    dp[0][i] = 1;
  }
  if (checked) dp[0][i] = 1;
}

checked = false;

for (let i = 0; i < strB.length; i++) {
  if (strB[i] === strA[0]) {
    checked = true;
    dp[i][0] = 1;
  }
  if (checked) dp[i][0] = 1;
}

for (let i = 1; i < strB.length; i++) {
  for (let j = 1; j < strA.length; j++) {
    if (strB[i] === strA[j]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
      continue;
    }

    dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
  }
}

console.log(dp[strB.length - 1][strA.length - 1]);
```

예전에 LCS2 관련해서 문제를 풀었기 때문에 이번 문제는 접근하기 쉬웠다. 

1. 각 문자열 배열을 만들고 NxM((문자열A x 문자열B)크기의 dp 배열 0으로 초기화 한다.
2. 그리고 N의 첫번째, M의 첫번째 라인에 같은 문자가 나타난다면 1로 초기화 해준다. 그러면 dp의 가로, 세로 길이의 값은 0 or 1 로 초기화 된다.
3. 나머지 탐색을 안한곳은 순서대로 탐색하되 만약 현재 위치인 dp[i][j]라면 문자열B의 i번째와 문자열A의 j번째가 같다면 dp[i-1][j-1]에 +1를 한 값을 dp[i][j]에 넣어주고, 그렇지 않다면 dp[i-1][j]와 dp[i][j-1]값 중 큰값을 dp[i][j]에 넣어준다.