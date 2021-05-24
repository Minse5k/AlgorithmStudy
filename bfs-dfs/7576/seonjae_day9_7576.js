const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
//x,y 거꾸로 받기
const [col, row] = input.shift().split(" ").map((v) => parseInt(v));
//방향설정
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

function solution(row, col, input) {
  const queue = [];
  //초기 익은 토마토 설정
  const visited = input.map((row, i) =>
    row.split(" ").map((col, j) => {
      if (col === "0") {
        return false;
      } else if (col === "-1") {
        return true;
      } else {
        //익은 토마토는 탐색 대상이므로 queue에 삽입
        queue.push([i, j]);
        return true;
      }
    })
  );

  let count = -1;
  let point = 0;
  //bfs탐색

  while (queue.length > point) {
    const end = queue.length;
    count++;
    while (end > point) {
      //shift를 사용하면 시간초과
      const [x, y] = queue[point];
      point++;
      for (let i = 0; i < 4; i++) {
        const nextX = x + dx[i];
        const nextY = y + dy[i];
        if (nextX >= 0 && nextX < row && nextY >= 0 && nextY < col) {
          if (!visited[nextX][nextY]) {
            queue.push([nextX, nextY]);
            visited[nextX][nextY] = true;
          }
        }
      }
    }
  }
  for (let i = 0; i < row; i++) {
    if (visited[i].filter((v) => v === false).length > 0) return -1;
  }

  return count;
}

console.log(solution(row, col, input));
