'use strict';

function Stack(string) {
    const array = string.split('');
    let arr = [];
    let i = 0;
    while(1) {
        if(array[i] === '(') { arr.push(array[i]); }
        else {
            if(arr.length <1) {
                console.log("NO");
                return;
            }
            arr.pop();
        }
        i++;
        if(array.length == i) { break; }
    }
    if(arr.length === 0) { console.log("YES"); }
    else { console.log("NO"); }
}

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let count = -1;

rl.on('line', function (line) {
    // 몇개의 문장을 입력 받을것인지
    if(count === -1) {
        count = parseInt(line);
        return;
    }
    
    Stack(line);

    count--;
    // 다 받을 시 종료
    if (count === 0) {
        rl.close();
    }
}).on('close', function() {
    process.exit();
});