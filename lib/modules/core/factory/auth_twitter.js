function twitter (request, reply) {

  // if (!request.auth.isAuthenticated) {
  //   return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
  // }
  //store twitter credentials on session
  const profile = request.auth.credentials.profile;

  request.cookieAuth.set({
    twitterId: profile.id,
    username: profile.username,
    displayName: profile.displayName
  });

  return reply.redirect('/users');
  }

}

module.exports = {
  twitter: twitter;
}
