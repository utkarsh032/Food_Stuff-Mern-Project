const { response } = require("express")
const Carts = require("../models/Carts")

// getCartByEmail
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email
    const query = { email: email }
    const result = await Carts.find(query).exec()

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// addToCart

const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, image, quantity, price, email } = req.body
  try {
    const existingCartItem = await Carts.findOne({ menuItemId })
    if (existingCartItem) {
      return res.status(400).json({ message: "Product already in cart!" })
    }
    const cartItem = await Carts.create({ menuItemId, name, recipe, image, quantity, price, email })
    res.status(201).json(cartItem)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getCartByEmail,
  addToCart
}