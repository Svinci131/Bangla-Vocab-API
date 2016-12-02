const twitter = require("../../../secret").twitter;
const Pkg = require('./package.json');

exports.register = function (server, options, next) {
  console.log(server.auth)
  //Setup the session strategy
  server.auth.strategy('session', 'cookie', {
     password: 'secret_cookie_encryption_password', //Use something more secure in production
     redirectTo: '/auth/twitter', //If there is no session, redirect here
     isSecure: false //Should be set to true (which is the default) in production

  });

  server.auth.strategy('twitter', 'bell', {
	    provider: 'twitter',
	    password: 'secret_cookie_encryption_password', //Use something more secure in production
	    clientId: twitter.clientId,
	    clientSecret: twitter.clientSecret,
	    isSecure: false //Should be set to true (which is the default) in production
 	});
  next();
}

exports.register.attributes = {
  pkg: Pkg
};
