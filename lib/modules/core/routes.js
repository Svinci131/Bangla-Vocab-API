const Pkg = require('./package.json');
const Boom = require('boom');
const LoginCntrl = require('./controllers/login')
const Path = require('path')
//getUserByNameAndTYPE 
//return name and all levels getAllLevels

const routes = [
    /* static file */
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => reply.file(Path.join(__dirname, '/../static/index.html'))
    },
    {
      method: 'GET',
      path: '/styles/{file}',
      handler: (request, reply) => reply.file(Path.join(__dirname, '/../static/styles/'+request.params.file))
    },
    {
      method: 'GET',
      path: '/javascript/bundle.js',
      handler: (request, reply) => reply.file(Path.join(__dirname, '/../static/javascript/bundle.js'))
    },
    /*authentication/login routes*/
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
      config: LoginCntrl.logout
    },
    {
      method: 'GET',
      path: '/auth/twitter',
      config: LoginCntrl.loginTwitter
    }
  ];


exports.register = function(server, options, next) {
  server.route(routes);
  next();
};

exports.register.attributes = {
  pkg: Pkg
};
