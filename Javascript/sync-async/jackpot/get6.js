const http = require('http');

function getLottoData(drwNo){
    const url = `http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;
    let lottoData = {};
    
    return new Promise((resolve, reject) => {
        http.get(url,res=>{
            let buff = '';
            res.on('data',chunk => {
                buff += chunk;
            });
    
            res.on('end',() => {
                lottoData = JSON.parse(buff);
                resolve(lottoData);
            });
        });
    });
}

function findLuckyNumbers(lottoData={}){
    for(const [key, value] of Object.entries(lottoData)){
        //console.log(`${key} : ${value}`)
        if(`${key}` === 'bnusNo') bonusNumber = `${value}`;
        if(!`${key}`.indexOf('drwtNo')) realNumbers.push(`${value}`);
    }
    console.log(`당첨번호 : ${realNumbers}`);
    console.log(`보너스 번호 : ${bonusNumber}`);
}

const realNumbers = []
let bonusNumber;



async function run(){
    await getLottoData(800).then(lottoData => findLuckyNumbers(lottoData));
    let winningNum = new Array(45);
    let myNum = [10,4,1,45,28,26];
    let correctNum=0;
    let bonusNum=0;
    for(var i=0; i<realNumbers.length; ++i){
        winningNum[realNumbers[i]] = 1;
    }
    
    //6개 번호 비교
    for(var i=0; i<6; ++i){
        if(winningNum[myNum[i]]){
            correctNum++;
        }
    }
    //console.log(correctNum);
    //보너스 번호 비교
    //console.log('보너스 :' + bonusNumber);
    for(var i=0; i<6; ++i){
        //console.log('mynum:' + myNum[i]);
        if(myNum[i] === parseInt(bonusNumber)){
            //console.log('if loop in');
            bonusNum=1;
            break;
        }
    }
    //console.log(bonusNum);
    console.log(`당신의 로또 번호: ${myNum}`);
    if(correctNum === 6) console.log('1등 당첨');
    else if(correctNum === 5){
        if(bonusNum ===1) console.log('2등 당첨');
        else console.log('3등 당첨');
    }
    else if(correctNum === 4) console.log('4등 당첨');
    else if(correctNum === 3) console.log('5등 당첨');
}

run();


