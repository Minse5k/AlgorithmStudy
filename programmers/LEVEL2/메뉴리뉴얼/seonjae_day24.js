function solution(orders, course) {
  const answer = [];

  course.forEach((count) => {
    const menu = pickMenu(count, orders);
    answer.push(...menu);
  });

  return answer.sort();
}

function pickMenu(count, orders) {
  let max = 0;
  const result = [];

  const menuCount = orders.reduce((menus, order) => {
    const combination = getCombination(count, [...order]);

    combination.forEach((element) => {
      if (menus.has(element)) {
        const next = menus.get(element) + 1;
        max = max > next ? max : next;
        menus.set(element, next);
      } else {
        menus.set(element, 1);
      }
    });
    return menus;
  }, new Map());

  if (max >= 2) {
    menuCount.forEach((value, key) => {
      if (value === max) {
        result.push(key);
      }
    });
  }

  return result;
}

function getCombination(count, order) {
  const result = [];
  if (count === 1) return order.map((v) => [v]);

  order.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombination(count - 1, rest);
    const attached = combinations.map((combination) =>
      [fixed, ...combination].sort().join("")
    );
    result.push(...attached);
  });
  return result;
}
