const fs = require("fs");
const [N, ...input] = fs.readFileSync('/dev/stdin').toString().split('\n');    //백준입력

let arr = [];
let answer = '';
for (let i = 0; i < parseInt(N); i++) {
  const cmd = input[i].split(" ");
  let result;
  if (cmd.length === 1) {
    switch (cmd[0]) {
      case "pop_front": {
        result = arr.length === 0 ? -1 : arr.shift();
        break;
      }
      case "pop_back": {
        result = arr.length === 0 ? -1 : arr.pop();

        break;
      }
      case "size": {
        result = arr.length;
        break;
      }
      case "empty": {
        result = arr.length === 0 ? 1 : 0;
        break;
      }
      case "front": {
        result = arr.length === 0 ? -1 : arr[0];
        break;
      }
      case "back": {
        result = arr.length === 0 ? -1 : arr[arr.length - 1];
        break;
      }
    }
    answer += `${result}\n`;
  } else {
    //push명령어
    if (cmd[0] === "push_front") {
      arr = [parseInt(cmd[1]), ...arr];
    } else {
      arr = [...arr, parseInt(cmd[1])];
    }
  }
}
console.log(answer);