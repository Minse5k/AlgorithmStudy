function combination(arr, selectNum) {
    const result = [];
    if (selectNum === 1) return arr.map((v) => [v]);
    arr.forEach((v, idx, arr) => {
      const fixed = v;
      const restArr = arr.slice(idx + 1);
      const combinationArr = combination(restArr, selectNum - 1);
      const combineFix = combinationArr.map((v) => [fixed, ...v]);
      result.push(...combineFix);
    });
    return result;
  }
  
  function checkPrimeNumber(num) {
      let count = 0;
      
      for(let i = 2; i < num; i++) {
          if(num % i === 0) count++;
      }
      
      if(count === 0) return true;
      else return false;
  }
  
  function solution(nums) {
      const numArray = combination(nums, 3);
      let count = 0;
      
      numArray.forEach((array) => {
          let sum = array.reduce((pre, cur) => {
              return pre + cur;
          });
          if(checkPrimeNumber(sum)) count++;
      });
      return count;
  }