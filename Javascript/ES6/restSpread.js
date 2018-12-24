/* Rest */

const addNumbers = (a,b) => {
    const numbers = [a,b];
    return numbers.reduce((acc,number) => {
        return acc +=number;
    },0)
}

const addAll = (...numbers) => {
    return numbers.reduce((acc,number) => {
        return acc +=number;
    },0)
}

/* Spread 펼치다 */
let defaultColors = ['red','green', 'blue'];
let myColors = ['black', 'navy','gold'];
let pallete = defaultColors.concat(myColors);
pallete = [...defaultColors, ...myColors];

/* 실습 */
const showShoppingList = (...items) =>{
    if(items.indexOf('milk' <0)){
        return ['milk',...items];
    }
}

/* 실제 상황 */
const MathLibrary = {
    caculateProduct(a,b){
        return a*b;
    }
}

let MathLibrary = {
    multiply(a,b){
        return a*b;
    },

    caculateProduct(...args){
        console.log('Please use method "multiply" instead');
        return this.multiply(...args);
    }
}

MathLibrary.caculateProduct(10,10);

/* 실습 */
const join = (array1, array2) =>{
    return array1.concat(array2);
}

const join = (array1, array2) =>{
    return [...array1, ...array2];
}

const unshift = (array,a,b,c,d,e) => {
    return [a,b,c,d,e].concat(array);
}

const unshift = (array,...args) => {
    return [...args, ...array];
}