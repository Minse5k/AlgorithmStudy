const fs = require("fs");
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N ,M] = input[0].split(' ').map(i=>parseInt(i));
const card = input[1].split(' ').map(i=> parseInt(i)).sort((a,b) => a-b);

function solution(N, M, card){
    let answer = 0;
    for(let i=0;i<N-2; i++){    //첫번째수
        for(let j=i+1; j<N-1; j++){ //두번째 수
            for(let k=j+1; k<N; k++){   //세번째 수
                const sum = card[i]+card[j]+card[k];
                if(sum > M){    //정렬해서 그 이후는 신경안씀
                    break;
                } else{
                    answer = sum > answer ? sum : answer; 
                }
            }
        }
    }
    return answer;
}

console.log(solution(N,M,card));