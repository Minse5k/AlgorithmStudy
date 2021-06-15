function solution(text) {
  let answer = 0;
  [...text].forEach((value, index) => {
    const rotationText = rotateText(text, index);
    const rotationTextLength = getAccuracyText(rotationText);
    answer = rotationTextLength > 0 ? answer : answer + 1;
  });
  return answer;
}

function rotateText(text, index) {
  return [...text.slice(index + 1), ...text.slice(0, index + 1)];
}

function getAccuracyText(text) {
  const accuracyText = text.reduce((stack, text) => {
    return calculate(stack, text);
  }, []);

  return accuracyText.length;
}

function calculate(stack, text) {
  const left = {
    big: "[",
    middle: "{",
    small: "(",
  };
  const right = {
    big: "]",
    middle: "}",
    small: ")",
  };

  switch (text) {
    case left.big: {
      return [...stack, left.big];
    }
    case right.big: {
      if (stack[stack.length - 1] === left.big) {
        stack.pop();
        return stack;
      }
      return [...stack, false];
    }
    case left.middle: {
      return [...stack, left.middle];
    }
    case right.middle: {
      if (stack[stack.length - 1] === left.middle) {
        stack.pop();
        return stack;
      }
      return [...stack, false];
    }
    case left.small: {
      return [...stack, left.small];
    }
    case right.small: {
      if (stack[stack.length - 1] === left.small) {
        stack.pop();
        return stack;
      }
      return [...stack, false];
    }
  }
}
