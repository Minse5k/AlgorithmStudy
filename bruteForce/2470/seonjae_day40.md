# 2470 두 용액

## 문제

[2470번: 두 용액](https://www.acmicpc.net/problem/2470)

## 나의 풀이

```jsx
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(inputs[0]);
const arr = inputs[1]
  .split(" ")
  .map((value) => parseInt(value))
  .sort((a, b) => a - b);

const mixLiquid = () => {
  const liquid = [arr[0], arr[n - 1]];
  let mixedPH = Math.abs(0 - (arr[0] + arr[n - 1]));
  const middle = Math.floor((n - 1) / 2);

  if (n % 2 === 0) {
    for (let i = 0; i <= middle; i++) {
      const nowMixedPH = Math.abs(0 - (arr[i] + arr[n - 1 - i]));
      if (mixedPH > nowMixedPH) {
        liquid[0] = arr[i];
        liquid[1] = arr[n - 1 - i];
      }
    }
    return liquid.join(" ");
  }

  for (let i = 0; i < middle; i++) {
    const nowMixedPH = Math.abs(0 - (arr[i] + arr[n - i]));
    if (mixedPH > nowMixedPH) {
      liquid[0] = arr[i];
      liquid[1] = arr[n - i];
    }
  }

  const MixedMiddleLeft = Math.abs(0 - (arr[middle - 1] + arr[middle]));
  const MixedMiddleRight = Math.abs(0 - (arr[middle] + arr[middle + 1]));

  if (mixedPH > MixedMiddleLeft) {
    mixedPH = MixedMiddleLeft;
    liquid[0] = arr[middle - 1];
    liquid[1] = arr[middle];
  }

  if (mixedPH > MixedMiddleRight) {
    liquid[0] = arr[middle];
    liquid[1] = arr[middle + 1];
  }

  return liquid.join(" ");
};
console.log(mixLiquid());
```

## 설명

1. 입력받은 배열을 이분 탐색하기 위해 정렬을 해준다.
2. 배열의 개수가 홀수, 짝수에 따라 다르게 작성했다.
3. `짝수`라면 양쪽 끝에서부터 `0 - (왼쪽값 + 오른쪽값)` 계산하고 만약 지금까지 특성 값보다 작으면 liquid값을 리턴한다.
4. `홀수`도 이와 같은 방법이지만 마지막 middle에 대해 왼쪽 오른쪽 각각 계산해서 특성 값과 비교 후 liquid값을 리턴한다. 

## 고친 후 나의 풀이

```jsx
const fs = require("fs");
// // const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const inputs = fs.readFileSync("input").toString().trim().split("\r\n");
const n = parseInt(inputs[0]);
const arr = inputs[1]
  .split(" ")
  .map((value) => parseInt(value))
  .sort((a, b) => a - b);

const mixLiquid = () => {
  //모든 수가 양수 or 음수일 때
  if (arr[n - 1] <= 0) {
    return `${arr[n - 2]} ${arr[n - 1]}`;
  } else if (arr[0] >= 0) {
    return `${arr[0]} ${arr[1]}`;
  }

  //양수 음수가 섞여 있을 때
  const liquid = [arr[0], arr[n - 1]];
  let minPH = Math.abs(0 - (arr[0] + arr[n - 1]));
  let start = 0;
  let end = n - 1;
  if (Math.abs(arr[start]) >= arr[end]) start++;
  else end--;

  while (true) {
    if (start === end) return `${liquid[0]} ${liquid[1]}`;

    const nowPH = Math.abs(0 - (arr[start] + arr[end]));
    if (nowPH === 0) return `${arr[start]} ${arr[end]}`;

    if (minPH >= nowPH) {
      minPH = nowPH;
      liquid[0] = arr[start];
      liquid[1] = arr[end];
    }
    if (Math.abs(arr[start]) >= arr[end]) start++;
    else end--;
  }
};

console.log(mixLiquid());
```

무조건 양수와 음수가 같은 배열로 설정되고 끝에서 계산하는 것이 절댓값의 가장 작은 값이라고 생각했다. 이런 얕은 고민이 많이 치명적이었다. 이 문제는 배열의 모든 수가 양수나 음수일 때 가 있다. 그리고 다른 사람의 반례를 확인해보니 양쪽으로 확인하는 방법은 잘못된 방법이라는 것을 알게 되었다.

 고친 나의 풀이의 솔루션은 두 개의 포인터를 활용해서 문제를 접근하는 것이다. 왼쪽과 오른쪽을 각각 `start와 end`로 지정했다. 이후 `현재 특성 값(nowPH)`가 0이면 리턴하거나 `현재까지 나온 특성 값(minPH)` 보다 작으면 특성 값을 바꿔주고 liquid 값도 바꿔준다. 그리고 포인터를 바꾸기 위한 조건을 각 `절댓값의 크기가 큰 곳의 인덱스가 가운데로 이동시켜` 문제를 풀었다.

> [https://www.acmicpc.net/board/view/51698](https://www.acmicpc.net/board/view/51698)