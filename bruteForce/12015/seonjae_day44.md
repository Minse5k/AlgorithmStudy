# 12015 가장 긴 증가하는 부분 수열 2

# 문제

[12015번: 가장 긴 증가하는 부분 수열 2](https://www.acmicpc.net/problem/12015)

# 나의 풀이

```jsx
const fs = require("fs");
const [N, inputs] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const arr = inputs.split(" ").map((value) => parseInt(value));

const len = [arr[0]];
for (let i = 1; i < N; i++) {
  let left = 0;
  let right = len.length - 1;
  while (left <= right) {
    let mid = parseInt((left + right) / 2);
    if (len[mid] < arr[i]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  if (left >= len.length) {
    len.push(arr[i]);
  } else {
    len[left] = arr[i];
  }
}

console.log(len.length);
```

1. 입력 받은 배열을 for문을 사용해서 차례대로 탐색한다.
2. `현재 배열의 저장된 값(arr[i])`을 `이분 탐색을 사용해서 len 배열에` 넣어주거나 수정해준다.
3. 이분 탐색 조건은 `len배열의 중간값(mid)`이 `현재 배열의 저장된 값(arr[i])` 과 비교해서 left right의 값을 변경해준다. 만약 left의 값이 len의 최대길이를 넘거나 같아졌을 때 배열의 맨뒤에 넣어주고 그렇지 않다면 len[left]에 arr[i]값을 저장해준다. 
4. 이후 for문이 종료되면 `len배열의 길이`를 출력한다.

예시를 들어보면

i = 1

i는 1부터 시작하기 때문에 2번째 인덱스부터 시작

arr:   4  `2`  3  5  1  3  4  5   

len:   `4 → 2`   (탐색 후 첫 번째 값이 변경된다.)

i = 2

arr:   4  2  `3`  5  1  3  4  5    

len:  2  `3`   (탐색 후  추가된다.)

i = 3

arr:   4  2  3  `5`  1  3  4  5    

len:  2  3 `5`  (탐색 후  추가된다.)

i = 4

arr:   4  2  3  5  `1`  3  4  5    

len:  `2→1` 3  5  (탐색 후 첫 번째 값이 변경된다.)

i = 5

arr:   4  2  3  5  1  `3`  4  5    

len:  1  `3->3` 5  (탐색 후 두 번째 값이 변경된다.)

i = 6

arr:   4  2  3  5  1  3  `4`  5    

len:  1 3 `5->4`  (탐색 후 세 번째 값이 변경된다.)

i = 7

arr:   4  2  3  5  1  3  4  `5`    

len:  1  3  4  `5` (탐색 후  추가된다.)

> [https://namhandong.tistory.com/135](https://namhandong.tistory.com/135)