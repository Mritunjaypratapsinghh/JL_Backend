// const express = require('express');
// const router = express.Router();
// const { authenticate, checkAuthorization } = require('../middleware/authMiddleware');
// const jobController = require('../controllers/jobController');


// router.get('/admin/users', authenticate, checkAuthorization('admin'), jobController.getAllUsers);
// router.put('/admin/users/:userId', authenticate, checkAuthorization('admin'), jobController.updateUser);
// router.get('/admin/jobs', authenticate, checkAuthorization('admin'), jobController.getAllJobs);
// router.delete('/admin/jobs/:jobId', authenticate, checkAuthorization('admin'), jobController.deleteJobByAdmin);