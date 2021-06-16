function solution(stringText) {
  const answer = separateString([...stringText]);

  return answer.join("");
}

const bracket = {
  left: "(",
  right: ")",
};

function separateString(stringText) {
  const stringLength = stringText.length;
  if (stringLength === 0) return [];

  const leftText = [];
  const count = {
    left: 0,
    right: 0,
  };

  let rightStartIndex = 0;

  for (let i = 0; i < stringLength; i++) {
    switch (stringText[i]) {
      case bracket.left: {
        count.left += 1;
        break;
      }
      default: {
        count.right += 1;
        break;
      }
    }

    leftText.push(stringText[i]);

    if (count.left === count.right) {
      rightStartIndex = i + 1;
      break;
    }
  }

  const rightText = stringText.slice(rightStartIndex);

  const accuracy = accuracyString(leftText);
  if (accuracy) return [...leftText, ...separateString(rightText)];

  return ["(", ...separateString(rightText), ")", ...changeLeftText(leftText)];
}

function accuracyString(stringText) {
  const stack = [];

  for (const text of stringText) {
    switch (text) {
      case bracket.left: {
        stack.push(bracket.left);
        break;
      }
      default: {
        if (stack.length === 0) return false;
        stack.pop();
        break;
      }
    }
  }

  if (stack.length === 0) return true;
  return false;
}

function changeLeftText(stringText) {
  const results = [];

  for (let i = 1; i < stringText.length - 1; i++) {
    switch (stringText[i]) {
      case bracket.left: {
        results.push(bracket.right);
        break;
      }
      default: {
        results.push(bracket.left);
        break;
      }
    }
  }
  return results;
}
