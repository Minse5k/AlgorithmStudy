const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = input.shift().split(" ").map((v) => parseInt(v));
//방문 기록 배열
const visited = new Array(101).fill(false);
//사다리, 뱀 배열 만들기
const move = new Array(101).fill(0);
for (let i = 0; i < n + m; i++) {
  const [start, end] = input[i].split(" ").map((v) => parseInt(v));
  move[start] = end;
}
//bfs
function solution() {
  const queue = [1];
  let count = 0;
  while (true) {
    count++;
    let len = queue.length;
    while (len-- > 0) {
      const now = queue.shift();
      for (let i = 1; i < 7; i++) {
        const next = move[now + i] === 0 ? now + i : move[now + i];
        if (next === 100) return count;
        if (!visited[next]) {
          queue.push(next);
          visited[next] = true;
        }
      }
    }
  }
}
console.log(solution());
