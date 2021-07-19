# 7662 이중 우선순위 큐

# 문제

[7662번: 이중 우선순위 큐](https://www.acmicpc.net/problem/7662)

# 나의 풀이

```jsx
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size = () => {
    return this.heap.length;
  };

  input = (node) => {
    this.heap.push(node);
    this.bubbleUp();
  };

  clear = () => {
    this.heap = [];
  };

  bubbleUp = (current = this.size() - 1) => {
    if (current === 0) return;
    const parent = Math.floor((current - 1) / 2);
    if (this.heap[parent] <= this.heap[current]) return;

    [this.heap[current], this.heap[parent]] = [
      this.heap[parent],
      this.heap[current],
    ];
    this.bubbleUp(parent);
  };

  output = () => {
    if (this.size() === 0) {
      this.heap = [];
      return;
    }

    if (this.size() === 1) {
      return this.heap.pop();
    }
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  };

  bubbleDown = (current = 0) => {
    const left = current * 2 + 1;
    const right = current * 2 + 2;
    const length = this.size();
    let parent = current;

    if (left <= length && this.heap[left] < this.heap[parent]) {
      parent = left;
    }
    if (right <= length && this.heap[right] < this.heap[parent]) {
      parent = right;
    }
    if (parent !== current) {
      [this.heap[parent], this.heap[current]] = [
        this.heap[current],
        this.heap[parent],
      ];
      this.bubbleDown(parent);
    }
  };
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size = () => {
    return this.heap.length;
  };

  input = (node) => {
    this.heap.push(node);
    this.bubbleUp();
  };

  clear = () => {
    this.heap = [];
  };

  bubbleUp = (current = this.size() - 1) => {
    if (current === 0) return;
    const parent = Math.floor((current - 1) / 2);
    if (this.heap[parent] >= this.heap[current]) return;

    [this.heap[current], this.heap[parent]] = [
      this.heap[parent],
      this.heap[current],
    ];
    this.bubbleUp(parent);
  };

  output = () => {
    if (this.size() === 0) {
      this.heap = [];
      return;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  };

  bubbleDown = (current = 0) => {
    const left = current * 2 + 1;
    const right = current * 2 + 2;
    const length = this.size();
    let parent = current;

    if (left <= length && this.heap[left] > this.heap[parent]) {
      parent = left;
    }
    if (right <= length && this.heap[right] > this.heap[parent]) {
      parent = right;
    }
    if (parent !== current) {
      [this.heap[parent], this.heap[current]] = [
        this.heap[current],
        this.heap[parent],
      ];
      this.bubbleDown(parent);
    }
  };
}

let start = false;
let T = -1;
let count = 0;
let answer = "";
const min = new MinHeap();
const max = new MaxHeap();

rl.on("line", function (line) {
  if (!start) {
    start = true;
    T = parseInt(line);
    return;
  }

  if (count === 0) {
    T--;
    count = parseInt(line);
    return;
  }

  count--;

  const [cmd, num] = line.split(" ");

  switch (cmd) {
    case "D": {
      if (parseInt(num) === 1) {
        if (min.size() === 0) {
          max.output();
        } else {
          const len = min.size();
          for (let i = 0; i < len; i++) {
            const num = min.output();
            max.input(num);
          }
          max.output();
        }
      } else {
        if (max.size() === 0) {
          min.output();
        } else {
          const len = max.size();
          for (let i = 0; i < len; i++) {
            const num = max.output();
            min.input(num);
          }
          min.output();
        }
      }
      break;
    }
    default: {
      if (min.size() === 0) max.input(parseInt(num));
      else min.input(parseInt(num));
    }
  }

  if (count === 0) {
    if (min.size() === 0 && max.size() === 0) {
      if (T === 0) {
        answer += "EMPTY";
      } else {
        answer += "EMPTY\n";
      }
    } else {
      if (min.size() === 0) {
        answer += max.heap[0] + " ";
        const len = max.size();
        for (let i = 0; i < len; i++) {
          const num = max.output();
          min.input(num);
        }
        if (T === 0) {
          answer += min.heap[0];
        } else {
          answer += min.heap[0] + "\n";
        }
      } else {
        const tmp = min.heap[0];
        const len = min.size();
        for (let i = 0; i < len; i++) {
          const num = min.output();
          max.input(num);
        }
        if (T === 0) {
          answer += max.heap[0] + " " + tmp;
        } else {
          answer += max.heap[0] + " " + tmp + "\n";
        }
      }
    }
    min.clear();
    max.clear();
  }

  if (T === 0 && count === 0) rl.close();

  return;
}).on("close", function () {
  console.log(answer);
  process.exit();
});
```

나는 처음 문제를 접했을 때 우선순위큐를 어떻게 사용해야될지 고민했다. 

처음 생각한 방법은 기존 배열과 최대 힙, 최소 힙 자료구조를 만들어서 명령어에 따라 왔다갔다 하는 생각을 했다. 하지만 메모리 초과가 나와서 틀리게 됐다. 

2번째 방법은 기존배열을 사용하지 않고 최소힙과 최대힙만 가지고 삭제 명령어에 따라 최대값을 사라지게 하면 최소힙에 있는 배열을 최대힙으로 옮기고, 최소값을 사라지게 한다면 최대힙에 있는 것을 모두 옮기는 방향으로 문제를 풀었다. 지금 풀이가 2번째 풀이이다. 하지만 이번 풀이는 시간초과가 나와서 실패했다.