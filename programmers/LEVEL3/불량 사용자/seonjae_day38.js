function getCombination(k, arr) {
  const results = [];
  if (k === 1) return arr.map((value) => [value]);

  arr.forEach((fixed, index) => {
    const rest = arr.slice(index + 1);
    const combinations = getCombination(k - 1, rest);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });

  return results;
}

function solution(user_id, banned_id) {
  var answer = 0;
  user_id.sort((a, b) => a.length - b.length);

  const banList = banned_id.reduce((pre, cur) => {
    if (pre.has(cur)) {
      const count = pre.get(cur) + 1;
      pre.set(cur, count);
    } else {
      pre.set(cur, 1);
    }
    return pre;
  }, new Map());

  const beforeList = [...banList].reduce((pre, ban) => {
    const tmp = [];
    for (const user of user_id) {
      const userLen = user.length;
      if (ban[0].length !== userLen) continue;
      // console.log(ban[0], user)
      for (let i = 0; i < userLen; i++) {
        if (ban[0][i] !== "*" && ban[0][i] !== user[i]) break;
        if (i === userLen - 1) tmp.push(user);
      }
    }

    if (ban[1] === 1) return [...pre, tmp];
    return [...pre, getCombination(ban[1], tmp)];
  }, []);
  console.log(beforeList);
  const a = getCombination(beforeList.length, beforeList);
  console.log(a);
  return answer;
}

//두번째 풀이
const overlap = new Set();

function dfs(k, arr, rest) {
  if (k === arr.length - 1) {
    for (let i = 0; i < arr[k].length; i++) {
      rest.push(arr[k][i]);
      const over = new Set();
      let check = false;
      for (const list of rest) {
        if (over.has(list)) {
          check = true;
          break;
        }
        over.add(list);
      }
      rest.pop();
      if (check) continue;
      overlap.add([...over].sort().join(""));
    }
    return;
  }

  for (let i = 0; i < arr[k].length; i++) {
    rest.push(arr[k][i]);
    dfs(k + 1, arr, [...rest]);
    rest.pop();
  }
}

function solution(userId, bannedId) {
  userId.sort((a, b) => a.length - b.length);

  const bannedIdList = bannedId.reduce((list, ban) => {
    const idList = [];
    for (const user of userId) {
      if (user.length < ban.length) continue;
      else if (user.length > ban.length) break;

      for (let i = 0; i < user.length; i++) {
        if (ban[i] !== "*" && user[i] !== ban[i]) break;
        if (i === user.length - 1) idList.push(user);
      }
    }
    list.push(idList);
    return list;
  }, []);

  dfs(0, bannedIdList, []);

  return overlap.size;
}
