const express = require('express');
const router = require('./data/router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Welcome to the API Thunderdome!</h1>')
})

server.use('/api/projects', router);


module.exports = server;