```javascript
const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("input").toString().split("\r\n");
const [n, k] = input[0].split(" ").map((v) => parseInt(v));
const belt = input[1].split(" ").map((v) => parseInt(v));
belt.unshift(0);

// 내구도가 0인게 K개이상이면 종료
function solution(n, k, belt) {
  let count = 0;
  let start = 1;
  let end = n;
  let robot = []; //로봇이 있는 인덱스를 가르킴

  while (true) {
    console.log("------------");
    count++;
    // 벨트 회전
    [start, end, robot] = withMove(start, end, n, robot);
    // 로봇 이동
    [robot, k] = moveRobot(robot, belt, end, k);
    if (k <= 0) {
      return count;
    }
    // 로봇 올리기
    [robot, belt, k] = inputRobot(robot, start, belt, k);
    if (k <= 0) {
      return count;
    }
  }
}
//벨트와 같이 이동
function withMove(start, end, n, robot) {
  const nStart = start - 1 === 0 ? 2 * n : start - 1;
  const nEnd = end - 1 === 0 ? 2 * n : end - 1;
  const tmp = robot.map((v) => (v - 1 === 0 ? 2 * n : v - 1));
  const result = outputRobot(nEnd, tmp);
  return [nStart, nEnd, result];
}
//로봇이 내릴 때
function outputRobot(end, robot) {
  const result = robot[0] === end ? robot.slice(1) : robot;
  return result;
}
// 로봇이 이동할 때
function moveRobot(robot, belt, end, k) {
  const arr = robot.map((index) => {
    const tmp = index + 1 === belt.length ? 1 : index + 1;
    if (belt[tmp] > 0) {
      //내구도 1이상
      belt[tmp]--;
      if (belt[tmp] === 0) k--;
      return tmp;
    } else {
      //내구도 0
      return index;
    }
  });
  const result = outputRobot(end, arr);
  return [result, k];
}

//로봇 올릴 때
function inputRobot(robot, start, belt, k) {
  if (belt[start] > 0) {
    //내구도 1이상
    robot.push(start);
    belt[start]--;
    if (belt[start] === 0) k--;
  }
  return [robot, belt, k];
}

console.log(solution(n, k, belt));
```
