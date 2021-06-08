# 9177 단어섞기
<https://www.acmicpc.net/problem/9177>
### 나의 풀이

```javascript
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const t = parseInt(inputs.shift());

for (let i = 1; i <= t; i++) {
  const [a, b, ab] = inputs[i - 1].split(" ");
  console.log(`Data set ${i}: `, check(a, b, ab));
}
//yes or no를 리턴함
function check(a, b, ab) {
  const textOne = a.split("");
  const textTwo = b.split("");
  const mixedText = ab.split("");
  let textOnePoint = 0;
  let textTwoPoint = 0;
  //매번 text와 비교해서 현재위치에서는 올림
  for (let i = 0; i < mixedText.length; i++) {
    const tmp = mixedText[i];
    //현재 위치에서 마지막 위치까지 거리가 짧은거 부터 확인함
    if (textOne.length - textOnePoint >= textTwo.length - textTwoPoint) {
      if (textOne.length > textOnePoint && tmp === textOne[textOnePoint]) {
        textOnePoint++;
      } else if (
        textTwo.length > textTwoPoint &&
        tmp === textTwo[textTwoPoint]
      ) {
        textTwoPoint++;
      } else {
        return "no";
      }
    } else {
      if (textTwo.length > textTwoPoint && tmp === textTwo[textTwoPoint]) {
        textTwoPoint++;
      } else if (
        textOne.length > textOnePoint &&
        tmp === textOne[textOnePoint]
      ) {
        textOnePoint++;
      } else {
        return "no";
      }
    }
  }
  return "yes";
}
```

1. check함수는 첫번째, 두번째, 세번째 단어를 파라미터로 받아 `yes` or `no`를 리턴하는 함수이다.
2. 세번째 단어를 차례대로 확인을 한다.
3. 우선순위는 각자 현재 위치에서 남은 거리까지가 짧은순서
4. 우선순위를 통해 `n(첫번째-두번째, 두번째-첫번째)`번째 단어부터 확인
5. 같으면 다음위치로 이동 아니면 `no`를 리턴

### 고친나의풀이

```javascript
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const t = parseInt(inputs.shift());

for (let i = 1; i <= t; i++) {
  const [a, b, ab] = inputs[i - 1].split(" ");
  console.log(`Data set ${i}:`, check(a, b, ab));
}

function check(textOne, textTwo, mixedText) {
  const dp = new Array(textOne.length + 1).fill(null).map((v) => new Array(textTwo.length + 1).fill(false));
  dp[0][0] = true;
  for (let i = 1; i <= textOne.length; i++)
    dp[i][0] = textOne[i - 1] === mixedText[i - 1] ? dp[i - 1][0] : false;

  for (let i = 1; i <= textTwo.length; i++)
    dp[0][i] = textTwo[i - 1] === mixedText[i - 1] ? dp[0][i - 1] : false;

  for (let i = 1; i <= textOne.length; i++) {
    for (let j = 1; j <= textTwo.length; j++) {
      const r = textOne[i - 1];
      const c = textTwo[j - 1];
      const m = mixedText[i + j - 1];
      if (r !== m && c !== m) dp[i][j] = false;
      else if (r === m && c !== m) dp[i][j] = dp[i - 1][j];
      else if (r !== m && c === m) dp[i][j] = dp[i][j - 1];
      else dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
    }
  }

  if (dp[textOne.length][textTwo.length]) return "yes";
  return "no";
}
```

> **참고**  
> https://velog.io/@embeddedjune/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%B0%B1%EC%A4%80-DP-9177-%EB%8B%A8%EC%96%B4-%EC%84%9E%EA%B8%B0  
> 