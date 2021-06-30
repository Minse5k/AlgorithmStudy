function getLength(n) {
    let sum = 0;
    
    for(let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function solution(n) {
    const array = Array.from(Array(n), (v, idx) => new Array(idx + 1).fill(null));
    const length = getLength(n);
    let num = 1;
    
    let x = 0;
    let y = 0;
    
    while(num <= length) {
        while(x < n) {
            if(array[x][y] !== null) {
                break;
            }
            array[x][y] = num;
            x++;
            num++;
        }
        x--;
        y++;
        while(y < n) {
            if(array[x][y] !== null) {
                break;
            }
            array[x][y] = num;
            y++;
            num++;
        }    
        y--;
        x--;
        y--;
        while(x >= 0 && y >= 0) {
            if(array[x][y] !== null) {
                break;
            }
            array[x][y] = num;
            num++;
            x--;
            y--;
        }
        x++;
        y++;
        x++;
    }
    
    return array.reduce((arr, pre) => {
        return [...arr, ...pre];
    })

}