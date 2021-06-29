function solution(m, machine) {
  let answer = "";
  let answerTime = 0;
  const rememberMusic = getRememberMusic(m);
  const musicInfos = changeInfos(machine);

  musicInfos.forEach((musicInfo) => {
    [answer, answerTime] = checkMusicInfo(musicInfo, rememberMusic, answer, answerTime);
  });

  if (answer === "") return "(None)";
  return answer;
}

function getRememberMusic(music) {
  return music.split("").reduce((pre, cur) => {
    if (cur === "#") {
      const last = pre.length - 1;
      pre[last] += "#";
      return pre;
    }
    pre.push(cur);
    return pre;
  }, []);
}

function changeInfos(musicInfos) {
  return musicInfos.reduce((pre, cur) => {
    const tmp = cur.split(",");
    const start = changeTime(tmp[0]);
    const end = changeTime(tmp[1]);
    const runningTime = end - start;
    const music = changMusic(tmp[3]);

    const info = [runningTime, tmp[2], music];
    pre.push(info);
    return pre;
  }, []);
}

function changeTime(time) {
  let [hour, min] = time.split(":");
  hour = parseInt(hour) * 60;
  min = parseInt(min);
  return hour + min;
}

function changMusic(music) {
  return music.split("").reduce((pre, cur) => {
    if (cur === "#") {
      const last = pre.length - 1;
      pre[last] += "#";
      return pre;
    }
    pre.push(cur);
    return pre;
  }, []);
}

function comparedMusic(musicInfo, rememberMusic, answer, answerTime) {
  const [runningTime, title, music] = musicInfo;
  for (let i = 0; i <= music.length - rememberMusic.length; i++) {
    for (let j = 0; j < rememberMusic.length; j++) {
      if (music[i + j] !== rememberMusic[j]) break;
      if (j === rememberMusic.length - 1) {
        if (runningTime > answerTime) {
          answer = title;
          answerTime = runningTime;
          return [answer, answerTime];
        }
      }
    }
  }
  return [answer, answerTime];
}

function addRotateMusic(music, runningTime) {
  const musicLen = music.length;
  runningTime -= musicLen;

  let point = 0;
  while (runningTime > 0) {
    runningTime--;
    if (point === musicLen) point = 0;
    music.push(music[point++]);
  }

  return music;
}

function checkMusicInfo(musicInfo, rememberMusic, answer, answerTime) {
  let [runningTime, title, music] = musicInfo;

  const isBetterMusic = runningTime <= music.length;

  if (isBetterMusic) {
    musicInfo[2] = music.slice(0, runningTime);
    if (rememberMusic.length > music.length) return [answer, answerTime];
    return comparedMusic(musicInfo, rememberMusic, answer, answerTime);
  }

  musicInfo[2] = addRotateMusic(music, runningTime);
  return comparedMusic(musicInfo, rememberMusic, answer, answerTime);
}
