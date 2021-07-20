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

# 고친 나의 풀이

```jsx
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Heap {
  constructor() {
    this.heap = [];
  }
  get size() {
    return this.heap.length;
  }
  get empty() {
    return this.size === 0 ? true : false;
  }
  clear() {
    this.heap = [];
  }
}

class MinHeap extends Heap {
  input(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp(currentIndex = this.size - 1) {
    if (currentIndex < 1) return;

    const currentNode = this.heap[currentIndex];
    const parentIndex = Math.floor((currentIndex - 1) / 2);
    const parentNode = this.heap[parentIndex];

    if (parentNode.num <= currentNode.num) return;

    [this.heap[currentIndex], this.heap[parentIndex]] = [
      parentNode,
      currentNode,
    ];
    this.bubbleUp(parentIndex);
  }

  pull() {
    const min = this.heap[0];
    if (this.size === 1) {
      return this.heap.pop();
    }
    this.heap[0] = this.heap.pop();

    this.bubbleDown();
    return min;
  }

  bubbleDown(currentIndex = 0) {
    const leftIndex = currentIndex * 2 + 1;
    const rightIndex = currentIndex * 2 + 2;
    const length = this.size;
    let parentIndex = currentIndex;

    if (
      leftIndex < length &&
      this.heap[leftIndex].num < this.heap[parentIndex].num
    ) {
      parentIndex = leftIndex;
    }
    if (
      rightIndex < length &&
      this.heap[rightIndex].num < this.heap[parentIndex].num
    ) {
      parentIndex = rightIndex;
    }
    if (parentIndex !== currentIndex) {
      [this.heap[parentIndex], this.heap[currentIndex]] = [
        this.heap[currentIndex],
        this.heap[parentIndex],
      ];
      this.bubbleDown(parentIndex);
    }
  }
}

class MaxHeap extends Heap {
  input(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp(currentIndex = this.heap.length - 1) {
    if (currentIndex < 1) return;

    const currentNode = this.heap[currentIndex];
    const parentIndex = Math.floor((currentIndex - 1) / 2);
    const parentNode = this.heap[parentIndex];

    if (parentNode.num >= currentNode.num) return;

    [this.heap[currentIndex], this.heap[parentIndex]] = [
      parentNode,
      currentNode,
    ];
    this.bubbleUp(parentIndex);
  }

  pull() {
    const min = this.heap[0];
    if (this.size === 1) {
      return this.heap.pop();
    }

    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return min;
  }

  bubbleDown(currentIndex = 0) {
    const leftIndex = currentIndex * 2 + 1;
    const rightIndex = currentIndex * 2 + 2;
    const length = this.size;
    let parentIndex = currentIndex;

    if (
      leftIndex < length &&
      this.heap[leftIndex].num > this.heap[parentIndex].num
    ) {
      parentIndex = leftIndex;
    }
    if (
      rightIndex < length &&
      this.heap[rightIndex].num > this.heap[parentIndex].num
    ) {
      parentIndex = rightIndex;
    }
    if (parentIndex !== currentIndex) {
      [this.heap[parentIndex], this.heap[currentIndex]] = [
        this.heap[currentIndex],
        this.heap[parentIndex],
      ];
      this.bubbleDown(parentIndex);
    }
  }
}

let checkedStart = false;
let T, visited;
let count = 0;
let answer = "";
const min = new MinHeap();
const max = new MaxHeap();

rl.on("line", function (line) {
  if (!checkedStart) {
    checkedStart = true;
    T = parseInt(line);
    return;
  }

  if (count === 0) {
    T--;
    count = parseInt(line);
    visited = new Array(count).fill(false);
    return;
  }

  count--;
  const [cmd, num] = line.split(" ");

  switch (cmd) {
    case "I": {
      min.input({ num: +num, index: count });
      max.input({ num: +num, index: count });
      visited[count] = true;
      break;
    }
    default: {
      if (parseInt(num) === 1) {
        while (!max.empty && !visited[max.heap[0].index]) max.pull();

        if (!max.empty) {
          visited[max.heap[0].index] = false;
          max.pull();
        }
      } else {
        while (!min.empty && !visited[min.heap[0].index]) min.pull();

        if (!min.empty) {
          visited[min.heap[0].index] = false;
          min.pull();
        }
      }
    }
  }

  while (!max.empty && !visited[max.heap[0].index]) max.pull();
  while (!min.empty && !visited[min.heap[0].index]) min.pull();

  if (count === 0) {
    if (min.empty && max.empty) answer += "EMPTY\n";
    else answer += `${max.heap[0].num} ${min.heap[0].num}\n`;
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

다른 사람의 코드를 보고 작성을 했다. 이 코드는 방문기록을 남겨 풀이하는 방법이다. 풀이법은 입력받을 때는 `특정인덱스(count)` 에 방문 표시를 해주고 그 이후 삭제가 될 때 방문을 해제해준다. 그리고 삭제 연산을 할 때 최상단 노드가 방문이 해제 되어 있다면 계속 삭제를 해주고 방문이 된다면 삭제 연산을 실행 시켜준다.

우선순위큐 문제를 풀 때 마다 힙구현하기가 만만치 않았지만 이번에는 트리노드에 숫자가 아닌 객체를 넣어서 풀어봤다. `bubbleDown` 할 때 조건부가 잘못돼서`(나의 풀이: left ≤ length -> 고친 풀이: left < length)` syntax error도 나오긴 했지만 이번 문제를 풀면서 알게 되었고, class내부에서 get을 사용해서 정의하는 법도 알게되는 좋은 계기가 되었다.

> [https://jaimemin.tistory.com/997](https://jaimemin.tistory.com/997)
