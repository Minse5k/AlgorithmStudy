const fs = require("fs");
// const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const inputs = fs.readFileSync("input").toString().trim().split("\r\n");
const [r, c, k] = inputs
  .shift()
  .split(" ")
  .map((v) => parseInt(v));
const map = new Array(r).fill(null).map((v) => new Array(c).fill(0));
//초기 map 세팅
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    const tmp = inputs[i][j];
    if (tmp === "O") {
      map[i][j] = 2;
    }
  }
}
//시간가는 함수
const dr = [0, -1, 0, 1];
const dc = [-1, 0, 1, 0];

for (let i = 0; i <= k; i++) {
  console.log(i, "번================");
  console.log(solution(i));
}

//설치- 파괴 순으로 이어짐
function solution(k) {
  //미리 1초 count
  if (k === 0 || k===1) {
    return incodingMap();
  }
  if (k % 2 === 0) {
    bombInstalled();
    return incodingMap();
  }
  while (k-- > 1) {
    if (k % 2 === 0) {
      //설치
      bombInstalled();
    } else {
      //폭발
      explosion();
    }
  }
  return incodingMap();
}

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

function explosion() {
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      //1이되면 폭발 할것..!
      if (map[i][j] === 1) {
        for (let k = 0; k < 4; k++) {
          const nr = i + dr[k];
          const nc = j + dc[k];
          if (0 <= nr && nr < r && 0 <= nc && nc < c) {
            if (map[nr][nc] > 1) {
              map[nr][nc] = 0;
            }
          }
        }
        map[i][j] = 0;
      } else {
        map[i][j]--;
      }
    }
  }
}

// function incodingMap() {
//   const result = [];
//   for (let i = 0; i < r; i++) {
//     const tmp = [];
//     for (let j = 0; j < c; j++) {
//       if (map[i][j] > 0) {
//         tmp.push("O");
//       } else {
//         tmp.push(".");
//       }
//     }
//     result.push(tmp.join("") + "\n");
//   }
//   return result.join("");
// }
function incodingMap() {
  const result = [];
  for (let i = 0; i < r; i++) {
    const tmp = [];
    for (let j = 0; j < c; j++) {
      tmp.push(map[i][j]);
    }
    result.push(tmp.join("") + "\n");
  }
  return result.join("");
}
