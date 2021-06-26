function solution(n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i < n + 1; i++) {
    let point = 0;

    for (let j = i; j > 0; j--) {
      point += j;
      if (point > n) break;
      dp[point]++;
    }
  }

  return dp[n];
}
