function solution(cacheSize, cities) {
    const n = cities.length;
    
    if(cacheSize === 0) return n * 5;
    
    cities = cities.map((v) => v.toUpperCase());
    
    const visited = Array.from(Array(2), () => new Array(cacheSize).fill(0));
    let cnt = 0;
    let time = 0;
    
    
    for(let i = 0; i < n; i++) {
        let min = 0;
        
        //포함 X
        if(!visited[0].includes(cities[i])) {
            cnt++;
            min = Math.min(...visited[1]);
            const idx = visited[1].indexOf(min);
            visited[0][idx] = cities[i];
            visited[1][idx] = cnt;
            time += 5;
        } else {
            cnt++;
            const idx = visited[0].indexOf(cities[i]);
            visited[1][idx] = cnt;
            time += 1;
        }
    }
    return time;
}
