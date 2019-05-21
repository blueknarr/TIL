var express = require('express');
var request = require('request');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '1234',
    database : 'fintech' //database name (not table)
});

app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || 8080;
app.listen(port);
console.log("Listening on port ", port);

app.get('/main',function(req, res){
    res.send('hello express');
})

var sql = 'SELECT * FROM fintech.user';
app.get('/user',function(req,res){
    connection.connect();
    connection.query(sql,function(error,results){
        if(error) throw error;
            res.send(results);
    });
    connection.end();
});

app.get()

app.get("/sayHello", function (request, response) {
	var user_name = request.query.user_name;
	response.send("Hello " + user_name + "!");
});