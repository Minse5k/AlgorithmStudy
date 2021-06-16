function solution(stringNumber, k) {
  const numbers = stringToNumber(stringNumber);
  const getCount = numbers.length - k;

  const answer = maxNumber(numbers, getCount);
  return answer.join("");
}

function stringToNumber(textNumber) {
  // return [...textNumber].reduce((pre, cur) => [...pre, parseInt(cur)], []); 7,8,9,10 시간초과 주범
  return [...textNumber].map((value) => parseInt(value));
}

function maxNumber(numbers, getCount) {
  const maxList = [];
  let startPoint = 0;

  while (getCount > 0) {
    if (getCount === numbers.length - startPoint) {
      return [...maxList, ...numbers.slice(startPoint)];
    }

    const max = {
      num: numbers[startPoint],
      index: startPoint,
    };

    for (let i = startPoint; i <= numbers.length - getCount; i++) {
      if (max.num === 9) break;
      if (max.num >= numbers[i]) continue;
      max.num = numbers[i];
      max.index = i;
    }

    maxList.push(max.num);
    startPoint = max.index + 1;
    getCount--;
  }

  return maxList;
}
