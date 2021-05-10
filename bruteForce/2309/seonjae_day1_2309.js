const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");
//난쟁이 순서대로 정리
const arr = input.map((i) => parseInt(i)).sort((a, b) => a - b);
//9명 합
const sum = arr.reduce((pre, cur) => {
  return pre + cur;
}, 0);

let result = [];
//7명 뽑기위해 이중for문
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (i === j) continue;
    if (sum - arr[i] - arr[j] === 100) {
      result = arr.filter((num) => arr[i] !== num && arr[j] !== num);
      break;
    }
  }
}
//출력
result.forEach((i) => console.log(i));
