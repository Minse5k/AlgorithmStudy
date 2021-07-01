function toMin(time) {
    const [h, m] = time.split(':');
    return parseInt(h) *  60 + parseInt(m);
}
function toHour(min) {
    let h = parseInt(min / 60);
    let m = min % 60;
    if(h < 10) h = '0' + h;
    if(m < 10) m = '0' + m; 
    return `${h}:${m}`;
}
function solution(n, t, m, timetable) {
    let busTime = 60 * 9;
    let con = 0;
    const lastBusTime = busTime + (n - 1) * t;
    timetable = timetable.map((v) => toMin(v)).filter((value) => value <= lastBusTime).sort((a, b) => b - a);
    
    while(busTime <= lastBusTime) {
        for(let i = 1; i <= m; i++) {
            if(!timetable.length) {
                return toHour(lastBusTime);
            }
            const crew = timetable.pop();
            if(busTime < crew) {
                timetable.push(crew);
                break;
            }
            if(i === m) {
                con = crew -1;
            } else {
                con = crew;
            }
        }
        busTime += t;
    }
    return toHour(con);
}