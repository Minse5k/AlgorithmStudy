// const fs = require("fs");
// // const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const inputs = fs.readFileSync("input").toString().trim().split("\r\n");

function solution(numbers) {
    const answer = [];
    numbers.forEach((number) => {
      const minimumNumber = getMinimumNumber(number);
      answer.push(minimumNumber);
    });
  
    return answer;
  }
  //변환
  function changeBit(number) {
    const result = [];
    while (number !== 0) {
      const bit = number % 2;
      result.push(bit);
      number = Math.floor(number / 2);
    }
    return result;
  }
  
  function comparedBitNumber(number, comparedNumber) {
    const isEqual = number.filter(
      (value, index) => value !== comparedNumber[index]
    ).length;
  
    if (number.length === comparedNumber.length) {
      return isEqual > 2 ? false : true;
    }
  
    const equal = {
      zero: 0,
      one: 1,
      two: 2,
    };
  
    // console.log(front);
  
    const endPoint = number.length;
    switch (isEqual) {
      case equal.zero: {
        return backCount(comparedNumber, endPoint, equal.zero);
      }
      case equal.one: {
        return backCount(comparedNumber, endPoint, equal.one);
      }
      case equal.two: {
        return backCount(comparedNumber, endPoint, equal.two);
      }
      default:
        return false;
    }
  }
  
  function backCount(number, start, count) {
    let end = 2 - count;
    for (let i = number.length - 1; i >= start; i--) {
      if (number[i] === 0) continue;
      end--;
      if (end < 0) return false;
    }
  
    return true;
  }
  
  //비교
  function getMinimumNumber(number) {
    const bitNumber = changeBit(number);
    // console.log("시작");
    // console.log(number, bitNumber);
    while (number++) {
      const comparedNumber = changeBit(number);
      // console.log(number, comparedNumber);
      const isEqual = comparedBitNumber(bitNumber, comparedNumber);
      if (isEqual) return number;
    }
  }
  
  console.log(solution([2, 7]));
  