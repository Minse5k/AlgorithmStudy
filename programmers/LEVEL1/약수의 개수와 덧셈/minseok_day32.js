function getMeasureCnt(num) {
    let count = 0;
    
    for(let i = 1; i <= num; i++) {
        if(num % i === 0) count++;
    }
    
    return count;
}

function solution(left, right) {
    let result = 0;
    
    for(let i = left; i <= right; i++) {
        const cnt = getMeasureCnt(i);
        
        cnt % 2 === 0 ? result += i : result -= i;
    }
    
    return result;
}