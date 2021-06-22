function solution(dirs) {
    const map = Array.from(Array(11), () => new Array(11).fill(false));
    const visitedX = Array.from(Array(11), () => new Array(11).fill(false));
    const visitedY = Array.from(Array(11), () => new Array(11).fill(false));
    let startX = 5;
    let startY = 5;
    map[startX][startY] = true;
    let count = 0;
    
    for(let i = 0; i < dirs.length; i++) {
        switch(dirs[i]) {
            case 'U':
                if(startX - 1 >= 0) {
                    startX--;
                    if(!visitedX[startX][startY]) {
                        visitedX[startX][startY] = true;
                        count++;
                    }
                }
                break;
            case 'D':
                if(startX + 1 < 11) {
                    if(!visitedX[startX][startY]) {
                        visitedX[startX][startY] = true;
                        count++;
                    }
                    startX++;
                }
                break;
            case 'R':
                if(startY + 1 < 11) {
                    if(!visitedY[startX][startY]) {
                        visitedY[startX][startY] = true;
                        count++;
                    }
                    startY++;
                }
                break;
            case 'L':
                if(startY - 1 >= 0) {
                    startY--;
                    if(!visitedY[startX][startY]) {
                        visitedY[startX][startY] = true;
                        count++;
                    }
                }
                break;
        }
        if(!map[startX][startY]) {
            map[startX][startY] = true;
        }
    }
    return count;
}