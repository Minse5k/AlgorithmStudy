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

문제에서 NxN 행렬을 만든다면 `최소값 1부터 최대값  $N^2$`까지 존재한다고 생각했다, 그래서 solution함수의 for문을 1부터 $N^2$까지 반복하면서 `index값을 카운팅해서 K이상일 경우 i-1`를 리턴하는 함수를 만들었다.

또한 index를 카운팅 해주는 함수인 getDivisor는 num(현재 탐색할 수)를 파라미터로 받아 `이분탐색(1→num이 아닌 1→$\sqrt{num}$을 탐색)`을 해서 카운팅을 해준다.

결과는 잘되지만 시간 초과가 나왔다. 

반례를 만들어 

> 99999
99999999

넣어봤더니 엄청 오랜 시간이 걸렸다

## 고친 후 나의 풀이

```jsx

```

>