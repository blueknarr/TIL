/* ES5 for() */
var users = [
    { name: 'Tony Stark' },
    { name: 'Steve Rogers' },
    { name: 'Tony stark' },
    { name: 'Thor' },
]

var user;

for(var i=0; i<users.length; ++i){
    if(users[i].name === 'Thor'){
        user = users[i];
        break;
    }
}

/* ES6 find() */
/* 한번 찾으면 중단 */
var user = users.find(function(user){
    return user.name === 'Tony Stark';
});

/*  */
function Car(model){
    this.model = model;
}

var cars = [
    new Car('Mercedes'),
    new Car('Ferrari'),
    new Car('BMW'),
    new Car('HK'),
];

var car = cars.find(function(car){
    return car.model == 'HK';
});

/* 실 사용 예 */
// http://myBlog.com/posts/1

/* 실습 1 */
var users = [
    { id: 1, admin: false },
    { id: 2, admin: false },
    { id: 3, admin: true },
]

var admin = users.find(function(user){
    return user.admin;
});

console.log(admin);

/* 실습 2 */
var accounts = [
    { balance: -10 },
    { balance: 12 },
    { balance: 0 },
];

var account = accounts.find(function(account){
    return account.balance === 12;
});

console.log(account);

/* 실습 3 */
var ladders = [
    {id: 1, height: 20 },
    {id: 3, height: 25 },
];

function findWhere(array, standard){
    var property = Object.keys(standard)[0]; //String value
    
    return array.find(function(element)    {   
        return element[property] === standard[property];    
    });
}

console.log(findWhere(ladders, {height: 20}));