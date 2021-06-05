const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = inputs.shift().split(" ").map((v) => parseInt(v));
const visited = new Array(n).fill(null).map((v) => new Array(m).fill(false));
const graph = inputs.map((v) => v.split(""));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function dfs(x, y, color, start, pre) {
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    //바로 이전 방문한곳은 안됨!
    if (pre[0] === nx && pre[1] === ny) continue;
    if (0 <= nx && nx < n && 0 <= ny && ny < m) {
      //색깔이 같은곳만 탐색
      if (graph[nx][ny] === color) {
        //방문을 했다면 순환하므로 true
        if(visited[nx][ny]) return true;
        visited[nx][ny] = true;
        //true값 올려주기
        if (dfs(nx, ny, color, start, [x, y])) {
          return true;
        }
      }
    }
  }
  return false;
}

function solution(n, m) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j]) {
        visited[i][j] = true;
        //순환한다면 Yes
        if (dfs(i, j, graph[i][j], [i, j], [i, j])) {
          console.log("Yes");
          return;
        }
      }
    }
  }
  //그렇지 않다면 No 
  console.log("No");
  return;
}
solution(n,m);
