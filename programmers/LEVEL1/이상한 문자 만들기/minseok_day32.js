function solution(s) {
    const array = s.split('');
    
    let j = 0;
    for(let i = 0; i < array.length; i++) {
        if(array[i] === ' ') {
            j = 0;
            continue;
        }
        if(j % 2 !== 0) array[i] = array[i].toLowerCase();
        else array[i] = array[i].toUpperCase();
        j++;
    }
    return array.join('');    
}