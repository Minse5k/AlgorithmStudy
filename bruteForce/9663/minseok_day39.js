'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let count = 0;

function isChess(visited, row) {
    for(let i = 1; i < row; i++) {
        if(visited[i] === visited[row]) return false;
        if(Math.abs(i - row) === Math.abs(visited[i] - visited[row])) return false;
    }
    return true;
}
function dfs(visited, row) {
    if(n === row) {
        count++;
    }
    else {
        for(let i = 1; i <= n; i++) {
            visited[row + 1] = i;
            if(isChess(visited, row + 1)) dfs(visited, row + 1);
        }
    }
}

let n = 0;
rl.on('line', function(line){
    n = parseInt(line);
    rl.close();
})
.on('close', function(){
    for(let i = 1; i <= n; i++) {
        const visited = new Array(n + 1).fill(0);
        visited[1] = i;
        dfs(visited, 1);
    }
    console.log(count);
    process.exit();
})
