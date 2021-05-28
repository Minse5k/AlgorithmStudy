# 10972 차이를 최대로

### 나의풀이

```javascript
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input[0]);
const arr = input[1]
  .split(" ")
  .map((v) => parseInt(v))
  .sort((a, b) => a - b);

function solution(arr) {
  const len = arr.length;
  const mid = Math.floor(len / 2);
  if (len % 2 === 0) {
    //작은거 짝수 큰거 짝수
    const tmp = arr.slice(0, mid);
    const right = arr.slice(mid, len).sort((a, b) => b - a);
    const left = [];
    if (tmp.length === 2) {
      left.push(tmp[1]);
      left.push(tmp[0]);
    } else {
      for (let i = 0; i < tmp.length; i += 2) {
        left.unshift(tmp[i]);
        if (i + 1 >= tmp.length) break;
        left.push(tmp[i + 1]);
      }
    }
    const result = right.reduce((pre, cur, i) => {
      pre += Math.abs(left[i] - cur);
      if (i + 1 < left.length) {
        pre += Math.abs(cur - left[i + 1]);
      }
      return pre;
    }, 0);
    return result;
  } else {
    //작은거 짝수 큰거 홀수
    const tmp = arr.slice(0, mid + 1);
    const right = arr.slice(mid + 1, len).sort((a, b) => b - a);
    const left = [];
    for (let i = 0; i < tmp.length; i += 2) {
      left.unshift(tmp[i]);
      if (i + 1 >= tmp.length) break;
      left.push(tmp[i + 1]);
    }
    const result = right.reduce((pre, cur, i) => {
      pre += Math.abs(left[i] - cur);
      pre += Math.abs(cur - left[i + 1]);
      return pre;
    }, 0);
    return result;
  }
}

console.log(solution(arr));
```

1. 처음 수열을 순서대로 정렬한다.
2. 수열 길이에 따라 왼쪽(짝수, 홀수개)과 오른쪽(짝수개)으로 나눈다.
3. 왼쪽은 작은거 큰거 순서로 양쪽으로 푸시한다.
4. 오른쪽 수열을 기준으로 오른쪽 요소 인덱스에 따라 왼쪽수열을 빼준 절대값을 차례로 더한후 결과를 출력한다.

### 다른 풀이

1. 모든 경우의 수열을 만들어서 그중 가장 큰값을 출력한다.

### 고친 나의 풀이

```javascript
const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("input").toString().split("\r\n");
const n = parseInt(input[0]);
const arr = input[1]
  .split(" ")
  .map((v) => parseInt(v))
  .sort((a, b) => a - b);

let max = 0;
function permutation(n, arr, checked) {
  if (n === 0) {
    const tmp = calc(checked);
    max = max > tmp ? max : tmp;
    return;
  }

  for (let i = 0; i < n; i++) {
    const tmp = arr.findIndex((v) => v === arr[i]);
    const rest = arr.slice(0, tmp).concat(arr.slice(tmp + 1));
    checked.push(arr[i]);
    permutation(n - 1, rest, checked);
    checked.pop();
  }
}

function calc(arr) {
  const result = arr.reduce((pre, cur, i) => {
    if (0 < i) {
      pre += Math.abs(cur - arr[i - 1]);
      return pre;
    }
    return pre;
  }, 0);

  return result;
}
permutation(n, arr, []);
console.log(max);
```

### 주의할점

1. 10972번과 다르게 순열로 풀생각을 못함..

> **출처**  
> https://yabmoons.tistory.com/98
