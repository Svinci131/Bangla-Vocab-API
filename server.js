'use strict'

// const Config = require('config');
const Glue = require('glue');

// const Mongoose = require('./lib/modules/mongoose');

const manifest = {
 connections: [{
	   //"host": "0.0.0.0",
	  port: 9000,
      labels: ['api']
   }],
  "registrations": [
      {
        "plugin": {
          "register": "./core"
        }
      },
      {
        "plugin": {
            "register": "inert"
          }
      }]
};

const glueOptions = {
    relativeTo: process.cwd() + '/lib/modules'
  }

Glue.compose(manifest, glueOptions, (err, server) => {
  server.start(function (err) {
    if (err) throw err;
    console.log("starting server");
  });
});
