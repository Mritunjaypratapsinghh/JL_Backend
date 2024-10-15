const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Companies CRUD operations
router.post('/', companyController.createCompany);
router.get('/', companyController.getCompanies);
router.get('/:companyId', companyController.getCompanyById);
router.put('/:companyId', companyController.updateCompany);
router.delete('/:companyId', companyController.deleteCompany);

module.exports = router;
