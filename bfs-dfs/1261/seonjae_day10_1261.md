# 1261 알고스팟

### 문제 링크
<https://www.acmicpc.net/problem/1261>

### 나의접근
1. map(0과 1로 이루어진 배열), visited(방문한 기록) 배열 선언 / n,m을 선언시 교차하도록 하기!
2. bfs로 접근 첫 노드를 탐색하면 다음 노드는 상,하,좌,우 방향 노드 탐색
3. 탐색시 좌표가 가르키는 곳이 벽(1일 때)이면 visited에 count를 해주고 아니면(0일 때) 그전 visited값가져오기
4. 탐색을 계속하고 좌표가(n,m)이면 리턴  
  
### 다른 풀이
0-1 bfs라는 풀이를 통해 풀었다.
가중치 값에 따라 가중치가 0이면 탐색해야될 queue의 앞에 넣어주고, 1이면 bfs처럼 queue뒤에 삽입하는것을 원칙으로 한다.  

### 고친 나의 풀이 
```javascript
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');
//n,m 교차해서 받아야됨
const [m, n] = input.shift().split(" ").map((v) => parseInt(v));
const map = input.map((v) => v.split(""));  //마지막 인덱스가 visited보다 1작은것 주의
const visited = new Array(n + 1).fill(null).map((v) => new Array(m + 1).fill(false));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function solution(n, m) { //1,1 -> n,m까지 가는데 벽을 최소 몇개 부셔야되는지 return
  visited[1][1] = 0;
  let queue = [[1, 1]];   //1,1 시작
  let point = 0;

  while(queue.length > 0 ){
    let end = queue.length;
    while(end-- > 0){
      const [x, y] = queue.shift();
      for(let i=0; i<4; i++){ //4방향으로 가기
        const nx = x + dx[i];
        const ny = y + dy[i];
        if(nx>0 && nx<=n && ny>0 && ny<=m){ //좌표의 범위를 넘어가면 X
          if(visited[nx][ny] === false){  //방문을 안했다면  
            if(map[nx-1][ny-1] === '1'){  //벽일때
              visited[nx][ny] = visited[x][y] +1;
              queue.push([nx,ny]);
            } else{ //빈방 일때
              visited[nx][ny] = visited[x][y]
              queue = [[nx,ny], ...queue];
            }
            if(nx === n && ny === m){
              return visited[nx][ny]
            }
          }
        }
      }
    }
  }

  return visited[n][m];
}

console.log(solution(n, m));
```

### 돌아보며..
1. 0-1 bfs를 이해해야된다. 아직이해못함..
2. bfs에서 조금만 고쳤더니 정답이 된것이 신기하다...
3. 0-1 bfs를 공부하거나 다익스트라 알고리즘을 공부해야될거같다.  
  

> **출처**  
> https://justicehui.github.io/medium-algorithm/2018/08/30/01BFS/
