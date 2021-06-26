function solution(n) {
  const minimumCount = dynamicPrograming(n);

  return minimumCount;
}

function dynamicPrograming(n) {
  let count = 1;
  if (n === 1) return count;

  while (true) {
    if (n === 2) break;
    if (n % 2 === 0) {
      n /= 2;
      continue;
    }
    n -= 1;
    count++;
  }

  return count;
}
