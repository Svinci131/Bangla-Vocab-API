const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

var userSchema = new Schema({
  username: String,
  admin: Boolean,
  location: String,
  lessons: {},
  loginMethod: {
    type: String,
    enum: ['Google', 'Facebook', 'Twitter']
  }
});


var User = Mongoose.model('User', userSchema);

exports.User = User;