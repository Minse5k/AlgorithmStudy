const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

//상좌하우 / TLBR
const dx = [1, 0, -1, 0];
const dy = [0, -1, 0, 1];

console.log(sol(input));

function sol(input) {
  let [king, stone, n] = input.shift().split(" ");

  let [ky, kx] = king.split("").map((v) => {
    const tmp = v.charCodeAt(0);
    if (65 <= tmp && tmp <= 72) {
      return tmp - 65;
    }
    return parseInt(v) - 1;
  });

  let [sy, sx] = stone.split("").map((v) => {
    const tmp = v.charCodeAt(0);
    if (65 <= tmp && tmp <= 72) {
      return tmp - 65;
    }
    return parseInt(v) - 1;
  });

  for (let i = 0; i < parseInt(n); i++) {
    let nx = 0;
    let ny = 0;
    for (let j = 0; j < input[i].length; j++) {
      [nx, ny] = next(input[i][j], nx, ny);
    }
    //이동 확인
    const [nkx, nky] = [kx + nx, ky + ny];
    if (0 <= nkx && nkx < 8 && 0 <= nky && nky < 8) {
      //왕이 체스판 안에 있을 때
      if (nkx === sx && nky === sy) {
        //왕이 이동했을 때 돌맹이가 있을 경우
        const [nsx, nsy] = [sx + nx, sy + ny];
        if (0 <= nsx && nsx < 8 && 0 <= nsy && nsy < 8) {
          //돌맹이가 체스판 안에있을 때
          [sx, sy] = [nsx, nsy];
          [kx, ky] = [nkx, nky];
        }
      } else {
        //돌맹이가 없는 경우
        [kx, ky] = [nkx, nky];
      }
    }
  }
  king = String.fromCharCode(ky + 65) + (kx + 1);
  stone = String.fromCharCode(sy + 65) + (sx + 1);
  return king + "\n" + stone;
}

function next(cmd, x, y) {
  if (cmd === "T") {
    x += dx[0];
    y += dy[0];
  } else if (cmd === "L") {
    x += dx[1];
    y += dy[1];
  } else if (cmd === "B") {
    x += dx[2];
    y += dy[2];
  } else {
    x += dx[3];
    y += dy[3];
  }
  return [x, y];
}
