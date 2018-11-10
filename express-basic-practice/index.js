const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const users = [
    { id: 1, name:'iphone', email:'iphone@apple.com', age:14},
    { id: 2, name:'galaxy', email:'galaxy@samsung.com', age:44 },
    { id: 3, name:'hongme', email:'hongme@huawei.com', age: 22 },
];

//CRUD

/* get all */
app.get('/api/users', (req,res) => {
    res.send(users);
});

/* get */
app.get('/api/users/:id', (req,res) => {
    const user = getUsers(users,parseInt(req.params.id));
    
    if(!user) res.status(404).send(`can't find id${req.params.id}`);

    res.send(user);
});

/* post */
app.post('/api/users/',(req,res) => {     

});

/* put */
app.put('api/users/:id', (req,res) => {
    const user = getUsers(users,req.params.id);

    const result = validateUsers(req.body);
    if(!result) res.status(404).send(`can't find id${req.params.id}`);
    
    const { error } = validateUsers(req.body);
    if(result.error) res.status(400).send(result.error.message);

    
});

/* delete */
app.delete('api/users/',(req,res) => {

});

function validateUsers(user){
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).required(),
        age: Joi.number().min(99).required()
    }
    return result = Joi.validate(user,schema);
}

function getUsers(users, id){
    return users.find( (user) => user.id === id);
}

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening ${port}`));
