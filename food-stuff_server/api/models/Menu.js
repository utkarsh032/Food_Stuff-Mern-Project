const mongoose = require('mongoose')
const { Schema } = mongoose

// schema for menu items
const menuSchema = new Schema({
  name: {
    type: 'string',
    trim: true,
    required: true,
    minlength: 3
  },
  recipe: String,
  image: String,
  category: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }

})

const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu

