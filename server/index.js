'use strict';

const Bcrypt = require('bcrypt');
const Hapi = require('hapi');
const Basic = require('hapi-auth-basic');
const glob = require('glob');
// const server = new Hapi.Server();
const Path = require('path');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '/../static')
            }
        }
    }
});


const routes = require('./routes');
const users = require ("../db/users");
const val = require("./auth");
const AuthCookie = require('hapi-auth-cookie');
// const path = __dirname+"/../static";
const inert = require("inert");

server.connection({ port: 3000 });

server.register(require('inert'), (err) => {
	server.route({
	    method: 'GET',
	    path: '/',
	    handler: function (request, reply) {
	        reply.file('index.html');
	    }
	});

	server.route(routes);

	server.start((err) => {
	  if (err) {
	    throw err;
	  }
	  console.log(
	    "starting server")
	});
});
