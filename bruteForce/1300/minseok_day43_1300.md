---
title : "백준 1300 K번째 수(javascript)"
---

# Problem 1939

# [K번째 수](https://www.acmicpc.net/problem/1300)

## 이분 탐색

### 문제

세준이는 크기가 N×N인 배열 A를 만들었다. 배열에 들어있는 수 A[i][j] = i×j 이다. 이 수를 일차원 배열 B에 넣으면 B의 크기는 N×N이 된다. B를 오름차순 정렬했을 때, B[k]를 구해보자.
배열 A와 B의 인덱스는 1부터 시작한다.

### 입력

첫째 줄에 배열의 크기 N이 주어진다. N은 105보다 작거나 같은 자연수이다. 둘째 줄에 k가 주어진다. k는 min(109, N2)보다 작거나 같은 자연수이다.

### 출력

B[k]를 출력한다.

### 예제 입력 1

```
3
7
```

### 예제 출력 1

```
6
```

---

### solve
- 우리가 찾는 수는 `1`부터 최대 `N*N`까지 될 수 있다.
- 우리가 찾으려는 k번째 수를 위해 이분 탐색의 중앙 값이 k개보다 작은지 큰지 판단하였다.
- k보다 작거나 같은 수는 각 행의 인덱스로 나누어 몫의 크기와 같다.(각 행은 그 행의 첫 인덱스의 배수이기 때문)
    - ex) n = 4, k = 8 인 경우 left = 1, right = 16, mid = 8이 된다.<br/>
    <table style="border: none;">
	    <tbody>
            <tr>
                <td><span style="color:red">1 2 3 4</span></td>
                <td>1행 : mid(8) / 1 = 8</td>
            </tr>
            <tr>
                <td><span style="color:red">2 4 6 8</span></td>
                <td>2행 : mid(8) / 2 = 4</td>
            </tr>
            <tr>
                <td><span style="color:red">3 6</span> 9 12</td>
                <td>3행 : mid(8) / 3 = 2</td>
            </tr>
            <tr>
                <td><span style="color:red">4 8</span> 12 16</td>
                <td>4행 : mid(8) / 4 = 2</td>
            </tr>
        </tbody>
    </table>

    한 행에 최대 4개의 인덱스가 존재하므로 4보다 큰 경우는 4로 바꿔준다.<br/>
    이렇게 총 `12개` 즉, 8이라는 값은 `12번째`임을 알 수 있다. 우린 `8번째`의 수를 찾고 싶으므로 범위를 좁혀 2분탐색을 진행한다.
- 우리가 찾은 개수가 `k`보다 작으면 `left`를 `mid + 1`로 크면 `right`를 `mid - 1`로 바꿔준다.
### code

```javascript
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
let n = 0, k = 0;
let count = 2;
rl.on('line', function(line) {
    if(count === 2) {
        n = parseInt(line);
    } else if(count === 1) {
        k = parseInt(line);
    }
    count--;
    if(count === 0) rl.close();
}).on('close', function() {
    let left = 1; right = n * n;
    let result = 0;

    while(left <= right) {
        const mid = parseInt((left + right) / 2); //중앙값
        let cnt = 0; //mid보다 작거나 같은 개수를 세는 count 변수
        // mid보다 작은 개수 세기
        for(let i = 1; i <= n; i++) {
            cnt += Math.min(n, parseInt(mid / i));
        }
        // 개수가 k보다 크거나 같을때
        if(cnt >= k) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;            
        }
    }
    console.log(result);
    process.exit();
});
```
