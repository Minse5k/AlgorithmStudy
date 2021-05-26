const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const arr = input.shift().split(" ").map((v) => parseInt(v));

function solution(arr) {
  while (true) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        console.log(arr.join(" "));
      }
    }
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== i+1) {
        check = false;
        break;
      }
    }
    if (check) {
      break;
    }
  }
}
solution(arr);