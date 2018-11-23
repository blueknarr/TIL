//fs & path: note.sol 파일에 들어가 내용을 가져온다
const fs = require('fs');
const path = require('path');

const solc = require('solc');

//path, fs를 통해 const note에 note.sol의 내용을 가져온다.
//fs.readFileSync('파일의 절대경로', 'utf-8');
const filePath = path.resolve(__dirname,'note.sol');
const note = fs.readFileSync(filePath,'utf-8');

const source = solc.compile(note,1);
//const bytecode, interface
// const byteCode = source.contracts[':Note'].bytecode;
// const interface = source.contracts[':Note'].interface;

module.exports = source.contracts[':Note'];