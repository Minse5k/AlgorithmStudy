# Problem 16918

## 구현, 그래프

### 문제 링크
<https://www.acmicpc.net/problem/16918>

### solved

### 주의할점

### code
```javascript
"use strict";
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let r = 0,
    c = 0,
    n = 0;
let count = -1;
const input = []; // (r x c) 행렬 판
rl.on("line", function (line) {
    if (count === -1) {
        [r, c, n] = line.split(" ").map((v) => parseInt(v));
        count = r;
        return;
    }
    input.push(line.split(""));
    count--;
    if (count === 0) {
        rl.close();
    }
}).on("close", function () {
    let time = 0;
    while (time <= n) {
        if (time >= 2) {
            if (time % 2 === 0) {
                changeNum(".", time);
            } else {
                bomberMan(time);
            }
        }
        time++;
    }
    changeBomb();
    for (let i = 0; i < r; i++) {
        console.log(input[i].join(""));
    }
    process.exit();
});
//t-3초의 폭탄을 터트림
function bomberMan(t) {
    if (t === 3) {
        t = "O";
    } else {
        t = (t - 3).toString();
    }
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (input[i][j] === t) {
                input[i][j] = ".";
                if (i + 1 < r) {
                    if (input[i + 1][j] !== t) {
                        input[i + 1][j] = ".";
                    }
                }
                if (i - 1 >= 0) {
                    if (input[i - 1][j] !== t) {
                        input[i - 1][j] = ".";
                    }
                }
                if (j + 1 < c) {
                    if (input[i][j + 1] !== t) {
                        input[i][j + 1] = ".";
                    }
                }
                if (j - 1 >= 0) {
                    if (input[i][j - 1] !== t) {
                        input[i][j - 1] = ".";
                    }
                }
            }
        }
    }
}
//a를 x로 다 바꿔줌
function changeNum(a, x) {
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (input[i][j] === a) {
                input[i][j] = x.toString();
            }
        }
    }
}
// 숫자로 돼있는 폭탄을 전부 'O'로 바꿔줌
function changeBomb() {
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            if (!isNaN(input[i][j])) {
                input[i][j] = "O";
            }
        }
    }
}