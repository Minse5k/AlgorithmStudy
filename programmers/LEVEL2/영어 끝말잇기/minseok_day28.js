function solution(n, words) {
    const rememberWords = [];
    let lastChar = "";
    let firstChar = "";
    const answer = [0, 0];
    
    rememberWords.push(words[0]);
    
    for(let i = 0; i < words.length; i++) {
        if(i > 0) {
            const word = words[i];
            firstChar = word[0];
            
            if(firstChar === lastChar) {
                if(rememberWords.includes(word)) {
                    answer[0] = (i % n) + 1;
                    answer[1] = parseInt(i / n) + 1;
                    return answer;
                } else {
                    rememberWords.push(word);
                    lastChar = word[word.length - 1];
                }
            } else {
                answer[0] = i % n + 1;
                answer[1] = parseInt(i / n) + 1;
                return answer;
            }
        } else {
            lastChar = words[0][words[0].length - 1];
            rememberWords.push(words[0]);
        }
    }
    return answer;
}