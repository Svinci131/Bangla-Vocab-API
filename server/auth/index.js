const secret = require("../../secret");

module.exports = {
	twitter: {
	    provider: 'twitter',
	    password: 'secret_cookie_encryption_password', //Use something more secure in production
	    clientId: secret.twitter.clientId,
	    clientSecret: secret.twitter.clientSecret,
	    isSecure: false //Should be set to true (which is the default) in production
	}
}