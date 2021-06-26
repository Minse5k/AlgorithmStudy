function solution(text) {
  const stringArray = getStringArray(text);

  const answer = getAnswer(stringArray);
  return answer;
}

function getStringArray(text) {
  const bracketOffString = text.slice(2, text.length - 2).split("},{");
  const stringArray = bracketOffString.map((text) => {
    return text.split(",");
  });
  return stringArray.sort((a, b) => a.length - b.length);
}

function getAnswer(stringArray) {
  const removeOverlap = new Set();
  for (const array of stringArray) {
    for (const text of array) {
      if (removeOverlap.has(text)) continue;
      removeOverlap.add(text);
    }
  }
  const answer = [];
  removeOverlap.forEach((key) => {
    answer.push(parseInt(key));
  });
  return answer;
}
