---
title : "백준 13975 파일 합치기3(javascript)"
---
# Problem 13975


# [파일 합치기3](https://www.acmicpc.net/problem/13975)

## 그리디, 우선순위 큐

### 문제

소설가인 김대전은 소설을 여러 장(chapter)으로 나누어 쓰는데, 각 장은 각각 다른 파일에 저장하곤 한다. 소설의 모든 장을 쓰고 나서는 각 장이 쓰여진 파일을 합쳐서 최종적으로 소설의 완성본이 들어있는 한 개의 파일을 만든다. 이 과정에서 두 개의 파일을 합쳐서 하나의 임시파일을 만들고, 이 임시파일이나 원래의 파일을 계속 두 개씩 합쳐서 파일을 합쳐나가고, 최종적으로는 하나의 파일로 합친다. 두 개의 파일을 합칠 때 필요한 비용(시간 등)이 두 파일 크기의 합이라고 가정할 때, 최종적인 한 개의 파일을 완성하는데 필요한 비용의 총 합을 계산하시오.

예를 들어, C1, C2, C3, C4가 네 개의 장을 수록하고 있는 파일이고, 파일 크기가 각각 40, 30, 30, 50 이라고 하자. 이 파일들을 합치는 과정에서, 먼저 C2와 C3를 합쳐서 임시파일 X1을 만든다. 이때 비용 60이 필요하다. 그 다음으로 C1과 X1을 합쳐 임시파일 X2를 만들면 비용 100이 필요하다. 최종적으로 X2와 C4를 합쳐 최종파일을 만들면 비용 150이 필요하다. 따라서, 최종의 한 파일을 만드는데 필요한 비용의 합은 60+100+150=310 이다. 다른 방법으로 파일을 합치면 비용을 줄일 수 있다. 먼저 C1과 C2를 합쳐 임시파일 Y1을 만들고, C3와 C4를 합쳐 임시파일 Y2를 만들고, 최종적으로 Y1과 Y2를 합쳐 최종파일을 만들 수 있다. 이때 필요한 총 비용은 70+80+150=300 이다.

소설의 각 장들이 수록되어 있는 파일의 크기가 주어졌을 때, 이 파일들을 하나의 파일로 합칠 때 필요한 최소비용을 계산하는 프로그램을 작성하시오.

### 입력

프로그램은 표준 입력에서 입력 데이터를 받는다. 프로그램의 입력은 T개의 테스트 데이터로 이루어져 있는데, T는 입력의 맨 첫 줄에 주어진다.각 테스트 데이터는 두 개의 행으로 주어지는데, 첫 행에는 소설을 구성하는 장의 수를 나타내는 양의 정수 K (3 ≤ K ≤ 1,000,000)가 주어진다. 두 번째 행에는 1장부터 K장까지 수록한 파일의 크기를 나타내는 양의 정수 K개가 주어진다. 파일의 크기는 10,000을 초과하지 않는다.

### 출력

프로그램은 표준 출력에 출력한다. 각 테스트 데이터마다 정확히 한 행에 출력하는데, 모든 장을 합치는데 필요한 최소비용을 출력한다.

### 예제 입력 1
```
2
4
40 30 30 50
15
1 21 3 4 5 35 5 4 3 5 98 21 14 17 32
```
### 예제 출력 1
```
300
826
```
---
### solve
- 최소힙 정렬을 이용하였다.
- 30, 40, 30, 50을 예로 들겠다.
    - 최소힙을 기준으로 최솟값 2개 30 + 30 = 60
    - 힙 = [40, 50, 60] answer = 60
    - 최솟값 2개 40 + 50 = 90
    - 힙 = [60, 90] answer = 60 + 90
    - 최솟값 2개 60 90 = 150 / answer = 60 + 90 + 150

---
###  code

```javascript
"use strict";
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

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = -1;
let n = 0;
const result = [];
rl.on("line", function (line) {
    if(count === -1) {
        count = 2 * parseInt(line);
        return;
    }
    if(count % 2 === 0) {
        n = parseInt(line);
    } else {
        const input = line.split(' ').map((v) => parseInt(v));
        const minHeap = new MinHeap();
        //최소힙에 삽입
        for(let i = 0; i < n; i++) {
            minHeap.add(input[i]);
        }
        let sum = 0;
        for(let i = 0; i < n - 1; i++) {
            let x = minHeap.poll();
            x += minHeap.poll();
            minHeap.add(x);
            sum += x;
        }
        result.push(sum);
    }
    count--;
    if(count === 0) rl.close();
}).on("close", function () {
    console.log(result.join('\n'));
    process.exit();
});
```