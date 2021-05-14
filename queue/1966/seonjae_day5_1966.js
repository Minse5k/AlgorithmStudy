const fs = require("fs");
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const T = parseInt(input[0]);

for (let i = 1; i <= T; i++) {
  //각테스트케이스마다 실행
  const [N, point] = input[2 * i - 1].split(" ").map((v) => parseInt(v)); //배열 개수, 궁금한 인덱스
  const queue = input[2 * i].split(" ").map((v) => parseInt(v)); //우선순위가 담긴 Queue
  const printed = new Array(N).fill(false); //출력상태 배열
  let current = 0; //현재 가르키는 인덱스
  let count = 0; //몇번째에 출력하는지
  while (true) {
    //중요도 확인후 이동
    current = priority(current, queue, printed);
    //출력 후 다음 인덱스로 이동
    printed[current] = true;
    count++;
    //중요도 위치가 현재 원하는 위치와 같으면 종료
    if (current === point) break; 
    
    current = nextIndex(current, printed);
  }
  console.log(count);
}

function priority(current, queue, printed) {
  // 출력X, queue값이 높아야 이동
  let result = current;
  for (let i = current + 1; i < queue.length; i++) {
    if (!printed[i] && queue[i] > queue[result]) {
      result = i;
    }
  }
  for (let i = 0; i < current; i++) {
    if (!printed[i] && queue[i] > queue[result]) {
      result = i;
    }
  }
  return result;
}

//다음 인덱스 이동
function nextIndex(current, printed) {
  current = current + 1 === printed.length ? 0 : current + 1;
  let result = current;
  let nextIndex = true;
  for (let i = current; i < printed.length; i++) {
    if (!printed[i]) {
      result = i;
      nextIndex = false;
      break;
    }
  }
  if (nextIndex) {
    for (let i = 0; i < current; i++) {
      if (!printed[i]) {
        result = i;
        break;
      }
    }
  }
  return result;
}
