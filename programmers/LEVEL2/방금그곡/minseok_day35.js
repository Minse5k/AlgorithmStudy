function createMelody(arr, n) {
    const array = [];
    for(let i = 0; i < n; i++) {
        if(arr[i + 1] === '#') {
            array.push(arr[i] + '#');
            i++;
            continue;
        }
        array.push(arr[i]);
    }
    return array;
}

function getTime(start, finish) {
    let min = finish[1] - start[1];
    let hour = finish[0] - start[0];
    if(min < 0) {
        hour--;
        min += 60;
    }
    return hour * 60 + min;
}

function getMusicMelody(melody, min) {
    while(melody.length < min) {
        melody = [...melody, ...melody];
    }
    return melody.slice(0, min);
}

function checkMelody(musicMelody, melody) {
    let check = 0;
    
    for(let i = 0; i < musicMelody.length; i++) {
        if(musicMelody[i] === melody[0]) {
            check = 0;
            for(let j = 0; j < melody.length; j++) {
                if(musicMelody[i + j] !== melody[j]) {
                    check = 1;
                }
            }
            if(check === 0) return true;
        }
    }
    return false;
}
function solution(m, musicinfos) {
    const melody = createMelody(m, m.length);
    const musicinArray = musicinfos.map((v) => v.split(','));
    const result = [];
    
    for(let i = 0; i < musicinArray.length; i++) {
        const startTime = musicinArray[i][0].split(':');
        const finishTime = musicinArray[i][1].split(':');
        const musicName = musicinArray[i][2];
        const minDifference = getTime(startTime, finishTime);
        let musicMelody = createMelody(musicinArray[i][3], musicinArray[i][3].length);
        
        musicMelody = musicMelody.length < minDifference ? getMusicMelody(musicMelody, minDifference) : musicMelody.slice(0, minDifference);
        
        if(checkMelody(musicMelody, melody)) {
            result.push([musicName, musicMelody.length]);
        }
    }
    if(result.length === 0) return '(None)';
    else {
        result.sort((a, b) => b[1] - a[1]);
        return result[0][0];
    }
}