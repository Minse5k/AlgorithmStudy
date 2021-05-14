const fs = require("fs");
const n = parseInt(fs.readFileSync("/dev/stdin").toString());

function fibonaci(n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fibonaci(n - 2) + fibonaci(n - 1); //점화식 fibonaci(n) = fibonaci(n-2) + fibonaci(n-1)
}

console.log(fibonaci(n));
