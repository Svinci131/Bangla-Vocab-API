'use strict';

const Bcrypt = require('bcrypt');
const Hapi = require('hapi');
const Basic = require('hapi-auth-basic');
const glob = require('glob');
const Path = require('path');
const bell = require('bell');
const Boom = require('boom');
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
const inert = require("inert");
const twitter = require("../secret").twitter;

server.connection({ port: 3000 });

server.register([inert, AuthCookie, bell], (err) => {
	//Setup the session strategy
	server.auth.strategy('session', 'cookie', {
	   password: 'secret_cookie_encryption_password', //Use something more secure in production
	   redirectTo: '/auth/twitter', //If there is no session, redirect here
	   isSecure: false //Should be set to true (which is the default) in production
	});
	//Setup the social Twitter login strategy
  	server.auth.strategy('twitter', 'bell', {
	    provider: 'twitter',
	    password: 'secret_cookie_encryption_password', //Use something more secure in production
	    clientId: twitter.clientId,
	    clientSecret: twitter.clientSecret,
	    isSecure: false //Should be set to true (which is the default) in production
 	});

  	//Setup the routes (this could be done in an own file but for the sake of simplicity isn't)
  server.route({
    method: 'GET',
    path: '/auth/twitter',
    config: {
      auth: 'twitter', //<-- use our twitter strategy and let bell take over
      handler: function(request, reply) {
      	console.log(request.auth.isAuthenticated)
        if (!request.auth.isAuthenticated) {
          return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
        }

        //Just store a part of the twitter profile information in the session as an example. You could do something
        //more useful here - like loading or setting up an account (social signup).
        const profile = request.auth.credentials.profile;

        request.cookieAuth.set({
          twitterId: profile.id,
          username: profile.username,
          displayName: profile.displayName
        });

        return reply.redirect('/private');
       }
     }
  });
   	server.route(routes);
  	 server.route({
    method: 'GET',
    path: '/private',
    config: {
      auth: 'session', //<-- require a session for this, so we have access to the twitter profile
      handler: function(request, reply) {

        //Return a message using the information from the session
        return reply('Hello, ' + request.auth.credentials.displayName + '!');
      }
    }
  });
	

	server.start((err) => {
	  if (err) {
	    throw err;
	  }
	  console.log(
	    "starting server")
	});
});
