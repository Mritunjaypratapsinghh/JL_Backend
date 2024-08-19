// const express = require('express');
// const router = express.Router();
// const { authenticate, checkAuthorization } = require('../middleware/authMiddleware');
// const jobController = require('../controllers/jobController');

// // Recruiter-Specific
// router.get('/candidates', authenticate, jobController.getCandidates);
// router.get('/candidates/:candidateId', authenticate, jobController.getCandidateProfile);
// router.post('/jobs/:jobId/interview', authenticate, jobController.scheduleInterview);
// router.get('/interviews', authenticate, jobController.getInterviews);