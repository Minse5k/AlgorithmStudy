'use strict';

const { join } = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

function combination(arr, selectNum) {
    const result = [];
    if (selectNum === 1) return arr.map((v) => [v]);
    arr.forEach((v, idx, arr) => {
      const fixed = v;
      const restArr = arr.slice(idx + 1);
      const combinationArr = combination(restArr, selectNum - 1);
      const combineFix = combinationArr.map((v) => [fixed, ...v]);
      result.push(...combineFix);
    });
    return result;
  }

const input = [];
let count = 2;
rl.on('line', function(line) {
    input.push(line);
    count--;
    if(count === 0) rl.close();
}).on('close', function() {
    const [n, m] = input[0].split(' ').map((v) => parseInt(v));
    const array = input[1].split(' ').sort();
    const result = combination(array, n);

    for(const world of result) {
        let cnt = 0;
        if(world.includes('a')) cnt++;
        if(world.includes('e')) cnt++;
        if(world.includes('i')) cnt++;
        if(world.includes('o')) cnt++;
        if(world.includes('u')) cnt++;
        if(world.length - cnt >= 2 && cnt >= 1) console.log(world.join(''));
    }

    process.exit();
});