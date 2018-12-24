/* ES5 */
var computer = {
    model: 'LG gram',
    year: 2017,
}

//var model = computer.model;
//var year = computer.year;

/* ES6 */
const laptop = {
    model: 'Macbook Air',
    year: 2018,
}

const {model, year} = laptop;

/* ES5 Function */
var savedFile = {
    extension:'jpg',
    name: 'profile',
    size: 299847
}

function fileSummary(file){
    return `The file ${file.name}.${file.extension}의 크기는 ${file.size} 입니다.`
}

/* ES6 Function */
const myFile = {
    extension:'jpg',
    name: 'profile',
    size: 299847
};

function summary({name, extension, size}){
    return `The file ${name}.${extension}의 크기는 ${size} 입니다.`
}

/* ES6 Array */
const companies = ['Google','IBM','Amazon','Apple'];

const [name] = companies; //Google
const [name1, name2,name3]=companies; //Google, IBM, 'Apple

//첫번째 인자 가져오기
let firstCompany = companies[0];
[ firstCompany ] = companies; 

//배열의 길이를 가져오기
const { length } = companies;

//가변길이 배열
const [ one, ...rest ] = companies;

/* Array & Object */
const wannaGo = [
    {name: 'Google', location:'Mountain View'},
    {name: 'Facebook', location:'Menlo Park'},
    {name: 'Apple', location:'Cupertino'}
];

let [company] = wannaGo;
[{location}] = wannaGo; //wannaGo[0].location

/* 실습 1 */
const points = [
    [7,12],
    [-20,3],
    [8,0]
];

points.map(pair => {
    //const x = pair[0];
    //const y = pair[1];
    const [x,y] = pair;
    return {x:x, y:y};
})

points.map( ([x,y]) => {
    return {x,y};
})

function signup({username,password,email}){
    
}

const users = {
    username:'a',
    password:'b',
    email:'c'
}

signup(users)

const profile = {
    title:'Engineer',
    department:'Blockchain'
};

function isEngineer({title,department}){
    return title === 'Engineer' && department === 'Blockchain';
}

/* 실습 2 */
const classes = [
    ['실전 DApp', '9am', 'Mr.john'],
    ['React', '1pm', 'neo'],
    ['Capstone', '3pm', 'multicampus'],
]

const classAsObject = classes.map( ([ subject, time, teacher ]) => {
    return { subject, time, teacher };
})

console.log(classes);
/* 실습 3 */