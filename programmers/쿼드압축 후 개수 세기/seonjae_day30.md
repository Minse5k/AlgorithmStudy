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

  const comparedNumber = arr[startX][startY];
  const count = [0, 0];
  let isNotSame = false;

  for (let i = startX; i < endX; i++) {
    if (isNotSame) break;
    for (let j = startY; j < endY; j++) {
      if (comparedNumber !== arr[i][j]) isNotSame = true;
    }
  }

  if (isNotSame) {
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
    if (comparedNumber === 1) {
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

```javascript
function solution(arr) {
  const zeroOneCount = compressArr({
    start: [0, 0],
    end: [arr.length, arr.length],
    arr,
  });

  return zeroOneCount;
}

function compressArr({ start, end, arr }) {
  const [startX, startY] = start;
  const [endX, endY] = end;

  const sameLocation = startX === endX && startY === endY;
  if (sameLocation) {
    if (arr[startX][startY] === 0) return [1, 0];
    return [0, 1];
  }

  const comparedNumber = arr[startX][startY];
  const zeroOne = [0, 0];
  let isNotSame = false;

  const nextX = endX - startX;
  const nextY = endY - startY;

  const quadrants = {
    one: {
      start: [startX, endY - nextY / 2],
      end: [endX - nextX / 2, endY],
      arr,
    },
    two: {
      start: [startX, startY],
      end: [endX - nextX / 2, endY - nextY / 2],
      arr,
    },
    three: {
      start: [endX - nextX / 2, startY],
      end: [endX, endY - nextY / 2],
      arr,
    },
    four: {
      start: [endX - nextX / 2, endY - nextY / 2],
      end: [endX, endY],
      arr,
    },
  };

  for (let i = startX; i < endX; i++) {
    if (isNotSame) break;
    for (let j = startY; j < endY; j++) {
      if (comparedNumber !== arr[i][j]) isNotSame = true;
    }
  }

  if (isNotSame) {
    for (const key in quadrants) {
      const count = compressArr(quadrants[key]);
      zeroOne[0] += count[0];
      zeroOne[1] += count[1];
    }
    return zeroOne;
  }
  if (comparedNumber === 1) {
    zeroOne[1]++;
    return zeroOne;
  }
  zeroOne[0]++;
  return zeroOne;
}
```
