const greetings = require('./greeting');

console.log(
    `Korean:${greetings.sayHelloKor()}
    & English:${greetings.sayHelloEng()} 
    & swa:${greetings.sayHelloSwah()}`
);