function solution(s) {
    const n = s.length;
    const half = parseInt(n / 2);
    if(n % 2 !== 0) return s[half];
    else return s[half - 1] + s[half];
}