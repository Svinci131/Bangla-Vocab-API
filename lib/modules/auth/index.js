exports.register = function (server, options, next) {
  //Setup the session strategy
  server.auth.strategy('session', 'cookie', {
     password: 'secret_cookie_encryption_password', //Use something more secure in production
     redirectTo: '/auth/twitter', //If there is no session, redirect here
     isSecure: false //Should be set to true (which is the default) in production
  });

  next();
}