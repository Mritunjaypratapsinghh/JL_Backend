const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Categories CRUD operations
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategoryById);
router.put('/:categoryId', categoryController.updateCategory);
router.delete('/:categoryId', categoryController.deleteCategory);

module.exports = router;
