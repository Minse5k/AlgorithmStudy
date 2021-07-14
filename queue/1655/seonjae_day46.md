# 1655 가운데로 말해요

## 문제

[1655번: 가운데를 말해요](https://www.acmicpc.net/problem/1655)

## 나의 풀이

```jsx
const fs = require("fs");
const arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((value) => parseInt(value));
class LeftHeap {
  constructor() {
    this.node = [];
  }

  add(num) {
    this.node.push(num);
    this.bottomUp();
  }

  size() {
    const nodeSize = this.node.length;
    return nodeSize;
  }

  middle() {
    return this.node[0];
  }

  bottomUp(index = this.node.length - 1) {
    if (index < 1) return;
    else {
      const childNode = this.node[index];
      const parentIndex = Math.floor((index - 1) / 2);
      const parentNode = this.node[parentIndex];

      if (parentNode >= childNode) return;
      else {
        this.node[index] = parentNode;
        this.node[parentIndex] = childNode;
        this.bottomUp(parentIndex);
      }
    }
  }

  delete() {
    const max = this.node[0];

    if (this.node.length === 1) {
      this.node.pop();
      return max;
    } else {
      this.node[0] = this.node.pop();
      this.topDown();
      return max;
    }
  }

  topDown(index = 0) {
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;
    const length = this.node.length;
    let parentIndex = index;
    //no Child!!
    if (!this.node[leftChildIndex] && !this.node[rightChildIndex]) return;
    //left Child
    if (!this.node[rightChildIndex]) {
      if (this.node[leftChildIndex] > this.node[parentIndex]) {
        parentIndex = leftChildIndex;
      }
    }
    //leftChild & rightChild
    if (this.node[leftChildIndex] > this.node[rightChildIndex]) {
      if (
        rightChildIndex <= length &&
        this.node[leftChildIndex] > this.node[parentIndex]
      )
        parentIndex = leftChildIndex;
    } else {
      if (
        leftChildIndex <= length &&
        this.node[rightChildIndex] > this.node[parentIndex]
      )
        parentIndex = rightChildIndex;
    }

    if (parentIndex !== index) {
      const tmp = this.node[parentIndex];
      this.node[parentIndex] = this.node[index];
      this.node[index] = tmp;
      this.topDown(parentIndex);
    }
  }
}

class RightHeap {
  constructor() {
    this.node = [];
  }

  add(num) {
    this.node.push(num);
    this.bottomUp();
  }

  size() {
    const nodeSize = this.node.length;
    return nodeSize;
  }

  middle() {
    return this.node[0];
  }

  bottomUp(index = this.node.length - 1) {
    if (index < 1) return;
    else {
      const childNode = this.node[index];
      const parentIndex = Math.floor((index - 1) / 2);
      const parentNode = this.node[parentIndex];

      if (parentNode <= childNode) return;
      else {
        this.node[index] = parentNode;
        this.node[parentIndex] = childNode;
        this.bottomUp(parentIndex);
      }
    }
  }

  delete() {
    const min = this.node[0];

    if (this.node.length === 1) {
      this.node.pop();
      return min;
    } else {
      this.node[0] = this.node.pop();
      this.topDown();
      return min;
    }
  }

  topDown(index = 0) {
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;
    const length = this.node.length;
    let parentIndex = index;
    //no Child!!
    if (!this.node[leftChildIndex] && !this.node[rightChildIndex]) return;
    //left Child
    if (!this.node[rightChildIndex]) {
      if (this.node[leftChildIndex] < this.node[parentIndex]) {
        parentIndex = leftChildIndex;
      }
    }
    //leftChild & rightChild
    if (this.node[leftChildIndex] > this.node[rightChildIndex]) {
      if (
        rightChildIndex <= length &&
        this.node[rightChildIndex] < this.node[parentIndex]
      )
        parentIndex = rightChildIndex;
    } else {
      if (
        leftChildIndex <= length &&
        this.node[leftChildIndex] < this.node[parentIndex]
      )
        parentIndex = leftChildIndex;
    }

    if (parentIndex !== index) {
      const tmp = this.node[parentIndex];
      this.node[parentIndex] = this.node[index];
      this.node[index] = tmp;
      this.topDown(parentIndex);
    }
  }
}
const count = arr.shift();
const left = new LeftHeap();
const right = new RightHeap();

left.add(arr[0]);
console.log(left.middle());

for (let i = 1; i < count; i++) {
  left.add(arr[i]);

  const leftLength = left.size();
  const rightLength = right.size();

  if (leftLength === rightLength + 2) {
    const tmp = left.delete();
    right.add(tmp);
    console.log(left.middle());
  } else {
    console.log(left.middle());
  }
}
```

## 설명

1. `Left(최대 힙)`과 `Right(최소 힙)`을 활용한다.
2. 처음 들어오는 수는 무조건 Left에 추가 후 출력해준다.
3. N이 2이상일 경우 다음과 같은 for문을 실행한다.
4. for문 실행 시 left에 현재 들어오는 값(arr[i])를 추가해준다.
5. Left가 Right 보다 +2 만큼 길면 Left의 값을 Right에 넘겨주고 Left값을 출력한다. 그렇지 않는 경우는 left값을 출력한다.

## 고친 후 나의 풀이

```jsx
const fs = require("fs");
const arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((value) => parseInt(value));

class MinHeap {
  constructor() {
    this.node = [];
  }
  add(num) {
    this.node.push(num);
    this.bottomUp();
  }
  size() {
    return this.node.length;
  }
  bottomUp(currentIndex = this.size() - 1) {
    if (currentIndex < 1) return;

    const currentNode = this.node[currentIndex];
    const parentIndex = Math.floor((currentIndex - 1) / 2);
    const parentNode = this.node[parentIndex];

    if (parentNode <= currentNode) return;

    [this.node[currentIndex], this.node[parentIndex]] = [
      parentNode,
      currentNode,
    ];
    this.bottomUp(parentIndex);
  }
  delete() {
    const max = this.node[0];
    if (this.size() === 1) {
      return this.node.pop();
    }

    this.node[0] = this.node.pop();
    this.topDown();

    return max;
  }
  topDown(currentIndex = 0) {
    const leftIndex = currentIndex * 2 + 1;
    const rightIndex = currentIndex * 2 + 2;
    const length = this.size();
    let parentIndex = currentIndex;

    if (leftIndex <= length && this.node[leftIndex] < this.node[parentIndex]) {
      parentIndex = leftIndex;
    }
    if (
      rightIndex <= length &&
      this.node[rightIndex] < this.node[parentIndex]
    ) {
      parentIndex = rightIndex;
    }
    if (parentIndex !== currentIndex) {
      [this.node[parentIndex], this.node[currentIndex]] = [
        this.node[currentIndex],
        this.node[parentIndex],
      ];
      this.topDown(parentIndex);
    }
  }
}

class MaxHeap {
  constructor() {
    this.node = [];
  }

  add(num) {
    this.node.push(num);
    this.bottomUp();
  }

  size() {
    return this.node.length;
  }

  bottomUp(currentIndex = this.node.length - 1) {
    if (currentIndex < 1) return;

    const currentNode = this.node[currentIndex];
    const parentIndex = Math.floor((currentIndex - 1) / 2);
    const parentNode = this.node[parentIndex];

    if (parentNode >= currentNode) return;

    [this.node[currentIndex], this.node[parentIndex]] = [
      parentNode,
      currentNode,
    ];
    this.bottomUp(parentIndex);
  }

  delete() {
    const min = this.node[0];
    if (this.size() === 1) {
      return this.node.pop();
    }

    this.node[0] = this.node.pop();
    this.topDown();

    return min;
  }

  topDown(currentIndex = 0) {
    const leftIndex = currentIndex * 2 + 1;
    const rightIndex = currentIndex * 2 + 2;
    const length = this.size();
    let parentIndex = currentIndex;

    if (leftIndex <= length && this.node[leftIndex] > this.node[parentIndex]) {
      parentIndex = leftIndex;
    }
    if (
      rightIndex <= length &&
      this.node[rightIndex] > this.node[parentIndex]
    ) {
      parentIndex = rightIndex;
    }
    if (parentIndex !== currentIndex) {
      [this.node[parentIndex], this.node[currentIndex]] = [
        this.node[currentIndex],
        this.node[parentIndex],
      ];
      this.topDown(parentIndex);
    }
  }
}

const left = new MaxHeap();
const right = new MinHeap();

let mid = arr[1];
let answer = arr[1] + "\n";

for (let i = 2; i < arr.length; i++) {
  if (arr[i] >= mid) {
    right.add(arr[i]);
  } else {
    left.add(arr[i]);
  }

  if (left.size() > right.size()) {
    right.add(mid);
    mid = left.delete();
  } else if (left.size() + 1 < right.size()) {
    left.add(mid);
    mid = right.delete();
  }
  answer += mid + "\n";
}
console.log(answer);
```

1. 처음 내가 구현한 우선순위큐가 잘못됐다는 것을 알게 되어 다른 사람 코드를 보며 수정했다.
2. console.log를 for문 한번에 하나씩 출력하지 않고 나중에 전체 출력해줬다.
3. mid값을 사용해서 mid보다 크고 작을 때 우선순위큐에 넣어주는것을 따로 처리하고 각 길이에 따라 다르게 처리해줘서 문제를 해결 했다.

최대힙, 최소힙을 구현하는 가장 대표적인 문제 같다. javascript의 클래스에 대해서 공부하고, 객체에 대해 조금 더 친숙해진 경험을 했다. 다른 언어는 우선순위 큐가 있지만 javascript는 없지만 없기 때문에 학습을 좀 더 깊게하는 경험을 되었다.

> [https://woongsios.tistory.com/216](https://www.acmicpc.net/source/30207504)
