/* ES5 for() */
var numbers = [10,20,30];
var sum = 0;

for(var i=0; i<numbers.length; ++i){
    sum +=number[i];
}

/* ES6 reduce*/
var result = numbers.reduce(function(acc,number){
    return acc + number; //누적   
}, 0);

/* map vs reduce */
var myColors = [
    { color: 'black' },
    { color: 'red' },
    { color: 'gold' },
];

var onlyColors = myColors.map(function(mycolor){
    return mycolor.color;
});
var oColors = myColors.reduce(function(acc,c){
    acc.push(c.color);
    return acc;
},[])
console.log(oColors);

/* 실 사용 예 */
function isGoodParens(string){
    var array = string.split('');
    return !array.reduce(function(acc,char){
       if( acc < 0){
           return acc;
       }else if (char === '('){
           ++acc;
       }else{
           --acc;
       }       
       return acc;
    },0);

}

isGoodParens('(((())))');
isGoodParens(')(((())))');
isGoodParens('(()))');

/* 실습 1 */
var trips = [
    { distance: 34 },
    { distance: 10 },
    { distance: 100 },
];

var totalDistance = trips.reduece(function(acc,trip){
    return acc + trip.distance;
},0)

/* 실습 2 */
var desks = [
    { type: 'Sitting' },
    { type: 'Standing' },
    { type: 'Sitting' },
    { type: 'Sitting' },
    { type: 'Standing' },
    { type: 'Sitting' },
];

var deskTypes = desks.reduce(function(acc,desk){
    if(desk.type === 'Sitting')
        acc.sitting++;
    else
       acc.standing++;
}, { sitting: 0, standing: 0 });

console.log(deskTypes);

/* 실습3 */
function unique(array){
    array.reduce(function(uniqArray, element){
       if( !uniqArray.find(function(uniqueElement){return element === uniqueElement; }) )
       {
          uniqArray.push(element);
       }  
       return uniqArray;
    }, []);
}

var numbers = [4,1,3,2,2,1,3,3,4,4,4];
unique(numbers); //[1,2,3,4]