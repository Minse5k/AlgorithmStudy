const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, k] = input.shift().split(' ').map(v=> parseInt(v));
const coin = input.map(v=>parseInt(v));

function solution(k){
  let count = 0;
  for(let i=coin.length-1; i>=0; i--){
    if(k >=coin[i]){ 
      const plus = Math.floor(k/coin[i]);
      count+=plus;
      k = k% coin[i];
    }
  }
  return count;
}

console.log(solution(k));