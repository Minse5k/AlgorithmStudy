'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const tetromino = [
    // 'ㅡ' 
    [ [0,0], [0,1], [0,2], [0,3] ],
    [ [0,0], [1,0], [2,0], [3,0] ],
    // 'ㅁ'
    [ [0,0], [1,0], [0,1], [1,1] ],
    // 'ㄴ'
    [ [0,0], [1,0], [2,0], [2,1] ],
    [ [1,0], [1,1], [1,2], [0,2] ],
    [ [0,0], [0,1], [1,1], [2,1] ],
    [ [1,0], [0,0], [0,1], [0,2] ],
    [ [2,0], [2,1], [1,1], [0,1] ],
    [ [0,0], [0,1], [0,2], [1,2] ],
    [ [2,0], [1,0], [0,0], [0,1] ],
    [ [0,0], [1,0], [1,1], [1,2] ],
    // 'ㅗ'
    [ [0,1], [1,0], [1,1], [1,2] ],
    [ [0,0], [0,1], [0,2], [1,1] ],
    [ [0,0], [1,0], [2,0], [1,1] ],
    [ [1,0], [0,1], [1,1], [2,1] ],
    // 'ㄱㄴ'
    [ [0,0], [0,1], [1,1], [1,2] ],
    [ [0,1], [1,1], [1,0], [2,0] ],
    [ [1,0], [1,1], [0,1], [0,2] ],
    [ [0,0], [1,0], [1,1], [2,1] ]
];

let count = -1;
const input = [];
rl.on('line', function(line) {
    if(count === -1) {
        input.push(line.split(' ').map((v) => parseInt(v)));
        count = input[0][0]
        return;
    }
    input.push(line.split(' ').map((v) => parseInt(v)));
    count--;
    if(count === 0) rl.close();
}).on('close', function() {
    const [n, m] = input.shift();
    let max = 0;
    for(let i = 0; i < tetromino.length; i++) {
        const block = tetromino[i];
        for(let j = 0; j < n; j++) {
            for(let k = 0; k < m; k++) {
                let sum = 0;
                for(let l = 0; l < 4; l++) {
                    if(j + block[l][0] >= n || k + block[l][1] >= m) {
                        continue;
                    } else {
                        sum += input[j + block[l][0]][k + block[l][1]];
                    }
                }
                if(sum > max) max = sum;
            }
        }
    }
    console.log(max);
    process.exit();
})