const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const {authenticate} = require("../middleware/authMiddleware");
const { checkAdmin } = require('../middleware/checkAdmin');

// Roles CRUD operations
router.post('/', roleController.createRole);
router.get('/', roleController.getRoles);
router.get('/:roleId', roleController.getRoleById);
router.put('/:roleId', roleController.updateRole);
router.delete('/:roleId', roleController.deleteRole);
// Assign role route
router.post('/assign-role',authenticate,roleController.assignRole);


module.exports = router;
