---
title : "백준 1655 가운데를 말해요(javascript)"
---
# Problem 1655


# [가운데를 말해요](https://www.acmicpc.net/problem/1655)

## 우선순위 큐

### 문제

수빈이는 동생에게 "가운데를 말해요" 게임을 가르쳐주고 있다. 수빈이가 정수를 하나씩 외칠때마다 동생은 지금까지 수빈이가 말한 수 중에서 중간값을 말해야 한다. 만약, 그동안 수빈이가 외친 수의 개수가 짝수개라면 중간에 있는 두 수 중에서 작은 수를 말해야 한다.

예를 들어 수빈이가 동생에게 1, 5, 2, 10, -99, 7, 5를 순서대로 외쳤다고 하면, 동생은 1, 1, 2, 2, 2, 2, 5를 차례대로 말해야 한다. 수빈이가 외치는 수가 주어졌을 때, 동생이 말해야 하는 수를 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에는 수빈이가 외치는 정수의 개수 N이 주어진다. N은 1보다 크거나 같고, 100,000보다 작거나 같은 자연수이다. 그 다음 N줄에 걸쳐서 수빈이가 외치는 정수가 차례대로 주어진다. 정수는 -10,000보다 크거나 같고, 10,000보다 작거나 같다.

### 출력

한 줄에 하나씩 N줄에 걸쳐 수빈이의 동생이 말해야하는 수를 순서대로 출력한다.

### 예제 입력 1
```
7
1
5
2
10
-99
7
5
```
### 예제 출력 1
```
1
1
2
2
2
2
5
```
---
### solve
- 힙정렬을 사용하였다. (최대힙, 최소힙은 다음 블로그 참고) [https://nyang-in.tistory.com/155]
- 다음과같은 로직을 사용함
    - 1, 2, 3, 4, 5가 들어온 경우를 예로 들겠다.
    - 크기가 maxHeap > minHeap는 minHeap에 삽입, 그 외엔 maxHeap에 삽입한다.
    - 우리는 항상 max의 top값을 출력한다.
    - 만약 max의 top이 min의 탑보다 크다면 두 값을 바꿔준 후 top값을 출력한다.
    <table style="border: none;">
	    <tbody>
            <tr>
                <td><span style="color:red">1</span></td>
                <td>min : []</td>
                <td>max : [<span style="color:red">1</span>]</td>
                <td>result : [<span style="color:red">1</span>]</td>
            </tr>
            <tr>
                <td>1, <span style="color:red">2</span></td>
                <td>min : [<span style="color:red">2</span>]</td>
                <td>max : [1]</td>
                <td>result : [1, <span style="color:red">1</span>]</td>            
                </tr>
            <tr>
                <td>1, 2, <span style="color:red">3</span></td>
                <td>min : [2]</td>
                <td>max : [<span style="color:red">3</span>, 1]</td>
                <td>result : [1, 1]</td>        
            </tr>
            <tr>
                <td>1, 2, 3</td>
                <td>min : [<span style="color:blue">3</span>]</td>
                <td>max : [<span style="color:blue">2</span>, 1]</td>
                <td>result : [1, 1, <span style="color:red">2</span>]</td>
            </tr>
            <tr>
                <td>1, 2, 3, <span style="color:red">4</span></td>
                <td>min : [3, <span style="color:red">4</span>]</td>
                <td>max : [2, 1]</td>
                <td>result : [1, 1, 2, <span style="color:red">2</span>]</td>
            </tr>
                <tr>
                <td>1, 2, 3, 4, <span style="color:red">5</span></td>
                <td>min : [3, 4]</td>
                <td>max : [<span style="color:red">5</span>, 2, 1]</td>
                <td>result : [1, 1, 2, 2]</td>
            </tr>
                <tr>
                <td>1, 2, 3, 4, 5</td>
                <td>min : [4, <span style="color:blue">5</span>]</td>
                <td>max : [<span style="color:blue">3</span>, 2, 1]</td>
                <td>result : [1, 1, 2, 2, <span style="color:red">3</span>]</td>
            </tr>
        </tbody>
    </table>
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
      while (this.parent(index) !== undefined && this.parent(index) > this.items[index]) {
        this.swap(index, this.parentIndex(index));
        index = this.parentIndex(index);
      }
    }
    //bubbleDown
    bubbleDown() {
      let index = 0;
      while (this.leftChild(index) !== undefined && (this.leftChild(index) < this.items[index] || this.rightChild(index) < this.items[index])) {
        let smallerIndex = this.leftChildIndex(index);
        if (this.rightChild(index) !== undefined && this.rightChild(index) < this.items[smallerIndex]) {
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
  class MaxHeap extends MinHeap {
    //bubbleUp
    bubbleUp() {
      let index = this.items.length - 1;
      while (this.parent(index) !== undefined && this.parent(index) < this.items[index]) {
        this.swap(index, this.parentIndex(index));
        index = this.parentIndex(index);
      }
    }
    //bubbleDown
    bubbleDown() {
      let index = 0;
      while (this.leftChild(index) !== undefined && (this.leftChild(index) > this.items[index] || this.rightChild(index) > this.items[index])) {
        let largerIndex = this.leftChildIndex(index);
        if (this.rightChild(index) !== undefined && this.rightChild(index) > this.items[largerIndex]) {
          largerIndex = this.rightChildIndex(index);
        }
        this.swap(index, largerIndex);
        index = largerIndex;
      }
    }
  }

let n = 0;
let count = -1;
const result = [];
const max = new MaxHeap();
const min = new MinHeap();

rl.on("line", function (line) {
    if (count === -1) {
        count = parseInt(line);
        n = count;
        return;
    }

    if(max.size() > min.size()) {
        min.add(parseInt(line));
    } else {
        max.add(parseInt(line));
    }
    if(min.size() === 0) result.push(max.peek());
    else {
        if(max.peek() > min.peek()) {
            const tmp = max.poll();
            max.add(min.poll());
            min.add(tmp);
        } 
        result.push(max.peek());
    }
    count--;
    if (count === 0) rl.close();
}).on("close", function () {
    console.log(result.join("\n"));
    process.exit();
});
```