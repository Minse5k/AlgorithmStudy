function solution(progresses, speeds) {
    const restDay = [];
    const n = progresses.length;
    
    for(let i = 0; i < n; i++) {
        restDay.push(parseInt((100 - progresses[i]) / speeds[i] + 0.99999));
    }
    
    let i = 0;
    const result = [];
    
    while(i < n) {
        const tmp = restDay[i];
        let count = 0;
        
        for(let j = i; j < n; j++) {
            restDay[j] -= tmp;
        }
        
        for(let j = i; j < n; j++) {
            if(restDay[j] > 0) break;
            count++;    
        }
        i += count;
        result.push(count);
    }
    
    return result;
}