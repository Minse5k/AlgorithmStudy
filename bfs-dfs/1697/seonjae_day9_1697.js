const fs = require("fs");
const [n, k] = fs.readFileSync("/dev/stdin").toString().split(" ").map((v) => parseInt(v));
const map = new Array(100001).fill(false);

function bfs(n, k) {
  const queue = [n];
  let count = 0;
  if (n === k) {
    return count;
  } else {
    while (true) {
      count++;
      let len = queue.length;
      while (len-- > 0) {
        const now = queue.shift();
        const nextN = [now + 1, now - 1, now * 2];
        for (let i = 0; i < 3; i++) {
          if (nextN[i] === k) return count;
          if (nextN[i] >= 0 && nextN[i] <= 100000) {
            if (!map[nextN[i]]) {
              queue.push(nextN[i]);
              map[nextN[i]] = true;
            }
          }
        }
      }
    }
  }
}

console.log(bfs(n, k));
