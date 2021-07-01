//처음풀이
function solution(files) {
  files = files.reduce((pre, file) => {
    if (pre.length === 0) return [...pre, file];
    const regS = /[0-9]/;
    const regN = /[^0-9]/;
    const regM = /[-.\s]/;
    const headFile = file.split(regS)[0].toUpperCase().split(regM).join("");
    const numberFile = parseInt(file.split(regN).join(""));
    for (let i = 0; i < pre.length; i++) {
      const headPrev = pre[i].split(regS)[0].toUpperCase().split(regM).join("");
      const numberPrev = parseInt(pre[i].split(regN).join(""));

      if (headFile < headPrev)
        return [...pre.slice(0, i), file, ...pre.slice(i)];
      if (headFile === headPrev) {
        if (numberFile < numberPrev)
          return [...pre.slice(0, i), file, ...pre.slice(i)];
      }
    }
    return [...pre, file];
  }, []);

  return files;
}

//2번째 수정
// 1시 11분
function solution(files) {
  files = files.reduce((pre, file) => {
    if (pre.length === 0) return [...pre, file];
    const regS = /[0-9]/;
    const regN = /[^0-9]/;
    const regM = /[-.\s]/;
    const headFile = file.split(regS)[0].toUpperCase();
    const numberFile = parseInt(file.split(regN).join(""));
    for (let i = 0; i < pre.length; i++) {
      const headPrev = pre[i].split(regS)[0].toUpperCase();
      const numberPrev = parseInt(pre[i].split(regN).join(""));

      if (headFile < headPrev)
        return [...pre.slice(0, i), file, ...pre.slice(i)];
      if (headFile === headPrev) {
        if (numberFile < numberPrev)
          return [...pre.slice(0, i), file, ...pre.slice(i)];
      }
    }
    return [...pre, file];
  }, []);

  return files;
}

//마지막 수정
function solution(files) {
  files.sort((pre, cur) => {
    const regS = /[0-9]/;
    const regN = /[^0-9]/;
    const headPre = pre.split(regS)[0].toUpperCase();
    const numberPre = parseInt(
      pre.split(regN).filter((value) => value !== "")[0]
    );
    const headCur = cur.split(regS)[0].toUpperCase();
    const numberCur = parseInt(
      cur.split(regN).filter((value) => value !== "")[0]
    );

    if (headPre > headCur) return 1;
    if (headPre == headCur) return numberPre - numberCur;
    if (headPre < headCur) return -1;
  });

  return files;
}
