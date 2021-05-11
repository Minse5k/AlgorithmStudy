const fs = require("fs");
const [N, M] = fs.readFileSync('/dev/stdin').toString().split(" ")
  .map((i) => parseInt(i));;

const visited = new Array(N + 1).fill(true);

function solution(visited, M, result) {
  // 종료 조건 및 결과 보여주기
  if (M === 0) {
    console.log(result.join(" "));
    return;
  }

  for (let i = 1; i < visited.length; i++) {
    if (visited[i]) {
      //방문안했다면 방문 및 결과에 넣어주기
      visited[i] = false;
      result.push(i);
      solution(visited, M - 1, result);
      //다시 풀어주기
      result.pop(i);
      visited[i] = true;
    }
  }
}

solution(visited, M, []);
