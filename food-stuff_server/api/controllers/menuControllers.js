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

//deleteMenuItem
const deleteMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const deletedItem = await Menu.findByIdAndDelete(menuId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Recipe not found" })
    }
    res.status(200).json({ message: "Recipe deleted successfully!" })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { getAllMenuItems, postMenuItem, deleteMenuItem }