### 효율성 테스트 0점

```javascript
function solution(info, query) {
    const infoArray = info.map((v) => v.split(' '));
    const queryArray = query.map((v) => v.split(' ').filter((world) => world !== 'and'));
    const result = [];
    
    for(let i = 0; i < queryArray.length; i++) {
        let array = [...infoArray];
        
        for(let j = 0; j < queryArray[i].length; j++) {
            if(queryArray[i][j] === '-') continue;
            if(j === queryArray[i].length - 1) {
                array = array.filter((v) => parseInt(v[j]) >= parseInt(queryArray[i][j]));
            } else {
                array = array.filter((v) => v[j] === queryArray[i][j]);    
            }
        }
        result.push(array.length);
    }
    return result;
}