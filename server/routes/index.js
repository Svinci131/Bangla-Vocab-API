var user = require('./user');
var middleware = require('./middleware')
module.exports = [].concat(middleware, user);