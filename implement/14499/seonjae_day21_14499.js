const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [n, m, x, y, k] = inputs
  .shift()
  .split(" ")
  .map((v) => parseInt(v));
const diceUD = new Array(4).fill(0);
const diceLR = new Array(2).fill(0);

const map = [];

function createMap(inputs) {
  for (let i = 0; i < n; i++) {
    const add = inputs[i].split(" ").map((v) => parseInt(v));
    map.push(add);
  }
}

function changeNumber(bottom) {
  if (map[x][y] === 0) {
    map[x][y] = diceUD[bottom];
  } else {
    diceUD[bottom] = map[x][y];
    map[x][y] = 0;
  }
}

function tumble(cmd, top, bottom) {
  //좌우 방향은 direction바뀌지 않음
  //상하 방향은 direction이 바뀜
  switch (cmd) {
    case "1": {
      //동쪽
      const ny = y + 1;
      if (ny < m) {
        // 상=>우
        const tmpTop = diceUD[top];
        diceUD[top] = diceLR[1];
        // 우 =>하
        diceLR[1] = diceUD[bottom];
        /// 하=>좌
        diceUD[bottom] = diceLR[0];
        // 좌=>상
        diceLR[0] = tmpTop;

        y = ny;
        changeNumber(bottom);
        console.log(diceUD[top]);
      }
      return [top, bottom];
    }
    case "2": {
      //서쪽 왼쪽 => 아래 / 오른쪽 => 위로
      const ny = y - 1;
      if (0 <= ny) {
        // 상=>좌
        const tmpLeft = diceLR[0];
        diceLR[0] = diceUD[bottom];
        // 우 =>상
        diceUD[bottom] = diceLR[1];
        /// 하=>우
        diceLR[1] = diceUD[top];
        // 좌=>하
        diceUD[top] = tmpLeft;

        y = ny;
        changeNumber(bottom);
        console.log(diceUD[top]);
      }
      return [top, bottom];
    }
    case "3": {
      //위로
      const nx = x - 1;
      if (0 <= nx) {
        top = top < 3 ? top + 1 : 0;
        bottom = bottom < 3 ? bottom + 1 : 0;
        x = nx;
        changeNumber(bottom);
        console.log(diceUD[top]);
      }
      return [top, bottom];
    }
    case "4": {
      const nx = x + 1;
      if (nx < n) {
        top = top > 0 ? top - 1 : 3;
        bottom = bottom > 0 ? bottom - 1 : 3;
        x = nx;
        changeNumber(bottom);
        console.log(diceUD[top]);
      }
      return [top, bottom];
    }
  }
}

function solution(k) {
  createMap(inputs);
  const cmd = inputs[n].split(" ");
  //위 아래
  const direction = [0, 2];
  for (let i = 0; i < k; i++) {
    const [top, bottom] = tumble(cmd[i], direction[0], direction[1]);
    direction[0] = top;
    direction[1] = bottom;
  }
}

solution(k);
