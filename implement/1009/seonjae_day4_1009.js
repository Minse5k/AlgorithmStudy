const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");
const N = parseInt(input[0]);

function solution(N, input) {
  for (let i = 0; i < N; i++) {
    const [a, b] = input[i + 1].split(" ").map((v) => parseInt(v));
    const remA = a % 10; //1의자리
    if (remA === 0) {
      console.log(10);
    } else if (remA === 1 || remA === 5 || remA === 6) {
      //주기0  1,5,6
      console.log(remA);
    } else if (remA === 4 || remA === 9) {
      //주기2 4,9
      const tmp = b % 2 === 0 ? Math.pow(remA, 2) % 10 : remA;
      console.log(tmp);
    } else {
      //주기4 2,3,7,8
      const tmp = b % 4;
      switch (tmp) {
        case 1: {
          console.log(remA);
          break;
        }
        case 2: {
          console.log(Math.pow(remA, 2) % 10);
          break;
        }
        case 3: {
          console.log(Math.pow(remA, 3) % 10);
          break;
        }
        default: {
          console.log(Math.pow(remA, 4) % 10);
          break;
        }
      }
    }
  }
}
solution(N, input);
