function solution(land) {
  const N = land.length;
  const dp = Array.from(Array(N), () => [0, 0, 0, 0]);
  dp[0] = [...land[0]];

  for (let i = 1; i < N; i++) {
    dp[i] = dp[i].reduce((prev, curr, j) => {
      const max = dp[i - 1].reduce((pre, cur, k) => {
        if (k === j) return pre;
        return Math.max(pre, cur);
      }, 0);

      prev.push(max + land[i][j]);
      return prev;
    }, []);
  }

  const answer = dp[N - 1].reduce((max, now) => {
    return max > now ? max : now;
  }, 0);

  return answer;
}
