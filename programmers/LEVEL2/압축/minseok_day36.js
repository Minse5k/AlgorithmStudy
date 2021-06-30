
function solution(msg) {
    const dictionary = Array.from(Array(26).fill().map((v, idx) => v = String.fromCharCode(65 + idx)));
    const result = [];
    let i = 0;
    
    while(i < msg.length) {
        let j = 1;
        
        while(1) {
            if(dictionary.indexOf(msg.substring(i, i + j)) === -1 || i + j > msg.length) {
                break;
            }
            j++;
        }
        
        dictionary.push(msg.substring(i, i + j));
        result.push(dictionary.indexOf(msg.substring(i, i + j - 1)) + 1);
        i += j - 1;
    }
    
    return result
}