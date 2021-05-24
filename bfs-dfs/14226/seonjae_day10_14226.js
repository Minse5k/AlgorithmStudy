const fs = require("fs");
const s = parseInt(fs.readFileSync("/dev/stdin").toString().trim());
//화면과 클립보드에 있는 이모티콘 개수에 따라 방문한 기록
const visited = new Array(1001).fill(null).map((v) => new Array(1001).fill(false));
// point를 사용한 이유는 shift를 사용하면 시간초과가 됨
// shift나 unshift를 사용하면 배열의 앞부분을 동작하여 다른 요소의 index에 변화를 주기 때문에
// pop과 shift는 시간적으로 600배 차이가 있음 그래서 point를 활용해서 풀었음
function solution(s) {
  let count = 0;
  visited[1][0] = true;
  const queue = [[1, 0]];
  let point = 0;
  while (queue.length > 0) {
    count++;
    const end = queue.length;
    while (end > point) {
      const [tmpS, tmpC] = queue[point++];
      const next = [
        [tmpS + tmpC, tmpC],
        [tmpS, tmpS],
        [tmpS - 1, tmpC],
      ]; //2번, 1번, 3번 조건 순서
      for (let i = 0; i < 3; i++) {
        const nextS = next[i][0];
        const nextC = next[i][1];
        if (nextS > 0 && nextS <1001) { 
          if (!visited[nextS][nextC]) {
            queue.push([nextS, nextC]);
            visited[nextS][nextC] = true;
          }
          if (nextS === s) return count;

        }
      }
    }
  }

  return count;
}

console.log(solution(s));
