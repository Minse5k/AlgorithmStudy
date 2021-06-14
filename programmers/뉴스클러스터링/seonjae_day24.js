function solution(str1, str2) {
    const MultipleA = getMultipleSet(str1);
    const MultipleB = getMultipleSet(str2);
  
    const answer = Math.floor(compared(MultipleA, MultipleB) * 65536);
    return answer;
  }
  
  function getMultipleSet(str) {
    const text = str.toUpperCase();
    const result = [];
    const isRange = (index) => {
      return 65 <= text.charCodeAt(index) && text.charCodeAt(index) < 91;
    };
  
    for (let i = 0; i < text.length - 1; i++) {
      if (isRange(i) && isRange(i + 1)) {
        result.push(text[i] + text[i + 1]);
      }
    }
  
    return result.reduce((ori, subset) => {
      if (ori.has(subset)) {
        ori.set(subset, ori.get(subset) + 1);
      } else {
        ori.set(subset, 1);
      }
      return ori;
    }, new Map());
  }
  
  function compared(MultipleA, MultipleB) {
    const setA = [...MultipleA].reduce((pre, subset) => {
      return pre + subset[1];
    }, 0);
    const setB = [...MultipleB].reduce((pre, subset) => {
      return pre + subset[1];
    }, 0);
    const intersection = [...MultipleA].reduce((pre, subset) => {
      const [key, value] = subset;
      if (MultipleB.has(key)) {
        const tmp = MultipleB.get(key);
        const next = value > tmp ? tmp : value;
        return pre + next;
      }
      return pre;
    }, 0);

    if (setA === 0 && setB === 0) {
      return 1;
    }

    const union = setA + setB - intersection;

    return intersection / union;
  }
  