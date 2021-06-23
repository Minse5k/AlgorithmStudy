function solution(n) {
  const binary = chageBinary(n);
  const nextBinary = getNextBinary(binary);

  const answer = changeDecimal(nextBinary);
  return answer;
}

function chageBinary(n) {
  const binary = [];
  while (n > 0) {
    binary.push(n % 2);
    n = parseInt(n / 2);
  }
  return binary;
}

function getNextBinary(binary) {
  const len = binary.length;
  let findOne = -1;
  let findZero = -1;

  for (let i = 0; i < len; i++) {
    if (findOne < 0) {
      if (binary[i] === 1) findOne = i;
    } else if (findOne >= 0) {
      if (binary[i] === 0) findZero = i;
    }
    if (findZero >= 0) break;
  }

  if (findZero === -1) return [...binary.slice(0, len - 1), 0, binary[len - 1]];

  binary[findOne] = 0;
  binary[findZero] = 1;
  const replaction = binary.slice(0, findZero).sort((a, b) => b - a);
  return [...replaction, ...binary.slice(findZero)];
}

function changeDecimal(binary) {
  return binary.reduce((pre, cur, index) => {
    return pre + Math.pow(2, index) * cur;
  }, 0);
}
