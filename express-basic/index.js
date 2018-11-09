const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const movies = [
    { id: 1, title: 'a' },
    { id: 2, title: 'b' },
    { id: 3, title: 'c' },
]

//CRUD
//CREATE READ UPDATE DESTROY
//POST   GET  PUT    DELETE

/* GET /api/movies */
app.get('/api/movies',(req,res) =>{
    res.send(movies);
});

/* GET /api/movies/1 */
app.get('/api/movies/:id',(req,res)=>{
    const movie = getMovie(movies,req.params.id);
    // const movie = movies.find((movie) => {
    //     return movie.id === parseInt(req.params.id);
    // });
    
    if(!movie){
        res.status(404).send(`Movie with given id(${req.params.id}) is not found`);
    }
    res.send(movie);
});

/* POST /api/movies/ */
app.post('/api/movies',(req,res) => {
    // const schema = {
    //     title: Joi.string().min(2).required(),
    // };

    // const result = Joi.validate(req.body,schema);
    
    //입력데이터 검사
    const result = validateMovie(req.body);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    const movie = {
        id: movies.length +1, 
        title: req.body.title
    };
    
    movies.push(movie);
    res.send(movie);
});

/* PUT /api/movies/1 */
app.put('/api/movies/:id',(req,res) => {
    //ID 검사
    const movie = getMovie(movies,req.params.id);
    //const movie = movies.find( movie => movie.id === parseInt(req.params.id));
    
    //404
    if(!movie) return res.status(404).send(`The movie with the given ID(${req.params.id}) was not found`);
    
    
    //입력데이터 검사
    //const { error } = validateMovie(req.body);
    const result = validateMovie(req.body);
    // const schema = {
    //     title: Joi.string().min(2).required(),
    // };
    // const result = Joi.validate(req.body,schema);
    
    //유효하지 않으면, 400
    if(result.error){
        res.status(400).send(result.error.message);
    }

    movie.title = req.body.title;
    res.send(movie);
});

/* DELETE /api/movies/1 */
app.delete('/api/movies/:id',(req,res) => {
    //ID 검사
    const movie = getMovie(movies,req.params.id);
    //const movie = movies.find( movie => movie.id === parseInt(req.params.id));
    
    //404
    if(!movie) return res.status(404).send(`The movie with the given ID(${req.params.id}) was not found`);
    
    //delete logic
    const index = movies.indexOf(movie);
    movies.splice(index,1);
    
    res.send(movie);
});

app.get('/',(req,res) => {
    res.send('gazua...');
})

app.get('/:name',(req,res) => {
    res.send(`gazua..., ${req.params.name}`);
})

function validateMovie(movie){
    const schema = {
        title: Joi.string().min(2).required(),
    };
    return result = Joi.validate(movie,schema);
}

function getMovie(movies, id){
    return movies.find( movie => movie.id === parseInt(id));
}

const port = process.env.PORT || 3000; 
app.listen(port,() => console.log(`listening on port ${port}`));
