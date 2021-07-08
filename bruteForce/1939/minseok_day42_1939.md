---
## title : "백준 1939 중량제한(javascript)"
---

# Problem 1939

# [중량제한](https://www.acmicpc.net/problem/1939)

## 너비 우선 탐색, 이분 탐색

### 문제

N(2≤N≤10,000)개의 섬으로 이루어진 나라가 있다. 이들 중 몇 개의 섬 사이에는 다리가 설치되어 있어서 차들이 다닐 수 있다.

영식 중공업에서는 두 개의 섬에 공장을 세워 두고 물품을 생산하는 일을 하고 있다. 물품을 생산하다 보면 공장에서 다른 공장으로 생산 중이던 물품을 수송해야 할 일이 생기곤 한다. 그런데 각각의 다리마다 중량제한이 있기 때문에 무턱대고 물품을 옮길 순 없다. 만약 중량제한을 초과하는 양의 물품이 다리를 지나게 되면 다리가 무너지게 된다.

한 번의 이동에서 옮길 수 있는 물품들의 중량의 최댓값을 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 N, M(1≤M≤100,000)이 주어진다. 다음 M개의 줄에는 다리에 대한 정보를 나타내는 세 정수 A, B(1≤A, B≤N), C(1≤C≤1,000,000,000)가 주어진다. 이는 A번 섬과 B번 섬 사이에 중량제한이 C인 다리가 존재한다는 의미이다. 서로 같은 두 도시 사이에 여러 개의 다리가 있을 수도 있으며, 모든 다리는 양방향이다. 마지막 줄에는 공장이 위치해 있는 섬의 번호를 나타내는 서로 다른 두 정수가 주어진다. 공장이 있는 두 섬을 연결하는 경로는 항상 존재하는 데이터만 입력으로 주어진다.

### 출력

첫째 줄에 답을 출력한다.

### 예제 입력 1

```
3 3
1 2 2
3 1 3
2 3 2
1 3
```

### 예제 출력 1

```
3
```

---

### solve
- javascript에는 리스트가 없어 graph라는 배열을 통해 리스트 형식으로 만들어주었다.
- graph는 각 인덱스가 연결돼있는 [연결돼있는 다리, 비용]을 갖는다.
- graph를 생성하면서 현재 비용중 가장 큰 비용을 찾아준다. `Math.max()`이용하였다.
- 최대 1억개를 1초안에 찾아야하므로 이분탐색을 이용하였다.
- 0원 ~ 최대값의 절반으로 `start to end`가 가능하면 `mid + 1 ~ 최댓값`, 불가능하면 `0 ~ mid -1`


<span style="color:blue">**-3**</span> 1 2 <span style="color:red">**10**</span> > sum : 7, 값을 줄여야 0에 가까워지므로 오른쪽 포인터를 왼쪽으로 옮긴다.

<span style="color:blue">**-3**</span> 1 <span style="color:red">**2**</span> 10 > sum : -1, 값을 키워야 0에 가까워지므로 왼쪽 포인트로를 오른쪽으로 옮긴다.

- 3 <span style="color:blue">**1**</span> <span style="color:red">**2**</span> 10 > sum : 3, 값을 줄여야 0에 가까워지므로 오른쪽 포인터를 왼쪽으로 옮긴다.

두 포인터가 같은 값을 가리키므로 반복문 종료

- 최소값은 sum의 절댓값이 가장 작은값이 된다.

### code

```javascript
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
//bfs를 이용하여 start부터 end까지 이동 가능한지 판단한다.
function bfs(cost, graph, start, end) {
    const queue = [start];
    const visited = new Array(n + 1).fill(false);
    visited[start] = true;
    
    while(queue.length > 0) {
        const now = queue.shift();
        
        for(let i = 0; i < graph[now].length; i++) {
            const [next, nowCost] = graph[now][i];
            //방문한적이 없거나 비용보다 비쌀때만 이용 가능(우린 최댓값을 찾아야하므로 비싼경우만 찾는다)
            if(!visited[next] && nowCost >= cost) {
                visited[next] = true;
                queue.push(next);
            }
        }
    }

    return visited[end];
}

let count = -1;
const input = [];
let n = 0, m = 0;

rl.on('line', function(line) {
    if(count === -1) {
        [n, m] = line.split(' ').map((v) => parseInt(v));
        count = m + 1;
        return;
    }
    input.push(line.split(' ').map((v) => parseInt(v)));
    count--;

    if(count === 0) rl.close();
}).on('close', function() {
    const graph = Array.from(Array(n + 1), () => new Array());
    let max = 0;
    //그래프 배열을 리스트식으로 입력받는다.
    for(let i = 0; i < m; i++) {
        const [a, b, c] = input[i];
        graph[a].push([b, c]);
        graph[b].push([a, c]);
        max = Math.max(max, c);//최댓값 찾기
    }
    const [start, end] = input[m];
    let min = 0;
    let result = 0;

    while(min <= max) {
        const mid = parseInt((max + min) / 2);
        //start to end가 가능하면
        if(bfs(mid, graph, start, end)) {
            result = mid;
            min = mid + 1;//더 비싼 값으로 갈 수 있으므로 min을 바꿔준다.
        } else {//불가능하면
            max = mid - 1;//더 싼 값으로 가야하므로 max를 바꿔준다.
        }
    }
    console.log(result);
});
```
