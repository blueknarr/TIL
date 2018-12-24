//mocha => truffle default test framework
//driven => 
//1. 코드를 짜기 전에 테스트를 먼저 짠다 => 내가 구현할 기능
//2. 테스트를 돌린다. (빨간불)
//3. 1개씩 빨간불을 꺼간다
//4. 모듈화된 기능(view -> component 기준으로 나눈다)
//5. microservice architecture

// const assert = require('assert');

// class Car{
//     park(){
//         return '주차';
//     }
//     drive(){
//         return '붕붕';
//     }
//     fly(){
//         return '날아라';
//     }
//     swim(){
//         return '헤엄';
//     }
// }

// let car = new Car();
// //assert.equal('나의코드','예상한코드')

// beforeEach(() => {
//     car = new Car();
// })

// //내가 어떤 모듈을 테스트할건지 : Car (주어)
// describe('Car class', () => {
//     //이 모듈이 무엇을 할 것인지 : drive(), park() (동사)
//     it('주차가 가능하다',() => {
//         assert.equal(car.park(),'주차');
//     })

//     it('운전이 가능하다', () => {
//         assert.equal(car.drive(), '붕붕')
//     })

//     it('날아갈수있다', () => {
//         assert.equal(car.fly(), '날아라')
//     })

//     it('수륙 양용이다', () => {
//         assert(car.swim(), '헤엄')
//     })

// })

//1. ganache-cli 이더리움 가상 로컬 네트워크에 배포
//2. 배포된 코드와 interact하면서 코드 테스트

const assert = require('assert');
const Web3 = require('web3');
const ganache = require('ganache-cli');
const { bytecode, interface } = require('./compile');

const web3 = new Web3(ganache.provider());

let accounts;
let note;

beforeEach( async () => {
    accounts = await web3.eth.getAccounts();
    note = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data : '0x' + bytecode, arguments: ['Happy hacking']})
    .send( { from: accounts[0], gas: '1000000' } );
})

describe('Note 컨트랙트', () => {
    it( '배포가 될 수 있다', () => {
        console.log(note);
    })
})



