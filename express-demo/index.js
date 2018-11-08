const express = require('express');
const app = express();

app.get('/',(req, res) => {
    res.send('welcome');
});

app.get('/api',(req,res) => {
    const data = {
        ceo:'ceo',
        cso:'cso',
        cio:'cio',
        intern:'intern',
        fulltime:'fulltime'
    };
    res.send(data);
});

app.get("/api/courses/:id", (req, res) => {
    res.send(req.params.id);
});

app.get("/api/posts/:year", (req,res) => {
    res.send(req.query);
})

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`listening on ${port} port`));