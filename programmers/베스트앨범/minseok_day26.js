function solution(genres, plays) {
    const obj = {};    
    
    for(let i = 0; i < genres.length; i++) {        
        if(!obj[genres[i]]) {
            obj[genres[i]] = {
                total : 0,
                list : []
            }
        }
        obj[genres[i]].total += plays[i];
        obj[genres[i]].list.push([i, plays[i]]);
    }
    
    const sortArray = Object.values(obj).sort((a, b) => {
        return b.total - a.total;
    });
    
    
    sortArray.forEach((obj) => {
        const sort = Object.values(obj.list).sort((a,b) => { return b[1] - a[1]; })
        return obj.list = sort;
    });

    const result = [];
    sortArray.forEach((obj) => {
        
        result.push(obj.list[0][0]);

        if(obj.list.length > 1) {
            result.push(obj.list[1][0]);
        }
    });

    return result;
}