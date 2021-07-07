# 1759 암호 만들기

# 문제

[1759번: 암호 만들기](https://www.acmicpc.net/problem/1759)

# 나의 풀이

```jsx
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [L, C] = inputs[0].split(" ").map((value) => parseInt(value));
const arr = inputs[1].split(" ").sort();

const isVowel = (i) => {
  return (
    arr[i] === "a" ||
    arr[i] === "e" ||
    arr[i] === "i" ||
    arr[i] === "o" ||
    arr[i] === "u"
  );
};

const checkConsonant = (index, password, consonant) => {
  switch (consonant) {
    case 0:
      break;
    case 1: {
      for (let i = index; i < C; i++) {
        if (!isVowel(i)) console.log(password + arr[i]);
      }
      break;
    }
    default: {
      for (let i = index; i < C; i++) console.log(password + arr[i]);
      break;
    }
  }
};

function dfs(index, k, password, vowel, consonant) {
  if (k === 1) {
    if (vowel) return checkConsonant(index, password, consonant);

    for (let i = index; i < C; i++) {
      if (!isVowel(i)) continue;
      console.log(password + arr[i]);
    }
    return;
  }

  for (let i = index; i < C; i++) {
    if (k > C - i) break;
    if (isVowel(i)) dfs(i + 1, k - 1, password + arr[i], true, consonant);
    else dfs(i + 1, k - 1, password + arr[i], vowel, consonant + 1);
  }
}

dfs(0, L, "", false, 0);
```

1. 사전순으로 출력하기 위해 알파벳 배열을 미리 오름차순으로 정렬해준다.
2. 현재 알파벳을 뽑고 만약에 다음 뽑을 개수가 알파벳 배열의 개수보다 클 경우는 뽑지 않는다.
3. 만약 현재 알파벳이 모음이라면 모음(vowel)값을 true로 바꿔주고 그렇지 않으면 자음의 개수(consonant)를 증가시켜준다.
4. 만약 k가(뽑아야 될 개수) 1일 경우 두가지 경우로 나뉜다.

- 모음이 있는 경우 - 자음의 개수에 따라 리턴을 해준다.
- 자음이 없는 경우: 더이상 확인하지않고 종료한다.
- 자음이 1개: 남은 알파벳을 뽑으며 자음일경우 출력 그렇지않으면 통과한다.
- 자음이 2개 이상: 모두 출력한다.
- 모음이 없는 경우 - 모음의 있다면 출력한다.

처음 문제를 풀 때 30%까지만 맞고 틀렸다. 아무리 생각해도 로직은 맞는 거 같은데 무엇이 잘못됐을까 곰곰이 생각해 봤다. 그래서 로직 순서를 글로 써보면서 놓친 부분을 찾기 위해 적었다. 그 결과 모음과 자음의 개수에 따라 출력되는 로직이 잘못됐다고 생각해서 고쳤더니 맞았다.

문제를 풀면서 최대한 방문하는 경우를 줄이려고 노력했다. 그래서 생각한 코드가 `if (k > C - i) break` 이다. 백트래킹을 생각하면서 풀고 꼼꼼하게 생각하게 되는 의미 있는 문제였다.
