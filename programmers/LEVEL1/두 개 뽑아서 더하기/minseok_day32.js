function solution(numbers) {
    const result = new Set([]);
    const array = [];
    
    for(let i = 0; i < numbers.length - 1; i++) {
        for(let j = i + 1; j < numbers.length; j++) {
            const sum = parseInt(numbers[i] + numbers[j]);
            if(result.has(sum)) continue;
            result.add(sum);
            array.push(sum);
        }
    }
    return array.sort((a,b) => a - b);
}