# 방문 길이

## 결과: 정답은 맞았으나 리팩토링을 못함

```javascript
function solution(dirs) {
  const visited = Array.from(Array(11), () =>
    Array.from(Array(11), () => Array(4).fill(false))
  );

  const answer = [...dirs].reduce(
    (pre, now) => {
      const [x, y] = pre[0];
      switch (now) {
        case "U": {
          const nx = x - 1;
          const ny = y;
          if (
            0 <= nx &&
            nx < visited.length &&
            0 <= ny &&
            ny < visited.length
          ) {
            if (visited[x][y][0] && visited[nx][ny][1])
              return [[nx, ny], pre[1]];
            visited[x][y][0] = true;
            visited[nx][ny][1] = true;
            return [[nx, ny], pre[1] + 1];
          }
          return pre;
        }
        case "D": {
          const nx = x + 1;
          const ny = y;
          if (
            0 <= nx &&
            nx < visited.length &&
            0 <= ny &&
            ny < visited.length
          ) {
            if (visited[x][y][1] && visited[nx][ny][0])
              return [[nx, ny], pre[1]];
            visited[x][y][1] = true;
            visited[nx][ny][0] = true;
            return [[nx, ny], pre[1] + 1];
          }
          return pre;
        }
        case "R": {
          const nx = x;
          const ny = y + 1;
          if (
            0 <= nx &&
            nx < visited.length &&
            0 <= ny &&
            ny < visited.length
          ) {
            if (visited[x][y][2] && visited[nx][ny][3])
              return [[nx, ny], pre[1]];
            visited[x][y][2] = true;
            visited[nx][ny][3] = true;
            return [[nx, ny], pre[1] + 1];
          }
          return pre;
        }
        default: {
          const nx = x;
          const ny = y - 1;
          if (
            0 <= nx &&
            nx < visited.length &&
            0 <= ny &&
            ny < visited.length
          ) {
            if (visited[x][y][3] && visited[nx][ny][2])
              return [[nx, ny], pre[1]];
            visited[x][y][3] = true;
            visited[nx][ny][2] = true;
            return [[nx, ny], pre[1] + 1];
          }
          return pre;
        }
      }
    },
    [[5, 5], 0]
  );

  return answer[1];
}
```

## 리팩토링 후

```javascript
function solution(dirs) {
  const visited = Array.from(Array(11), () =>
    Array.from(Array(11), () => Array(4).fill(false))
  );

  const locationAndCount = [...dirs].reduce(
    (pre, now) => {
      return getLocationAndCount(pre, now, visited);
    },
    [[5, 5], 0]
  );

  return locationAndCount[1];
}

function getLocationAndCount(pre, now, visited) {
  const [x, y] = pre[0];

  const dict = {
    up: "U",
    down: "D",
    left: "L",
    right: "R",
  };

  function isRanged(nx, ny) {
    return 0 <= nx && nx < visited.length && 0 <= ny && ny < visited.length;
  }

  function isFirst(nx, ny, from, to) {
    return visited[x][y][from] && visited[nx][ny][to];
  }

  switch (now) {
    case dict.up: {
      const nx = x - 1;
      const ny = y;
      if (isRanged(nx, ny)) {
        if (isFirst(nx, ny, 0, 1)) return [[nx, ny], pre[1]];
        visited[x][y][0] = true;
        visited[nx][ny][1] = true;
        return [[nx, ny], pre[1] + 1];
      }
      return pre;
    }
    case dict.down: {
      const nx = x + 1;
      const ny = y;
      if (isRanged(nx, ny)) {
        if (isFirst(nx, ny, 1, 0)) return [[nx, ny], pre[1]];
        visited[x][y][1] = true;
        visited[nx][ny][0] = true;
        return [[nx, ny], pre[1] + 1];
      }
      return pre;
    }
    case dict.right: {
      const nx = x;
      const ny = y + 1;
      if (isRanged(nx, ny)) {
        if (isFirst(nx, ny, 2, 3)) return [[nx, ny], pre[1]];
        visited[x][y][2] = true;
        visited[nx][ny][3] = true;
        return [[nx, ny], pre[1] + 1];
      }
      return pre;
    }
    default: {
      const nx = x;
      const ny = y - 1;
      if (isRanged(nx, ny)) {
        if (isFirst(nx, ny, 3, 2)) return [[nx, ny], pre[1]];
        visited[x][y][3] = true;
        visited[nx][ny][2] = true;
        return [[nx, ny], pre[1] + 1];
      }
      return pre;
    }
  }
}
```
