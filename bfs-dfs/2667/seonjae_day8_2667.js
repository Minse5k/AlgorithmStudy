const fs = require("fs");
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input.shift());

const visited = input.map((v) =>
  v.split("").map((i) => (i === "1" ? false : true))
);

let count = 0;
const result = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j]) {
      const dcount = dfs(i, j, 0);
      result.push(dcount);
      count++;
    }
  }
}

console.log(count);
console.log(result.sort((a, b) => a - b).join('\n'));

function dfs(x, y, count) {
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  if (visited[x][y]) return;
  visited[x][y] = true;
  count++;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
      if (!visited[nx][ny]) {
        count = dfs(nx, ny, count);
      }
    }
  }
  return count;
}