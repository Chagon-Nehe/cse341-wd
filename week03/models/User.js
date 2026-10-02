const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
  googleId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  DisplayName: {
    type: String,
    required: true
  }
});


module.exports = moongose.model('User', UserSchema);