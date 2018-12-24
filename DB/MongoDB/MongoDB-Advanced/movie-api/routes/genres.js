const { Genres, validate } = require('../models/genre')
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/* Routes */
router.get('/', async (req,res) => {
    const genres = await Genres.find().sort('name');
    res.send(genres);
});

router.post('/',async (req,res) => {
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.message);

    let genre = new Genres({ name:req.body.name });
    await genre.save();
    res.send(genre);
});

router.get('/:id', async (req,res) => {
    const genre = await Genres.findById(req.params.id);
    if(!genre) return res.status(404).send('the genre with the given ID was not find');
    res.send(genre);
});

router.patch('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.message);
    
    const genre = await Genres.findByIdAndUpdate(req.params.id, {
        name:req.body.name
    }, { new: true })
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genres.findByIdAndDelete(req.params.id);
    if(!genre) return res.status(404).send('cant not find id');

    res.send(genre);
});

module.exports = router;

