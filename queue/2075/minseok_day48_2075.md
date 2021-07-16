---
title : "백준 2075 N번째 큰 수(javascript)"
---
# Problem 2075


# [통계학](https://www.acmicpc.net/problem/2075)

## 정렬, 우선순위 큐

### 문제
N×N의 표에 수 N2개 채워져 있다. 채워진 수에는 한 가지 특징이 있는데, 모든 수는 자신의 한 칸 위에 있는 수보다 크다는 것이다. N=5일 때의 예를 보자.
```
12	7	9	15	5
13	8	11	19	6
21	10	26	31	16
48	14	28	35	25
52	20	32	41	49
```
이러한 표가 주어졌을 때, N번째 큰 수를 찾는 프로그램을 작성하시오. 표에 채워진 수는 모두 다르다.

### 입력

첫째 줄에 N(1 ≤ N ≤ 1,500)이 주어진다. 다음 N개의 줄에는 각 줄마다 N개의 수가 주어진다. 표에 적힌 수는 -10억보다 크거나 같고, 10억보다 작거나 같은 정수이다.

### 출력

첫째 줄에 N번째 큰 수를 출력한다.

### 예제 입력 1
```
5
12 7 9 15 5
13 8 11 19 6
21 10 26 31 16
48 14 28 35 25
52 20 32 41 49
```
### 예제 출력 1
```
35
```
---
### solve
- `최소힙정렬`을 이용하였다.
- 입력을 받으면 최소힙 min에 `add`한다.
- 이때 min이 `N + 1` 개가 되면 하나를 삭제 한다.
    - 이때 min은 항상 N개가 남게 되며 가장 큰 숫자 `N`개가 남게된다.(메모리 제한이 12MB여서 N개보다 더 크게 갖지 않게 하기 위함.)
- 최종적으로 모두 입력을 마친후 `top`값이 N번째로 큰 수이다.
---

###  code

```javascript
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
class Heap {
    constructor() {
        this.items = [];
    }
    swap(index1, index2) {
        let temp = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = temp;
    }
    parentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    leftChildIndex(index) {
        return index * 2 + 1;
    }
    rightChildIndex(index) {
        return index * 2 + 2;
    }
    parent(index) {
        return this.items[this.parentIndex(index)];
    }
    leftChild(index) {
        return this.items[this.leftChildIndex(index)];
    }
    rightChild(index) {
        return this.items[this.rightChildIndex(index)];
    }
    peek() {
        return this.items[0];
    }
    size() {
        return this.items.length;
    }
}
class MinHeap extends Heap {
    //bubbleUp
    bubbleUp() {
        let index = this.items.length - 1;
        while (
            this.parent(index) !== undefined &&
            this.parent(index) > this.items[index]
        ) {
            this.swap(index, this.parentIndex(index));
            index = this.parentIndex(index);
        }
    }
    //bubbleDown
    bubbleDown() {
        let index = 0;
        while (
            this.leftChild(index) !== undefined &&
            (this.leftChild(index) < this.items[index] ||
                this.rightChild(index) < this.items[index])
        ) {
            let smallerIndex = this.leftChildIndex(index);
            if (
                this.rightChild(index) !== undefined &&
                this.rightChild(index) < this.items[smallerIndex]
            ) {
                smallerIndex = this.rightChildIndex(index);
            }
            this.swap(index, smallerIndex);
            index = smallerIndex;
        }
    }
    //add
    add(item) {
        this.items[this.items.length] = item;
        this.bubbleUp();
    }
    //poll
    poll() {
        let item = this.items[0];
        this.items[0] = this.items[this.items.length - 1];
        this.items.pop();
        this.bubbleDown();
        return item;
    }
}
let n = 0;
let count = -1;
const min = new MinHeap();

rl.on("line", function (line) {
    if (count === -1) {
        count = parseInt(line);
        n = count;
        return;
    }
    //삽입및 사제하는 구문
    line.split(' ').forEach((value) => {
        min.add(parseInt(value));
        if(min.size() > n) min.poll();
    });
    count--;
    if (count === 0) rl.close();
}).on("close", function () {
    console.log(min.peek());
    process.exit();
});
```