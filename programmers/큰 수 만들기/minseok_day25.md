# Problem 큰 수 만들기

## Stack

### 문제 링크
https://programmers.co.kr/learn/courses/30/lessons/42883#

### solved
1. `stack`을 사용했다.

### 주의할점
1. 같은 문자가 계속 나오는 경우 마지막에 예외처리 해주었다.

### 의문점
1. 잘못된 code의 방식으로 사용하면 매우 긴 경우 시간이 초과된다.
2. `stack`으로 다시 생각해서 풀이하였다.

### 정답 code
```javascript
function solution(number, k) {
    const numberArray = number.split('');

    if(numberArray.length === 1) return;
    
    const result = "";
    const stack = [numberArray[0]];
    
    for(let i = 1; i < numberArray.length; i++) {
        const stackTop = stack[stack.length - 1];
        const nowNum = numberArray[i];
        
        if(k === 0) {
            stack.push(nowNum);
        } else if(stackTop > nowNum) {
            stack.push(nowNum);
        } else {
            while(stack.length > 0 && k > 0) {
                const stackTop2 = stack[stack.length - 1];

                if(stackTop2 < nowNum) {
                    stack.pop();
                    k--;
                    if(k === 0) {
                        stack.push(nowNum);
                    }
                } else {
                    stack.push(nowNum);
                    break;
                }
            }
            if(stack.length === 0) stack.push(nowNum);
        }
    }
    if(k > 0) {
        while(k > 0) {
            stack.pop();
            k--;
        }
    }
    return (stack.join(''));
}
```
### 잘못된 code
```javascript
    let maxNum = numberArray[0];
    let maxIdx = 0;
    let start = 0;
    let answer = "";
    
    for(let i = 0; i < numberArray.length - k; i++) {
        maxNum = numberArray[start];
        maxIdx = start;
        for(let j = start; j <= k + i; j++) {
            if(maxNum < numberArray[j]) {
                maxNum = numberArray[j];
                maxIdx = j;
            }
        }
        start = maxIdx + 1;
        answer += maxNum;
    }
    
    return answer;
}