function solution(numbers, target) {
    let count = 0;
    const minusArr = numbers.map((value,index)=> index);
    
    for(let i=1; i<=numbers.length; i++){
        const tmp = getCombination(i, minusArr);
        tmp.forEach(element=>{
            const duplicate = [...numbers];
            element.forEach(indexNum=>{
                duplicate[indexNum] = -duplicate[indexNum];
            });
            const nowCount = duplicate.reduce((pre, now)=> pre+now,0);
            if(nowCount === target) count++;
        })
    }
    
    return count;
}

function getCombination(k, arr){
    const results = [];
    if(k===1) return arr.map(value=> [value]);
    
    arr.forEach((fixed, index)=>{
        const rest = arr.slice(index+1);
        const combinations = getCombination(k-1, rest);
        const attached = combinations.map(combination=> [fixed, ...combination]);
        results.push(...attached);
    });
    
    return results;
}