const Menu = require("../models/Menu")

// getAllMenuItems
const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({}).sort({ createdAt: -1 })
    res.status(200).json(menus)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// postMenuItem
const postMenuItem = async (req, res) => {
  const newItem = req.body
  try {
    const result = await Menu.create(newItem)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//



module.exports = { getAllMenuItems, postMenuItem }