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

app.set('view engine','pug');
app.set('views','./views'); //Defualt setting

app.get('/',(req,res) => {
    res.render('index',{
        title:'t',
        gretting: 'g'
    });
})

const users = [
  { id: 1, name: 'john', email: 'john@hphk.kr', age: 33 },
];

app.get('/', (req, res) => {
  res.send('HappyHacking');
});

app.get('/api/users', (req, res) => {
  res.send(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = getUser(users, parseInt(req.params.id));
  if(!user) return res.status(404).send(`No User with id: ${req.params.id}`);

  res.send(user);
});

app.post('/api/users', (req, res) => {
  const { error } = validateUser(req.body);
  if(error) return res.status(400).send(error.message);

  const { name, email, age } = req.body;
  const user = {
    id: users.length + 1,
    name: name,
    email: email,
    age: age || null,
  };

  users.push(user);
  res.send(user);
});

app.put('/api/users/:id', (req, res) => {
  const user = getUser(users, parseInt(req.params.id));
  if(!user) return res.status(404).send(`No User with id: ${req.params.id}`);

  const { error } = validateUser(req.body);
  if(error) return res.status(400).send(error.message);

  // user.name = req.body.name;
  // user.email = req.body.email;
  // user.age = req.body.age;
  const { name, email, age } = req.body;
  user.name = name;
  user.email = email;
  user.age = age;
  res.send(user);
});

app.delete('/api/users/:id', (req, res) => {
  const user = getUser(users, parseInt(req.params.id));
  if(!user) return res.status(404).send(`No User with id: ${req.params.id}`);

  const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
});

function getUser(users, id) {
  return users.find(user => user.id === id);
}

function validateUser(user) {
  const schema = {
    name: Joi.string().required().min(1),
    email: Joi.string().email().required().min(5).max(25),
    age: Joi.number().min(3),
  };

  return Joi.validate(user, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`${port} (@ᐛ)و `));