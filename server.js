'use strict'

// url: /i/{encoded src url}/{WxH}/{name.format}
// url: /l/{path to file}/{WxH}/{name.format}

const sharp = require('sharp'),
      resizer = require('./resizer'),
      Hapi    = require('hapi'),
      fs      = require('fs'),
      mime    = require('mime'),
      request = require('request');

// create server
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: process.env.PORT || 8000
});

server.route({
    method: 'GET',
    path:'/i/{src}/thumbnail/{name}',
    handler: function (req, reply) {
      reply(request(req.params.src).pipe(resizer('200x200', req.params.name).crop(sharp.strategy.entropy)))
        .header('Content-Type', mime.lookup(req.params.name));
    }
});

server.route({
    method: 'GET',
    path:'/i/{src}/{size}/{name}',
    handler: function (req, reply) {
      reply(request(req.params.src).pipe(resizer(req.params.size, req.params.name)))
        .header('Content-Type', mime.lookup(req.params.name));
    }
});

server.route({
    method: 'GET',
    path:'/l/{path}/{size}/{name}',
    handler: function (req, reply) {
      reply(fs.createReadStream(`./assets/${req.params.path}`).pipe(resizer(req.params.size, req.params.name)))
        .header('Content-Type', mime.lookup(req.params.name));
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
