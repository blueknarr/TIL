const { Movies, validate } = require('../models/movie')
const { Genre } = require('../models/genre');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/* Routes */
router.get('/', async (req,res) => {
    const movie = await Movies.find().sort('name');
    res.send(movie);
});

router.post('/',async (req,res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid Genre');

    let movie = new Movie({ 
        title: req.body.title,
        mainActor: req.body.mainActor,
        //relation 추가
        genre: {
            _id: genre._id,
            name: genre.name
        } 
    });
    movie = await movie.save();
    res.send(movie);
});

router.get('/:id', async (req,res) => {
    const movie = await Movies.findById(req.params.id);
    if(!movie) return res.status(404).send('the genre with the given ID was not find');
    res.send(movie);
});

router.patch('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.message);
    
    const movie = await Movies.findByIdAndUpdate(req.params.id, {
        name:req.body.name
    }, { new: true })
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movies.findByIdAndDelete(req.params.id);
    if(!movie) return res.status(404).send('cant not find id');

    res.send(movie);
});

module.exports = router;

