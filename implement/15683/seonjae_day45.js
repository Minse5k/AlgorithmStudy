const fs = require("fs");
const [NM, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = NM.split(" ").map((value) => parseInt(value));
const rest = [];
let min = N * M;
const rooms = inputs.reduce((room, cur, i) => {
  const line = cur.split(" ").map((value, j) => {
    const res = parseInt(value);
    if (0 < res && res < 6) rest.push([i, j, res]);
    return res;
  });
  room.push(line);
  return room;
}, []);

//상우하좌
const dR = [-1, 0, 1, 0];
const dC = [0, 1, 0, -1];

function check(nextR, nextC, index) {
  while (true) {
    if (nextR < 0 || nextR >= N || nextC < 0 || nextC >= M) break;
    if (rooms[nextR][nextC] === 6) break;

    if (rooms[nextR][nextC] === 0) rooms[nextR][nextC] = 7;
    else if (rooms[nextR][nextC] > 6) rooms[nextR][nextC]++;

    nextR += dR[index];
    nextC += dC[index];
  }
  return [nextR, nextC];
}

function unCheck(nowR, nowC, nextR, nextC, index) {
  while (true) {
    if (nextR === nowR && nextC === nowC) break;

    nextR -= dR[index];
    nextC -= dC[index];

    if (rooms[nextR][nextC] === 7) rooms[nextR][nextC] = 0;
    else if (rooms[nextR][nextC] > 7) rooms[nextR][nextC]--;
  }
}

function dfs(rest) {
  if (rest.length === 0) {
    let count = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (rooms[i][j] === 0) count++;
      }
    }

    min = Math.min(count, min);
    return;
  }

  const [nowR, nowC, nextDir] = rest.shift();

  switch (nextDir) {
    case 1: {
      for (let i = 0; i < 4; i++) {
        let nextR = nowR + dR[i];
        let nextC = nowC + dC[i];

        if (0 <= nextR && nextR < N && 0 <= nextC && nextC < M) {
          [nextR, nextC] = check(nextR, nextC, i);
          dfs([...rest]);
          unCheck(nowR, nowC, nextR, nextC, i);
        }
      }

      break;
    }
    case 2: {
      for (let i = 0; i < 2; i++) {
        //up or left
        let upR = nowR + dR[i];
        let upC = nowC + dC[i];
        if (0 <= upR && upR < N && 0 <= upC && upC < M) {
          [upR, upC] = check(upR, upC, i);
        }

        //down or right
        let downR = nowR + dR[i + 2];
        let downC = nowC + dC[i + 2];
        if (0 <= downR && downR < N && 0 <= downC && downC < M) {
          [downR, downC] = check(downR, downC, i + 2);
        }

        dfs([...rest]);

        unCheck(nowR, nowC, upR, upC, i);
        unCheck(nowR, nowC, downR, downC, i + 2);
      }
      break;
    }
    case 3: {
      for (let i = 0; i < 4; i++) {
        //left
        let leftR = nowR + dR[i];
        let leftC = nowC + dC[i];

        if (0 <= leftR && leftR < N && 0 <= leftC && leftC < M) {
          [leftR, leftC] = check(leftR, leftC, i);
        }

        //right
        const tmp = i + 1 > 3 ? 0 : i + 1;
        let rightR = nowR + dR[tmp];
        let rightC = nowC + dC[tmp];
        if (0 <= rightR && rightR < N && 0 <= rightC && rightC < M) {
          [rightR, rightC] = check(rightR, rightC, tmp);
        }

        dfs([...rest]);

        unCheck(nowR, nowC, leftR, leftC, i);
        unCheck(nowR, nowC, rightR, rightC, tmp);
      }
      break;
    }
    case 4: {
      for (let i = 0; i < 4; i++) {
        let upR = nowR + dR[i];
        let upC = nowC + dC[i];
        if (0 <= upR && upR < N && 0 <= upC && upC < M) {
          [upR, upC] = check(upR, upC, i);
        }

        const tmpM = i + 1 > 3 ? 0 : i + 1;
        let midR = nowR + dR[tmpM];
        let midC = nowC + dC[tmpM];
        if (0 <= midR && midR < N && 0 <= midC && midC < M) {
          [midR, midC] = check(midR, midC, tmpM);
        }

        const tmpD = i + 2 > 3 ? i + 2 - 4 : i + 2;
        let downR = nowR + dR[tmpD];
        let downC = nowC + dC[tmpD];
        if (0 <= downR && downR < N && 0 <= downC && downC < M) {
          [downR, downC] = check(downR, downC, tmpD);
        }

        dfs([...rest]);

        unCheck(nowR, nowC, upR, upC, i);
        unCheck(nowR, nowC, midR, midC, tmpM);
        unCheck(nowR, nowC, downR, downC, tmpD);
      }
      break;
    }
    default: {
      let upR = nowR + dR[0];
      let upC = nowC + dC[0];
      if (0 <= upR && upR < N && 0 <= upC && upC < M) {
        [upR, upC] = check(upR, upC, 0);
      }

      let rightR = nowR + dR[1];
      let rightC = nowC + dC[1];
      if (0 <= rightR && rightR < N && 0 <= rightC && rightC < M) {
        [rightR, rightC] = check(rightR, rightC, 1);
      }

      let downR = nowR + dR[2];
      let downC = nowC + dC[2];
      if (0 <= downR && downR < N && 0 <= downC && downC < M) {
        [downR, downC] = check(downR, downC, 2);
      }

      let leftR = nowR + dR[3];
      let leftC = nowC + dC[3];
      if (0 <= leftR && leftR < N && 0 <= leftC && leftC < M) {
        [leftR, leftC] = check(leftR, leftC, 3);
      }

      dfs([...rest]);

      unCheck(nowR, nowC, upR, upC, 0);
      unCheck(nowR, nowC, rightR, rightC, 1);
      unCheck(nowR, nowC, downR, downC, 2);
      unCheck(nowR, nowC, leftR, leftC, 3);
    }
  }
}

dfs([...rest]);

console.log(min);
