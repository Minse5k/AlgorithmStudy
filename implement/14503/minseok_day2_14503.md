```javascript
const fs = require("fs");
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N, M] = input.shift().split(" ").map((i) => parseInt(i)); //Map 길이
const [r, c, d] = input.shift().split(" ").map((i) => parseInt(i)); //현재좌표, 방향
const Map = input.map((i) => i.split(" ")); //Map그리기
const visited = input.map((i) =>i.split(" ").map((j) => (j === "0" ? true : false))); //청소기록

//북동남서 방향
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];
let count = 0;

function solution(r, c, d) {

  while (true) {
    if (Map[r][c] === "0" ) {
      if(visited[r][c]){    //현재 위치 청소
        count++;
        visited[r][c] = false;
      }
    } else{ //뒤로갔을때 벽이면 종료
      break;
    }
    
    const check = checked(r, c, d);
    if (check) { //회전
      r = check[0];
      c = check[1];
      d = check[2];
    } else { //뒤로가기
      r = r - dr[d];
      c = c - dc[d];
    }
  }
}
function checked(r, c, d) {
  for (let i = 0; i < 4; i++) { //북서남동 회전
    d = d - 1 < 0 ? 3 : d - 1;
    const nr = r + dr[d];
    const nc = c + dc[d];
    if (Map[nr][nc] === "0" && visited[nr][nc]) { //방문가능하다면 리턴
      return [nr, nc, d];
    }
  }
  return false;   //회전했는데 방문X면 false리턴
}
solution(r, c, d);
console.log(count);
```