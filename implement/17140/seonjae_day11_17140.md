```javascript
const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("input").toString().split("\r\n");
const [r, c, k] = input
  .shift()
  .split(" ")
  .map((v) => parseInt(v));
let arr = input.map((v) => v.split(" ").map((i) => parseInt(i)));

//비교할때 r-1, c-1해줘야됨
function solution(r, c, k, arr) {
  let count = 0;
  if (arr.length >= r && arr[0].length >= c) {
    if (arr[r - 1][c - 1] === k) return count;
  }
  let curR = arr.length; //행개수
  let curC = arr[0].length; //열개수

  while (count++ <= 100) {
    const nextArr = [];
    if (curR >= curC) {
      //R정렬
      for (let i = 0; i < curR; i++) {
        const visited = new Array(101).fill(false);
        const tmp = sortX(arr[i], visited);
        nextArr.push(tmp);
        curC = curC > tmp.length ? curC : tmp.length; //최대길이 바꿔줌
      }
      arr.length = 0;
      //0채우기
      for (let i = 0; i < curR; i++) {
        const tmp = addZero(nextArr[i], curC - nextArr[i].length);
        arr.push(tmp);
      }
    } else {
      //C정렬
      const [a, b] = [curC, curR];
      for (let i = 0; i < a; i++) {
        const queue = [];
        const visited = new Array(101).fill(false);
        for (let j = 0; j < b; j++) {
          queue.push(arr[j][i]);
        }
        const tmp = sortX(queue, visited);
        nextArr.push(tmp);
        curR = curR > tmp.length ? curR : tmp.length;
      }
      //0채우기
      arr = new Array(curC).fill(null).map((v) => []);
      for (let i = 0; i < curC; i++) {
        const tmp = addZero(nextArr[i], curR - nextArr[i].length);
        for (let j = 0; j < curR; j++) {
          arr[j].push(tmp[j]);
        }
      }
    }

    if (curR > r && curC > c) {
      if (arr[r - 1][c - 1] === k) {
        return count;
      }
    }
  }

  return -1;
}
console.log(solution(r, c, k, arr));

function sortX(arr, visited) {
  let queue = [];
  for (let i = 0; i < arr.length; i++) {
    const tmp = arr[i];
    if (tmp === 0) continue;
    if (!visited[tmp]) {
      visited[tmp] = 1;
      queue.push(tmp);
    } else {
      visited[tmp]++;
    }
  }

  const sortArr = queue
    .map((v) => [v, visited[v]])
    .sort((a, b) => {
      if (a[1] - b[1]) {
        return b[0] - a[0];
      }
      return a[0] - b[0];
    })
    .flat();
  if (sortArr.length > 100) {
    return sortArr.slice(0, 101);
  }
  return sortArr;
}

function addZero(arr, count) {
  for (let i = 0; i < count; i++) {
    arr.push(0);
  }
  return arr;
}
```
