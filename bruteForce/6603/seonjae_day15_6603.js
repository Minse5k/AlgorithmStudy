const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(input) {
  for (let i = 0; i < input.length - 1; i++) {
    const [k, ...arr] = input[i].split(" ").map((v) => parseInt(v));
    //출력할때 띄어쓰기 개행문자 입력 주의!!
    const combination = getCombination(6, arr).map((v) => v.join(" ")).join("\n");
    console.log(combination+'\n');
  }
}
//조합
function getCombination(k, arr) {
  const result = [];
  if (k === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombination(k - 1, rest);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    result.push(...attached);
  });
  return result;
}

solution(input);
