const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
inputs.shift();

function solution(inputs) {
  inputs.forEach((input) => {
    const [x, y] = input.split(" ").map((v) => parseInt(v));
    const tmp = y - x;
    const move = [0];
    let count = 0;
    while (count++ >= 0) {
      const firstAdd = move[move.length - 1] + count;
      move.push(firstAdd);
      if (firstAdd >= tmp) {
        console.log(move.length - 1);
        break;
      }

      const secondAdd = move[move.length - 1] + count;
      move.push(secondAdd);
      if (secondAdd >= tmp) {
        console.log(move.length - 1);
        break;
      }
    }
  });
}

solution(inputs);
