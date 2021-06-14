function createMatrix(rows, columns) {    
    const matrix = Array.from(Array(rows), (v, i) => new Array(columns).fill().map((c, j) => (i * columns + j + 1)));
    
    return matrix
}

function setRotation(matrix, square) {
    const [x1, y1, x2, y2] = square;
    const start = matrix[x1 - 1][y1 - 1];
    let min = start;
    
    //왼쪽
    for(let i = x1 - 1; i < x2 - 1; i++) {
        if(min > matrix[i + 1][y1 - 1]) {
            min = matrix[i + 1][y1 - 1];
        }
        matrix[i][y1 - 1] = matrix[i + 1][y1 - 1];
    }
    //아래
    for(let i = y1 - 1; i < y2 - 1; i++) {
        if(min > matrix[x2 - 1][i + 1]) {
            min = matrix[x2 - 1][i + 1];
        }   
        matrix[x2 - 1][i] = matrix[x2 - 1][i + 1];
    }
    //오른쪽
    for(let i = x2 - 1; i > x1 - 1; i--) {
        if(min > matrix[i - 1][y2 - 1]) {
            min = matrix[i - 1][y2 - 1];
        }
        matrix[i][y2 - 1] = matrix[i - 1][y2 - 1];
    }
    //위쪽
    for(let i = y2 - 1; i > y1 - 1; i--) {
        if(min > matrix[x1 - 1][i - 1]) {
            min = matrix[x1 - 1][i - 1];
        }
        matrix[x1 - 1][i] = matrix[x1 - 1][i - 1];
    }
    matrix[x1 - 1][y1] = start;
    
    return min;
}

function solution(rows, columns, queries) {
    const matrix = createMatrix(rows, columns);
    const result = [];
    
    for(const square of queries) {
        result.push(setRotation(matrix, square));
    }
    return result;
}