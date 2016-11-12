const users = require ("../../db/users");

module.exports = [
    {
      method: 'GET',
      path: '/users',
      handler: function (request, reply) {
    	reply('hello!!');
      } 
    },
    { method: 'GET',
      path: '/users/{id}',
      handler: function (request, reply) {} 
    },
    {
    method: ['PUT', 'POST'],
    path: '/users',
    handler: function (request, reply) {
      console.log(request.payload);
        reply('I did something!');
    }
	}
];