/* ES5 for() */
var numbers = [1,2,3];
var dNumbers = [];

for (var i=0; i<numbers.length; ++i){
    dNumbers.push(number[i]*2);
}

/* ES6 map */
var tNumbers = numbers.map(function(num){
    return number * 3;
    //원본 변경이 아니라 새로운 배열을 만들어 리턴한다.
});

/* 실 사용예 */
var posts = [
    {title: 'happy', content:'hacking'},
    {title: 'multi', content:'campus'},
];

var frontElement = posts.map(function(post){
    return `<h1>${post.title}</h1><p>${post.content}</p>`;
});

/* 실습 1 */
var images = [
    {h: '10px',w:'240px'},
    {h: '54px',w:'20px'},
    {h: '109px',w:'2230px'},
];

var heights = images.map(function(image){
    return image.h;
});

/* 실습 2 */
var trips = [
    {distance:34, time:10},
    {distance:3344, time:154},
    {distance:314, time:19300},
];

var speeds = trips.map(function(trip){
    return trip.distance / trip.time;
});

/* 실습 3 */

function pluck(array, property){
    var values = array.map(function(element){
        return element[property];
    });
    return values;
}

var paints = [
    {color:'red',price:100},
    {color:'white',price:200},
    {color:'brown',price:400},
    {color:'navy',price:1000},
];

pluck(paints, 'color');