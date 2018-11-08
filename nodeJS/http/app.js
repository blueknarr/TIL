const http = require('http');
const url = 'http://csszengarden.com';

http.get(url,(response) => {
    let chunkCount = 0;
    response.on('data', (chunk) => {
        chunkCount++;
        console.log('-------------------------------');
        console.log(chunk.toString('utf8'));
    });
});