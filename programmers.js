function solution(text) {
    const stack = [];
    
    for (const char of text) {
      const top = stack.length -1;
      if(stack[top] === char) stack.pop();
      else {
        stack.push(char);
      }
    }
  
    if(stack.length === 0) return 1
    return 0;
  }