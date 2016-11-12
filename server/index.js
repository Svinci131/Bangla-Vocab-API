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
const path = __dirname+"/../static";
const inert = require("inert");

server.connection({ port: 3000 });

server.register(require('inert'), (err) => {
	server.route({
	    method: 'GET',
	    path: '/',
	    handler: function (request, reply) {
	        reply.file(path+'/index.html');
	    }
	});
	server.route({
	    method: 'GET',
	    path: '/javascript/bundle.js',
	    handler: function (request, reply) {
	        reply.file('javascript/bundle.js');
	    }
	});
	server.route({
	    method: 'GET',
	    path: '/styles/semantic.min.css',
	    handler: function (request, reply) {
	        reply.file('styles/semantic.min.css');
	    }
	});
	server.route({
	    method: 'GET',
	    path: '/styles/main.css',
	    handler: function (request, reply) {
	        reply.file('styles/main.css');
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
