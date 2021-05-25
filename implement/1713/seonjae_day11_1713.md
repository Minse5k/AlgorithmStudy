# 1713 후보추천하기
### 나의풀이
1. 추천목록 인덱스를 확인할 때 사진틀이 가득찾는지 확인
2. 가득차지 않았다면 현재 추천학생이 사진틀에 있는지 확인 후 추천 개수만 올릴것인지 사진틀에 넣을것인지 결정
3. 가득찼다면 현재 추천학생이 사진틀에 있다면 `문제의 조건4` 그렇지않다면 `문제의 조건 3`
4. 사진틀 배열을 `join`하여 출력 
```javascript
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input[0]);
const m = parseInt(input[1]);
let candidate = []; //사진틀
const student = new Array(m + 1).fill(0); //학생이 추천받은 수
const arr = input[2].split(" ").map((v) => parseInt(v)); //추천 목록

arr.forEach((index) => {
  const tmp = candidate.findIndex((v) => v === index); // 중복확인 index값 or -1
  //사진틀이 비었을 경우
  if (candidate.length < n) {
    if (tmp >= 0) {
      //중복O
      student[index]++;
    } else {
      //중복X
      candidate.push(index);
      student[index]++;
    }
  } else {
    //모두 찼을 때
    if (tmp >= 0) {
      //중복O
      student[index]++;
    } else {
      //중복 X
      let min = student[candidate[0]];
      let point = 0;
      for (let i = 1; i < candidate.length; i++) {
        if (min > student[candidate[i]]) {
          min = student[candidate[i]];
          point = i;
        }
      }
      candidate = candidate.slice(0, point).concat(candidate.slice(point + 1, candidate.length));
      candidate.push(index);
      student[candidate[point]] = 0;
      student[index]++;
    }
  }
});
const answer = candidate.sort((a, b) => a - b).join(" ");
console.log(answer);
```
### 다른 풀이

### 고친 나의 풀이

### 주의할점

마지막에 들어온 문자와 중복된다는 점

> **출처**
