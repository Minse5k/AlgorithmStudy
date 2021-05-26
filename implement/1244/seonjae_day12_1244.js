const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// 수를 나눠줌 1 <= 수 <= 스위치 개수
// 조건: 성별과 수에 따라 다르게 반응함
// 남
// 스위치 번호 = 수 * n 이면  받은 번호의 스위치를 바꿈
// 여
// 자신이 받은 스위치를 중심으로 대칭이 맞으면 계속 찾아가고 대칭이 안맞으면 그 전 까지만 바꿔줌
input.shift();
const light = [
  0,
  ...input
    .shift()
    .split(" ")
    .map((v) => (v === "1" ? true : false)),
];
input.shift();

const students = input.map((v) => v.split(" ").map((v) => parseInt(v)));
function solution(light, students) {
  for (let i = 0; i < students.length; i++) {
    if (students[i][0] === 1) {
      //남자
      let tmp = students[i][1];
      while (light.length > tmp) {
        light[tmp] = !light[tmp];
        tmp += students[i][1];
      }
    } else {
      //여자
      let [left, right] = [students[i][1], students[i][1]];
      while (true) {
        if (left > 0 && right < light.length) {
          if (left === right) {
            //처음 수일때
            light[left] = !light[left];
          } else if (light[left] === light[right]) {
            light[left] = !light[left];
            light[right] = !light[right];
          } else {
            break;
          }
        } else {
          break;
        }
        left--;
        right++;
      }
    }
  }
  light = light.map((v) => (v ? "1" : "0"));
  light.shift();
  if (light.length > 80) {
    return (
      light.slice(0, 20).join(" ") +
      "\n" +
      light.slice(20, 40).join(" ") +
      "\n" +
      light.slice(40, 60).join(" ") +
      "\n" +
      light.slice(60, 80).join(" ") +
      "\n" +
      light.slice(80, light.length).join(" ")
    );
  } else if (light.length > 60) {
    return (
      light.slice(0, 20).join(" ") +
      "\n" +
      light.slice(20, 40).join(" ") +
      "\n" +
      light.slice(40, 60).join(" ") +
      "\n" +
      light.slice(60, light.length).join(" ")
    );
  } else if (light.length > 40) {
    return (
      light.slice(0, 20).join(" ") +
      "\n" +
      light.slice(20, 40).join(" ") +
      "\n" +
      light.slice(40, light.length).join(" ")
    );
  } else if (light.length > 20) {
    return (
      light.slice(0, 20).join(" ") +
      "\n" +
      light.slice(20, light.length).join(" ")
    );
  } else {
    return light.join(" ");
  }
}

console.log(solution(light, students));
