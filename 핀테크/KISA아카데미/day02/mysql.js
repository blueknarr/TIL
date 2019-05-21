var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '1234',
    database : 'fintech' //database name (not table)
});

connection.connect();

var sql = 'SELECT * FROM fintech.user';
connection.query(sql,function(error,results){
    if(error) throw error;
    console.log(results);
});

connection.end();