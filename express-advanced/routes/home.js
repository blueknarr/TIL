const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index',{
        title:'happy',
        greeting: 'hacking'
    })
});

router.get('/:name',(req,res)=> {
    res.send(`Hi, ${req.params.name}`);
});

exports.module = router;