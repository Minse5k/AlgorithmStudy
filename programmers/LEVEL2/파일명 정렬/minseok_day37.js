function getHead(string) {
    return string.match(/[^0-9]+/g)[0];
}
function getNumber(string) {
    return parseInt(string.match(/[0-9]+/g)[0]);
}
function solution(files) {
    return files.sort((a, b) => {
        const headA = getHead(a).toUpperCase();
        const headB = getHead(b).toUpperCase();
        
        if(headA === headB) {
            return getNumber(a) - getNumber(b);
        }
        return headA < headB ? -1 : 1;
    });
    
}