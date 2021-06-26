function solution(s) {
    const string = getArray(s);
    const answer = getTuple(string);
    
    return answer;
}
    
function getArray(text) {
    const a = text.slice(2, text.length - 2).split('},{');
    
    const stringArray = a.map((v) => {
        return v.split(',');
    })
    
    return stringArray.sort((a, b) => a.length - b.length);
}

function getTuple(stringArray) {
    const remove = new Set();
    for(const charArray of stringArray) {
        for(const char of charArray) {
            remove.add(char);
        }
    }

    const answer = [];
    
    remove.forEach((key) => {
        answer.push(parseInt(key));
    })
    
    return answer;
}