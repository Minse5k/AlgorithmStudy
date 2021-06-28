function solution(brown, yellow) {
  //직사각형 => 2*a + 2*b + 4
  const n = Math.sqrt(yellow);
  if (n - Math.floor(n)) {
    for (let a = 1; a < yellow; a++) {
      if (yellow % a !== 0) continue;
      const b = yellow / a;
      const sum = 2 * a + 2 * b + 4;
      if (sum === brown) return [a + 2, b + 2].sort((a, b) => b - a);
    }
  }
  //정사각형 => n * 4 + 4
  return [n + 2, n + 2];
}
