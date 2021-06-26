function solution(text) {
  const [chagedCount, removedCount] = removeRepeat(text);
  return [chagedCount, removedCount];
}

function removeRepeat(text) {
  let chagedCount = 0;
  let removedCount = 0;
  const ONE = "1";

  while (true) {
    if (text === ONE) break;
    chagedCount++;
    const [onlyOneText, removedZeroCount] = removeZero(text);
    removedCount += removedZeroCount;

    text = changeBinary(onlyOneText);
  }

  return [chagedCount, removedCount];
}

function removeZero(text) {
  const originLength = text.length;
  const onlyOneText = text.split("0").join("");
  const removedZeroCount = originLength - onlyOneText.length;

  return [onlyOneText, removedZeroCount];
}

function changeBinary(text) {
  let decimal = text.length;
  const binary = [];

  while (decimal > 0) {
    binary.push(decimal % 2);
    decimal = Math.floor(decimal / 2);
  }

  return binary.reverse().join("");
}
