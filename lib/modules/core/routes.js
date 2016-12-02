const Pkg = require('./package.json');
const Boom = require('boom');
//getUserByNameAndTYPE 
//return name and all levels getAllLevels

const routes = [
    {
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply('homepage!!');
      }
    },
    {
      method: 'GET',
      path: '/users',
      config: {
        auth: 'session',
        handler: function (request, reply) {
          console.log('logged in as', request.auth.credentials.username)
      	  reply('welcome'+request.auth.credentials.username);
        }
      }
    },
    {
      method: 'GET',
      path: '/logout',
      config: {
        auth: 'session',
        handler: function (request, reply) {
          console.log('logging out', request.auth.credentials.username)
          request.cookieAuth.clear();
          return reply.redirect('/');
        }
      }
    },
    {
      method: 'GET',
      path: '/auth/twitter',
      config: {
          auth: 'twitter',
          handler: function (request, reply) {
            if (!request.auth.isAuthenticated) {
              return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error));
            }
            const profile = request.auth.credentials.profile;
            request.cookieAuth.set({
              session: {
                twitterId: profile.id,
                username: profile.username,
                displayName: profile.displayName
              }
            });
            return reply.redirect('/');
          }

      }
    }
  ];

exports.register = function(server, options, next) {
  server.route(routes);
  next();
};

exports.register.attributes = {
  pkg: Pkg
};
