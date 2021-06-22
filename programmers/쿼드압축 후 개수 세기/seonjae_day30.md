# 쿼드압축 후 개수 세기

## 결과: 시간초과로 못품
원래 풀었다는 가정하의 코드
```javascript
function solution(arr) {
  const answer = compressArr([0, 0], [arr.length, arr.length], arr);

  return answer;
}

function compressArr(start, end, arr) {
  const [startX, startY] = start;
  const [endX, endY] = end;

  if (startX === endX && startY === endY) {
    if (arr[startX][startY] === 0) return [1, 0];
    return [0, 1];
  }

  const compareNumber = arr[startX][startY];
  const count = [0, 0];
  let shot = false;

  for (let i = startX; i < endX; i++) {
    if (shot) break;
    for (let j = startY; j < endY; j++) {
      if (compareNumber !== arr[i][j]) shot = true;
    }
  }

  if (shot) {
    const nextX = endX - startX;
    const nextY = endY - startY;
    let tmp = compressArr(
      [startX, startY],
      [endX - nextX / 2, endY - nextY / 2],
      arr
    );
    count[0] += tmp[0];
    count[1] += tmp[1];
    tmp = compressArr(
      [startX, endY - nextY / 2],
      [endX - nextX / 2, endY],
      arr
    );
    count[0] += tmp[0];
    count[1] += tmp[1];
    tmp = compressArr(
      [endX - nextX / 2, startY],
      [endX, endY - nextY / 2],
      arr
    );
    count[0] += tmp[0];
    count[1] += tmp[1];
    tmp = compressArr([endX - nextX / 2, endY - nextY / 2], [endX, endY], arr);
    count[0] += tmp[0];
    count[1] += tmp[1];
  } else {
    if (compareNumber === 1) {
      count[1]++;
      return count;
    }
    count[0]++;
    return count;
  }
  return count;
}
```

## 리팩토링 후 코드
