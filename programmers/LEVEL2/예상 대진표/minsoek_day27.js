function solution(n,a,b)
{
    
    let count = 1;
    while(1) {
        if(a % 2 !== 0) a = a + 1;
        if(b % 2 !== 0) b = b + 1;
        
        if(a === b) break;
        a = a / 2;
        b = b / 2;
        
        count ++;
    }

    return count;
}