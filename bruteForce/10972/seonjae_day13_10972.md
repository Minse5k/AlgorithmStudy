# 10972 다음 순열

<hr />

### 나의풀이

```javascript
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input[0]);
//출력은 answer다음 순열을 출력하기
const lastest = input[1];

const checked = new Array(n + 1).fill(true);
let flag = false; //분기점
const answer = [];
function permutation(n, checked, arr) {
  if (n === arr.length) {
    if (!flag) {
      flag = arr.join(" ") === lastest ? true : false;
    } else {
      flag = "ok";
      console.log(arr.join(" "));
    }
    return answer.push([...arr]);
  }

  for (let i = 1; i <= n; i++) {
    if (checked[i]) {
      checked[i] = false;
      arr.push(i);
      permutation(n, checked, arr);
      if (flag === "ok") break;
      checked[i] = true;
      arr.pop();
    }
  }
}
permutation(n, checked, []);
if (flag === true) {
  console.log(-1);
}
```

1. permutation이라는 함수를 통해 모든 순열을 구한다.
2. flag라는 분기점을 통해 false일 때 입력된 순열을 만나면 true로 true일 때 순열을 탐색한다면 출력을 만약 true가 남아있다면 -1을 출력한다.

### 다른 풀이

1. 입력받은 순열의 가장 오른쪽부터 n-1 < n 인곳을 찾는다.
2. 1번에서 찾은 지점(n-1)을 중심으로 오른쪽구역에서 비교를 하여 오른쪽구역 > n-1 인 경우 바꿔준다.
3. 그 후 오른쪽구역은 오름차순으로 정렬후 순열을 출력해준다.
4. 1번이 안되면 -1를 출력해준다.

### 고친 나의 풀이

```javascript
const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("input").toString().split("\r\n");
const n = parseInt(input[0]);
//출력은 answer다음 순열을 출력하기
const lastest = input[1].split(" ").map((v) => parseInt(v));

function solution(n, lastest) {
  let point = -1;
  //구역 나누기
  for (let i = n - 2; i >= 0; i--) {
    if (lastest[i] < lastest[i + 1]) {
      point = i;
      break;
    }
  }
  // 4번조건
  if (point === -1) {
    return -1;
  } else {
    // 2번조건
    for (let i = n - 1; i >= point + 1; i--) {
      if (lastest[point] < lastest[i]) {
        const tmp = lastest[point];
        lastest[point] = lastest[i];
        lastest[i] = tmp;
        break;
      }
    }
    // 3번조건
    const left = lastest.slice(0, point + 1);
    const right = lastest.slice(point + 1).sort((a, b) => a - b);

    return left.concat(right).join(" ");
  }
}
console.log(solution(n, lastest));
```

### 주의할점

1. 순열을 출력할 생각에 잠겨있었다.

> **출처**  
> https://kwanghyuk.tistory.com/25
