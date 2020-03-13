const express = require('express');
const helmet = require('helmet')

const router = require('./data/router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Welcome to the API Thunderdome!</h1>')
})

server.use(router);

server.use(function(req, res, next){
    res.status(404).json({ message: "Opps!  This isnt the enpoint you are looking for" })
  })


module.exports = server;