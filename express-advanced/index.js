const home = require('./routes/home')
const movies = require('./routes/movies');
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth')
const express = require('express');
const app = express();

console.log(app.get('env'));
console.log(app.get('debug'));

//환경변수 
//console.log(`Node_env ${process.env.NODE_ENV}`);

//express 내장 미들웨어 함수

app.use(helmet());

if(app.get('env') === 'development'){
    debug("morgan을 실행합니다");
    app.use(morgan('dev'));
}

console.log(config.get('DB.password'));

//리턴 값이 함수이다.
app.use(express.json());
// /api/users?key1=value1&key2=value2
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use( logger );
app.use( auth );
app.use('/',home);
app.use('/api/movies',movies);
app.set('view engine','pug');
app.set('views','./views'); //Defualt setting

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`${port} (@ᐛ)و `));