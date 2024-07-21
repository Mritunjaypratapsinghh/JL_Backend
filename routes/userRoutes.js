const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const passport = require('passport');

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);

router.get('/google', authController.googleAuth);
router.get('/google/callback', passport.authenticate('google', { session: false }), authController.googleAuthCallback);

router.get('/github', authController.githubAuth);
router.get('/github/callback', passport.authenticate('github', { session: false }), authController.githubAuthCallback);

module.exports = router;
