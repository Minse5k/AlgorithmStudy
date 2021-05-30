const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input.shift());
const time = input.map((v) => v.split(" ").map((i) => parseInt(i)));

function solution(time) {
  time = time.sort((a, b) => {
    //종료시간이 같다면 시작시간이 빠른순으로 정렬
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    //종료시간이 빠른 순으로 정렬
    return a[1] - b[1];
  });

  let now = 0;
  let count = 0;
  time.forEach((element) => {
    if (element[0] >= now) {
      count++;
      now = element[1];
    }
  });
  return count;
}
console.log(solution(time));
