function solution(priorities, location) {
    const n = priorities.length;
    let i = 0;
    let count = 0;
    
    while(1) {
        let now = i % n;
        const max = Math.max(...priorities);
        
        if(priorities[now] === max) {
            count++;
            if(now === location) {
                return count;
            }
            priorities[now] = -1;
        }
        i++;
    }
}