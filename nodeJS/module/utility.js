console.log("1번만 출력");

//모듈은 1번만 실행된다.
module.exports = function(numbersToSum=[]) {
    let sum = 0;
    numbersToSum.forEach(number => sum +=number);
    return sum;
};

console.log("real");

