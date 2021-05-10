'use strict';

function findeNum(array) {
    let arr = [];
    const total = array.reduce((prev,curr) => prev + curr);
    for(let i=0; i<8; i++) {
        for(let j = i+1; j<9; j++) {
            if(total-array[i]-array[j] === 100) {
                arr = array.filter((_element, idx) => idx !== i && idx !== j);
                break;
            }
        }
    }
    const sortedArray = arr.map((map) => map).sort((a,b) => a-b);
    sortedArray.forEach((element) => console.log(element));
}

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})
let input = [];
let count = 9;
rl.on('line', function(line) {
    input.push(parseInt(line));
    count --;
    if (count === 0) { rl.close(); }
}).on('close', function(){
    findeNum(input);
    process.exit();
})