function solution(expression) {
  const operand = getOperand(expression);
  const operations = getOperation(expression);
  const newExpression = getNewExpression(operand, operations);

  const overlap = removeOverlap(operations);
  const priorityOperations = getPriorityOperation(overlap);

  const answer = getMax(priorityOperations, newExpression);
  return answer;
}

function getOperand(expression) {
  const reg = /[+*-]/;
  return expression.split(reg).map((value) => parseInt(value));
}

function getOperation(expression) {
  const reg = /[0-9]/;
  return expression.split(reg).join("").split("");
}

function getNewExpression(operand, operations) {
  const newExp = operations.reduce((newExpression, operation, index) => {
    return [...newExpression, operand[index], operation];
  }, []);
  newExp.push(operand[operand.length - 1]);

  return newExp;
}

function removeOverlap(operations) {
  const remove = operations.reduce((set, operation) => {
    return set.add(operation);
  }, new Set());
  return [...remove];
}

function getPriorityOperation(operation) {
  const results = [];
  if (operation.length === 1) return operation;

  operation.forEach((fixed, index) => {
    const rest = [...operation.slice(0, index), ...operation.slice(index + 1)];
    const permutations = getPriorityOperation(rest);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    results.push(...attached);
  });

  return results;
}

function getMax(priorityOperations, newExpression) {
  let max = 0;
  const group = {
    multiply: "*",
    plus: "+",
    minus: "-",
  };

  priorityOperations.forEach((priorityOperation) => {
    let duplication = newExpression;

    [...priorityOperation].forEach((operation) => {
      duplication = duplication.reduce((pre, cur) => {
        const maxLength = pre.length;
        if (maxLength === 0) return [...pre, cur];
        if (operation !== pre[maxLength - 1]) return [...pre, cur];

        switch (pre[maxLength - 1]) {
          case group.multiply: {
            pre.pop();
            const calculation = pre.pop() * cur;
            return [...pre, calculation];
          }
          case group.plus: {
            pre.pop();
            const calculation = pre.pop() + cur;
            return [...pre, calculation];
          }
          case group.minus: {
            pre.pop();
            const calculation = pre.pop() - cur;
            return [...pre, calculation];
          }
          default: {
            return [...pre];
          }
        }
      }, []);
    });

    max = max > Math.abs(duplication) ? max : Math.abs(duplication);
  });
  return max;
}
