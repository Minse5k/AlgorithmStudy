const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const str1 = inputs[0].split("");
const str2 = inputs[1].split("");
const len1 = str1.length;
const len2 = str2.length;
function longestCommonSubsequence() {
  const LCS = new Array(len1 + 1).fill(null).map((v) => new Array(len2 + 1).fill(0));
  //길이 구하기
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        LCS[i][j] = LCS[i - 1][j - 1] + 1;
      } else {
        LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
      }
    }
  }
  //마지막 부터 탐색
  let [r, c] = [len1, len2];
  const length = LCS[len1][len2];
  let answer = "";
  while (true) {
    if (LCS[r][c] === 0) break;
    //길이가 같으면 이동
    if (LCS[r][c] === LCS[r - 1][c]) {
      r--;
    } else if (LCS[r][c] === LCS[r][c - 1]) {
      c--;
    } else {
      //둘다 같지 않을 때 대각선이동
      //글자 추가
      answer = str1[r - 1] + answer;
      r--;
      c--;
    }
  }

  if (length > 0) {
    return length + "\n" + answer;
  }
  return length;
}
console.log(longestCommonSubsequence());
