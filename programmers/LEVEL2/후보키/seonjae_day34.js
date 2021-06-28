function solution(relation) {
  const attributeLen = relation[0].length;
  const tmp = new Array(attributeLen).fill(null).map((_, index) => index);
  const attribute = [];

  for (let i = 1; i <= attributeLen; i++) {
    const combination = getCombination(i, tmp);
    attribute.push(combination);
  }

  for (let i = 0; i < attribute.length; i++) {
    const uniqueKey = [];
    for (let j = 0; j < attribute[i].length; j++) {
      if (attribute[i][j].length === 0) continue;

      const isUnique = checkUniqueness(relation, attribute[i][j]);
      if (isUnique) {
        uniqueKey.push(attribute[i][j]);
      } else {
        attribute[i][j] = [];
      }
    }

    if (uniqueKey.length === 0) continue;
    removeAttribute(i, uniqueKey, attribute);
  }

  let count = 0;

  for (let i = 0; i < attribute.length; i++) {
    for (let j = 0; j < attribute[i].length; j++) {
      if (attribute[i][j].length === 0) continue;
      count++;
    }
  }

  return count;
}

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

function checkUniqueness(relation, attribute) {
  const overlap = new Set();

  for (const tuple of relation) {
    const tupleText = attribute.reduce((text, num) => {
      return text + "'" + tuple[num] + "'";
    }, "");

    if (overlap.has(tupleText)) return false;
    overlap.add(tupleText);
  }

  return true;
}

function removeAttribute(start, uniqueKey, attribute) {
  for (let i = start + 1; i < attribute.length; i++) {
    for (let j = 0; j < attribute[i].length; j++) {
      if (attribute[i][j].length === 0) continue;

      uniqueKey.forEach((key) => {
        const isCompared = compared(key, attribute[i][j]);
        if (isCompared) {
          attribute[i][j] = [];
        }
      });
    }
  }
}

function compared(key, attribute) {
  let count = 0;
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < attribute.length; j++) {
      if (key[i] === attribute[j]) count++;
    }
  }
  if (count === key.length) return true;
  return false;
}
