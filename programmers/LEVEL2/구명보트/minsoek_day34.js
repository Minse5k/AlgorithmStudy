function solution(people, limit) {
    people.sort((a, b) => a - b);
    let count = 0;
    let j = 0;
    
    while(people.length > j) {
        const weight = people.pop();
        
        if(weight + people[j] <= limit) {
            j++;
        }
        count++;
    }
    return count;
}