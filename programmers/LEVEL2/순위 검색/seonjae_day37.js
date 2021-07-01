//2시 9분
function solution(infos, query) {
  infos = infos
    .map((info) => {
      const tmp = info.split(" ");
      tmp[4] = parseInt(tmp[4]);
      return tmp;
    })
    .sort((a, b) => b[4] - a[4]);

  const answer = query.reduce((count, cur) => {
    const reg = /\sand\s|\s/;
    const command = cur.split(reg);
    command[4] = parseInt(command[4]);

    let result = 0;
    for (const info of infos) {
      if (command[4] > info[4]) break;
      //언어 직군 경력 음식 확인
      if (command[0] === "-" || command[0] === info[0]) {
        if (command[1] === "-" || command[1] === info[1]) {
          if (command[2] === "-" || command[2] === info[2]) {
            if (command[3] === "-" || command[3] === info[3]) result++;
          }
        }
      }
    }
    return [...count, result];
  }, []);
  return answer;
}

//sort메소드를 reduce로 구현해봄 시간이 더 걸리게
function solution(infos, query) {
  infos = infos.reduce((list, info) => {
    const tmp = info.split(" ");
    tmp[4] = parseInt(tmp[4]);

    for (let i = 0; i < list.length; i++) {
      if (tmp[4] > list[i][4]) {
        return [...list.slice(0, i), tmp, ...list.slice(i)];
      }
    }
    list.push(tmp);
    return list;
  }, []);

  const answer = query.reduce((count, cur) => {
    const reg = /\sand\s|\s/;
    const command = cur.split(reg);
    command[4] = parseInt(command[4]);

    let result = 0;
    for (const info of infos) {
      if (command[4] > info[4]) break;
      if (command[0] === "-" || command[0] === info[0]) {
        if (command[1] === "-" || command[1] === info[1]) {
          if (command[2] === "-" || command[2] === info[2]) {
            if (command[3] === "-" || command[3] === info[3]) result++;
          }
        }
      }
    }
    count.push(result);
    return count;
  }, []);

  return answer;
}

//객체활용해서 만들어 봄
function solution(infos, query) {
  infos = infos.reduce((list, info) => {
    const tmp = info.split(" ");
    tmp[4] = parseInt(tmp[4]);
    info = {
      lang: tmp[0],
      job: tmp[1],
      career: tmp[2],
      food: tmp[3],
      score: [tmp[4]],
    };
    let point = 0;
    const isSaved = list.some((listInfo, index) => {
      if (listInfo.lang === info.lang) {
        if (listInfo.job === info.job) {
          if (listInfo.career === info.career) {
            if (listInfo.food === info.food) {
              point = index;
              return true;
            }
          }
        }
      }
      return false;
    });
    if (isSaved) {
      list[point].score.push(tmp[4]);
      return list;
    }
    list.push(info);
    return list;
  }, []);

  for (let i = 0; i < infos.length; i++) {
    infos[i].score.sort((a, b) => b - a);
  }

  const answer = query.reduce((count, cur) => {
    const reg = /\sand\s|\s/;
    const tmp = cur.split(reg);
    tmp[4] = parseInt(tmp[4]);
    const command = {
      lang: tmp[0],
      job: tmp[1],
      career: tmp[2],
      food: tmp[3],
      score: tmp[4],
    };
    let result = 0;
    infos.forEach((info) => {
      if (info.lang === command.lang || command.lang === "-") {
        if (info.job === command.job || command.job === "-") {
          if (info.career === command.career || command.career === "-") {
            if (info.food === command.food || command.food === "-") {
              for (let i = 0; i < info.score.length; i++) {
                if (command.score > info.score[i]) break;
                result++;
              }
            }
          }
        }
      }
    });

    return [...count, result];
  }, []);
  return answer;
}
