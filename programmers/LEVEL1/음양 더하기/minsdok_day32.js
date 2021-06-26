function solution(absolutes, signs) {
    const n = absolutes.length;
    let sum = 0;
    
    for(let i = 0; i < n; i++) {
        if(!signs[i]) {
            const tmp = absolutes[i];
            absolutes[i] = -tmp;
        }
    }
    return absolutes.reduce((pre, cur) => {
        return pre+cur;
    })
}