function solution(n, t, m, timetable) {
  const crew = timetable
    .map((value) => {
      const time = value.split(":");
      return parseInt(time[0]) * 60 + parseInt(time[1]);
    })
    .sort((a, b) => b - a);

  let nowTime = 540;
  const bus = [];
  for (let i = 0; i < n; i++) {
    const tmp = [];
    for (let j = 0; j < m; j++) {
      if (nowTime >= crew[crew.length - 1]) {
        tmp.push(crew.pop());
      }
    }
    bus.push(tmp);
    if (i === n - 1) continue;
    nowTime += t;
  }

  if (nowTime === 540) {
    if (bus[0].length < m) {
      return "09:00";
    } else {
      const tmpTime = bus[0][0] - 1;
      const tmpH = Math.floor(tmpTime / 60);
      const tmpM = tmpTime % 60;
      const hour = tmpH >= 10 ? tmpH.toString() : "0" + tmpH;
      const min = tmpM >= 10 ? tmpM.toString : "0" + tmpM;
      return hour + ":" + min;
    }
  }

  if (bus[bus.length - 1].length === 0) {
    const tmpH = Math.floor(nowTime / 60);
    const tmpM = nowTime % 60;
    const hour = tmpH >= 10 ? tmpH.toString() : "0" + tmpH;
    const min = tmpM >= 10 ? tmpM.toString : "0" + tmpM;
    return hour + ":" + min;
  } else if (bus[bus.length - 1].length < m) {
    const tmpTime = bus[bus.length - 1][bus[bus.length - 1].length - 1] + 1;
    const tmpH = Math.floor(tmpTime / 60);
    const tmpM = tmpTime % 60;
    const hour = tmpH >= 10 ? tmpH.toString() : "0" + tmpH;
    const min = tmpM >= 10 ? tmpM.toString : "0" + tmpM;
    return hour + ":" + min;
  } else {
    const tmpTime = bus[bus.length - 1][0] - 1;
    const tmpH = Math.floor(tmpTime / 60);
    const tmpM = tmpTime % 60;
    const hour = tmpH >= 10 ? tmpH.toString() : "0" + tmpH;
    const min = tmpM >= 10 ? tmpM.toString : "0" + tmpM;
    return hour + ":" + min;
  }

  return 0;
}

//2번째 풀이
function getTime(time) {
  const tmpH = Math.floor(time / 60);
  const tmpM = time % 60;
  const hour = tmpH > 9 ? tmpH.toString() : "0" + tmpH;
  const minute = tmpM > 9 ? tmpM.toString() : "0" + tmpM;
  return hour + ":" + minute;
}

function solution(n, t, m, timetable) {
  const crew = timetable
    .map((value) => {
      const time = value.split(":");
      return parseInt(time[0]) * 60 + parseInt(time[1]);
    })
    .sort((a, b) => b - a);
  let time = 540;
  const bus = [];
  for (let i = 0; i < n; i++) {
    if (crew.length === 0) return getTime(540 + (n - 1) * t);
    time = time + t * i;
    const tmp = [];
    for (let j = 0; j < m; j++) {
      const lastIndex = crew.length - 1;
      if (lastIndex < 0) break;
      if (time < crew[lastIndex]) break;
      tmp.push(crew.pop());
    }
    bus.push(tmp);
  }

  if (bus[n - 1].length === m) {
    const lastIndex = bus[n - 1].length - 1;
    return getTime(bus[n - 1][lastIndex] - 1);
  }

  return getTime(time);
}

//3번째 풀이
function getTime(time) {
  const tmpH = Math.floor(time / 60);
  const tmpM = time % 60;
  const hour = tmpH > 9 ? tmpH.toString() : "0" + tmpH;
  const minute = tmpM > 9 ? tmpM.toString() : "0" + tmpM;
  return hour + ":" + minute;
}

function solution(n, t, m, timetable) {
  const crew = timetable
    .map((value) => {
      const time = value.split(":");
      return parseInt(time[0]) * 60 + parseInt(time[1]);
    })
    .sort((a, b) => b - a);
  let time;
  const bus = [];
  for (let i = 0; i < n; i++) {
    time = 540 + t * i;
    const tmp = [];
    for (let j = 0; j < m; j++) {
      const lastIndex = crew.length - 1;
      if (lastIndex < 0) return getTime(540 + (n - 1) * t);
      if (time < crew[lastIndex]) break;
      tmp.push(crew.pop());
    }
    bus.push(tmp);
  }

  if (bus[n - 1].length === m) {
    const lastIndex = bus[n - 1].length - 1;
    return getTime(bus[n - 1][lastIndex] - 1);
  }
  return getTime(time);
}
