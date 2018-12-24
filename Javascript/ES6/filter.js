/* ES5 for() */
var products = [
    {name: 'banana', type:'fruit'},
    {name: 'carrot', type:'vegetable'},
    {name: 'apple', type:'fruit'},
    {name: 'eggplant', type:'vegetable'},
    {name: 'tomato', type:'fruit'},
];

var fruits = [];
for(var i = 0; i<products.length; ++i){
    if(products[i].type === 'fruit'){
        fruits.push(products[i]);
    }
}

/* ES6 filter */
var vegetables = products.filter(function(){
    return products.type === 'vegetable';
});


/* 실 사용 예 */
/* 실습 1 */
var numbers = [1,2,3,56,57,688,789,21,5]
var bigNumbers = numbers.filter(function(number){
    return number > 50;
}) //50초과

var users = [
    {id:1, admin:true},
    {id:2, admin:false},
    {id:3, admin:true},
    {id:4, admin:true},
    {id:5, admin:false},
]

var admins = user.filter( (user) => user.admin );//admin만

/* 실습 3 */
var numbers = [10,20,30];

function reject(array,iterFunction){
    var resultArr=[];
    array.forEach(function(num){
        if(iterFunction(num) === false)
            resultArr.push(num);
    });
    return resultArr;
}

var lessThan15 = reject( numbers, function(number){
    return number > 15;
});

console.log(lessThan15)//10

/* 강사 버전 */
var numbers = [10,20,30];

//자바스크립트의 함수는 1급 객체다. 
function reject(array,iterFunction){
    var filteredArray = array.filter(function(element){ //array filter의 copy가 생김
        return !iterFunction(element);
    });
    return filteredArray;
}

var lessThan15 = reject( numbers, function(number){
    return number > 15;
});

console.log(lessThan15)//10