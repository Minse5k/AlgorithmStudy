const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input.shift());
const w = input.map((v) => v.split(" ").map((v) => parseInt(v)));
const arr = new Array(n).fill(null).map((v, i) => i);

let min = 0;
function permutation(n, arr, checked) {
  if (n === 0) {
    if (w[checked[checked.length - 1]][checked[0]] === 0) return; //돌아오는거 체크
    const tmp = calc(checked);
    if (min === 0) {
      min = tmp;
      return;
    } else {
      min = min < tmp ? min : tmp;
    }
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const rest = arr.filter((v) => arr[i] !== v);
    if (checked.length === 0) {
      checked.push(arr[i]);
    } else {
      const start = checked[checked.length - 1];
      if (w[start][arr[i]] === 0) continue;
      checked.push(arr[i]);
    }
    permutation(n - 1, rest, checked);
    checked.pop();
  }
}

function calc(arr) {
  const result = arr.reduce((pre, cur, i) => {
    return pre + w[arr[i - 1]][arr[i]];
  });

  return result + w[arr[arr.length - 1]][arr[0]]; //돌아오는거 주의!!
}

permutation(n, arr, []);
console.log(min);
