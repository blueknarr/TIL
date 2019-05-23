var express = require('express');
var request = require('request');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var tokenKey = 'kisafintech';
var auth = require('./lib/auth')
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '1234',
    database : 'fintech' //database name (not table)
});
connection.connect();
app = express();

//css 경로 지정
app.use(express.static(__dirname + '/public'));

//json file parsing
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || 8080;

console.log("Listening on port ", port);

//index page
app.get('/',function(req, res){
    res.render('index');
})

//join page
app.get('/join',function(req, res){
    res.render('join');
})

//토큰 받아오기
app.get('/authResult',function(req, res){
    var auth_code = req.query.code;
    var getTokenUrl = "https://testapi.open-platform.or.kr/oauth/2.0/token";
    var option = {
        method : "POST",
        url :getTokenUrl,
        headers : {
        },
        form : {
            code : auth_code,
            client_id : "l7xx8f5b86755854495c87fcae22754baf59",
            client_secret : "5d6d1f909731491196d6a5514d96deb5",
            redirect_uri : "http://localhost:8080/authResult",
            grant_type : "authorization_code"
        }
    };

    request(option, function (error, response, body) {
        if(error) throw error;
        else{
            console.log(body)
            var accessRequestResult = JSON.parse(body);
            console.log(accessRequestResult);
            res.render('resultChild',{data : accessRequestResult});
        }
        
        
    });
})

//view에서 입력받아 벡으로 전송
app.post('/join',function(req,res){
    
    console.log(req);
    var name = req.body.name;
    var birth = req.body.birth;
    var email = req.body.email;
    var accessToken = req.body.accessToken;
    var refreshToken = req.body.refreshToken;
    var userNum = req.body.userNum;
    var password = req.body.password;
    var phone = req.body.phone;
    
    console.log(name, email, password);
    var sql = 'INSERT INTO `fintech`.`user` (`name`, `birth`, `user_id`, `user_password`, `phone`, `accessToken`,`refreshToken`,`userNum`) VALUES (?,?,?,?,?,?,?,?);';
    connection.query(sql,[name,birth,email,password,phone,accessToken,refreshToken,userNum],function(error,results){
        if(error) throw error;
        else{
            console.log(this.sql);
            res.json(1);
        }
    });
});

app.post('/login', function (req, res) {
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    console.log(userEmail, userPassword);
    res.json('등록 정보 성공');

    var sql = "SELECT * FROM user WHERE user_id = ?";
    connection.query(sql, [userEmail], function (error, results) {
      if (error) throw error;  
      else {
        console.log(results);
        console.log(userPassword);
        console.log(results[0].user_password);
        if(userPassword == results[0].user_password){
            jwt.sign(
                {
                    userName : results[0].name,
                    userId : results[0].user_id
                },
                tokenKey,
                {
                    expiresIn : '1d',
                    issuer : 'fintech.admin',
                    subject : 'user.login.info'
                },
                function(err, token){
                    console.log('로그인 성공', token)
                    res.json(token)
                }
            )            
        }
        else {
            res.json('등록정보가 없습니다');
        }
      }
    });
})

//토큰 정보로 사용자 정보를 확인한다.
app.get('/tokenTest',auth,function(req,res){
    console.log('토큰테스트')
    console.log(req.decoded);
})

app.listen(port);