exports.logout = {
	auth: 'session',
    handler: function (request, reply) {
      console.log('logging out', request.auth.credentials.username)
      request.cookieAuth.clear();
      return reply.redirect('/');
    }
}

exports.loginTwitter = {
  auth: 'twitter',
  handler: function (request, reply) {
    if (!request.auth.isAuthenticated) {
      return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error));
    }
    const profile = request.auth.credentials.profile;
    request.cookieAuth.set({
      twitterId: profile.id,
      username: profile.username,
      displayName: profile.displayName
    });
    return reply.redirect('/');
  }
}