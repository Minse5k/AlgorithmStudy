function solution(n) {
    const binaryNum = n.toString(2);
    let oneCount = 0;
    for(let i = 0; i < binaryNum.length; i++) {
        if(binaryNum[i] === '0') continue;
        oneCount++;
    }
    
    let num = n + 1;
    
    while(1) {
        let oneCount2 = 0;
        const binaryNum2 = num.toString(2);
        for(let i = 0; i < binaryNum2.length; i++) {
            if(binaryNum2[i] === '0') continue;
            oneCount2++;
        }
        if(oneCount2 === oneCount) break;
        num++;
    }
    return(num);
}