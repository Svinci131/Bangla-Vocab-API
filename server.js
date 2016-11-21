'use strict'

const Config = require('./config/default.json');
const Glue = require('glue');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test");

let conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
  console.log('Database connection established: ');
  return setUpServer(null, mongoose);
});

// // const Mongoose = require('./lib/modules/mongoose');

function setUpServer() {

  const glueOptions = {
    relativeTo: process.cwd() + '/lib/modules'
  };

  Glue.compose(Config, glueOptions, (err, server) => {
    server.start(function (err) {
      if (err) throw err;
      console.log("starting server");
    });
  });

}
