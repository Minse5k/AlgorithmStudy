function solution(n)
{
    let count = 0;
    
    while(n > 0) {
        if(n%2 !== 0) {
            n = (n - 1) / 2;
            count++;
        }
        else n /= 2;
    }
    
    return count;
}
