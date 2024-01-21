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

// singleMenuItem
const singleMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const menu = await Menu.findById(menuId);
    res.status(200).json(menu)

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// updateMenuItem
const updateMenuItem = async (req, res) => {
  const menuId = req.params.id;
  const { name, recipe, image, category, price } = req.body;
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(menuId,
      { name, recipe, image, category, price },
      { new: true, runValidator: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found" })
    }

    res.status(200).json(updatedMenu)

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllMenuItems, postMenuItem, deleteMenuItem, singleMenuItem, updateMenuItem }
