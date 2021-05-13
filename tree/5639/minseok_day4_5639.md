# Problem 1991

## 트리, 재귀

### 문제 링크
<https://www.acmicpc.net/problem/>

### solved
1. 전위순회
  - 현재의 노드가 `.`이면 종료
  - 출력   
  - 왼쪽 자식으로 재귀
  - 오른쪽 자식으로 재귀

2. 전위순회를 통해 입력하는 insert 함수를 작성했다.

3. 후위순회
  - 현재의 노드가 `.`이면 종료
  - 왼쪽 자식으로 재귀
  - 오른쪽 자식으로 재귀
  - 출력

### 주의할점


### code
```javascript
'use strict';

class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    insert(data) {
        const node = this;
        const searchTree = function(node) {
            if(data < node.data) {
                if(node.left === null) {
                    node.left = new Node(data);
                    return;
                }
                else {
                    return searchTree(node.left);
                }
            }
            else {
                if(node.right === null) {
                    node.right = new Node(data);
                    return;
                }
                else {
                    return searchTree(node.right);
                }
            }
        }
        return searchTree(node);
    }
}

function postOrder(node) {
    if(node === null) {
        return;
    }
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.data);
}

const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants");
const readline = require("readline");
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

let input = [];

rl.on('line', function(line) {
    input.push(parseInt(line));
}).on('close', function(){
    const tree = new Node(input[0]);
    for(let i = 1; i < input.length; i++) {
        tree.insert(input[i]);
    }
    postOrder(tree);
    process.exit();
})