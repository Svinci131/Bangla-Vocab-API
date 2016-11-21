const Pkg = require('./package.json');

const routes = [
    {
      method: 'GET',
      path: '/users',
      handler: function (request, reply) {
    	reply('hello!!');
      }
    }];

exports.register = function(server, options, next) {
  server.route(routes);
  next();
};

exports.register.attributes = {
  pkg: Pkg
};
