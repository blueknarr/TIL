// deploy
// web3 이더리움과 통신하기 위한 패키지
// HDwalletProvider - seed phrase -> private key 생성

//class return
const HDwalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

//배포하기 위한 컨트랙트 컴파일 결과물
const { bytecode, interface } = require('./compile');

const provider = new HDwalletProvider(
    //'내 계정의 12개의 mnemonic words',
    'axis hollow faint jewel oppose own story leisure girl middle scorpion usage',
    //'Infura API'
    'https://ropsten.infura.io/v3/16084aa18d544d4cad58e9c06981868f'
);

const web3 = new Web3(provider);

const deploy = async () =>{
    //배포는 eth의 contract에서 한다.
    // web3.eth.Contract('인터페이스 정보')
    // .deploy('{바이트코드정보, 생성자 관련 인자}')
    // .send('{누구로부터,수수료정보}')
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: '0x'+ bytecode, arguments: ['happy hacking']})
    .send({from: accounts[0], gas: '1000000', gasPrice: web3.utils.toWei('2','gwei') });
    console.log(result);
}

deploy();