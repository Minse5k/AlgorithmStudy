function solution(gems) {
  const answer = [1, 1];
  const overlap = new Set(gems);
  const removeOverlap = new Set(gems);
  const dp = [];
  for (let i = 0; i < gems.length; i++) {
    if (removeOverlap.size === 0) break;
    if (removeOverlap.has(gems[i])) {
      removeOverlap.delete(gems[i]);
      dp.push([gems[i], i + 1]);
    } else {
      if (dp[0][0] === gems[i]) {
        dp.shift();
        dp.push([gems[i], i + 1]);
      } else if (dp[dp.length - 1][0] === gems[i]) {
        dp[dp.length - 1] = [gems[i], i + 1];
      }
    }
  }
  if (dp.length === 1) return [dp[0][1], dp[0][1]];

  return [dp[0][1], dp[dp.length - 1][1]];
}
