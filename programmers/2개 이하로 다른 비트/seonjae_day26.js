function solution(numbers) {
  const answer = numbers.reduce((result, number) => {
    if (number % 2 === 0) {
      result.push(number + 1);
      return result;
    }
    const binary = number.toString(2).split("").reverse();
    const minBinary = comparedBinary(binary);

    result.push(minBinary);
    return result;
  }, []);

  return answer;
}

function comparedBinary(binary) {
  if (binary.length === 1) return 2;

  for (let i = 1; i < binary.length; i++) {
    const now = binary[i] + binary[i - 1];
    if (now === "11") continue;
    if (now === "01") {
      binary[i] = "1";
      binary[i - 1] = "0";
      return changeDecimal(binary);
    } else if (now === "10") {
      binary[i - 1] = "1";
      return changeDecimal(binary);
    } else if (now === "00") {
      binary[i - 1] = "1";
      return changeDecimal(binary);
    }
  }
  const unchangedBinary = [
    ...binary.slice(0, binary.length - 1),
    0,
    binary[binary.length - 1],
  ];
  return changeDecimal(unchangedBinary);
}

function changeDecimal(array) {
  return parseInt(array.reverse().join(""), 2);
}