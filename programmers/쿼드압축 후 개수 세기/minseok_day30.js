function square(arr, n, countArray, start) {
    const first = arr[start[0]][start[1]];
    if(n === 1) {
        first === 0 ? countArray[0] += 1 : countArray[1] += 1;
        return;
    }
    const half = n / 2;
    let check = true;
    
    for(let i = start[0]; i < start[0] + n; i++) {
        for(let j = start[1]; j < start[1] + n; j++) {
            if(first !== arr[i][j]) {
                check = false;
                break;
            }
        }
        if(!check) break;
    }
    
    if(check) {
        first === 0 ? countArray[0]++ : countArray[1]++;
        return;
    }
    square(arr, half, countArray, start);
    square(arr, half, countArray, [start[0], start[1] + half]);
    square(arr, half, countArray, [start[0] + half, start[1]]);
    square(arr, half, countArray, [start[0] + half, start[1] + half]);
}

function solution(arr) {
    const n = arr.length;
    const countArray = [0, 0];
    
    square(arr, n, countArray, [0, 0])
    return countArray;
}