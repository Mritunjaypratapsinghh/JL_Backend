const express = require('express');
const router = express.Router();
const { authenticate, checkAuthorization } = require('../middleware/authMiddleware');
const jobController = require('../controllers/jobController.js');
const { checkAdmin } = require('../middleware/checkAdmin.js');

// Job Listings
router.get('/jobs', jobController.getJobs);
router.get('/jobs/:jobId', jobController.getJobById);

// Job Management
router.post('/jobs', authenticate,checkAdmin,  jobController.postJob);
router.put('/jobs/:jobId', authenticate, checkAdmin, jobController.updateJob);
router.delete('/jobs/:jobId', authenticate, checkAdmin, jobController.deleteJob);

// Job Applications
// router.post('/jobs/:jobId/apply', authenticate, jobController.applyToJob);
// router.get('/jobs/:jobId/applications', authenticate, jobController.getJobApplications);
// router.get('/applications', authenticate, jobController.getUserApplications);

// Search and Filtering
// router.get('/search/jobs', jobController.searchJobs);
// router.get('/search/users', jobController.searchUsers);

// Notifications
// router.get('/notifications', authenticate, jobController.getNotifications);
// router.put('/notifications/mark-read', authenticate, jobController.markNotificationsAsRead);

// router.get('/messages', authenticate, jobController.getMessages);
// router.post('/messages', authenticate, jobController.sendMessage);

module.exports = router;
