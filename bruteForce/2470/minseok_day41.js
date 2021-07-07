const readline = require('readline');
const { isContext } = require('vm');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const input = [];
let count = 2;
rl.on('line', function(line) {
    input.push(line);
    count--;
    if(count === 0) rl.close();
}).on('close', function() {
    const n = parseInt(input[0]);
    const array = input[1].split(' ').map((v) => parseInt(v)).sort((a, b) => a - b);
    
    let min = Math.abs(array[n - 1] + array[n - 2]) + Math.abs(array[0] + array[1]);
    let leftIdx = 0;
    let rightIdx = n - 1;
    let x = 0, y = 0;
    
    while(leftIdx !== rightIdx) {
        let sum = array[leftIdx] + array[rightIdx];
        if(Math.abs(sum) < min) {
            min = Math.abs(sum);
            x = array[leftIdx];
            y = array[rightIdx];
        }
        if(sum < 0) {
            leftIdx++;
        } else if(sum > 0) {
            rightIdx--;
        } else if(sum === 0) {
            break;
        }
    }
    console.log(x, y);
    process.exit();
});