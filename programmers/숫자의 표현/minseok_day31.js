function solution(n) {
    let count = 0;
    
    for(let i = 1; i <= parseInt(n / 2); i++) {
        let sum = 0;
        
        for(let j = i; j < n; j++) {
            if(sum >= n) break;
            sum += j;
        }
        if(sum === n) count++;
    }
    return count + 1;
}