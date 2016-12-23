'use strict'

// url: /i/{encoded src url}/{WxH}/{name.format}

const sharp   = require('sharp'),
      Hapi    = require('hapi'),
      mime    = require('mime'),
      request = require('request');

// create server
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000
});

server.route({
    method: 'GET',
    path:'/i/{src}/{size}/{name}',
    handler: function (req, reply) {
      let sz = req.params.size.split('x');
      let fmt = (req.params.name.split('.'));
      fmt = fmt[1] || fmt[0];
      fmt = (fmt == 'jpg') ? 'jpeg' : fmt;
      let resizer = sharp().resize(+sz[0], +sz[1]).toFormat(fmt);
      reply(request(req.params.src).pipe(resizer))
        .header('Content-Type', mime.lookup(req.params.name));
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
