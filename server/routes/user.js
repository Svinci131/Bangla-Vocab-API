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
        reply('I did something!');
    }
	}
];