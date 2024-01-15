const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
  menuItemId: String,
  name: {
    type: 'string',
    trim: true,
    required: true,
    minlength: 3
  },
  recipe: String,
  image: String,
  quantity: Number,
  price: Number,
  email: {
    type: 'string',
    true: true,
    required: true,
  }
})

const Carts = mongoose.model('Cart', cartSchema)

module.exports = Carts