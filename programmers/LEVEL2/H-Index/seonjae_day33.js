function solution(citations) {
  citations.sort((a, b) => a - b);
  const totalPaper = citations.length;

  const answer = citations.reduce((hIndex, paper, index) => {
    if (totalPaper - index >= paper) return paper;
    else {
      if (hIndex >= totalPaper - index) return hIndex;
      return totalPaper - index;
    }
  }, 0);

  return answer;
}
