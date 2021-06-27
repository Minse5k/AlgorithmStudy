function solution(citations) {
    citations.sort((a, b) => a - b);
    const citationsLength = citations.length;

    let hIdx = 0;
    for(let i = 0; i < citationsLength;) {
        if(hIdx < citations[i]) {
            if(hIdx >= citationsLength - i) {
                break;
            } else {
                hIdx++;
            }
        } else i++;
    }

    return hIdx;
}