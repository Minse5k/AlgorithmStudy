const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("-");

function solution(input) {
  const plus = input[0]
    .split("+")
    .map((v) => parseInt(v))
    .reduce((pre, cur) => {
      return pre + cur;
    });
  //-가 나올때
  if (input.length > 1) {
    const minus = input
      .slice(1)
      .map((v) => v.split("+").map((i) => parseInt(i)))
      .flat()
      .reduce((pre, cur) => {
        return pre + cur;
      });
    return plus - minus;
  }
  return plus;
}
console.log(solution(input));
