'use strict'

// url: /i/{encoded src url}/{WxH}/{name.format}
// url: /l/{path to file}/{WxH}/{name.format}
// url: /i/{WxH}/{name?.format}?src={src file url}

const sharp   = require('sharp'),
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
    path:'/i/{src}/{size}/{name}',
    handler: function (req, reply) {
      return reply(request(req.params.src)
              .pipe(resizer(req.params.size, req.params.name)))
              .header('Content-Type', mime.lookup(req.params.name));
    }
});

server.route({
    method: 'GET',
    path:'/i/{size}/{name}',
    handler: function (req, reply) {
      if (!req.query.src) { 
        console.log(req.query);
        return reply({ "message": "Source image required" }).code(500);
      } else {
        return reply(request(req.query.src)
                .pipe(resizer(req.params.size, req.params.name)))
                .header('Content-Type', mime.lookup(req.params.name));        
      }
    }
});

server.route({
    method: 'GET',
    path:'/l/{path}/{size}/{name}',
    handler: function (req, reply) {
      return reply(fs.createReadStream(`./assets/${req.params.path}`)
              .pipe(resizer(req.params.size, req.params.name)))
              .header('Content-Type', mime.lookup(req.params.name));
    }
});

server.start((err) => {
    if (err) { throw err;}
    console.log('Server running at:', server.info.uri);
});
