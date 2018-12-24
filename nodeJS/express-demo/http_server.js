const http = require('http');

const data = {
    ceo:'ceo',
    cso:'cso',
    cio:'cio'
}

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write('welcome');
        res.end();
    }
    if(req.url === '/api'){
        res.write(JSON.stringify(data));
        res.end();
    }
});

server.listen(3000);
console.log('Listening on port 3000');