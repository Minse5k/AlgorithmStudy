"use strict";
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let count = -1;
const input = [];
rl.on("line", function (line) {
    if (count === -1) {
        input.push(parseInt(line));
        count = input[0];
        return;
    }
    input.push(line.split(" ").map((v) => parseInt(v)));
    count--;
    if (count === 0) rl.close();
}).on("close", function () {
    const n = input.shift();
    for (let i = 0; i < n; i++) {
        fly(0, input[i][1] - input[i][0]);
    }
    process.exit();
});

function fly(start, end) {
    const a = parseInt(Math.sqrt(end - start));
    const b = end - start;
    if(b === a*a) {
        console.log(2*a-1);
    } else if(a * a < b && b <= a * a + a) {
        console.log(2 * a);
    } else if(a * a < b && b < (a + 1) * (a + 1)) {
        console.log(2 * a + 1);
    }
}