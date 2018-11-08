const os = require('os');

const totalMemory = os.totalmem();
const freeMemory = os.freemem() /1024 /1024;

console.log(`Free Memory ${freeMemory}`);

