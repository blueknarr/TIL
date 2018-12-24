/* ES5 for() */
var computers = [
    { name: 'macbook-air', ram: 16 },
    { name: 'gram', ram: 8 },
    { name: 'series', ram: 32 },
];

var everyComputersAvailable = true;
var someComputersAvailable = false;

for(var i=0; i< computers.length; ++i){
    var computer = computers[i];
    if(computer.ram < 16){
        everyComputersAvailable = false;
    }else{
        someComputersAvailable = true;
    }
}

/* ES6 every & some*/
var everyLabtopAvailable = computers.every(function(computer){
    return computer.ram > 16;
});


var someLabtopAvailable = computers.some(function(computer){
    return computer.ram > 16;
});

/* 실 사용 예 */
var names = [
    'alex',
    'bill',
    'chris',
];

//&&
names.every(function(name){ 
    return name.length > 4;
});

//||
names.some(function(name){
    return name.length > 4;
});

/* 실습 1 */
var users = [
    { id: 21, submit: true },
    { id: 33, submit: false },
    { id: 3, submit: true },
];

var allSubmited = users.every(function(user){
    return user.submit;
});

/* 실습 2 */
//하나라도 status 중에 pending이 하나라도 있으면, inprogress = true
var requests = [
    { url: '/photos', status: 'complete' },
    { url: '/albums', status: 'pending' },
    { url: '/users', status: 'failed' },
];

var inprogress = requests.some(function(request){
    request.status === 'pending';
});

