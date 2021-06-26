function checkBracket(startIdx, stringArray) {
    const n = stringArray.length;
    const stack = [];
    
    for(let i = startIdx; i < n + startIdx; i++) {
        const bracket = stringArray[i%n];
        
        if(bracket === '[' || bracket === '{' || bracket === '(') {
            stack.push(stringArray[i%n]);        
        } else {
            const bracketMatch = stack.pop();

            if(bracket === '}') {
                if(bracketMatch !== '{') {
                    return false;
                }
            } else if(bracket === ']') {
                if(bracketMatch !== '[') {
                    return false;
                }
            } else if(bracket === ')') {
                if(bracketMatch !== '(') {
                    return false;
                }
            }
        }
    }
    if(stack.length === 0) return true;
    else return false;
}

function solution(s) {
    const stringArray = s.split('');
    let count = 0;
        
    for(let i = 0; i < stringArray.length; i++) {
        if(checkBracket(i, stringArray)) count++;
    }

    return count;
}