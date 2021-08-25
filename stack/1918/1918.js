'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const input = [];
rl.on('line', function (line) {
    input.push(line.split(''));
    rl.close();
}).on('close', function () {
    let ops = "";
    const s = [];
    for (const ch of input[0]) {
        if ('A' <= ch && ch <= 'Z') {
            ops += ch;
        } else if (ch == '(') {
            s.push(ch);
        } else if (ch == ')') {
            while (s.length) {
                if (s[s.length - 1] == '(') {
                    s.pop();
                    break;
                }
                ops += s[s.length - 1];
                s.pop();
            }
        } else {
            while (s.length && Priority(s[s.length - 1]) >= Priority(ch)) {
                ops += s[s.length - 1];
                s.pop();
            }
            s.push(ch);
        }
    }

    while (s.length) {
        ops += s[s.length - 1];
        s.pop();
    }

    console.log(ops);
    process.exit();
});

function Priority(ch) {
    if (ch === '(') return 0;
    else if (ch === '+' || ch === '-') return 1;
    else return 2;
}