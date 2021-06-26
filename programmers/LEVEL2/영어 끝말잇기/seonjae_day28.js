function solution(n, words) {
    const overlap = new Set();
    let count = 0;
    words.unshift(words[0][0]);
  
    for (let i = 1; i < words.length; i += n) {
      count++;
      for (let j = i; j < i + n; j++) {
        if (!isDuplicate(overlap, words[j]) && isAccuracy(words, j)) {
          overlap.add(words[j]);
          continue;
        }
        if (j % n === 0) return [n, count];
        return [j % n, count];
      }
    }
    return [0, 0];
  }
  
  function isAccuracy(words, i) {
    return words[i - 1][words[i - 1].length - 1] === words[i][0] ? true : false;
  }
  
  function isDuplicate(overlap, word) {
    return overlap.has(word);
  }