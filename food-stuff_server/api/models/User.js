const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  mae: String,
  email: {
    type: String,
    trrim: true,
    minlength: 3
  },
  photoUrl: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;