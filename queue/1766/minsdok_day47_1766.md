---
title : "백준 1766 문제집(javascript)"
---
# Problem 1766


# [문제집](https://www.acmicpc.net/problem/1766)

## 구현, 정렬

### 문제

수를 처리하는 것은 통계학에서 상당히 중요한 일이다. 통계학에서 N개의 수를 대표하는 기본 통계값에는 다음과 같은 것들이 있다. 단, N은 홀수라고 가정하자.

1. 산술평균 : N개의 수들의 합을 N으로 나눈 값
2. 중앙값 : N개의 수들을 증가하는 순서로 나열했을 경우 그 중앙에 위치하는 값
3. 최빈값 : N개의 수들 중 가장 많이 나타나는 값
4. 범위 : N개의 수들 중 최댓값과 최솟값의 차이
5. N개의 수가 주어졌을 때, 네 가지 기본 통계값을 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 수의 개수 N(1 ≤ N ≤ 500,000)이 주어진다. 단, N은 홀수이다. 그 다음 N개의 줄에는 정수들이 주어진다. 입력되는 정수의 절댓값은 4,000을 넘지 않는다.

### 출력

첫째 줄에는 산술평균을 출력한다. 소수점 이하 첫째 자리에서 반올림한 값을 출력한다.

둘째 줄에는 중앙값을 출력한다.

셋째 줄에는 최빈값을 출력한다. 여러 개 있을 때에는 최빈값 중 두 번째로 작은 값을 출력한다.

넷째 줄에는 범위를 출력한다.

### 예제 입력 1
```
5
1
3
8
-2
2
```
### 예제 출력 1
```
2
2
1
10
```
### 예제 입력 2
```
1
4000
```
### 예제 출력 2
```
4000
4000
4000
0
```
### 예제 입력 3
```
5
-1
-2
-3
-1
-2
```
### 예제 출력 4
```
-2
-2
-1
2
```
---
### solve
- 위상 정렬을 사용하였다. 다음 블로그 참고 [위상 정렬](https://m.blog.naver.com/ndb796/221236874984)
- 위상 정렬에 우선순위 큐 minHeap정렬을 사용하였다.(minHeap 사용 이유는 문제에서 작은 수가 우선순위이기 때문)
    - 예제 1번을 예로 들겠다.
    - n : 4, m : 2 / 4 2 / 3 1
    - graph(문제 우선순위 정보) : [[], [], [], [], []], isDegree(연결된 선 수) : [0, 0, 0, 0, 0]를 저장할 n + 1크기의 배열을 선언한다.
    - graph : [[], [], [], [1], [2]], isDegree : [0, 1, 1, 0, 0]이 된다.
    - 위상 정렬에 의해 간선이 없는 것 부터 큐에 삽입 pq(minHeap) : [3, 4]
    - while문을 통해 삽입 삭제가 이루어진다.
        - n = 3 / pq : [4] / result : [3]
        - 3과 연결된 간선 삭제 isDegree : [0, 0, 1, 0, 0];
        - 이 때 삭제된 노드에 연결된 간선이 0이되면 pq에 삽입 pa(minHeap) : [1, 4]
        - 이 과정을 pq의 길이가 0이 될 때까지 반복한다.
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

let n = 0,
    m = 0;
let count = -1;
const input = [];

rl.on("line", function (line) {
    if (count === -1) {
        [n, m] = line.split(" ").map((v) => parseInt(v));
        count = m;
        return;
    }
    input.push(line.split(" ").map((v) => parseInt(v)));
    count--;
    if (count === 0) rl.close();
}).on("close", function () {
    const graph = Array.from(Array(n + 1), () => new Array());
    const isDegress = new Array(n + 1).fill(0);
    const result = [];

    input.forEach((str) => {
        const [prev, next] = str;
        graph[prev].push(next);
        isDegress[next] += 1;
    });

    const pq = new MinHeap();
    for (let i = 1; i <= n; i++) {
        if (isDegress[i] === 0) pq.add(i);
    }
    while (pq.size() > 0) {
        const n = pq.poll();
        result.push(n);
        graph[n].forEach((v) => {
            isDegress[v] -= 1;
            if (isDegress[v] === 0) {
                pq.add(v);
            }
        });
    }
    console.log(result.join(" "));
    process.exit();
});
```
