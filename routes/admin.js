const express = require('express');
const rarityController = require('../controller/rarityController');
// const categoryController = require('../controller/categoryController');

const router = express.Router();

// Routes for Rarities
// List
router.get('/rarity', rarityController.rarityList);

// Rarity
router.get('/addrarity', rarityController.rarityCreateGet);
router.post('/addrarity', rarityController.rarityCreatePost);

// Delete
router.post('/rarity/delete', rarityController.rarityDelete);

// Editor
router.get('/rarity/edit/:id', rarityController.rarityUpdateGet);
router.post('/rarity/edit', rarityController.rarityUpdatePost);

// Routes for Categories
// List

module.exports = router;
