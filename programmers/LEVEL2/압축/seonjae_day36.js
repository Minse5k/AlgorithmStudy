// 길이 = 1 => 포함되도록 사전 초기화
// 사전에서 가장 긴 문자열 찾기
// w 해당 색인 번호 출력, w제거
// c: 입력에서 처리X w+c 사전에 등록

//사전에 있으면 다음 글자 확인
//다음 글자가 없으면 현재 인덱스 번호 리턴
//사전에 없으면 등록 후 다음 으로 넘어가기
//다음 글자가없으면 등록후 등록된거 리턴
function solution(msg) {
  const dicitionary = getDicitionary();
  const answer = new Set();
  const text = [...msg];
  for (let i = 0; i < text.length; i++) {
    let word = "";
    let now = 0;

    for (let j = i; j < text.length; j++) {
      word += text[j];
      const saveIndex = dicitionary.indexOf(word);
      if (saveIndex > 0) {
        now = saveIndex;
        continue;
      }
      dicitionary.push(word);
      if (j > 0) i = i + (j - i - 1);
      else i = i + (j - i);
      break;
    }
    answer.add(now);
  }
  console.log([...answer]);
  return [...answer];
}

function getDicitionary() {
  return new Array(27)
    .fill(null)
    .map((value, index) => String.fromCharCode(index + 64));
}

// 다시풀기
function solution(msg) {
  const dictionary = getDictionary();
  let text = "";
  const answer = [...msg].reduce((pre, cur) => {
    text += cur;
    const check = dictionary.indexOf(text);
    if (check > 0) return pre;

    dictionary.push(text);
    const preText = text.slice(0, text.length - 1);
    const compressIndex = dictionary.indexOf(preText);
    text = cur;
    pre.push(compressIndex);
    return pre;
  }, []);

  if (text.length > 0) {
    const compressIndex = dictionary.indexOf(text);
    answer.push(compressIndex);
  }

  return answer;
}

function getDictionary() {
  return new Array(27)
    .fill(null)
    .map((value, index) => String.fromCharCode(index + 64));
}
