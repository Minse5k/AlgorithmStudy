const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [r, c, k] = inputs.shift().split(" ").map((v) => parseInt(v));
//초기 map 세팅
const map = new Array(r).fill(null).map((v) => new Array(c).fill(0));
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    const tmp = inputs[i][j];
    if (tmp === "O") {
      map[i][j] = 2;
    }
  }
}

const dr = [0, -1, 0, 1];
const dc = [-1, 0, 1, 0];

console.log(solution(k));
//설치- 파괴 순으로 이어짐
function solution(k) {
  //1초는 아무것도 안하기때문에 그대로 출력
  if (k === 1) {
    return incodingMap();
  }
  if (k % 2 === 0) {
    bombInstalled();
    return incodingMap();
  }
  for (let i = 2; i <= k; i++) {
    if (i % 2 === 0) {
      bombInstalled();
    } else {
      explosion();
    }
  }

  return incodingMap();
}
//폭탄설치
function bombInstalled() {
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (map[i][j] === 0) {
        map[i][j] = 3;
      } else {
        map[i][j]--;
      }
    }
  }
}
//폭발
function explosion() {
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      //1이되면 폭발 할것..!
      if (map[i][j] === 1) {
        //4방향
        for (let k = 0; k < 4; k++) {
          const nr = i + dr[k];
          const nc = j + dc[k];
          if (0 <= nr && nr < r && 0 <= nc && nc < c) {
            //곧 터질 폭탄을 제외한 폭탄이 있다면
            if (map[nr][nc] > 1) {
              map[nr][nc] = 0;
            }
          }
        }
        map[i][j] = 0;
      } else if (map[i][j] > 1) {
        map[i][j]--;
      }
    }
  }
}
//출력함수
function incodingMap() {
  const result = [];
  for (let i = 0; i < r; i++) {
    const tmp = [];
    for (let j = 0; j < c; j++) {
      if (map[i][j] > 0) {
        tmp.push("O");
      } else {
        tmp.push(".");
      }
    }
    result.push(tmp.join("") + "\n");
  }
  return result.join("");
}
