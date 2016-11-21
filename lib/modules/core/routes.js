const Pkg = require('./package.json');

//getUserByNameAndTYPE 
//return name and all levels getAllLevels

const routes = [
    {
      method: 'GET',
      path: '/users',
      handler: function (request, reply) {
    	  reply('hello!!');
      }
    },
    {
    method: 'GET',
    path: '/auth_twitter',
    config: {
      handler: require('./factory/auth_twitter')
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
