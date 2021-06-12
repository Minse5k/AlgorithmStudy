function solution(text) {
  const stack = [];

  for (const char of text) {
    const top = stack.length - 1;
    if (stack[top] === char) stack.pop();
    else {
      stack.push(char);
    }
  }

  if (stack.length === 0) return 1;
  return 0;
}

// function solution(text) {
//   while (true) {
//     if (text.length === 0) return 1;
//     const textArr = text.split("");
//     text = removeOverlap(textArr);
//     if (text === false) break;
//   }
//   return 0;
// }

// function removeOverlap(arr) {
//   const lastest = {
//     text: "",
//     index: undefined,
//   };
//   let remove = false;
//   arr.forEach((text, index) => {
//     if (text === lastest.text) {
//       lastest.text = "";
//       arr[lastest.index] = "";
//       arr[index] = "";
//       remove = true;
//     } else {
//       lastest.text = text;
//       lastest.index = index;
//     }
//   });

//   if (remove) return arr.join("");
//   return false;
// }
