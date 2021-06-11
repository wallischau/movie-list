const express = require('express');
const app = express();
const PORT = 4000;
const topMovies = require('./top-250-movies.json');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

app.get('/', function (req, res) {
    res.send('Movie API works!');
});

app.get('/api/movies', (req, res) => {
    const movies = Object.values(topMovies);
    res.send(movies);
});

app.listen(PORT, function () {
    console.log(`Movie API ready on http://localhost:${PORT}`);
});
