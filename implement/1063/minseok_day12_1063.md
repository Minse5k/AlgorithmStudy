# Problem 1063

## 구현

### 문제 링크
<https://www.acmicpc.net/problem/1063>

### 틀렸습니다.
1. 아직 반례를 다 입력해보아도 틀린부분을 찾지 못했다.
2. 수정예정

### code
```javascript
'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

function inputChess(n) {
    switch(n) {
        case 'A':
            n = 0;
            break;
        case 'B':
            n = 1;
            break;
        case 'C':
            n = 2;
            break;
        case 'D':
            n = 3;
            break;
        case 'E':
            n = 4;
            break;
        case 'F':
            n = 5;
            break;
        case 'G':
            n = 6;
            break;
        case 'H':
            n = 7;
            break;
    }
    return n;
}

let cx = 0, cy = 0, rx = 0, ry = 0; // chess (x,y) rock (x,y)
function chessMove(char) {
    switch(char) {
        case 'R':
            if(cx + 1 < 8) {
                if(cx +1 === rx) {
                    if(rx + 1 < 8) {
                        rx += 1;
                        cx += 1;
                    }
                } else {
                    cx += 1;
                }
            }
            break;
        case 'L':
            if(cx - 1 >= 0) {
                if(cx - 1 === rx) {
                    if(rx - 1 >= 0) {
                        cx -= 1;
                        rx -= 1;
                    }
                } else {
                    cx -= 1;
                }
            }
            break;
        case 'B':
            if(cy - 1 >= 0) {
                if(cy -1 === ry) {
                    if(ry -1 >= 0) {
                        ry -= 1;
                        cy -= 1;
                    }
                } else {
                    cy -= 1;
                }
            }
            break;
        case 'T':
            if(cy +1 < 8) {
                if(cy + 1 === ry) {
                    if(ry + 1 < 8) {
                        ry += 1;
                        cy += 1;
                    }
                } else {
                    cy += 1;
                }
            }
            break;
        case 'RT':
            if(cx + 1 <  8 && cy + 1 < 8) {
                if(cy + 1 === ry && cx + 1 === rx) {
                    if(rx + 1 < 8 && ry + 1 < 8) {
                        cx += 1;
                        cy += 1;
                        rx += 1;
                        ry += 1;
                    }
                } else {
                    cx += 1;
                    cy += 1;
                }
            }
            break;
        case 'LT':
            if(cx - 1 >= 0 && cy + 1 < 8) {
                if(cx - 1 === rx && cy + 1 === ry) {
                    if(rx - 1 >= 0 && rx + 1 < 8) {
                        cx -= 1;
                        cy += 1;
                        rx -= 1;
                        ry += 1;
                    }
                } else {
                    cx -= 1;
                    cy += 1;
                }
            }
            break;
        case 'RB':
            if(cx + 1 < 8 && cy - 1 >= 0) {
                if(cx + 1 === rx && cy - 1 === ry) {
                    if(rx + 1 < 8 && ry - 1 >= 0) {
                        cx += 1;
                        cy -= 1;
                        rx += 1;
                        ry -= 1;
                    }
                } else {
                    cx += 1;
                    cy -= 1;
                }
            }
            break;
        case 'LB':
            if(cx - 1 >= 0 && cy - 1 >= 0) {
                if(cx - 1 === rx && cy - 1 == ry) {
                    if(rx - 1 >= 0 && ry - 1 >= 0) {
                        cx -= 1;
                        cy -= 1;
                        rx -= 1;
                        ry -= 1;
                    }
                } else {
                    cx -= 1;
                    cy -= 1;
                }
            }
            break;
    }
}

function changeChess(n) {
    switch(n) {
        case 0:
            n = 'A';
            break;
        case 1:
            n = 'B';
            break;        
        case 2:
            n = 'C';
            break;    
        case 3:
            n = 'D';
            break;
        case 4:
            n = 'E';
            break;
        case 5:
            n = 'F';
            break;
        case 6:
            n = 'G';
            break;
        case 7:
            n = 'H';
            break;
    }
    return n;
}
const chessboard = Array.from(Array(8), () => new Array(8).fill(0));
let input = [];
let chess = 0, rock = 0, count = 0, c;
rl.on('line', function(line) {
    if(chess === 0 && rock === 0) {
        [chess, rock, c] = line.split(' ');
        count = parseInt(c);
        return;
    }
    input.push(line);
    count--;
    if(count <= 0){
        rl.close();
    }
}).on('close', function() {
    [cx, cy] = chess.split('');
    [rx, ry] = rock.split('');
    cx = inputChess(cx);
    cy = parseInt(cy-1);
    rx = inputChess(rx);
    ry = parseInt(ry-1);
    for(let i = 0; i < parseInt(c); i++) {
        chessMove(input[i]);
    }
    cx = changeChess(cx);
    rx = changeChess(rx);
    console.log(cx+(cy+1));
    console.log(rx+(ry+1));

    process.exit();
})
