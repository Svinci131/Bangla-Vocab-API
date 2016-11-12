module.exports = [
	{
	    method: 'GET',
	    path: '/',
	    handler: function (request, reply) {
	        reply.file('index.html');
	    }
	},
	{
	    method: 'GET',
	    path: '/javascript/bundle.js',
	    handler: function (request, reply) {
	        reply.file('javascript/bundle.js');
	    }
	},
	{
	    method: 'GET',
	    path: '/styles/semantic.min.css',
	    handler: function (request, reply) {
	        reply.file('styles/semantic.min.css');
	    }
	},
	{
	    method: 'GET',
	    path: '/styles/main.css',
	    handler: function (request, reply) {
	        reply.file('styles/main.css');
	    }
	}
]