const express = require('express')
const Menu = require('../models/Menu')
const router = express.Router()

const menuController = require('../controllers/menuControllers')

// getAllMenuItems
router.get('/', menuController.getAllMenuItems)

module.exports = router

