const path = require('path');

console.log(__filename);
console.log(typeof(__filename));
const pathObj = path.parse(__filename);
console.log(pathObj);