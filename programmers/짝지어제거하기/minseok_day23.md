# Problem 짝지어제거하기

## Stack

### 문제 링크
https://programmers.co.kr/learn/courses/30/lessons/12973#

### solved
1. `stack`을 사용했다.

### 주의할점
1. 시간초과에 주의

### 의문점
1. `reduce`를 이용하면 효율성 테스트에서 틀린다. 
2. `forEach`문으로 고치니 해결됐다.

### code
```javascript
//const isOdd = number => number % 2 !== 0;

function solution(str)
{
    if(str.length % 2 !== 0) return 0;
    const stringStack = [];
    
    [...str].forEach((value) => {
        
        const stackTop = stringStack.length - 1;
        
        stringStack[stackTop] === value ? stringStack.pop() : stringStack.push(value);
    })
    
    return Number(stringStack.length === 0);
    /*
    if (isOdd(str.length)) return 0;
    
    const result = [...str].reduce((stack, cur) => {
        const top = stack.length - 1;
    
        stack[top] === cur ? stack.pop() : stack.push(cur);
        return stack;
    }, [])
    
    return Number(result.length === 0);
    */
}