/* ES5 for loop */

var colors = ['red','blue','green'];

for(var i=0; i<colors.length; ++i)
    console.log(colors[i]);

/* ES5 forEach()  */
colors.forEach(function(color){
    console.log(color);
});

var numbers = [1,2,3,4,5];
var sum =0;

function add(number){
    sum +=number;
}

numbers.forEach(add);
console.log(sum);

/* In real world */
spamMails = [];
function deleteMail(){};

spamMails.forEach(function(spamMail){
    deleteMail(spammail);
});

var posts = [
    {id: 23, title: 'a'},
    {id: 52, title: 'b'},
    {id: 105, title:'c'}
];

posts.forEach(function(member){

});

var images = [
    {height: 10,width:30},
    {height: 20,width:90},
    {height: 54,width:32}
];

var areas = [];
var sum = 0;
images.forEach(function(len){
    areas.push(len.height * len.width);
});