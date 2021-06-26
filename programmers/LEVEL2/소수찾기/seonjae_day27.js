function solution(numbers) {
    const prime = primeNumbers();
    const overlap = new Set();
    let count = 0;
  
    for (let i = 0; i < numbers.length; i++) {
      const combinations = getPermutation([...numbers], i + 1);
      for (const text of combinations) {
        const number = parseInt(text);
        if (overlap.has(number)) continue;
  
        overlap.add(number);
        if (prime[number]) count++;
      }
    }
  
    return count;
  }
  
  function getPermutation(numbers, k) {
    const results = [];
    if (k === 1) return numbers;
  
    numbers.forEach((fixed, index) => {
      const rest = [...numbers.slice(0, index), ...numbers.slice(index + 1)];
      const permutations = getPermutation(rest, k - 1);
      const attached = permutations.map((permutation) =>
        [fixed, ...permutation].join("")
      );
      results.push(...attached);
    });
  
    return results;
  }
  
  function primeNumbers() {
    const array = new Array(10000001).fill(true);
    array[0] = false;
    array[1] = false;
  
    for (let i = 2; i < array.length; i++) {
      if (!array[i]) continue;
  
      for (let j = 2 * i; j <= array.length; j += i) {
        array[j] = false;
      }
    }
    return array;
  }