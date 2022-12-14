const express = require('express');
const rarityController = require('../controller/rarityController');
const categoryController = require('../controller/categoryController');
const itemController = require('../controller/itemController');

const router = express.Router();

// Routes for Rarities
// List
router.get('/rarity', rarityController.rarityList);

// Add New
router.get('/addrarity', rarityController.rarityCreateGet);
router.post('/addrarity', rarityController.rarityCreatePost);

// Delete
router.post('/rarity/delete', rarityController.rarityDelete);

// Editor
router.get('/rarity/edit/:id', rarityController.rarityUpdateGet);
router.post('/rarity/edit', rarityController.rarityUpdatePost);

// Routes for Categories
// List
router.get('/category', categoryController.categoryList);

// Add New
router.get('/addcategory', categoryController.categoryCreateGet);
router.post('/addcategory', categoryController.categoryCreatePost);

// Delete
router.post('/category/delete', categoryController.categoryDelete);

// Editor
router.get('/category/edit/:id', categoryController.categoryUpdateGet);
router.post('/category/edit', categoryController.categoryUpdatePost);

// Routes for Items
// List
router.get('/item', itemController.itemList);

// Add New
router.get('/additem', itemController.itemCreateGet);
router.post('/additem', itemController.itemCreatePost);

// Delete
router.post('/item/delete', itemController.itemDelete);

// Editor
// router.get('/item/edit/:id', itemController.itemUpdateGet);
// router.post('/item/edit', itemController.itemUpdatePost);

module.exports = router;
