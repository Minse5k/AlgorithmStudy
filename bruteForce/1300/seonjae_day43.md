# 1300 K번째 수

## 문제

[1300번: K번째 수](https://www.acmicpc.net/problem/1300)

## 나의 풀이

```jsx
const fs = require("fs");
const [N, K] = fs.readFileSync("/dev/stdin").toString().trim().split("\n").map((value) => parseInt(value));

let index = 0;
if (N === 1) return 1;

function getDivisor(num) {
  let count = 0;
  if (num === 1) return 1;
  const numLength = Math.floor(Math.sqrt(num));
  if (num <= N) {
    for (let i = numLength; i > 0; i--) {
      if (num % i !== 0) continue;

      const tmp = num / i;
      if (tmp === i) count++;
      else count += 2;
    }
    return count;
  }

  for (let i = numLength; i > 0; i--) {
    if (num % i !== 0) continue;
    const tmp = num / i;
    if (tmp > N) break;
    if (tmp === i) count++;
    else count += 2;
  }

  return count;
}

const solution = () => {
  for (let i = 1; i <= N * N; i++) {
    if (index >= K) return i - 1;
    const count = getDivisor(i);
    index += count;
  }

  return N * N;
};

console.log(solution());
```

## 설명

문제에서 NxN 행렬을 만든다면 `최소값 1부터 최대값$N^2$`까지 존재한다고 생각했다, 그래서 solution함수의 for문을 1부터 $N^2$까지 반복하면서 `index값을 약수의 개수를 카운팅해서 K이상일 경우 i-1`를 리턴하는 함수를 만들었다.

또한 index를 카운팅 해주는 함수인 getDivisor는 num(현재 탐색할 수)를 파라미터로 받아 `이분탐색(1→num이 아닌 1→$\sqrt{num}$을 탐색)`을 해서 카운팅을 해준다.

결과는 잘되지만 시간 초과가 나왔다. 

반례를 만들어 

> 99999
99999999

넣어봤더니 엄청 오랜 시간이 걸렸다

## 고친 후 나의 풀이

```jsx
const fs = require("fs");
const [N, K] = fs.readFileSync("/dev/stdin").toString().trim().split("\n").map((value) => parseInt(value));

let left = 0;
let right = K;

while (left <= right) {
  let mid = parseInt((left + right) / 2);
  let tmp = 0;
  for (let i = 1; i <= N; i++) {
    tmp += Math.min(parseInt(mid / i), N);
  }

  if (tmp >= K) {
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(left);
```

나는 이 문제를 접했을 때 이분 탐색이라 생각해서 K가 N보다 작거나 같으면 1 → N까지 탐색하거나, N보다 크면  $N^2$->N까지 탐색하는 것이라고 생각했다. 하지만 이거는 애초에 잘못된 생각이었다. 이 문제에서 원하는 것은 아래와 같이 두가지 조건을 원한다.

1. B의 K번째 수에는 K보다 같거나 작은 값이 들어온다.
2. B의 m(임의의 인덱스번호)까지 오려는 개수는 1 → N 까지 `m / i번째 행의 값 or N` 중 최소값을 더한 값 이 만약에 K보다 크면 오른쪽을 m에서 -1로 그렇지 않으면 왼쪽을 m에서 +1만큼 옮긴다.

## 스터디 후

 내가 헷갈리고 몰랐던 부분은 2번째 조건이었다. 설명을 들으면서 보니 1번의 조건을 적절히 활용하며 행렬의 규칙을 보면서 풀어보면 해결되는 조건이었다. 

 내가 여기서 놓친 접근 방법은 1부터  $N^2$까지  K번째를 찾을 때 이분 탐색, M(임의의 수)가 몇 번째 오는지 알기 위해 각 M에 따른 count해주는 로직과 이분 탐색을 하는 것이었다. 

 문제의 지문의 길이와 생각은 쉽다고 생각했지만 이분 탐색 적으로 접근하는 방식이 너무 어려웠던 문제 같았다. 이러한 문제를 많이 접해보면 익숙해지겠지 생각한 경험이었다.
 
> [https://woongsios.tistory.com/216](https://woongsios.tistory.com/216)