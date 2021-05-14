const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n").map((v) => parseInt(v));
//Tree 클래스
class Tree {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
  add(num) {
    //Node삽입
    const node = this;
    const searchTree = function (node) {
      if (num < node.data) {
        //왼쪽자식
        if (node.left === null) {
          node.left = new Tree(num);
          return;
        } else {
          return searchTree(node.left);
        }
      } else {
        //오른쪽자식
        if (node.right === null) {
          node.right = new Tree(num);
        } else {
          return searchTree(node.right);
        }
      }
    };

    return searchTree(node);
  }
}

function postOrder(tree) {
  if (tree === null) {
    return;
  }
  postOrder(tree.left);
  postOrder(tree.right);
  console.log(tree.data);
}

//노드 삽입
const tree = new Tree(input[0]);

for (let i = 1; i < input.length; i++) {
  tree.add(input[i]);
}
//후위순회
postOrder(tree);
