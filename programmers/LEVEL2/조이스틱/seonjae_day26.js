function solution(str) {
  const name = getArray(str);

  let notAccuracy = name.pop();
  let count = 0;
  let nowPoint = 0;

  while (notAccuracy-- > 0) {
    const [nextPoint, plus] = move(nowPoint, name);
    count += plus;
    nowPoint = nextPoint;
    count += keyUpDown(name[nowPoint]);

    name[nowPoint] = 65;
  }

  return count;
}

function getArray(str) {
  let notAccuracy = 0;
  return [...str]
    .map((value) => {
      const result = value.charCodeAt(0);
      if (result === 65) return result;

      notAccuracy++;
      return result;
    })
    .push(notAccuracy);
}

function keyUpDown(value) {
  let count = 0;
  if (65 < value && value <= 77) return (count += value - 65);
  if (77 < value && value < 91) return (count += 91 - value);

  return count;
}

function move(nowIndex, name) {
  const count = {
    left: {
      dist: 0,
      index: undefined,
    },
    right: {
      dist: 0,
      index: undefined,
    },
  };

  //왼쪽
  for (let i = nowIndex; i >= 0; i--) {
    if (name[i] !== 65) {
      count.left.index = i;
      break;
    }
    count.left.dist += 1;
  }
  if (count.left.index === undefined) {
    for (let i = name.length - 1; i > nowIndex; i--) {
      if (name[i] !== 65) {
        count.left.index = i;
        break;
      }
      count.left.dist += 1;
    }
  }
  //오른쪽
  for (let i = nowIndex; i < name.length; i++) {
    if (name[i] !== 65) {
      count.right.index = i;
      break;
    }
    count.right.dist += 1;
  }
  if (count.right.index === undefined) {
    for (let i = 0; i < nowIndex; i++) {
      if (name[i] !== 65) {
        count.right.index = i;
        break;
      }
      count.right.dist += 1;
    }
  }
  if (count.left.dist < count.right.dist)
    return [count.left.index, count.left.dist];
  return [count.right.index, count.right.dist];
}
