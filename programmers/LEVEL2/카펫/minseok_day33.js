function solution(brown, yellow) {
    let n = (brown - 4) / 2;
    for(let i = 1; i < parseInt(n / 2) + 1; i++) {
        const j = n - i;
        if(i * j === yellow) {
            return [j + 2, i + 2];
        }
    }
}