function solution(n) {
    const num = n.toString(3).split('').reverse().join('');
    
    return parseInt(num, 3);
}