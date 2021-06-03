const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input.shift());
const arr = input.shift().split(' ').map((v) => parseInt(v));
const dp = new Array(n).fill(0);

//초기값 설정
dp[0] = arr[0];
let max = dp[0];
for(let i=1; i<n; i++){
    for(let j=0; j<i; j++){
        //맨앞 인덱스부터 크기를 비교한뒤 dp값을 비교해서 큰값으로 바꿔준다
        if(arr[j] < arr[i]){
            dp[i] = dp[j] >  dp[i] ? dp[j] : dp[i];
        }
    }
    dp[i] += arr[i];
    max = dp[i] > max ? dp[i] : max;
}
console.log(max);