'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})
const input = [];
let count = -1;
rl.on('line', function(line) {
    if(count === -1) {
        input.push(line.split(' ').map((v) => parseInt(v)));
        count = input[0][0] + 1;
        return;
    }
    input.push(line.split(' ').map((v) => parseInt(v)));
    count--;
    if(count === 0) {
        rl.close();
    }
}).on('close', function() {
    const [n, m, startX, startY, cnt] = input.shift();
    const actionArray = input.pop();
    const diceArray = [[0,2,0],[4,1,3],[0,5,0],[0,6,0]];
    const diceNum = [0, 0, 0, 0, 0, 0, 0];
    let nx = startX, ny = startY;
    for(let i = 0; i < actionArray.length; i++) {
        let check = false;
        [nx, ny, check] = movelocation(n, m, nx, ny, actionArray[i]);
        if(check) {
            rotationDice(actionArray[i], diceArray);
            setNumDice(diceArray, diceNum, input, nx, ny);
        }
    }
})
//let check = true;
function movelocation(n, m, nowX, nowY, cardinalPoint) {
    let x = 0, y = 0;
    if(cardinalPoint === 1) {
        if(nowY + 1 >= m) {
            return [nowX, nowY, false];
        } else {
            x = nowX;
            y = nowY + 1;
        }
    } else if(cardinalPoint === 2) {
        if(nowY - 1 < 0) {
            return [nowX, nowY, false];
        } else {
            x = nowX;
            y = nowY - 1;
        }
    } else if(cardinalPoint === 3) {
        if(nowX - 1 < 0) {
            return [nowX, nowY, false];
        } else {
            x = nowX - 1;
            y = nowY;
        }
    } else if(cardinalPoint === 4) {
        if(nowX + 1 >= n) {
            return [nowX, nowY, false];
        } else {
            x = nowX + 1;
            y = nowY;
        }
    }
    return [x, y, true];
}

function rotationDice(cPoint, dArr) {
    if(cPoint === 1) {
        const tmp1 = dArr[1][2];
        const tmp2 = dArr[3][1];
        for(let i = 1; i >= 0; i--) {
            dArr[1][i + 1] = dArr[1][i];
        }
        dArr[1][0] = tmp2;
        dArr[3][1] = tmp1;
    } else if(cPoint === 2) {
        const tmp1 = dArr[1][0];
        const tmp2 = dArr[3][1];
        for(let i = 0; i <= 1; i++) {
            dArr[1][i] = dArr[1][i + 1];
        }
        dArr[1][2] = tmp2;
        dArr[3][1] = tmp1;
    } else if(cPoint === 3) {
        const tmp = dArr[0][1];
        for(let i = 1; i < 4; i++) {
            dArr[i - 1][1] = dArr[i][1];
        }
        dArr[3][1] = tmp;
    } else if(cPoint === 4) {
        const tmp = dArr[3][1];
        for(let i = 2; i >= 0; i--) {
            dArr[i + 1][1] = dArr[i][1];
        }
        dArr[0][1] = tmp;
    }
}

function setNumDice(diceArray, dice, input, nx, ny) {
    const bottom = diceArray[1][1];
    const top = diceArray[3][1];
    const num = input[nx][ny];
    if(num === 0) {
        input[nx][ny] = dice[bottom];
    } else {
        dice[bottom] = num;
        input[nx][ny] = 0;
    }
    console.log(dice[top]);
}