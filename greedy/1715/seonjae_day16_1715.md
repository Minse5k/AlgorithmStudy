# 1715 카드 정렬하기

### 나의풀이

```javascript
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input.shift());
const card = input.map((v) => parseInt(v));

function solution(n, card) {
  let count = 0;
  if (n === 1) {
    return card[0];
  }
  card.sort((a, b) => a - b);
  for (let i = 0; i < n - 1; i++) {
    count += card[0] + card[1];
    let tmp = card[0] + card[1];
    let tmpD = card.findIndex((v) => v >= tmp);
    const destination = tmpD === -1 ? card.length : tmpD;
    card = [...card.slice(2, destination), tmp, ...card.slice(destination)];
  }
  return count;
}

console.log(solution(n, card));
```
1. 카드 배열을 정렬한다.
2. 매 번 카드배열에서 첫번째 인덱스와 두번째 인덱스를 꺼내 count값에 더해준다.
3. 더해준 값을 카드배열에 자신보다크고 자기보다 작은 인덱스에 넣는다.
4. count를 반환해준다.  

### 다른 풀이
Heap을 가지고 풀이했다.

### 고친 나의 풀이
```javascript
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Card {
  constructor() {
    this.heap = [];
  }
    
  add(value) {  //삽입
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {  //작을수록 node로 접근
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      //최소값이 위로 올라가야되기때문에 부모노드보다 크면 종료
      if (this.heap[parentIndex] <= this.heap[currentIndex]) break;
      //값을 바꿔줌
      [this.heap[currentIndex], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[currentIndex],
      ];
      currentIndex = parentIndex;
    }
  }

  remove() {    //제거
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);   //제거후 자리 제정렬
    return min;
  }

  sinkDown(index) {
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const length = this.heap.length;
    let largestIndex = index;
    if(leftIndex<length && this.heap[leftIndex] < this.heap[largestIndex]){
      largestIndex = leftIndex;
    }
    if(rightIndex<length && this.heap[rightIndex] < this.heap[largestIndex]){
      largestIndex = rightIndex;
    }
    if(largestIndex !== index){
      [this.heap[index], this.heap[largestIndex]] = [this.heap[largestIndex], this.heap[index]]
      this.sinkDown(largestIndex);
    }
  }
}

const n = parseInt(input.shift());
const card = new Card();
//카드 힙 정리
input.forEach((i) => {
  const tmp = parseInt(i);
  card.add(tmp);
});

let count=0;
for(let i=0; i<n-1; i++){
  const tmp = card.remove() + card.remove();
  count+=tmp;
  card.add(tmp);
}

console.log(count);
```
### 주의할점
메모리 초과가 나오기 때문에 이 문제는 자료구조를 활용해서 풀어야된다.
힙 구현시 제거하는 method는 재귀함수인것을 주의!

> **출처**  
> https://jeongw00.tistory.com/172
> https://www.acmicpc.net/problem/1715
