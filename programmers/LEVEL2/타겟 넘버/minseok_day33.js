function solution(numbers, target) {
    let curArray = [numbers[0], -numbers[0]]
    
    for(let i = 1; i < numbers.length; i++) {
        const nowNum = numbers[i];
        const preArray = [];
        
        for(const num of curArray) {
            preArray.push(num + nowNum);
            preArray.push(num - nowNum);
        }
        curArray = preArray;
    }
    let count = 0;
    
    curArray.forEach((value) => {
        if(value === target) count++;
    })
    return count;
}